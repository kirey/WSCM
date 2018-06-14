package com.kirey.wscm.email;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.accept.ServletPathExtensionContentNegotiationStrategy;

import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.common.constants.ErrorConstants;
import com.kirey.wscm.data.dao.NotificationsDao;
import com.kirey.wscm.data.dao.NotificationsSentDao;
import com.kirey.wscm.data.dao.WscmUserAccountsDao;
import com.kirey.wscm.data.entity.Notifications;
import com.kirey.wscm.data.entity.NotificationsSent;
import com.kirey.wscm.data.entity.WscmUserAccounts;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;

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
