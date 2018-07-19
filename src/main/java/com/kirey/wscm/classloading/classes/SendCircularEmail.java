package com.kirey.wscm.classloading.classes;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationContext;

import com.kirey.wscm.classloading.classes.interfaces.BaseObject;
import com.kirey.wscm.classloading.classes.interfaces.WebRequestJob;
import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.data.dao.JobCategoriesDao;
import com.kirey.wscm.data.dao.JobExecutionLogDao;
import com.kirey.wscm.data.dao.NotificationsDao;
import com.kirey.wscm.data.dao.WscmUserAccountsDao;
import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.JobExecutionLog;
import com.kirey.wscm.data.entity.JobParameters;
import com.kirey.wscm.data.entity.Jobs;
import com.kirey.wscm.data.entity.Notifications;
import com.kirey.wscm.data.entity.WscmUserAccounts;
import com.kirey.wscm.email.MailService;

public class SendCircularEmail implements WebRequestJob, BaseObject {

	@Override
	public void execute(HashMap<String, Object> inputMap) {
		ApplicationContext applicationContext = (ApplicationContext) inputMap.get("applicationContext");
		Jobs job = (Jobs) inputMap.get("job");
		
		JobExecutionLogDao jobExecutionLogDao = (JobExecutionLogDao) applicationContext.getBean("jobExecutionLogDao");
		JobCategoriesDao jobCategoriesDao = (JobCategoriesDao) applicationContext.getBean("jobCategoriesDao");
		WscmUserAccountsDao wscmUserAccountsDao = (WscmUserAccountsDao) applicationContext.getBean("wscmUserAccountsDao");
		NotificationsDao notificationsDao = (NotificationsDao) applicationContext.getBean("notificationsDao");
		MailService mailService = (MailService) applicationContext.getBean("mailService");
		JobExecutionLog jobLog = new JobExecutionLog();
		jobLog.setStartTimestamp(new Date());
		jobLog.setStatus(AppConstants.JOB_STATUS_STARTED);
		jobLog.setJobName(job.getJobName());
		jobLog.setJob(job);
		jobExecutionLogDao.merge(jobLog);
		try {
			
			System.out.println("execute()::***EXECUTING SEND CIRCULAR EMAIL USING CLASS LOADING*******");
			Integer userWeight = null;
			Integer notifWeight = null;
			List<JobParameters> listJobParameters = job.getJobParameterses();
			for (JobParameters jobParameters : listJobParameters) {
				if(jobParameters.getName().equals("userMinWeight")) {
					userWeight = Integer.parseInt(jobParameters.getValue());
				}
				if(jobParameters.getName().equals("notifWeight")) {
					notifWeight = Integer.parseInt(jobParameters.getValue());
				}
			}
			List<Categories> listCategories = jobCategoriesDao.findByJob(job);
			for (Categories category : listCategories) {
				Notifications notification = notificationsDao.findNotificationsByCategoryWeightType(category, AppConstants.NOTIFICATION_TYPE_EMAIL, notifWeight);
				List<WscmUserAccounts> usersByCategory = wscmUserAccountsDao.findUsersByCategoryWeight(category.getCategoryName(), userWeight);//.findUsersByCategory(category.getCategoryName());
				for (WscmUserAccounts wscmUserAccounts : usersByCategory) {
					Map<String, Object> templateModel = new HashMap<>();
					templateModel.put("user", wscmUserAccounts.getFirstName() + " " + wscmUserAccounts.getLastName());
					mailService.sendDefaultEmail(notification.getName(), wscmUserAccounts.getEmail(), "New Offer", templateModel, null);
				}
			}
			
			jobLog.setStatus(AppConstants.JOB_STATUS_FINISHED_SUCCESSFULL);
			jobExecutionLogDao.merge(jobLog);
		} catch (Exception e) {
			jobLog.setStatus( AppConstants.JOB_STATUS_FINISHED_FAILED);
			jobExecutionLogDao.merge(jobLog);
		}
		
	}

}
