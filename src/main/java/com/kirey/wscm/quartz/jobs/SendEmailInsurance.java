package com.kirey.wscm.quartz.jobs;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;
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

@Component
@DisallowConcurrentExecution
public class SendEmailInsurance implements InterruptableJob {

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
						templateModel.put("imgSrcHi", "https://thumb1.shutterstock.com/display_pic_with_logo/122248/227278699/stock-photo-life-insurance-products-227278699.jpg");
						templateModel.put("imgSrcVi", "http://www.onlineinsurancebd.com/images/services.jpg");
						templateModel.put("imgSrcLo", "https://www.libertyinsurance.com.sg/wp-content/uploads/2014/05/cropped-LM_Singapore-RGB.png");
						
						mailService.sendDefaultEmail(notification.getName(), wscmUserAccounts.getEmail(), "Insurace products", templateModel, null);
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
