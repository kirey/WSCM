package com.kirey.wscm.data.service;

import static org.quartz.CronScheduleBuilder.cronSchedule;
import static org.quartz.JobBuilder.newJob;
import static org.quartz.TriggerBuilder.newTrigger;

import java.util.List;

import org.quartz.CronTrigger;
import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.Trigger.TriggerState;
import org.quartz.TriggerKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.data.dao.JobsDao;
import com.kirey.wscm.data.entity.Jobs;
import com.kirey.wscm.quartz.jobs.SchedJobListener;

/**
 * 
 * @author paunovicm
 *
 */
@Service
public class JobService {

	@Autowired
	private Scheduler scheduler1;

	@Autowired
	private SchedJobListener schedJobListener;

	@Autowired
	private JobsDao jobsDao;

	@Autowired
	private ApplicationContext applicationContext;

	/**
	 * Method creates {@link CronTrigger}
	 * @param cronExpresion
	 * @param jobName
	 * @param groupName
	 * @return {@link CronTrigger}
	 */
	public CronTrigger createTrigger(String cronExpresion, String jobName, String groupName) {

		CronTrigger trigger = newTrigger().withIdentity(TriggerKey.triggerKey(jobName, groupName))
				.withSchedule(cronSchedule(cronExpresion)).build();
		return trigger;
	}

	/**
	 * Method creates {@link JobDetail} based on job name and group name 
	 * @param jobName
	 * @param groupName 
	 * @return {@link JobDetail}
	 * @throws ClassNotFoundException
	 */
	@SuppressWarnings("unchecked")
	public JobDetail createJob(String jobName, String groupName) throws ClassNotFoundException {

		Job jobClass = (Job) applicationContext.getBean(jobName);

		JobDetail jobDetail = newJob().ofType(jobClass.getClass()).storeDurably()
				.withIdentity(JobKey.jobKey(jobName, AppConstants.GROUP_NAME))
				.withDescription("Invoke Sample Job service...").build();

		return jobDetail;
	}

	/**
	 * Method starts the job and updates {@link Jobs} status to "ACTIVE"
	 * @param id - of {@link Jobs}
	 * @throws SchedulerException
	 * @throws ClassNotFoundException
	 */
	public void startJob(Integer id) throws SchedulerException, ClassNotFoundException {

		Jobs schedulerEnt = jobsDao.findById(id);

		CronTrigger cronTrigger = createTrigger(schedulerEnt.getCronExpression(), schedulerEnt.getJobName(), AppConstants.GROUP_NAME);
		JobDetail jobDetail = createJob(schedulerEnt.getJobName(), AppConstants.GROUP_NAME);

		jobDetail.getJobDataMap().put("jobId", id);
		
		scheduler1.getListenerManager().addJobListener(schedJobListener);
		if (!scheduler1.checkExists(jobDetail.getKey()))
			scheduler1.scheduleJob(jobDetail, cronTrigger);

		scheduler1.start();

		schedulerEnt.setStatus(AppConstants.SCHEDULER_STATUS_ACTIVE);
		jobsDao.merge(schedulerEnt);

	}

	/**
	 * Method stops the job, deletes the identified Job from the Scheduler - and any associated Triggers and updates {@link Jobs} status to "INACTIVE"
	 * @param id - of {@link Jobs}
	 * @throws SchedulerException
	 */
	public void stopJob(Integer id) throws SchedulerException {

		Jobs schedulerEnt = jobsDao.findById(id);

		scheduler1.interrupt(JobKey.jobKey(schedulerEnt.getJobName(), AppConstants.GROUP_NAME));
		scheduler1.deleteJob(JobKey.jobKey(schedulerEnt.getJobName(), AppConstants.GROUP_NAME));

		schedulerEnt.setStatus(AppConstants.SCHEDULER_STATUS_INACTIVE);
		jobsDao.attachDirty(schedulerEnt);

	}


	public void deleteJob(String jobName) {
	}


	public void pauseJob(Integer id) {
	}


	public void resumeJob(String jobName) {
	}


	/**
	 * Method for getting job state
	 * @param jobName
	 * @param groupName
	 * @return {@link String} state
	 * @throws SchedulerException
	 */
	public String getJobState(String jobName, String groupName) throws SchedulerException {

		JobKey jobKey = new JobKey(jobName, groupName);

		JobDetail jobDetail = scheduler1.getJobDetail(jobKey);

		List<? extends Trigger> triggers = scheduler1.getTriggersOfJob(jobDetail.getKey());
		if (triggers != null && triggers.size() > 0) {
			for (Trigger trigger : triggers) {
				TriggerState triggerState = scheduler1.getTriggerState(trigger.getKey());

				if (TriggerState.PAUSED.equals(triggerState)) {
					return "PAUSED";
				} else if (TriggerState.BLOCKED.equals(triggerState)) {
					return "BLOCKED";
				} else if (TriggerState.COMPLETE.equals(triggerState)) {
					return "COMPLETE";
				} else if (TriggerState.ERROR.equals(triggerState)) {
					return "ERROR";
				} else if (TriggerState.NONE.equals(triggerState)) {
					return "NONE";
				} else if (TriggerState.NORMAL.equals(triggerState)) {
					return "SCHEDULED";
				}
			}
		}

		// add this to response when err catch in controller "SchedulerException while
		// checking job with name and group exist:"+e.getMessage()
		return null;
	}

	/**
	 * Determine whether a Job with the given identifier (jobName, groupName) already exists within the scheduler.
	 * @param jobName
	 * @param groupName
	 * @return true if a Job exists with the given identifier
	 * @throws SchedulerException
	 */
	public boolean isJobWithNamePresent(String jobName, String groupName) throws SchedulerException {

		JobKey jobKey = new JobKey(jobName, groupName);

		if (scheduler1.checkExists(jobKey)) {
			return true;
		}

		// add this to response when err catch in controller "SchedulerException while
		// checking job with name and group exist:"+e.getMessage()
		return false;
	}


	/**
	 * Remove (delete) the {@link Trigger} with the given key, and store the new given one - which must be associated with the same job (the new trigger must have the job name & group specified) - however, the new trigger need not have the same name as the old trigger.
	 * @param cronExpresion
	 * @param jobName
	 * @param groupName
	 * @throws SchedulerException
	 */
	public void updateCronExpForJob(String cronExpresion, String jobName, String groupName) throws SchedulerException {

		CronTrigger newTrigger = createTrigger(cronExpresion, jobName, groupName);
		scheduler1.rescheduleJob(TriggerKey.triggerKey(jobName), newTrigger);

		// add this to response when err catch in controller "SchedulerException while
		// updating job key :"+jobKey+ " is running. error message :"+e.getMessage()
	}

	/**
	 * Method checks does some job currently running
	 * @param jobName
	 * @param groupName
	 * @return
	 * @throws SchedulerException
	 */
	public boolean isJobCurrentllyRunning(String jobName, String groupName) throws SchedulerException {

		List<JobExecutionContext> currentJobs = scheduler1.getCurrentlyExecutingJobs();
		if (currentJobs != null) {
			for (JobExecutionContext jobCtx : currentJobs) {
				String jobN = jobCtx.getJobDetail().getKey().getName();
				String groupN = jobCtx.getJobDetail().getKey().getGroup();
				if (jobN.equalsIgnoreCase(jobName) && groupN.equals(groupName)) {
					return true;
				}
			}
		}

		// add this to response when err catch in controller "SchedulerException while
		// checking job with key :"+jobKey+ " is running. error message
		// :"+e.getMessage()
		return false;
	}

}