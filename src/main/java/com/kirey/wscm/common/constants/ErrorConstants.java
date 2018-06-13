package com.kirey.wscm.common.constants;


public class ErrorConstants {
	
	/**
	 * EMAIL ERROR 
	 */
	
	public static final String EMAIL_NO_MAIL_SENDER_PROPERTIES = "MailingService.Missing email sender properties";
	public static final String EMAIL_BAD_MESSAGE_FROM_ENCODE = "MailingService.MessageFrom can't be encoded in the given charset";
	public static final String EMAIL_TEMPLATE_NOT_FOUND_EXCEPTION = "MailingService.Template not found";
	public static final String EMAIL_PARSE_EXCEPTION = "MailingService.Syntactical/lexical errors in template";
	public static final String EMAIL_MALFORMED_TEMPLATE_NAME_EXCEPTION = "MailingService.The template name given was malformed according the TemplateNameFormat in use";
	public static final String EMAIL_IO_EXCEPTION = "MailingService.IOException exeption";
	public static final String EMAIL_TEMPLATE_EXCEPTION = "MailingService.Missing or bad data in template";

}
