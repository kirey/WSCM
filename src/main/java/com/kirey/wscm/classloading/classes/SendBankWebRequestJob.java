package com.kirey.wscm.classloading.classes;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.quartz.JobExecutionException;
import org.springframework.context.ApplicationContext;

import com.kirey.wscm.classloading.classes.interfaces.BaseObject;
import com.kirey.wscm.classloading.classes.interfaces.WebRequestJob;
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
import com.kirey.wscm.websocket.WebSocketHandler;

public class SendBankWebRequestJob implements WebRequestJob, BaseObject {

	@Override
	public void execute(HashMap<String, Object> inputMap) {
		ApplicationContext applicationContext = (ApplicationContext) inputMap.get("applicationContext");
		Jobs job = (Jobs) inputMap.get("job");
		
		JobExecutionLogDao jobExecutionLogDao = (JobExecutionLogDao) applicationContext.getBean("jobExecutionLogDao");
		JobCategoriesDao jobCategoriesDao = (JobCategoriesDao) applicationContext.getBean("jobCategoriesDao");
		WscmUserAccountsDao wscmUserAccountsDao = (WscmUserAccountsDao) applicationContext.getBean("wscmUserAccountsDao");
		WebSocketHandler webSocketHandler = (WebSocketHandler) applicationContext.getBean("webSocketHandler");
		JobExecutionLog jobLog = new JobExecutionLog();
		jobLog.setStartTimestamp(new Date());
		jobLog.setStatus(AppConstants.JOB_STATUS_STARTED);
		jobLog.setJobName(job.getJobName());
		jobLog.setJob(job);
		jobExecutionLogDao.merge(jobLog);
		try {
			
			System.out.println("execute()::***EXECUTING SEND NOTIFICATION JOB USING CLASS LOADING*******");
			
			List<Categories> listCategories = jobCategoriesDao.findByJob(job);
			System.out.println("category: ");
			System.out.println(listCategories.get(0).getCategoryName());
			List<Notifications> notifications = job.getListNotificationses();
			System.out.println("notification: ");
			System.out.println(notifications.get(0).getName());
			for (Notifications notification : notifications) {
				Map<String, Object> templateModel = new HashMap<>();
				for(Categories category : listCategories) {
					List<WscmUserAccounts> usersByCategory = wscmUserAccountsDao.findUsersByCategory(category.getCategoryName());
					System.out.println("user: ");
					System.out.println(usersByCategory.get(0).getName());
					webSocketHandler.sendNotificationToSpecificUsers(usersByCategory, notification, templateModel);
				}
			}
			
			jobLog.setStatus(AppConstants.JOB_STATUS_FINISHED_SUCCESSFULL);
			jobExecutionLogDao.merge(jobLog);
		} catch (Exception e) {
			jobLog.setStatus( AppConstants.JOB_STATUS_FINISHED_FAILED);
			jobExecutionLogDao.merge(jobLog);
		} 
//		finally {
//			JobExecutionException jobExecutionException = new JobExecutionException();
//			jobExecutionException.setUnscheduleAllTriggers(true);
//		}
		
		
	}

}
