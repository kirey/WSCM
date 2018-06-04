package com.kirey.kjcore.common.constants;

/**
 * Class containing string constants used in app
 * Constants are divided by type
 */
public class AppConstants {

	/*
	 * APP
	 */
	public static final String USER_NOT_LOGGED = "NO_USER";
	public static final String FRONT_END = "fe";
	public static final String GENERAL_COMPONENT_CONTENT = "generalComponentContent";
	public static final String JASPER_REPORT = "jr";
	public static final String TRANSLATION_START_TAG = "njamb.";
	public static final String TRANSLATION_REVERSE_START_TAG = "bmajn.";
	
	public static final String TRANSLATION_END_TAG = ".bljab";
	public static final String TRANSLATION_REVERSE_END_TAG = ".bajlb";
	public static final int TRANSLATION_KEY_MAX_LENGTH = 150;
	
	public static final String NAVIGATION_MODULE = "navigation";
	public static final String FAKE_USERNAME = "fakeUser";
	public static final String UNDERLINE = "_";
	public static final String NO_REFRESH_TIME="00:00:00";
	public static final String SIMPLE_DATE_FORMAT="yyyyMMddHHmmss";
	public static final String REPORT_VALIDATION_CLASS="REPORT_VALIDATION";
	public static final int MAIL_HASH_DURATION_MILLIS = 600000; //10 minutes
	public static final int MAX_USERS = 30;
	public static final String GENERICS_CAPTCHA_POOL_SIZE_KEY = "captcha.pool.size";
	
	public static final boolean GLOBAL_TRUE = true;
	public static final boolean GLOBAL_FALSE = false;
	
	public static final String MOBILE_TOKEN_PREFIX = "M";
	public static final int DEFAULT_COMPANY_LOCATION_ID = 2;
	
	public static final String STYLE_OPEN_TAG = "<style>";
	public static final String STYLE_CLOSE_TAG = "</style>";
	public static final String SCRIPT_OPEN_TAG = "<script>";
	public static final String SCRIPT_CLOSE_TAG = "</script>";

	/*
	 * PROCESS TYPE
	 */
	public static final String ONLINE="ONLINE";
	public static final String OFFLINE="OFFLINE";
	
	/*
	 * PROCESS CATEGORY
	 */
	public static final String CATEGORY_CONTROLLER="CONTROLLER";
	public static final String CATEGORY_SCHEDULER="SCHEDULER";
	public static final String CATEGORY_BATCH="BATCH_JOB";
	public static final String CATEGORY_SECURITY="SECURITY";

	/*
	 * COMPANIES
	 */
	public static final String CSS_COMPANY_PREFIX = "rest/users/noAuth/company";
	public static final String DEFAULT_COMPANY_CODE = "defaultCompany";
	
	/*
	 * JOBS
	 */
	public static final String JOB_STATUS_STARTED = "STARTED";
	public static final String JOB_STATUS_COMPLETED = "COMPLETED";
	public static final String JOB_STATUS_FAILED = "FAILED";
	public static final String JOB_STATUS_STOPPED = "STOPPED";
	public static final String JOB_STATUS_CRASHED = "CRASHED";
	public static final String JOB_EXIT_STATUS_COMPLETED_WITH_ERRORS = "COMPLETED WITH ERRORS";
	public static final String JOB_ITEM_EXCEPTION = "itemException";
	public static final String JOB_INSERTED_STATUS = " ";
	public static final String JOB_CATEGORY = "jobCategory";
	public static final String JOB_EXCEPTION = "jobException";
	public static final String JOB_TASK_ID = "jobTaskId";
	
	/*
	 * ASYNC REPORTS
	 */
	public static final String JOB_CONTEXT_REPORT_AVG_EXEC_TIME = "avgExecTime";
	public static final String JOB_CONTEXT_REPORT_NUM_EXECUTION = "numExecution";
	public static final String JOB_CONTEXT_REPORT_DETAILS_MAP = "reportDetailsMap";
	public static final String JOB_CONTEXT_BOOKED_REPORTS = "bookedReports";
	public static final String JOB_CONTEXT_REPORT_GENERATED = "reportGenerated";
	public static final String BOOKED_REPORT = "bookedReport";
	public static final int REPORT_BATCH_THREAD_NUMBER = 1;
	public static final String REPORT_STATUS_BOOKED = "BOOKED";	
	public static final String REPORT_STATUS_GENERATED = "GENERATED";	
	public static final String REPORT_STATUS_EXECUTING = "EXECUTING";	
	public static final String REPORT_STATUS_FAILED = "FAILED";	
	public static final String REPORT_BATCH_CLUSTER_NUMBER_KEY = "reportAsync.batch.clusterNumber";	
	public static final String REPORT_BATCH_TIME_FRAME_KEY = "reportAsync.batch.timeFrame";
	public static final String REPORT_CONTINGECY_PARAM_KEY = "reportAsync.contingency.param";
	
	/*
	 * SEARCH AND FILTERING ON BOOKED REPORTS
	 */
	public static final String SELECT_BOOKED_USER = "user";
	public static final String SELECT_BOOKED_COMPANY = "company";
	public static final String SELECT_BOOKED_FROM_DATE = "combobox.date.from.bookedDate";
	public static final String SELECT_BOOKED_TO_DATE = "combobox.date.to.bookedDate";
	
	/*
	 * SCHEDULER
	 */
	public static final String FAKE_USERNAME_SCHEDULER = "fakeUser_scheduler";
	public static final String JOB_NAME="jobName";
	public static final String SCHEDULER_NAME="schedulerName";
	public static final String BATCH_PARAMETER_TIME_STAMP="timeStamp";
	public static final String RUNNABLE_TASK_NAME="runnableTask";
	public static final String ADMIN_PAGE_REFRESH_TIME="refreshTime";
	
	/*
	 * SEARCH AND FILTERING ON ERROR LOGS
	 */
	public static final String SELECT_ERRROR_NAME = "errorName";
	public static final String SELECT_USER_NAME = "username";
	public static final String SELECT_FROM_TROWN_DATE = "combobox.date.from.thrownDate";
	public static final String SELECT_TO_TROWN_DATE = "combobox.date.to.thrownDate";
	public static final String SELECT_PROCESS_TYPE = "processType";

	/*
	 * REPORT BLOB ORDER
	 */
	public static final Integer REPORT_MASTER_REPORT_ORDER = 1;
	public static final String REPORT_TRANSLATION_MAP = "translationMap";
	public static final String REPORT_MASTER_REPORT = "master";
	
	/*
	 * CSV FILE
	 */
	public static final String CVS_FILE_DELIMITER = "\\s*;\\s*";
	
	/*
	 * CLASS CATEGORIES REPORT VALIDATION
	 */
	public static final String CLASS_CATEGORY_REPORT_VALIDATION = "REPORT_VALIDATION";
	
	/*
	 * GENERICS
	 */
    public static final String GENERICS_CATEGORY_FRONTEND = "frontend";
    public static final String GENERICS_SUBCATEGORY1_FRONTEND = "contentVisibility";
    public static final String GENERICS_SUBCATEGORY2_FRONTEND = "config";
    public static final String GENERICS_CAPTCHA_LOGIN_ENABLED = "frontend.contentVisibility.captchaOnLogin";
	public static final String SCHEDULER_MANAGEMENT_PAGE_REFRESH_TIME_PARAM="scheduler.adminPage.refreshTime";
	public static final String JOBS_MANAGEMENT_PAGE_REFRESH_TIME_PARAM="jobs.adminPage.refreshTime";
	public static final String ASYNC_REPORT_CATEGORY="reportAsync";
	
	/*
	 * ENTITY CLASSES
	 */

	public static final String DATABASE_FIELD_USER_INSERT="utInsert";
	public static final String DATABASE_FIELD_USER_UPDATE="utUpdate";
	
	
	/*
	 * ROLES
	 */
	
	public static final String ROLE_ADMIN = "ROLE_ADMIN";
	public static final String ROLE_SUBADMIN = "ROLE_SUBADMIN";
	public static final String ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN";
	public static final String ROLE_USER = "ROLE_USER";

	/*
	 * Mobile controller
	 */
	public static final String MOBILE_TOKEN_PERMITTED_PATH = "/rest/usersMobile";

	
	protected AppConstants() {
		super();
	}

}
