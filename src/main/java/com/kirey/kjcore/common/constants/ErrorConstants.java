package com.kirey.kjcore.common.constants;

/**
 * Class containing string constants used for error logging, error messages shown to user etc.
 * Constants are divided by type
 */
public class ErrorConstants {
	
	/**
	 * 
	 ********************************************************* ERROR GENERAL ********************************************************************
	 *
	 */
	
	public static final String EXCEPTION = "Exception";
	public static final String RUNTIME_EXCEPTION = "Runtime Exception";
	public static final String ERROR_NO_MSG_DETAILS = "No message details";
	public static final String ERROR_KEY_GENERAL = "njamb.error.general.err.bljab";
	public static final String ERROR_SAVING_LOG = "Error when saving log to database";
	public static final String ERROR_INVOKING_URL = "Exception when invoking url: ";
	public static final String ERROR_IN = "Exception in: ";
	public static final String ERROR_NOT_FOUND = "Not found";
	public static final String ERROR_VALIDATION_BEGINING_STANDARD_MESSAGE = "njamb.validation.business.";
	public static final String ERROR_VALIDATION_ENDING_STANDARD_MESSAGE = ".bljab";
	public static final String ERROR_VALIDATION = "Validation Error";
	public static final String VALIDATION_ERR_DEFAULT_FIELD_NAME = "messageField";


	/**
	 * 
	 * ****************************************************************************VALIDATION ERROR MESSAGES**************************************************************************************
	 * 
	 */
	
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
	
	/**
	 * PRODUCTS
	 */
	public static final String BUSINESS_VALIDATION_PRODUCT_NOT_FOUND = "njamb.validation.business.productNotFound";  
	public static final String BUSINESS_VALIDATION_PRODUCT_AMOUNT_TOO_BIG = "njamb.validation.business.minAmountTooBig.bljab";
	public static final String BUSINESS_VALIDATION_PRODUCT_PRICE = "njamb.validation.business.priceLessThan100.bljab";
	public static final String FORMAL_VALIDATION_PRODUCT_DESCRIPTION = "njamb.validation.formal.descriptionMustNotExceed15characters.bljab";
	public static final String FORMAL_VALIDATION_PRODUCT_NAME = "njamb.validation.formal.sizeMustBeBetween3and50.bljab";
	
	/**
	 * BATCH
	 */
	
	public static final String BUSINESS_VALIDATION_PARAMETER_ALREADY_EXISTS = "njamb.validation.business.parameterAlreadyExist.bljab";	
	
	/**
	 * FILE UPLOAD
	 */
	
	
	
	/**
	 * CLASS LOADING
	 */
	
	public static final String BUSINESS_VALIDATION_CLASS_SUCCESSFULLY_UPLOADED = "njamb.validation.business.classfileHasBeenSuccessfullyUploaded.bljab";
	public static final String BUSINESS_VALIDATION_CLASS_SUCCESSFULLY_EDITED = "njamb.validation.business.classSuccessfullyEdited.bljab";
	public static final String BUSINESS_VALIDATION_SUCESSFULLY_EDITED_ENABLED_ALL_CLASSES = "njamb.validation.business.enabledStatusForAllClassesSuccessfullyChanged.bljab";
	public static final String BUSINESS_VALIDATION_CLASS_CLASSES_LOADED = "njamb.validation.business.classesLoadedIntoJVM.bljab";
	public static final String BUSINESS_VALIDATION_CLASS_SUCCESSFULLY_DELETED = "njamb.validation.business.classFileAndAllChildrenDeletedSuccessfully.bljab"; 
	public static final String BUSINESS_VALIDATION_CLASS_SUCESSFULLY_EDITED_ENABLED = "njamb.validation.business.enabledStatusSuccessfullyChangedForClass.bljab";
	
	/**
	 * ROUTES
	 */
	
	public static final String BUSINESS_VALIDATION_ROUTE_SUCCESSFULLY_ADDED = "njamb.validation.business.newRouteSuccessfullyAdded.bljab"; 
	public static final String BUSINESS_VALIDATION_ROUTE_SUCCESSFULLY_DELETED = "njamb.validation.business.routeSuccessfullyDeleted.bljab";
	public static final String BUSINESS_VALIDATION_ROUTE_SUCCESSFULLY_EDITED = "njamb.validation.business.routeSuccessfullyEdited.bljab";	
	
	/**
	 * TRANSLATION 
	 */
	
	public static final String BUSINESS_VALIDATION_TRANSLATION_INSERT_SUCCESS = "njamb.validation.business.newRecordsSuccessfullyAddedInDatabase.bljab";
	public static final String BUSINESS_VALIDATION_TRANSLATION_SUCCESSFULLY_ADDED = "njamb.validation.business.newTranslationsSuccessfullyAdded.bljab";
	public static final String BUSINESS_VALIDATION_TRANSLATION_SUCCESSFULLY_EDITED	= "njamb.validation.business.translationSuccessfullyEdited.bljab";
	public static final String BUSINESS_VALIDATION_SUCCESSFULLY_DELETED_SECTION = "njamb.validation.business.sectionDeletedSuccessfully.bljab";
	public static final String BUSINESS_VALIDATION_SUCCESSFULLY_DELETED_MODULE = "njamb.validation.business.moduleDeletedSuccessfully.bljab";
	public static final String BUSINESS_VALIDATION_TRANSLATION_SUCCESSFULLY_DELETED= "njamb.validation.business.translationDeletedSuccessfully.bljab";
	public static final String BUSINESS_VALIDATION_SUCCESSFULLY_EDITED_MODULE = "njamb.validation.business.moduleSuccessfullyEdited.bljab";
	public static final String BUSINESS_VALIDATION_SUCCESSFULLY_EDITED_SECTION = "njamb.validation.business.sectionSuccessfullyEdited.bljab";
		
	/**
	 * USER ROLE ADMIN PANEL
	 */
	
	public static final String BUSINESS_VALIDATION_SUCCESSFULLY_ADDED_USER = "njamb.validation.business.userSuccessfullyAdded.bljab";
	public static final String BUSINESS_VALIDATION_USER_STATUS_CHANGED	= "njamb.validation.business.userStatusSuccessfullyChanged.bljab";
	public static final String BUSINESS_VALIDATION_SUCCESSFULLY_EDITED_USER	= "njamb.validation.business.userSuccessfullyEdited.bljab";
	public static final String BUSINESS_VALIDATION_SUCCESSFULLY_ADDED_ROLE	= "njamb.validation.business.roleSuccessfullyAdded.bljab"; 
	public static final String BUSINESS_VALIDATION_SUCCESSFULLY_DELETED_ROLE	= "njamb.validation.business.roleSuccessfullyDeleted.bljab"; 
	public static final String BUSINESS_VALIDATION_SUCCESSFULLY_DELETED_ROLE_WITH_USERS	= "njamb.validation.business.roleWithUsersSuccessfullyDeleted.bljab";
	public static final String BUSINESS_VALIDATION_SUCCESSFULLY_EDITED_ROLE = "njamb.validation.business.roleSuccessfullyEdited.bljab"; 
	
	/**
	 * SCHEDULER MANAGEMENT PAGE
	 */	
	
	public static final String BUSINESS_VALIDATION_STOPPED_SUCCESSFULLY_SCHEDULER = "njamb.validation.business.schedulerStoppedSuccessfully.bljab";
	public static final String BUSINESS_VALIDATION_SUCCESSFULLY_DELETED_PARAMS = "njamb.validation.business.parameterDeletedSuccessfully.bljab";
	public static final String BUSINESS_VALIDATION_SUCCESSFULLY_SAVED_SCHEDULER = "njamb.validation.business.schedulerSavedSuccessfully.bljab";
	public static final String BUSINESS_VALIDATION_CANT_SAVE_SCHEDULER_WHILE_RUNNING = "njamb.validation.business.schedulerCouldNotBeChangedWhileRunning.bljab";
	
	/**
	 * JOBS PAGE
	 */
	
	public static final String BUSINESS_VALIDATION_JOB_SUCCESSFULLY_STOPPED = "njamb.validation.business.jobStoppedSuccessfully.bljab"; 
	public static final String BUSINESS_VALIDATION_JOB_SUCCESSFULLY_STARTED = "njamb.validation.business.jobExecutedSuccessfully.bljab";
	
	/**
	 * 
	 * ****************************************************************************ERRORS**************************************************************************************
	 * 
	 */
	
	
	public static final String ERROR_TRANSLATION_ERR_DURING_TRANSLATION = "njamb.error.translation.errorDuringTranslation.bljab";
	public static final String ERROR_TRANSLATION_JSON_PROCESSING = "njamb.error.translation.jsonProcessingErrorDuringTranslation.bljab";
	public static final String ERROR_VALIDATION_KEY = "njamb.validation.error.errorOccurred.bljab";
	public static final String ERROR_NUMBER_OF_CAPTCHA = "njamb.validation.error.numberOfCaptcha.bljab";
	public static final String EXCEPTION_NO_REPORT_GENERATED = "Generated report is null";
	public static final String JOB_EXIT_STATUS_COMPLETED_WITH_ERRORS_MESSAGE ="One or more tasks managed by this job failed";
	
	protected ErrorConstants() {
		super();
	}
	
	
	
}
