package com.kirey.kjcore.features.email;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.PostConstruct;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import com.kirey.kjcore.common.constants.ErrorConstants;
import com.kirey.kjcore.data.compositedao.EmailingService;
import com.kirey.kjcore.data.dao.KjcEmailConfigsDao;
import com.kirey.kjcore.data.entity.KjcEmailConfigs;
import com.kirey.kjcore.data.entity.KjcEmailTemplates;
import com.kirey.kjcore.data.entity.KjcInlineResourceTemplates;

import freemarker.core.ParseException;
import freemarker.template.Configuration;
import freemarker.template.MalformedTemplateNameException;
import freemarker.template.TemplateException;
import freemarker.template.TemplateNotFoundException;

/**Service used for email templates and sending
 * @author nicutac
 *
 */
@Service
public class MailService {

	public static final String SPRING_QUALIFIER = "mailService";

	private Map<String, JavaMailSenderImpl> mailSenderMap;

	@Autowired
	private KjcEmailConfigsDao kjcEmailConfigsDao;
	@Autowired
	private Configuration freemarkerConfiguration;
	@Autowired
	private ApplicationContext applicationContext;
	@Autowired
	EmailingService emailingService;

	/**
	 * Load all sender configuration retrieved from DB and populate them into a
	 * {@link Map} collection for later use when we call the sendEmail method.
	 * The {@link Map} contains {@link String} as key to describe the name of
	 * sender configuration {@link JavaMailSenderImpl} as value to describe the
	 * specific sender object
	 */
	@PostConstruct
	private void loadAllSenderConfigs() {
		List<KjcEmailConfigs> emailConfigsList = kjcEmailConfigsDao.findAll();
		mailSenderMap = new HashMap<>();
		for (KjcEmailConfigs emailConfigs : emailConfigsList) {

			JavaMailSenderImpl mailSender = (JavaMailSenderImpl) applicationContext.getBean("mailSender");
			mailSender.setUsername(emailConfigs.getUsername());
			mailSender.setPassword(emailConfigs.getPassword());
			mailSender.setHost(emailConfigs.getHost());
			mailSender.setPort(emailConfigs.getPort());

			mailSenderMap.put(emailConfigs.getName(), mailSender);
		}
	}

	/**
	 * Load all sender configuration when an update in DB it is made and
	 * populate them into a {@link Map} for later use when we call the sendEmail
	 * method.
	 * 
	 * The {@link Map} contains {@link String} as key to describe the name of
	 * sender configuration {@link JavaMailSenderImpl} as value to describe the
	 * specific sender object
	 */
	public void refreshConfiguration() {
		loadAllSenderConfigs();
	}

	/**
	 * Send a basic email that contains :
	 * <p>
	 * - the configuration name that identifies the specific mail sender
	 * properties
	 * <p>
	 * - the default subject specific for the selected template
	 * <p>
	 * - the default email sender address specific for the selected template
	 * <p>
	 * - the basic inline resources specific for the selected template
	 * <p>
	 * - the desired attachment files
	 * 
	 * @param configName
	 *            - the configuration name that identifies the specific mail
	 *            sender properties
	 * @param templateName
	 *            - the template name that identifies the desired template
	 * @param emailTo
	 *            - receiver email address
	 * @param templateModel
	 *            - {@link Map} collection that contains {@link String} as key
	 *            to describe the name of object used in template and
	 *            {@link Object} as value to describe the object used in
	 *            template
	 * @param attachmentFiles
	 *            - {@link Map} collection that contains {@link String} as key
	 *            to describe the name of file plus extension e.g.:
	 *            "filename.jpg" and {@link byte[]} as value to describe the
	 *            binary file
	 * @throws RuntimeException
	 */
	public void sendDefaultEmail(String configName, String templateName, String emailTo,
			Map<String, Object> templateModel, Map<String, byte[]> attachmentFiles)  {
	
		JavaMailSenderImpl mailSender = getMailSender(configName);
		String emailContent = processTemplateContent(templateModel, templateName);
		
		MimeMessage mimeMessage = mailSender.createMimeMessage();
		MimeMessageHelper helper;
		try {
			helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");


		helper.setSubject(getDefaultSubject(templateName));
		helper.setFrom(getDefaultFromAddress(configName));
		helper.setTo(emailTo);
		// use the true flag to indicate you need a multipart message
		helper.setText(emailContent, true);

		// add basic inline resources
		setBasicInlineResources(helper, templateName);

		// Add a resource as an attachment
		if (attachmentFiles != null && !attachmentFiles.isEmpty()) {
			for (Map.Entry<String, byte[]> entry : attachmentFiles.entrySet()) {
				helper.addAttachment(entry.getKey(), new ByteArrayResource(entry.getValue()));
			}
		}

		mailSender.send(mimeMessage);
		
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * Retrieve the {@link JavaMailSenderImpl} that helps to create email
	 * content
	 * 
	 * @param configName
	 *            - the configuration name that identifies the specific mail
	 *            sender properties
	 * 
	 * @return the {@link JavaMailSenderImpl} object
	 * @throws RuntimeException
	 */
	public JavaMailSenderImpl getMailSender(String configName) {
		JavaMailSenderImpl mailSender = mailSenderMap.get(configName);
		if (mailSender != null) {
			return mailSenderMap.get(configName);
		} else {
			throw new RuntimeException(ErrorConstants.EMAIL_NO_MAIL_SENDER_PROPERTIES);
		}
	}

	/**
	 * <p>
	 * Retrieve the template from DB, fill the template with the specific data
	 * and generate it
	 * 
	 * @param model
	 *            - {@link Map} collection that contains {@link String} as key
	 *            to describe the name of template and {@link Object} as value
	 *            to describe the object used in template
	 * @param templateName
	 *            - the template name that identifies the desired template
	 * 
	 * @return the template generated
	 * @throws RuntimeException
	 */
	public String processTemplateContent(Map<String, Object> model, String templateName) {

		StringBuilder content = new StringBuilder();

		try {
			return content
					.append(FreeMarkerTemplateUtils
							.processTemplateIntoString(freemarkerConfiguration.getTemplate(templateName), model))
					.toString();
		} catch (TemplateNotFoundException e) {
			throw new RuntimeException(ErrorConstants.EMAIL_TEMPLATE_NOT_FOUND_EXCEPTION, e);
		} catch (MalformedTemplateNameException e) {
			throw new RuntimeException(ErrorConstants.EMAIL_MALFORMED_TEMPLATE_NAME_EXCEPTION, e);
		} catch (ParseException e) {
			throw new RuntimeException(ErrorConstants.EMAIL_PARSE_EXCEPTION, e);
		} catch (IOException e) {
			throw new RuntimeException(ErrorConstants.EMAIL_IO_EXCEPTION, e);
		} catch (TemplateException e) {
			throw new RuntimeException(ErrorConstants.EMAIL_TEMPLATE_EXCEPTION, e);
		}

	}

	/**
	 * <p>
	 * Retrieve the default email sender address 
	 * 
	 * 
	 * @param configsName
	 *            - the configuration name that identifies the specific mail
	 *            sender properties
	 * 
	 * @return {@link InternetAddress} object composed of email address and the
	 *         alias of the email address
	 * @throws RuntimeException
	 */
	public InternetAddress getDefaultFromAddress(String configsName) {
		KjcEmailConfigs emailConfigs = emailingService.getCacheableEmailConfigs(configsName);
		try {
			return new InternetAddress(emailConfigs.getEmailAddress(), emailConfigs.getMessageFrom());
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(ErrorConstants.EMAIL_BAD_MESSAGE_FROM_ENCODE, e);
		}

	}

	/**
	 * <p>
	 * Retrieve the default email subject specific for the selected template
	 * 
	 * @param templateName
	 *            - the template name that identifies the desired template
	 * @return the default email subject, if there is no default subject return
	 *         an empty string
	 */
	public String getDefaultSubject(String templateName) {
		String subject = emailingService.getCacheableTemplate(templateName).getEmailSubject();
		if (subject == null) {
			return "";
		} else {
			return subject;
		}

	}

	/**
	 * <p>
	 * Add to helper object the basic inline resources retrieved from DB
	 * specific for the selected template
	 * 
	 * @param helper
	 *            - object that contains the custom content of email
	 * @param templateName
	 *            - the template name that identifies the desired template
	 * @throws RuntimeException
	 */
	public void setBasicInlineResources(MimeMessageHelper helper, String templateName) {
		KjcEmailTemplates emailTemplate = emailingService.getCacheableTemplate(templateName);
		Set<KjcInlineResourceTemplates> inlineResources = emailTemplate.getKjcInlineResourceTemplateses();

		for (KjcInlineResourceTemplates resource : inlineResources) {
			try {
				helper.addInline(resource.getCdResource(), new ByteArrayResource(resource.getResourceFile()) {
					@Override
					public String getFilename() {
						return resource.getResourceName();
					}
				});
			} catch (MessagingException e) {
				throw new RuntimeException(e.getMessage(), e);
			}
		}
	}

}
