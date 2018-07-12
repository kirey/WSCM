package com.kirey.wscm.quartz.jobs;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.quartz.DisallowConcurrentExecution;
import org.quartz.InterruptableJob;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.UnableToInterruptJobException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.data.dao.JobCategoriesDao;
import com.kirey.wscm.data.dao.JobExecutionLogDao;
import com.kirey.wscm.data.dao.JobsDao;
import com.kirey.wscm.data.dao.WscmUserAccountsDao;
import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.JobExecutionLog;
import com.kirey.wscm.data.entity.Jobs;
import com.kirey.wscm.data.entity.Notifications;
import com.kirey.wscm.data.entity.WscmUserAccounts;
import com.kirey.wscm.email.MailService;

/**
 * 
 * @author paunovicm
 *
 */

@Component(value= "sendEmailBank")
@DisallowConcurrentExecution
public class SendEmailBank implements InterruptableJob {

	@Autowired
	private JobsDao jobsDao;
	
	@Autowired
	private JobExecutionLogDao jobExecutionLogDao;
	
	@Autowired
	private JobCategoriesDao jobCategoriesDao;
	
	@Autowired
	private WscmUserAccountsDao wscmUserAccountsDao;
	
	@Autowired
	private MailService mailService;
	
	private boolean loopControl = false;
	
	private JobExecutionLog jobLogLatest = null;
	
	
	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		
		try {
			Jobs job = jobsDao.findById(context.getJobDetail().getJobDataMap().getInt("jobId"));
			
			JobExecutionLog jobLog = new JobExecutionLog();
			jobLog.setStartTimestamp(new Date());
			jobLog.setStatus(AppConstants.JOB_STATUS_STARTED);
			jobLog.setJobName(context.getJobDetail().getKey().getName());
			jobLog.setJob(job);
			jobExecutionLogDao.persist(jobLog);
			
			jobLogLatest = jobExecutionLogDao.getLatestLogByJob(context.getJobDetail().getKey().getName());
			
			
			System.out.println("execute()::***EXECUTING SEND NOTIFICATION JOB:" + context.getJobDetail().getKey().getName() + "WITH LOG ID: " + jobLogLatest.getId());
			
			//*************************************************************
			
			List<Categories> listCategories = jobCategoriesDao.findByJob(job);
			List<Notifications> notifications = job.getListNotificationses();
			for (Notifications notification : notifications) {
				for (Categories category : listCategories) {
					List<WscmUserAccounts> usersByCategory = wscmUserAccountsDao.findUsersByCategory(category.getCategoryName());
					for (WscmUserAccounts wscmUserAccounts : usersByCategory) {
						Map<String, Object> templateModel = new HashMap<>();
						templateModel.put("user", wscmUserAccounts.getFirstName() + " " + wscmUserAccounts.getLastName());
						templateModel.put("imgSrcPl", "https://ringgitplus.com/img/card-400/519489e2193821ed4a00011c/public-bank-visa-platinum.jpg");
						templateModel.put("imgSrcGl", "http://www.stadiumcreative.com/wp-content/uploads/applied-bank-business-credit-card-applied-bank-secured-credit-card-reviews.jpg");
						templateModel.put("imgSrcLo", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBRKq7xb1uSQfU2MZVfIOzINy0RkdK9SHmaye9CQvIY3sCKo-_NA");
						mailService.sendDefaultEmail(notification.getName(), wscmUserAccounts.getEmail(), "Credit card", templateModel, null);
					}
				}
			}
			
			if (loopControl) {
				context.getJobDetail().getJobDataMap().put("status", AppConstants.JOB_STATUS_FINISHED_SUCCESSFULL);
			} else {
				context.getJobDetail().getJobDataMap().put("status", AppConstants.JOB_STATUS_INTERRUPT);
			}
		} catch (Exception e) {
			context.getJobDetail().getJobDataMap().put("status", AppConstants.JOB_STATUS_FINISHED_FAILED);
		} finally {
			JobExecutionException jobExecutionException = new JobExecutionException();
			jobExecutionException.setUnscheduleAllTriggers(true);
		}
		
		
	}

	@Override
	public void interrupt() throws UnableToInterruptJobException {
		loopControl = false;
	}

}
