package com.kirey.wscm.email;

import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.data.dao.NotificationsDao;
import com.kirey.wscm.data.dao.NotificationsSentDao;
import com.kirey.wscm.data.dao.WscmUserAccountsDao;
import com.kirey.wscm.data.entity.Notifications;
import com.kirey.wscm.data.entity.NotificationsSent;
import com.kirey.wscm.data.entity.WscmUserAccounts;

import freemarker.template.Template;

/**
 * @author paunovicm
 *
 */

@Service
public class MailService {
	
	@Autowired
	private NotificationsDao notificationsDao;
	
	@Autowired
	private WscmUserAccountsDao wscmUserAccountsDao;
	
	@Autowired
	private NotificationsSentDao notificationsSentDao;
	
	private JavaMailSender mailSender;
	
	public void setMailSender(JavaMailSender mailSender) {
		this.mailSender = mailSender;
	}
	
	/**
	 * Method for sending email to User. After sending e-mail new {@link NotificationsSent} is created and stored into DB
	 * @param templateName - name of {@link Notifications} in which template is stored
	 * @param emailTo - who is e-mailed
	 * @param subject - subject of the message
	 * @param templateModel - the holder of the variables visible from the template (name-value pairs); 
	 * @param attachmentFiles - {@link HashMap} contains attachment name as key and attachment file as value
	 */
	public void sendDefaultEmail(String templateName, String emailTo, String subject, Map<String, Object> templateModel, Map<String, byte[]> attachmentFiles)  {
	
		Notifications notification = notificationsDao.findNotificationByName(templateName);
		String templateString = notification.getNotificationTemplate(); 
		String emailContent = this.processTemplateContent(templateModel, templateString);
		 MimeMessage message = mailSender.createMimeMessage();

		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");	

			helper.setSubject(subject);
			helper.setFrom(AppConstants.APPLICATION_EMAIL);
			helper.setTo(emailTo);
			helper.setText(emailContent, true);


		// Add a resource as an attachment
		if (attachmentFiles != null && !attachmentFiles.isEmpty()) {
			for (Map.Entry<String, byte[]> entry : attachmentFiles.entrySet()) {
				helper.addAttachment(entry.getKey(), new ByteArrayResource(entry.getValue()));
			}
		}

		mailSender.send(message);
		
		WscmUserAccounts user = wscmUserAccountsDao.findByEmail(emailTo);
		NotificationsSent sentNotification = new NotificationsSent();
		sentNotification.setNotification(notification);
		sentNotification.setUserAccount(user);
		notificationsSentDao.attachDirty(sentNotification);
		
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}
	
	/**
	 * Method for getting email content by processing {@link Template}
	 * @param model - the holder of the variables visible from the template (name-value pairs); 
	 * @param templateName - template source code which need to be processed
	 * @return {@link String} emailContent
	 */
	public String processTemplateContent(Map<String, Object> model, String templateName) {
		
		StringBuilder sb = new StringBuilder();
		try (Writer out = new StringWriter()){
			Template template = new Template("templ", templateName, null);
			template.process(model, out);
			sb.append(out.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sb.toString();
	}

}
