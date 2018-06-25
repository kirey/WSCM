package com.kirey.wscm.quartz.jobs;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Base64;
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
import org.springframework.web.socket.WebSocketSession;

import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.data.dao.IpAddressDao;
import com.kirey.wscm.data.dao.JobExecutionLogDao;
import com.kirey.wscm.data.dao.JobsDao;
import com.kirey.wscm.data.dao.NotificationsDao;
import com.kirey.wscm.data.dao.WscmUserAccountsDao;
import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.IpAddress;
import com.kirey.wscm.data.entity.JobExecutionLog;
import com.kirey.wscm.data.entity.Jobs;
import com.kirey.wscm.data.entity.Notifications;
import com.kirey.wscm.data.entity.WscmUserAccounts;
import com.kirey.wscm.data.service.TemplateEngine;
import com.kirey.wscm.websocket.WebSocketHandler;

/**
 * 
 * @author paunovicm
 *
 */

@Component
@DisallowConcurrentExecution
public class SendInsuranceWebSocketJob implements InterruptableJob {
	

	@Autowired
	private JobExecutionLogDao jobExecutionLogDao;

	@Autowired
	private JobsDao jobsDao;
	
	@Autowired
	private NotificationsDao notificationsDao;
	
	@Autowired
	private WscmUserAccountsDao wscmUserAccountsDao;
	
	@Autowired
	private TemplateEngine templateEngine;
	
	@Autowired
	private IpAddressDao ipAddressDao;
	
	@Autowired
	private WebSocketHandler webSocketHandler;
	
	private boolean loopControl = false;
	
	private JobExecutionLog jobLogLatest = null;

	private JobExecutionContext jobExecutionContext = null;
	

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		try {
			jobExecutionContext = context;
			
			loopControl = true;
			
			String jobName = context.getJobDetail().getKey().getName();

			Jobs job = jobsDao.findById(context.getJobDetail().getJobDataMap().getInt("jobId"));
			System.out.println("*****************SLEEPING 10 SECONDS***********************");
			Thread.sleep(10000);
			JobExecutionLog jobLog = new JobExecutionLog();
			jobLog.setStartTimestamp(new Date());
			jobLog.setStatus(AppConstants.JOB_STATUS_STARTED);
			jobLog.setJobName(context.getJobDetail().getKey().getName());
			jobLog.setJob(job);
			jobExecutionLogDao.persist(jobLog);

			jobLogLatest = jobExecutionLogDao.getLatestLogByJob(context.getJobDetail().getKey().getName());
			
			
			System.out.println("execute()::***EXECUTING SEND NOTIFICATION JOB:" + context.getJobDetail().getKey().getName() + "WITH LOG ID: " + jobLogLatest.getId());
			
			//*************************************************************
			
			List<Notifications> notifications = job.getListNotificationses();
			for (Notifications notification : notifications) {
				File file = new File("c:\\insurance.jpg");
				InputStream is = new FileInputStream(file);
				byte[] b = IOUtils.toByteArray(is);
				byte[] encoded = Base64.getEncoder().encode(b);
				Map<String, Object> templateModel = new HashMap<>();
				templateModel.put("slika", new String(encoded));
				for(Categories category : job.getListCategorieses()) {
					List<WscmUserAccounts> usersByCategory = wscmUserAccountsDao.findUsersByCategory(category.getCategoryName());
					webSocketHandler.sendNotificationToSpecificUsers(usersByCategory, notification, templateModel);
				}
			}
		
			//*************************************************************
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
