package com.kirey.kjcore.features.scheduling.jobs.launcher;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ErrorConstants;
import com.kirey.kjcore.common.util.PrintingToConsole;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.compositedao.ExceptionLoggerService;
import com.kirey.kjcore.data.dao.KjcSchedulerTracesDao;
import com.kirey.kjcore.data.dao.KjcTaskParametersDao;
import com.kirey.kjcore.data.dao.KjcTaskSchedulersDao;
import com.kirey.kjcore.data.dao.KjcUserAccountsDao;
import com.kirey.kjcore.data.entity.KjcSchedulerTraces;
import com.kirey.kjcore.data.entity.KjcTaskParameters;
import com.kirey.kjcore.data.entity.KjcTaskSchedulers;
import com.kirey.kjcore.data.entity.KjcUserAccounts;

/**
 * BatchJobLauncher starts a batch job and takes care of saving the status and
 * the trace of each scheduler in the kjc_scheduler_traces table.
 * 
 * @author Alexandra Onofrei
 *
 */

@Component
public class BatchJobLauncher {

	@Autowired
	private JobLauncher jobAsyncLauncher;
	@Autowired
	private ApplicationContext applicationContext;
	@Autowired
	private KjcSchedulerTracesDao kjcSchedulerTracesDao;
	@Autowired
	private KjcTaskSchedulersDao kjcTaskSchedulersDao;
	@Autowired
	private KjcTaskParametersDao kjcTaskParametersDao;
	@Autowired
	private ExceptionLoggerService exceptionLoggerService;
	@Autowired
	private KjcUserAccountsDao kjcUserAccountsDao;
	@Autowired
	private PrintingToConsole printingToConsole;

	/**
	 * A method that manually executes received scheduler.
	 * 
	 * @param schedulerName
	 *            - specifies the scheduler name
	 */
	public void execute(String schedulerName) {
		// introduce a random delay in order to avoid synchronization issues
		Utilities.randomSleep();
		KjcUserAccounts kjcUserAccounts = kjcUserAccountsDao
				.getFakeUserByUsername(AppConstants.FAKE_USERNAME_SCHEDULER);
		// indicates that the user is offline
		kjcUserAccounts.setOnlineUser(false);
		// add the fake user in Security context
		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(kjcUserAccounts,
				null);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		executeManually(schedulerName);
	}

	/**
	 * A method that manually executes received scheduler if not running using
	 * fake user.
	 * 
	 * @param schedulerName
	 *            - specifies the scheduler name
	 */
	public void executeManually(String schedulerName) {

		KjcTaskSchedulers kjcTaskSchedulers;
		// check if the job is already running
		if (!kjcSchedulerTracesDao.isJobRunning(schedulerName)) {

			try {
				kjcTaskSchedulers = kjcTaskSchedulersDao.findByName(schedulerName);
				if (kjcTaskSchedulers == null) {
					throw new RuntimeException("Scheduler doesn't exist !");
				}
			} catch (Exception ex) {
				printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_IN
						+ ex.getStackTrace()[0].getClassName() + ":" + ex.getStackTrace()[0].getMethodName(), ex);
				// the scheduler does not exist in the DB, or the scheduler
				// name it's wrong
				try {
					exceptionLoggerService.saveExceptionOffline(ex, Utilities.getUserFromContext().getUsername(), null,
							AppConstants.CATEGORY_SCHEDULER, null);
				} catch (Exception exception) {
					// exception while writing in db
					printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_SAVING_LOG, exception);
				}
				throw new RuntimeException(ex);
			}
			try {
				updateJobStatus(kjcTaskSchedulers, AppConstants.JOB_STATUS_STARTED);
				try {
					// get the necessary parameters for current spring batch job
					JobParameters jobParameters = getJobParameters(kjcTaskSchedulers);
					// call the spring batch job
					Job batchJob = (Job) applicationContext.getBean(kjcTaskSchedulers.getJobName());
					jobAsyncLauncher.run(batchJob, jobParameters);
				} catch (Exception ex) {
					printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_IN
							+ ex.getStackTrace()[0].getClassName() + ":" + ex.getStackTrace()[0].getMethodName(), ex);

					// if error occur before saving the trace
					KjcSchedulerTraces kjcSchedulerTraces = new KjcSchedulerTraces();
					kjcSchedulerTraces.setKjcTaskSchedulers(kjcTaskSchedulers);

					kjcSchedulerTraces.setStatus(AppConstants.JOB_STATUS_FAILED);
					kjcSchedulerTracesDao.persist(kjcSchedulerTraces);
					throw new RuntimeException(ex);
				}

			} catch (Exception ex) {
				printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_IN
						+ ex.getStackTrace()[0].getClassName() + ":" + ex.getStackTrace()[0].getMethodName(), ex);

				updateJobStatus(kjcTaskSchedulers, AppConstants.JOB_STATUS_FAILED);
				try {
					// save error in the KJC_ERROR_LOGS table
					exceptionLoggerService.saveExceptionOffline(ex, Utilities.getUserFromContext().getUsername(), null,
							kjcTaskSchedulers.getJobName().split(AppConstants.UNDERLINE)[0], null);
				} catch (Exception exception) {
					// exception while writting in db
					printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_SAVING_LOG, exception);
				}
				throw new RuntimeException(ex);

			}
		}

	}

	/**
	 * A method that updates last scheduler execution status.
	 * 
	 * @param kjcTaskSchedulers
	 *            - the object to be updated
	 * @param status
	 *            - specifies the desired status
	 */
	private void updateJobStatus(KjcTaskSchedulers kjcTaskSchedulers, String status) {
		kjcTaskSchedulers.setLastExecutionStatus(status);
		kjcTaskSchedulersDao.merge(kjcTaskSchedulers);
	}

	/**
	 * A method that gets batch job parameters by scheduler from database and
	 * adds date (now) parameter to existing parameters.
	 * 
	 * @param kjcTaskSchedulers
	 *            - specifies the task scheduler
	 * @return JobParametersBuilder containing all existing parameters for job
	 *         and current date
	 */
	private JobParameters getJobParameters(KjcTaskSchedulers kjcTaskSchedulers) {
		JobParametersBuilder jobParametersBuilder = new JobParametersBuilder();

		// add a timestamp as a mandatory (technical) parameter because
		// a job cannot be rerun with the same set parameters
		SimpleDateFormat sdf = new SimpleDateFormat(AppConstants.SIMPLE_DATE_FORMAT);
		String datestamp = sdf.format(new Date());
		jobParametersBuilder.addString(AppConstants.BATCH_PARAMETER_TIME_STAMP, datestamp);

		// add a schedulerName as a mandatory parameter
		jobParametersBuilder.addString(AppConstants.SCHEDULER_NAME, kjcTaskSchedulers.getName());

		// get all necessary parameters from KJC_TASK_PARAMETERS
		List<KjcTaskParameters> kjcTaskParameterList = kjcTaskParametersDao.findByScheduler(kjcTaskSchedulers);
		for (KjcTaskParameters kjcTaskParameters : kjcTaskParameterList) {
			jobParametersBuilder.addString(kjcTaskParameters.getName(), kjcTaskParameters.getValue()).toJobParameters();
		}

		return jobParametersBuilder.toJobParameters();
	}
}
