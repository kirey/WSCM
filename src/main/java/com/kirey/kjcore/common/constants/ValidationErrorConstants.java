package com.kirey.kjcore.common.constants;

public class ValidationErrorConstants {

	/**
	 * 
	 * ************************************************************VALIDATION ERROR MESSAGES*******************************************************
	 * 
	 */
	
	public static final String VALIDATION_FORMAL_FIELD_REQUIRED = "njamb.validation.formal.fieldIsRequired.bljab";
	
	/**
	 * PRODUCTS
	 */

	//bussines validation
	
	public static final String VALIDATION_BUSINESS_PRODUCT_NOT_FOUND = "njamb.validation.business.productNotFound.bljab";  
	public static final String VALIDATION_BUSINESS_PRODUCT_AMOUNT_TOO_BIG = "njamb.validation.business.productsMinAmountTooBig.bljab";
	public static final String VALIDATION_BUSINESS_PRODUCT_PRICE = "njamb.validation.business.productsPriceLessThan100.bljab";
	public static final String VALIDATION_BUSINESS_PRODUCT_PRICE_IS_EMPTY = "njamb.validation.business.products.priceIsEmpty.bljab";

	
	//formal validation
	public static final String VALIDATION_FORMAL_PRODUCT_DESCRIPTION = "njamb.validation.formal.productDescriptionMustNotExceed15characters.bljab";
	public static final String VALIDATION_FORMAL_PRODUCT_NAME = "njamb.validation.formal.productNameSizeMustBeBetween3and50.bljab";
	
	/**
	 * BATCH MANAGEMENT
	 */
	//bussines validation
	
	public static final String VALIDATION_BUSINESS_SCHEDULER_ALREADY_EXIST = "njamb.validation.business.schedulerAlreadyExistError.bljab";
	public static final String VALIDATION_BUSINESS_JOB_NAME_DOESNT_EXIST = "njamb.validation.business.jobNameDoesntExistError.bljab";
	public static final String VALIDATION_BUSINESS_JOB_ALREADY_USED = "njamb.validation.business.jobAlreadyUsedError.bljab";
	public static final String VALIDATION_BUSINESS_TRIGGER_NAME_DOESNT_EXIST = "njamb.validation.business.triggerNameDoesntExistError.bljab";
	public static final String VALIDATION_BUSINESS_TRIGGER_ALREADY_USED = "njamb.validation.business.triggerAlreadyUsedError.bljab";
	public static final String VALIDATION_BUSINESS_PARAMETER_ALREADY_EXIST = "njamb.validation.business.schedulerParameterAlreadyExist.bljab";
	public static final String VALIDATION_BUSINESS_FAKE_USER_DOESNT_EXIST = "njamb.validation.business.fakeUserDoesntExistError.bljab";

	//formal validation
	public static final String VALIDATION_FORMAL_SCHEDULER_NAME = "njamb.validation.formal.schedulerNameMustNotExceed50characters.bljab";
	public static final String VALIDATION_FORMAL_TRIGGER_NAME = "njamb.validation.formal.triggerNameMustNotExceed50characters.bljab";
	public static final String VALIDATION_FORMAL_JOB_NAME = "njamb.validation.formal.jobNameMustNotExceed100characters.bljab";
	public static final String VALIDATION_FORMAL_JOB_DESCRIPTION = "njamb.validation.formal.jobDescriptionMustNotExceed1000characters.bljab";

	
	/**
	 * FILE UPLOAD
	 */
	
	public static final String VALIDATION_BUSINESS_CVS_MUST_CONTAINS_ONE_ROW = "njamb.validation.business.csvFileMustContainsAtLeastOneRowOfData.bljab";
	public static final String VALIDATION_BUSINESS_CVS_FIRST_COLUMM_NAME_IS_NOT_GENERIC_NAME = "njamb.validation.business.csvFileFirstColumnHeaderIsNotGenericName.bljab";
	public static final String VALIDATION_BUSINESS_CVS_SECOND_COLUMN_NAME_IS_NOT_DEFAULT_TRANSLATON = "njamb.validation.business.csvFileSecondColumnNameIsNotDefaultTranslation.bljab";
	public static final String VALIDATION_BUSINESS_CVS_LANGUAGE_HEADER_NOT_IN_RIGHT_FORMAT = "njamb.validation.business.csvFileLanguageHeaderNotInRightFormat.bljab";
	public static final String VALIDATION_BUSINESS_CVS_GENERICNAME_DEFAULT_TRANSLATION_MANDATORY = "njamb.validation.business.csvFileColumnsGenericnameAndTranslationCannotBeEmpty.bljab";
	public static final String VALIDATION_BUSINESS_CVS_GENERICNAME_MUST_START_AND_END_WITH_TRANSLATION_TAG = "njamb.validation.business.csvFilegenericNameMustStartWithTranslationTag.bljab";
	public static final String VALIDATION_BUSINESS_CVS_WRONG_DELIMITER = "njamb.validation.business.csvFilewrongDelimiter.bljab";

	/**
	 * CLASS LOADING
	 */
	
	public static final String VALIDATION_BUSINESS_CLASS_ALREADY_DELETED = "njamb.validation.business.classAlreadyDeletedFromDatabase.bljab";
	public static final String VALIDATION_BUSINESS_CLASS_NOT_EXISTS_IN_DB = "njamb.validation.business.classDoesNotExistInDatabase.bljab";
	public static final String VALIDATION_BUSINESS_CLASS_ALREADY_EXISTS_IN_DB = "njamb.validation.business.classAlreadyExistsInDatabase.bljab";
	public static final String VALIDATION_BUSINESS_ATTEMPT_TO_UPLOAD_CLASS_WITHOUT_INTERFACE = "njamb.validation.business.classWithoutParentsMustHaveAnInterface.bljab";
	public static final String VALIDATION_BUSINESS_ATTEMPT_TO_UPLOAD_CLASS_WITH_INTERFACE = "njamb.validation.business.classWithParentsCanNotHaveAnInterface.bljab";
	public static final String VALIDATION_BUSINESS_ATTEMPT_TO_UPLOAD_CLASS_WITHOUT_PARENT = "njamb.validation.business.attemptToUploadTheClassWhoseParentIsNotInTheDatabase.bljab";
	public static final String VALIDATION_BUSINESS_CLASSNAME_MISMATCH = "njamb.validation.business.classnameMissmatch.bljab";
	public static final String VALIDATION_BUSINESS_SOURCECODE_MISSMATCH = "njamb.validation.business.classFileNameNotMatchClassSourceCodeName.bljab";
	public static final String VALIDATION_BUSINESS_CLASS_REPORT_EXIST = "njamb.validation.business.deleteClassWithReport.bljab";
    public static final String VALIDATION_BUSINESS_CLASS_HAVE_CHILDREN = "njamb.validation.business.validationClassHaveChildren.bljab";
    public static final String VALIDATION_BUSINESS_CATEGORIES_EXIST = "njamb.validation.business.categoryExist.bljab";
	public static final String VALIDATION_BUSINESS_CATEGORIES_CONTAINS_CLASSES = "njamb.validation.business.categoryContainsClasses.bljab";
	public static final String VALIDATION_BUSINESS_CATEGORIES_ALREADY_DELETED = "njamb.validation.business.classCategoryAlreadyDeleted.bljab";
	public static final String VALIDATION_BUSINESS_CLASS_EMPTY = "njamb.validation.business.classIsEmpty.bljab";
	public static final String VALIDATION_BUSINESS_CLASS_NOTFOUND = "njamb.validation.business.classNotFound.bljab";

//	Formal validation
	public static final String VALIDATION_FORMAL_CLASS_DESCRIPTION_TOO_LONG = "njamb.validation.formal.classDescriptionTooLong.bljab";
	
	/**
	 * ROUTES
	 */

	public static final String VALIDATION_BUSINESS_ROUTE_NAME_EXISTS = "njamb.validation.business.routeWithThisNameAlreadyExistsInDatabase.bljab";
	public static final String VALIDATION_BUSINESS_URL_EXISTS = "njamb.validation.business.routeWithThisUrlAlreadyExistInDatabase.bljab";
	public static final String VALIDATION_BUSINESS_ROUTE_DOESNOT_EXIST = "njamb.validation.business.routeDoesNotExist.bljab";
	
	/**
	 * TRANSLATION 
	 */
	
	public static final String VALIDATION_BUSINESS_TRANSLATION_EXISTS = "njamb.validation.business.translationAlreadyExistsInDatabase.bljab";
	public static final String VALIDATION_BUSINESS_TRANSLATION_NOT_EXISTS = "njamb.validation.business.translationNotExistsInDatabase.bljab";
	public static final String VALIDATION_BUSINESS_SOME_UNSAVED_TRANSLATIONS = "njamb.validation.business.someUnsavedTranslations.bljab";
	public static final String VALIDATION_BUSINESS_MODULE_NOT_EXISTS = "njamb.validation.business.moduleNotExistsInDatabase.bljab";
	public static final String VALIDATION_BUSINESS_SECTION_NOT_EXISTS = "njamb.validation.business.sectionNotExistsInDatabase.bljab";

	/**
	 * USER ROLE ADMIN PANEL
	 */
	public static final String VALIDATION_BUSINESS_ROLE_NAME_EXISTS = "njamb.validation.business.roleWithThisNameAlreadyExistInDatabase.bljab"; 
	public static final String VALIDATION_BUSINESS_ROLE_EXISTS = "njamb.validation.business.roleAlreadyExist.bljab";
	public static final String VALIDATION_BUSINESS_USER_NAME_EXISTS = "njamb.validation.business.userWithThisNameAlreadyExistInDatabase.bljab";
	public static final String VALIDATION_BUSINESS_USER_EMAIL_FORMAT_BAD = "njamb.validation.business.emailBadFormat.bljab";
	public static final String VALIDATION_BUSINESS_EMAIL_EXISTS = "njamb.validation.business.emailAreadyExist.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_DOESNOT_EXISTS = "njamb.validation.business.roleDoesNotExist.bljab";
	public static final String VALIDATION_BUSINESS_BAD_USER_EXPIRY_DATE = "njamb.validation.business.badUserExpiryDate.bljab";
	public static final String VALIDATION_BUSINESS_BAD_DEFAULT_COMPANY = "njamb.validation.business.badDefaultCompany.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_SUPER_ADMIN_UNIQUE = "njamb.validation.business.roleSuperAdminUnique.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_ADMIN_UNIQUE = "njamb.validation.business.roleAdminUnique.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_ADMIN_MULTIPLE_COMPANY_ERROR = "njamb.validation.business.roleAdminMultipleCompanyError.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_SUPER_ADMIN_DEFAULT_COMPANY_ONLY = "njamb.validation.business.roleSuperAdminDefaultCompanyOnly.bljab";
	public static final String VALIDATION_BUSINESS_COMPANY_REQUIRED = "njamb.validation.business.companyIsRequired.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_ADMIN_DEFAULT_COMPANY_ERROR = "njamb.validation.business.roleAdminDefaultCompanyError.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_SUB_ADMIN_UNIQUE = "njamb.validation.business.roleSubAdminUnique.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_AGENCY_ADMIN_UNIQUE = "njamb.validation.business.roleAgencyAdminUnique.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_AGENCY_SUBADMIN_UNIQUE = "njamb.validation.business.roleAgencySubadminUnique.bljab";
	public static final String VALIDATION_BUSINESS_INSURANCE_COMPANY_ADMIN_UNIQUE = "njamb.validation.business.roleInsuranceCompanyAdminUnique.bljab";
	public static final String VALIDATION_BUSINESS_INSURANCE_COMPANY_SUBADMIN_UNIQUE = "njamb.validation.business.roleInsuranceCompanySubadminUnique.bljab";
	public static final String VALIDATION_BUSINESS_CLIENT_COMPANY_ADMIN_UNIQUE = "njamb.validation.business.roleClientCompanyAdminUnique.bljab";
	public static final String VALIDATION_BUSINESS_CLIENT_COMPANY_SUBADMIN_UNIQUE = "njamb.validation.business.roleClientCompanySubadminUnique.bljab";
	public static final String VALIDATION_BUSINESS_AGENCY_ADMIN_MUST_HAVE_AGENCY = "njamb.validation.business.roleAgencyAdminMustHaveAgency.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_IS_NOT_ALLOWED = "njamb.validation.business.roleNotAllowed.bljab";
	public static final String VALIDATION_BUSINESS_USERNAME_BAD_LENGTH = "njamb.validation.business.badLengthOfUsernameFilter.bljab";

	/**
	 * REPORT MANAGEMENT
	 */	
//	B validation

	public static final String VALIDATION_BUSINESS_REPORT_PARAM_SIZE_OUT_OF_RANGE = "njamb.validation.business.reportParamSizeOutOfRange.bljab";
	public static final String VALIDATION_BUSINESS_REPORT_PARAM_LENGTH_OUT_OF_RANGE = "njamb.validation.business.reportParamLengthOutOfRange.bljab";
	public static final String VALIDATION_BUSINESS_REPORT_PARAM_NOT_DOUBLE = "njamb.validation.business.reportParamIsNotDouble.bljab";
	public static final String VALIDATION_BUSINESS_REPORT_PARAM_NOT_INTEGER = "njamb.validation.business.reportParamIsNotInteger.bljab";
	public static final String VALIDATION_BUSINESS_REPORT_PARAM_NOT_VALID_DATE = "njamb.validation.business.reportParamIsNotValidDateFormat.bljab";
	public static final String VALIDATION_BUSINESS_REPORT_PARAM_IS_MANDATORY = "njamb.validation.business.reportParamIsReqired.bljab";
	public static final String VALIDATION_BUSINESS_REPORT_RESULT_EMPTY = "njamb.validation.business.reportResultEmpty.bljab";	
	public static final String VALIDATION_BUSINESS_REPORT_USERNAME_NOT_EXISTS = "njamb.validation.business.reportManagementUsernameNotExistsInDB.bljab";
	public static final String VALIDATION_BUSINESS_REPORT_USERNAME_EMPTY = "njamb.validation.business.reportManagementUsernameIsEmpty.bljab";
	public static final String VALIDATION_BUSINESS_REPORT_NOT_EXISTS = "njamb.validation.business.reportNotExistsInDB.bljab";
	public static final String VALIDATION_BUSINESS_REPORT_ALREADY_EXISTS = "njamb.validation.business.reportAlreadyExistsInDB.bljab";
	public static final String VALIDATION_BUSINESS_REPORT_VALIDATION_CLASS_DESCRIPTION = "njamb.validation.business.descriptionWithoutValidationClass.bljab";
	public static final String VALIDATION_BUSINESS_BOOKED_REPORT_COULD_NOT_DELETE = "njamb.validation.business.bookedReportCouldNotDelete.bljab";
	public static final String VALIDATION_BUSINESS_REPORT_MUST_HAVE_COMPANY = "njamb.validation.business.reportMustHaveCompany.bljab";
	public static final String VALIDATION_BUSINESS_BOOKED_REPORT_UNAVAILABLE_DATE = "njamb.validation.business.bookedReportUnavailableDate.bljab";
	
//	Formal validation

	public static final String VALIDATION_FORMAL_REPORT_NAME = "njamb.validation.formal.reportNameLengthLongerThan.bljab";
	public static final String VALIDATION_FORMAL_REPORT_DESCRIPTION = "njamb.validation.formal.reportDescriptionLengthLongerThan.bljab";
	
	/**
	* USER PROFILE
	 */	
	
	public static final String VALIDATION_BUSINESS_PASSCODE_ERROR_EDITED = "njamb.validation.business.passwordErrorEdited.bljab";
	public static final String VALIDATION_BUSINESS_USER_ERROR_EDITED = "njamb.validation.business.userDetailsErrorEdited.bljab";
	public static final String VALIDATION_BUSINESS_CAPTCHA_INCORECT = "njamb.validation.business.captchaNotSame.bljab";
	public static final String VALIDATION_BUSINESS_USER_EXIST = "njamb.validation.business.userAlreadyExist.bljab";
	public static final String VALIDATION_BUSINESS_EMAIL_INCORECT = "njamb.validation.business.emailNotCorrect.bljab";
	public static final String VALIDATION_BUSINESS_MAILHASH_INCORECT = "njamb.validation.business.mailHashNotCorrect.bljab";
	public static final String VALIDATION_BUSINESS_MAILHASH_SECRET_INCORECT = "njamb.validation.business.mailHashNotCorrect.bljab";
	public static final String VALIDATION_BUSINESS_USER_ADD_EMAIL_EXISTS = "njamb.validation.business.emailAlreadyExist.bljab";
	public static final String VALIDATION_BUSINESS_MAILHASH_EXPIRED = "njamb.validation.business.mailHashHasExpired.bljab";
	
	/**
	 * Emailing
	 */
	
	// bussines validation	
		public static final String VALIDATION_BUSINESS_EMAIL_CONFIG_ALREADY_EXISTS_IN_DB = "njamb.validation.business.emailConfigAlreadyExist.bljab";
		public static final String VALIDATION_BUSINESS_EMAIL_CONFIG_EMAIL_FORMAT_BAD = "njamb.validation.business.emailBadFormat.bljab";
		public static final String VALIDATION_BUSINESS_EMAIL_CONFIG_NAME_FORMAT_BAD = "njamb.validation.business.emailConfigNameBadFormat.bljab";
		public static final String VALIDATION_BUSINESS_EMAIL_CONFIG_FIELD_CANNOT_BE_EMPTY = "njamb.validation.business.emailConfigFieldCannotBeEmpty"; 
		public static final String VALIDATION_BUSINESS_EMAIL_TEMPLATE_ALREADY_EXISTS_IN_DB = "njamb.validation.business.emailTemplateAlreadyExist.bljab";
		public static final String VALIDATION_BUSINESS_EMAIL_TEMPLATE_CID_DUPLICATED = "njamb.validation.business.cidDuplicated.bljab";
		public static final String VALIDATION_BUSINESS_EMAIL_TEMPLATE_NAME_FORMAT_BAD = "njamb.validation.business.emailTemplateNameBadFormat.bljab";
		public static final String VALIDATION_BUSINESS_EMAIL_TEMPLATE_FIELD_CANNOT_BE_EMPTY = "njamb.validation.business.emailTemplateFieldCannotBeEmpty"; 
		
//		Formal validation
		public static final String VALIDATION_FORMAL_EMAIL_CONFIG_NAME = "njamb.validation.formal.emailConfigsNameMustNotExceed255characters.bljab";
		public static final String VALIDATION_FORMAL_EMAIL_CONFIG_USERNAME = "njamb.validation.formal.emailConfigsUserNameMustNotExceed255characters.bljab";
		public static final String VALIDATION_FORMAL_EMAIL_CONFIG_PASSCODE = "njamb.validation.formal.emailConfigsPasswordMustNotExceed255characters.bljab";
		public static final String VALIDATION_FORMAL_EMAIL_CONFIG_HOST = "njamb.validation.formal.hostMustNotExceed255characters.bljab";
		public static final String VALIDATION_FORMAL_EMAIL_CONFIG_PORT = "njamb.validation.formal.portMustNotExceed10Digits.bljab";
		public static final String VALIDATION_FORMAL_EMAIL_CONFIG_EMAIL_ADDRESS = "njamb.validation.formal.emailAddressMustNotExceed255characters.bljab";
		public static final String VALIDATION_FORMAL_EMAIL_CONFIG_DESCRIPTION = "njamb.validation.formal.emailConfigsDescriptionMustNotExceed1000characters.bljab";
		public static final String VALIDATION_FORMAL_EMAIL_CONFIG_MESSAGE_FROM = "njamb.validation.formal.emailConfigsMessageFromMustNotExceed255characters.bljab";
		public static final String VALIDATION_FORMAL_EMAIL_TEMPLATE_NAME = "njamb.validation.formal.emailTemplateNameMustNotExceed255chracters.bljab";
		public static final String VALIDATION_FORMAL_EMAIL_TEMPLATE_EMAIL_SUBJECT = "njamb.validation.formal.emailTemplateEmailSubjectMustNotExceed200characters.bljab";
		public static final String VALIDATION_FORMAL_EMAIL_TEMPLATE_DESCRIPTION = "njamb.validation.formal.emailTemplateDescriptionMustNotExceed1000characters.bljab";

	/**
	 * COMPANIES ADMIN PANEL
	 * 
	 */
		
		public static final String VALIDATION_BUSINESS_COMPANY_ALREADY_EXISTS_IN_DB = "njamb.validation.business.companyAlreadyExists.bljab";
		public static final String VALIDATION_BUSINESS_COMPANY_CODE_BAD_FORMAT = "njamb.validation.business.companyCodeBadFormat.bljab";
		public static final String VALIDATION_BUSINESS_COMPANY_CSS_FILE_CANNOT_BE_EMPTY = "njamb.validation.business.companyCssFileCannotBeEmpty.bljab";
		public static final String VALIDATION_BUSINESS_COMPANY_CSS_FILE_MISSING = "njamb.validation.business.companyCssFileMissing.bljab";
		public static final String VALIDATION_BUSINESS_DEFAULT_COMPANY_UNABLE_TO_EDIT = "njamb.validation.business.defaultCompanyUnableToEdit.bljab";
		
//		Formal validation
		public static final String VALIDATION_FORMAL_COMPANY_CODE = "njamb.validation.formal.companyCodeMustNotExceed50characters.bljab";
		public static final String VALIDATION_FORMAL_COMPANY_DESCRIPTION_EMPTY = "njamb.validation.formal.companyDescriptionCannotBeEmpty.bljab";
		public static final String VALIDATION_FORMAL_COMPANY_DESCRIPTION_TOO_LONG = "njamb.validation.formal.companyDescriptionMustNotExceed255characters.bljab";
		public static final String VALIDATION_FORMAL_CSS_COMPANY_DESCRIPTION = "njamb.validation.formal.companyCssDescriptionMustNotExceed1000characters.bljab";
		public static final String VALIDATION_FORMAL_CSS_COMPANY_NOTES = "njamb.validation.formal.companyCssNotesMustNotExceed1000characters.bljab";
		public static final String VALIDATION_FORMAL_CSS_COMPANY_DESCRIPTION_EMPTY = "njamb.validation.formal.companyCssDescriptionCannotBeEmpty.bljab";
		public static final String VALIDATION_FORMAL_CSS_COMPANY_NOTES_EMPTY = "njamb.validation.formal.companyCssNotesCannotBeEmpty.bljab";	
		public static final String VALIDATION_FORMAL_COMPANY_NAME_EMPTY = "njamb.validation.formal.companyNameCannotBeEmpty.bljab";
		public static final String VALIDATION_FORMAL_COMPANY_NAME_TOO_LONG = "njamb.validation.formal.companyNameMustNotExceed255characters.bljab";
	
	/**
	 * Generics
	 */

	//formal validation
		
		public static final String VALIDATION_FORMAL_GENERICS_KEY = "njamb.validation.formal.genericsKeyMustNotExceed100characters.bljab";
		public static final String VALIDATION_FORMAL_GENERICS_VALUE = "njamb.validation.formal.genericsValueMustNotExceed1000characters.bljab";
		public static final String VALIDATION_FORMAL_GENERICS_DESCRIPTION = "njamb.validation.formal.genericsDescriptionMustNotExceed4000characters.bljab";



	
	protected ValidationErrorConstants() {
		super();
	}

}
