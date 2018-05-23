package com.kirey.kjcore.features.scheduling;

import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.ScheduledFuture;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.Trigger;
import org.springframework.scheduling.TriggerContext;
import org.springframework.scheduling.support.CronSequenceGenerator;
import org.springframework.scheduling.support.MethodInvokingRunnable;
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
import com.kirey.kjcore.data.entity.KjcSchedulerTraces;
import com.kirey.kjcore.data.entity.KjcTaskSchedulers;
import com.kirey.kjcore.data.entity.KjcUserAccounts;

/**
 * DynamicScheduler is a custom trigger used to schedule tasks and to read the
 * execution moment from database at runtime.
 * 
 * @author Alexandra Onofrei
 *
 */

public class DynamicScheduler implements Trigger {

	private TaskScheduler scheduler;
	private Runnable task;
	private ScheduledFuture<?> scheduledFuture;
	private String schedulerName;

	@Autowired
	private KjcSchedulerTracesDao kjcSchedulerTracesDao;
	@Autowired
	private KjcTaskSchedulersDao kjcTaskSchedulersDao;
	@Autowired
	private ApplicationContext applicationContext;
	@Autowired
	private KjcUserAccountsDao kjcUserAccountsDao;
	@Autowired
	private BatchManagementService batchManagementService;
	@Autowired
	private ExceptionLoggerService exceptionLoggerService;
	@Autowired
	private PrintingToConsole printingToConsole;

	/**
	 * 
	 * @param scheduler
	 *            - specifies the scheduler to be initialized
	 * @param schedulerName
	 *            - specifies the scheduler name
	 */
	public DynamicScheduler(TaskScheduler scheduler, String schedulerName) {
		this.schedulerName = schedulerName;
		this.scheduler = scheduler;
	}

	/**
	 * Post construct method that finds scheduler by name and starts it if the
	 * job related to it isn't already running. If the job already running the
	 * status it will be changed in CRASHED This methods is using the
	 * PrintingToConsole because is not intercepted by InterceptorLogging
	 */
	@PostConstruct
	private void startTaskScheduler() {
		try {
			printingToConsole.printMessage(this.getClass(), this.getClass().getName() + ": Begin startTaskScheduler()");
			// set scheduler name as argument for the runnable task
			setSchedulerNameArgument();
			KjcUserAccounts kjcUserAccounts = kjcUserAccountsDao
					.getFakeUserByUsername(AppConstants.FAKE_USERNAME_SCHEDULER);
			// indicates that the user is offline
			kjcUserAccounts.setOnlineUser(false);
			// add the fake user in Security context
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
					kjcUserAccounts, null);
			SecurityContextHolder.getContext().setAuthentication(authentication);

			// get from DB
			KjcTaskSchedulers kjcTaskSchedulers = kjcTaskSchedulersDao.findByName(schedulerName);
			if (kjcTaskSchedulers != null) {
				// check if last execution status from traces is STARTED
				if (!kjcSchedulerTracesDao.isJobRunning(this.schedulerName)) {
					// check if last execution status from scheduler was
					// remained
					// STARTED and in traces does not exist the status STARTED
					// because can exists the possibility that the server to
					// fall down in the moment when the job status is written
					// only in KjcTaskSchedulers table
					if (AppConstants.JOB_STATUS_STARTED.equals(kjcTaskSchedulers.getLastExecutionStatus())) {
						// update the status in status CRASHED
						this.updateJobStatusToCrashed(kjcTaskSchedulers, true);
					} else {
						this.start(kjcTaskSchedulers);
					}
				} else {
					// update the status in status CRASHED
					this.updateJobStatusToCrashed(kjcTaskSchedulers, false);
				}
			}

			SecurityContextHolder.clearContext();
			printingToConsole.printMessage(this.getClass(), this.getClass().getName() + ": End startTaskScheduler()");
		} catch (Exception ex) {
			this.saveException(ex);
			throw ex;
		}
	}

	/**
	 * A method that is setting task name and runnable task.
	 */
	private void setSchedulerNameArgument() {
		MethodInvokingRunnable methodInvokingRunnable = (MethodInvokingRunnable) applicationContext
				.getBean(AppConstants.RUNNABLE_TASK_NAME);
		Object[] runnableTaskArgs = new Object[1];
		runnableTaskArgs[0] = schedulerName;
		methodInvokingRunnable.setArguments(runnableTaskArgs);
		this.task = methodInvokingRunnable;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.scheduling.Trigger#nextExecutionTime(org.
	 * springframework.scheduling.TriggerContext) This methods is using the
	 * PrintingToConsole because is not intercepted by InterceptorLogging
	 */
	@Override
	public Date nextExecutionTime(TriggerContext triggerContext) {
		try {
			printingToConsole.printMessage(this.getClass(), this.getClass().getName() + ": Begin nextExecutionTime()");
			KjcTaskSchedulers kjcTaskSchedulers = kjcTaskSchedulersDao.findByName(schedulerName);
			CronSequenceGenerator cronSequenceGenerator = new CronSequenceGenerator(
					kjcTaskSchedulers.getCronExpression(), Calendar.getInstance().getTimeZone());

			// get the last execution time of the scheduler
			Date lastExecutionTime = triggerContext.lastScheduledExecutionTime();
			if (lastExecutionTime == null) {
				lastExecutionTime = Calendar.getInstance().getTime();
			}
			kjcTaskSchedulers.setLastExecutionTime(lastExecutionTime);

			// the execution times may be determined based on past execution
			// outcomes
			Date nextExecutionTime = cronSequenceGenerator.next(lastExecutionTime);
			kjcTaskSchedulers.setNextExecutionTime(nextExecutionTime);
			kjcTaskSchedulersDao.merge(kjcTaskSchedulers);

			printingToConsole.printMessage(this.getClass(),
					this.getClass().getName() + ": -- chronExpression: " + kjcTaskSchedulers.getCronExpression()
							+ ", lastScheduledExecutionTime: " + lastExecutionTime + "; nextExecutionTime: "
							+ nextExecutionTime);

			// clear context if it is a fake user
			if (!Utilities.getUserFromContext().isOnlineUser()) {
				SecurityContextHolder.clearContext();
			}
			printingToConsole.printMessage(this.getClass(), this.getClass().getName() + ": End nextExecutionTime()");
			return nextExecutionTime;
		} catch (Exception ex) {
			this.saveException(ex);
			throw ex;
		}
	}

	/**
	 * A method that schedules received scheduler. This methods is using the
	 * PrintingToConsole because is not intercepted by InterceptorLogging.
	 * 
	 * @param kjcTaskSchedulers
	 *            - specifies the scheduler to be started
	 */
	private void start(KjcTaskSchedulers kjcTaskSchedulers) {
		this.cancelFutureExecution();
		try {
			if (kjcTaskSchedulers.getCronExpression() != null) {
				printingToConsole.printMessage(this.getClass(), this.getClass().getName() + ": Starting task...");
				scheduledFuture = scheduler.schedule(task, this);
			}
		} catch (IllegalArgumentException iaex) {
			throw iaex;
		}
	}

	/**
	 * A method that is canceling scheduled task.
	 */
	private void cancelFutureExecution() {
		if (scheduledFuture != null) {
			printingToConsole.printMessage(this.getClass(), this.getClass().getName() + ": Cancelling task...");
			scheduledFuture.cancel(true);
		}
	}

	/**
	 * A method that is canceling scheduled task running
	 */
	public void cancelTaskExecution() {
		if (!kjcSchedulerTracesDao.isJobRunning(this.schedulerName)) {
			KjcTaskSchedulers kjcTaskSchedulers = kjcTaskSchedulersDao.findByName(schedulerName);
			this.cancelFutureExecution();
			kjcTaskSchedulers.setNextExecutionTime(null);
			kjcTaskSchedulers.setCronExpression(null);
			kjcTaskSchedulers.setLastExecutionStatus(AppConstants.JOB_STATUS_STOPPED);
			kjcTaskSchedulersDao.merge(kjcTaskSchedulers);
		}
	}

	/**
	 * A method that starts new scheduler if not running.
	 * 
	 * @param kjcTaskSchedulers
	 *            - specifies the scheduler to be updated
	 */
	public void updateCronExpression(KjcTaskSchedulers kjcTaskSchedulers) {
		if (!kjcSchedulerTracesDao.isJobRunning(this.schedulerName)) {
			this.start(kjcTaskSchedulers);
		}

	}

	/**
	 * A method that updates the status in status CRASHED and sets the next
	 * execution time to null.
	 * 
	 * @param kjcTaskSchedulers
	 *            - specifies the scheduler to be updated
	 * @param newTrace
	 *            - indicates if we need to add a new scheduler trace trace with
	 *            status CRASHED or update the existing one. If we need to add
	 *            new trace that means that we don't need to update the last row
	 *            from BatchJobExecution and
	 */
	private void updateJobStatusToCrashed(KjcTaskSchedulers kjcTaskSchedulers, boolean newTrace) {
		KjcSchedulerTraces kjcSchedulerTraces = null;

		kjcTaskSchedulers.setLastExecutionStatus(AppConstants.JOB_STATUS_CRASHED);
		kjcTaskSchedulers.setNextExecutionTime(null);
		if (newTrace) {
			kjcSchedulerTraces = new KjcSchedulerTraces();
			kjcSchedulerTraces.setKjcTaskSchedulers(kjcTaskSchedulers);
			kjcSchedulerTraces.setStatus(AppConstants.JOB_STATUS_CRASHED);
		} else {
			kjcSchedulerTraces = kjcSchedulerTracesDao.findLastJobTrace(kjcTaskSchedulers);
			kjcSchedulerTraces.setStatus(AppConstants.JOB_STATUS_CRASHED);
		}
		batchManagementService.updateJobStatusToCrashed(kjcTaskSchedulers, kjcSchedulerTraces, newTrace);

	}

	/**
	 * A method that saves the exception in database.
	 * 
	 * @param ex
	 *            - specifies the thrown exception
	 */
	private void saveException(Exception ex) {
		printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_IN + ex.getStackTrace()[0].getClassName()
				+ ":" + ex.getStackTrace()[0].getMethodName(), ex);
		try {
			exceptionLoggerService.saveExceptionOffline(ex, Utilities.getUserFromContext().getUsername(), null,
					AppConstants.CATEGORY_SCHEDULER, null);
		} catch (Exception e) {
			// exception while writing in db
			printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_SAVING_LOG, e);
		}
	}
}