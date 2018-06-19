package com.kirey.wscm.quartz.jobs;

import java.util.Date;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.JobListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kirey.wscm.data.dao.JobExecutionLogDao;
import com.kirey.wscm.data.dao.JobsDao;
import com.kirey.wscm.data.entity.JobExecutionLog;


@Service
public class SchedJobListener implements JobListener {

	@Autowired
	JobExecutionLogDao jobExecutionLogDao;

	@Autowired
	JobsDao jobsDao;

	public static final String LISTENER_NAME = "globalJobListener";

	@Override
	public String getName() {
		return LISTENER_NAME;
	}

	Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	public void jobToBeExecuted(JobExecutionContext context) {

	}

	@Override
	public void jobExecutionVetoed(JobExecutionContext context) {

	}

	@Override
	public void jobWasExecuted(JobExecutionContext context, JobExecutionException jobException) {
		JobExecutionLog jobLog = jobExecutionLogDao
				.getLatestLogByJob(context.getJobDetail().getKey().getName());
		logger.info("jobWasExecuted::FINISHING Log ID : " + jobLog.getId());

		jobLog.setStatus(context.getJobDetail().getJobDataMap().getString("status"));

		jobLog.setEndTimestamp(new Date());

		jobExecutionLogDao.merge(jobLog);

	}

}
