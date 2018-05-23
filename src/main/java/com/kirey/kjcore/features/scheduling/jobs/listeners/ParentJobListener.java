package com.kirey.kjcore.features.scheduling.jobs.listeners;

import java.util.List;

import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.annotation.AfterJob;
import org.springframework.batch.core.annotation.BeforeJob;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ErrorConstants;
import com.kirey.kjcore.common.util.PrintingToConsole;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.compositedao.BatchManagementService;
import com.kirey.kjcore.data.compositedao.ExceptionLoggerService;
import com.kirey.kjcore.data.dao.KjcSchedulerTracesDao;
import com.kirey.kjcore.data.dao.KjcTaskSchedulersDao;
import com.kirey.kjcore.data.dao.KjcUserAccountsDao;
import com.kirey.kjcore.data.entity.KjcBatchJobErrors;
import com.kirey.kjcore.data.entity.KjcSchedulerTraces;
import com.kirey.kjcore.data.entity.KjcTaskSchedulers;
import com.kirey.kjcore.data.entity.KjcUserAccounts;
import com.kirey.kjcore.features.exception.customexceptions.BatchValidationException;

/**
 * ParentJobListener it's called before and after each job execution and save
 * the status and the execution time of each job.
 * 
 * @author Alexandra Onofrei
 *
 */
public class ParentJobListener {

	@Autowired
	private KjcSchedulerTracesDao kjcSchedulerTracesDao;
	@Autowired
	private KjcTaskSchedulersDao kjcTaskSchedulersDao;
	@Autowired
	private KjcUserAccountsDao kjcUserAccountsDao;
	@Autowired
	private ExceptionLoggerService exceptionLoggerService;
	@Autowired
	private BatchManagementService batchManagementService;
	@Autowired
	private PrintingToConsole printingToConsole;

	/**
	 * Before job is a method that is run before a job is executed. This is a
	 * method that gets a scheduler by name and a fake user from database,
	 * creates new KJCSchedulerTraces instance and fills it with information
	 * from scheduler and fake user and saves it to database
	 * 
	 * @param jobExecution
	 *            - specifies the job execution context
	 */
	@BeforeJob
	public void executeBeforeJob(JobExecution jobExecution) {
		printingToConsole.printMessage(this.getClass(), this.getClass().getName() + ": Begin executeBeforeJob()");
		try {
			KjcTaskSchedulers kjcTaskSchedulers = kjcTaskSchedulersDao
					.findByName(jobExecution.getJobParameters().getString(AppConstants.SCHEDULER_NAME));
			// get fake user for this job
			String jobCategory = kjcTaskSchedulers.getJobName().split(AppConstants.UNDERLINE)[0];

			// set job category
			jobExecution.getExecutionContext().put(AppConstants.JOB_CATEGORY, jobCategory);
			KjcUserAccounts kjcUserAccounts = kjcUserAccountsDao
					.getFakeUserByUsername(AppConstants.FAKE_USERNAME + AppConstants.UNDERLINE + jobCategory);
			// indicates that the user is offline
			kjcUserAccounts.setOnlineUser(false);
			// add the fake user in Security context
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
					kjcUserAccounts, null);
			SecurityContextHolder.getContext().setAuthentication(authentication);

			// save the trace for the current execution with status STARTED
			KjcSchedulerTraces kjcSchedulerTraces = new KjcSchedulerTraces();
			kjcSchedulerTraces.setKjcTaskSchedulers(kjcTaskSchedulers);
			kjcSchedulerTraces.setStatus(AppConstants.JOB_STATUS_STARTED);
			kjcSchedulerTracesDao.persist(kjcSchedulerTraces);
			printingToConsole.printMessage(this.getClass(), this.getClass().getName() + ": End executeBeforeJob()");
		} catch (Exception ex) {
			// print in console the runtime exception
			printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_IN
					+ ex.getStackTrace()[0].getClassName() + ":" + ex.getStackTrace()[0].getMethodName(), ex);
			this.saveRuntimeException(ex, jobExecution);
			throw ex;
		}
	}

	/**
	 * After Job is a method that is run after a job is executed. This method
	 * gets KjcTaskScheduler from database by name, and KjcUserAccount from
	 * execution context, finds running job KjcSchedulerTrace from database and
	 * updates the trace in database
	 * 
	 * @param jobExecution
	 *            - specifies the job execution context
	 */
	@AfterJob
	public void executeAfterJob(JobExecution jobExecution) {
		printingToConsole.printMessage(this.getClass(), this.getClass().getName() + ": Begin executeAfterJob()");
		try {
			KjcTaskSchedulers kjcTaskSchedulers = kjcTaskSchedulersDao
					.findByName(jobExecution.getJobParameters().getString(AppConstants.SCHEDULER_NAME));
			KjcSchedulerTraces kjcSchedulerTraces = kjcSchedulerTracesDao.findRunningJob(kjcTaskSchedulers);

			// update the trace for the current scheduler and for the current
			// execution with status
			// COMPLETED or FAILED
			kjcTaskSchedulers.setLastExecutionStatus(jobExecution.getStatus().name());
			kjcSchedulerTraces.setStatus(jobExecution.getStatus().name());
			batchManagementService.updateSchedulerAndTraceStatus(kjcTaskSchedulers, kjcSchedulerTraces);

			// save exception in DB
			if (jobExecution.getStatus() == BatchStatus.FAILED) {
				this.saveBatchJobExceptions(jobExecution);
			}
			// check if one or more tasks managed by this job failed
			if (jobExecution.getExecutionContext().get(AppConstants.JOB_ITEM_EXCEPTION) != null
					&& (Boolean) jobExecution.getExecutionContext().get(AppConstants.JOB_ITEM_EXCEPTION)) {
				jobExecution.setExitStatus(new ExitStatus(AppConstants.JOB_EXIT_STATUS_COMPLETED_WITH_ERRORS,
						ErrorConstants.JOB_EXIT_STATUS_COMPLETED_WITH_ERRORS_MESSAGE));
			}
			SecurityContextHolder.clearContext();
			printingToConsole.printMessage(this.getClass(), this.getClass().getName() + ": End executeAfterJob()");
		} catch (Exception ex) {
			// print in console the runtime exception
			printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_IN
					+ ex.getStackTrace()[0].getClassName() + ":" + ex.getStackTrace()[0].getMethodName(), ex);
			this.saveRuntimeException(ex, jobExecution);
			throw ex;
		}
	}

	/**
	 * A method that saves the exception in database and updates the item
	 * status.
	 * 
	 * @param jobExecution
	 *            - specifies the job execution context
	 */
	private void saveBatchJobExceptions(JobExecution jobExecution) {
		final List<Throwable> exceptions = jobExecution.getAllFailureExceptions();
		for (final Throwable throwable : exceptions) {
			if (throwable instanceof BatchValidationException) {
				// save the batch validation exception
				saveBatchValidationException(throwable, jobExecution);
			} else {
				// save the runtime exception
				saveRuntimeException(throwable, jobExecution);
			}
		}
	}

	/**
	 * A method that saves the batch validation exception in database. If the
	 * save operation fails we print the thrown exception in console and try to
	 * write the exception in database.
	 * 
	 * @param e
	 *            - specifies the thrown batch validation exception
	 * @param jobExecution
	 *            - specifies the job execution context
	 */
	private void saveBatchValidationException(Throwable e, JobExecution jobExecution) {

		for (KjcBatchJobErrors kjcBatchJobErrors : ((BatchValidationException) e).getErrors()) {
			try {
				exceptionLoggerService.saveBatchValidationException(kjcBatchJobErrors, jobExecution);
			} catch (Exception ex) {
				// exception while writing in db
				printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_SAVING_LOG, ex);
				saveRuntimeException(ex, jobExecution);
			}
		}
	}

	/**
	 * A method that saves the runtime exception in database. If the save
	 * operation fails we print the exception in console
	 * 
	 * @param e
	 *            - specifies the thrown runtime exception
	 * @param jobExecution
	 *            - specifies the job execution context
	 */
	private void saveRuntimeException(Throwable e, JobExecution jobExecution) {
		try {
			exceptionLoggerService.saveExceptionOffline(e,
					Utilities.getUserFromContext() == null ? null : Utilities.getUserFromContext().getUsername(), null,
					jobExecution.getExecutionContext().get(AppConstants.JOB_CATEGORY).toString(),
					jobExecution.getJobId());
		} catch (Exception ex) {
			// exception while writing in db
			printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_SAVING_LOG, ex);
		}
	}
}
