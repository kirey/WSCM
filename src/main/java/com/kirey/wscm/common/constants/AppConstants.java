package com.kirey.wscm.common.constants;

/**
 * Constants for application.
 *
 */
public class AppConstants {
	
	//APPLICATION_ROLE
	public static final String ROLE_ADMIN_A = "ROLE_ADMIN_A";
	public static final String ROLE_SUBADMIN_A = "ROLE_SUBADMIN_A";
	public static final String ROLE_PLATINUM_A = "ROLE_PLATINUM_A";
	public static final String ROLE_GOLD_A = "ROLE_GOLD_A";
	public static final String ROLE_SILVER_A = "ROLE_SILVER_A";
	public static final String ROLE_ADMIN_I = "ROLE_ADMIN_I";
	public static final String ROLE_SUBADMIN_I = "ROLE_SUBADMIN_I";
	public static final String ROLE_PLATINUM_I = "ROLE_PLATINUM_I";
	public static final String ROLE_GOLD_I = "ROLE_GOLD_I";
	public static final String ROLE_SILVER_I = "ROLE_SILVER_I";
	
	//PACKAGES_CODE
	public static final String PA = "PA";
	public static final String GA = "GA";
	public static final String SA = "SA";
	public static final String PI = "PI";
	public static final String GI = "GI";
	public static final String SI = "SI";
	
	//PACKAGES TYPE
	public static final String PACKAGE_TYPE_I = "I";
	public static final String PACKAGE_TYPE_A = "A";
	
	//PACKAGES
	public static final String PLATINUM_A = "PLATINUM-A";
	public static final String GOLD_A = "GOLD-A";
	public static final String SILVER_A = "SILVER-A";
	public static final String PLATINUM_I = "PLATINUM-I";
	public static final String GOLD_I = "GOLD-I";
	public static final String SILVER_I = "SILVER-I";
	
	//Company types
	public static final String INSURANCE = "insuranceCompany";
	public static final String CLIENT = "clientCompany";
	
	
	
	//RestResponse
	public static final String RESPONSE_DATA = "data";
	public static final String RESPONSE_GEOJSON = "geojson";
	
	//Report
	public static final String REPORT_LOSS_PREVENTION_PLAN = "Loss prevention plan";
	public static final String REPORT_PLAN_PARAM_LOCATION_ID = "locationId";
	public static final String REPORT_PLAN_PARAM_COMPANY_NAME = "companyName";
	public static final String REPORT_PLAN_PARAM_PLACE = "place";
	public static final String REPORT_PLAN_PARAM_DESCRIPTION = "description";
	
	//DicRiskSubtypes
	public static final String RISK_SUBTYPES = "R";
	public static final String FORECAST_SUBTYPES = "F";
	public static final String RISK_FORECAST_SUBTYPES = "RF";
	public static final String FORECAST_MEASURE_VALUES = "M";
	
	/*
	 * RISK_SUBTYPE CODE
	 */
	
	public static final String RISK_SUBTYPE_EARTHQUAKE_CODE = "EQ";
	public static final String RISK_SUBTYPE_LANDSLIDES_CODE = "LS";
	public static final String RISK_SUBTYPE_FLOODING_CODE = "F";
	public static final String RISK_SUBTYPE_MAXTEMP_CODE = "TMA";
	public static final String RISK_SUBTYPE_MINTEMP_CODE = "TMI";
	public static final String RISK_SUBTYPE_RAIN_CODE = "RAI";
	public static final String RISK_SUBTYPE_WIND_CODE = "WN";
	public static final String RISK_SUBTYPES_GLOBAL_CODE = "GL";
	public static final String RISK_SUBTYPES_LIGHTNING_CODE = "LG";
	public static final String RISK_SUBTYPES_ERUPTIONS_CODE = "ER";
	//Forecasts
	public static final String RISK_SUBTYPES_PRECIPITATION_CODE = "PR";
	public static final String RISK_SUBTYPES_SNOW_CODE = "SN";
	public static final String RISK_SUBTYPES_ICE_CODE = "IC";
	public static final String RISK_SUBTYPES_TEMPERATURE_CODE = "T";
	public static final String RISK_SUBTYPES_THUNDERSTORM_CODE = "THI";
	public static final String RISK_SUBTYPE_SEAWAVE_CODE = "SW";

	//Generics
	public static final String GENERICS_SUBCATEGORY3_FRONTEND = "images";
	public static final String GENERICS_ACCESS_CODE_COMPLEXITY = "frontend.config.accessCodeComplexity";

	//History
	public static final String GENERICS_HISTORY_MAX_RESULTS_HOMEPAGE = "history.home.numberOfResults";
	public static final String GENERICS_HISTORY_MAX_RESULTS = "history.history.numberOfResults";
	public static final int DEFAULT_COMPANY_LOCATION_ID = 2;
	public static final String GENERICS_HISTORY_FORECAST_NUMBER_OF_DAYS = "history.home.forecastDaysHistory";
	
	//dicRiskSubtypes
	public static final String RISK_SUBTYPES_PRECIPITATION = "njamb.db.dic_risk_subtypes.name.precipitation.bljab";
	public static final String RISK_SUBTYPES_SNOW = "njamb.db.dic_risk_subtypes.name.snow.bljab";
	public static final String RISK_SUBTYPES_WIND = "njamb.db.dic_risk_subtypes.name.wind.bljab";
	public static final String RISK_SUBTYPES_ICE = "njamb.db.dic_risk_subtypes.name.ice.bljab";
	public static final String RISK_SUBTYPES_TEMPERATURE = "njamb.db.dic_risk_subtypes.name.temperature.bljab";
	public static final String RISK_SUBTYPES_THUNDERSTORM = "njamb.db.dic_risk_subtypes.name.thunderstorm_index.bljab";

	
	public static final String DATE_AND_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
	public static final long UNDEFINED_INDEX_VALUE = -1;
	public static final long DATE_FROM_1970 = 23580000000l;
	public static final double EARTH_RADIUS = 6373;
	public static final String GENERICS_MIN_DISTANCE = "history.home.minDistance";
	public static final String GENERICS_LANDSLIDE_MIN_DISTANCE = "history.home.landslideMinDistance";
	public static final String GENERICS_FLOODING_MIN_DISTANCE = "history.home.floodingMinDistance";
	
	public static final String GENERICS_PIN = "frontend.images.pin";
	public static final String GENERICS_MIN_DISTANCE_RISK_GEOJSONS = "history.home.minDistanceRiskGeojsons";
	
	/**
	 * CONTROL PANEL MODULES
	 */
	public static final String MODULE_STANDARD_GEOLOCATIONS = "L1";
	public static final String MODULE_LANDSLIDE_GEOLOCATIONS = "LLS";
	public static final String MODULE_FLOODING_GEOLOCATIONS = "LFL";
	public static final String MODULE_ALL_GEOLOCATIONS = "ALL";
	public static final String MODULE_RISK_INDEX = "RI";
	public static final String MODULE_FORECAST_INDEX_VALUES = "FIV";
	public static final String MODULE_TRANSLATIONS = "TR";
	//download
	public static final String CONTROL_PANEL_DOWONLOAD_STANDARD_GEOLOCATION_DEFINITION_FILE = "DSGD";
	public static final String CONTROL_PANEL_DOWONLOAD_STANDARD_GEOLOCATION_GEOJSON_FILES = "DSGG";
	public static final String CONTROL_PANEL_DOWONLOAD_LANDLIDES_GEOJSON_FILES = "DLSG";
	public static final String CONTROL_PANEL_DOWONLOAD_FLOODING_GEOJSON_FILES = "DFLG";
	public static final String CONTROL_PANEL_DOWNLOAD_STANDARD_RISK_INDEX_FILES = "DSRI";
	public static final String CONTROL_PANEL_DOWNLOAD_STANDARD_FORECAST_METEO_FILES = "DSFM";
	
	public static final String CONTROL_PANEL_DOWONLOAD_DATE_STANDARD_GEOLOCATION_DEFINITION_FILE = "DDSGD";
	public static final String CONTROL_PANEL_DOWONLOAD_DATE_STANDARD_GEOLOCATION_GEOJSON_FILES = "DDSGG";
	public static final String CONTROL_PANEL_DOWONLOAD_DATE_LANDLIDES_GEOJSON_FILES = "DDLSG";
	public static final String CONTROL_PANEL_DOWONLOAD_DATE_FLOODING_GEOJSON_FILES = "DDFLG";
	public static final String CONTROL_PANEL_DOWNLOAD_DATE_STANDARD_RISK_INDEX_FILES = "DDSRI";
	public static final String CONTROL_PANEL_DOWNLOAD_DATE_STANDARD_FORECAST_METEO_FILES = "DDSFM";
	
	//insert
	public static final String CONTROL_PANEL_INSERT_OR_UPDATE_STANDARD_GEOLOCATION_DEFINITION = "IUSGDDB";
	public static final String CONTROL_PANEL_INSERT_STANDARD_GEOLOCATION_GEOJSON_INTO_DB = "ISGGDB";
	public static final String CONTROL_PANEL_INSERT_LANDSLIDE_DEFINITION_INTO_DB = "ILSDDB";
	public static final String CONTROL_PANEL_INSERT_FLOODING_DEFINITION_INTO_DB = "IFLDDB";
	public static final String CONTROL_PANEL_INSERT_STANDARD_RISK_INDEX_INTO_DB = "ISRIDB";
	//schedulers
	public static final String CONTROL_PANEL_SCHEDULER_1 = "timer1";
	public static final String CONTROL_PANEL_SCHEDULER_1_TASK_DONE = "timer1TaskDone";
	public static final String CONTROL_PANEL_SCHEDULER_1_NEXT = "timer1NextExecution";
	public static final String CONTROL_PANEL_SCHEDULER_2 = "timer2";
	public static final String CONTROL_PANEL_SCHEDULER_2_NEXT = "timer2NextExecution";
	public static final String CONTROL_PANEL_SCHEDULER_2_TASK_DONE = "timer2TaskDone";
	public static final String CONTROL_PANEL_AUTOMATICALLY_FIRE_ALERTS = "frontend.config.automaticallyFireAlerts";	
	public static final String FAKE_USERNAME_CONTROL_PANEL_SCHEDULER = "fakeUser_controlPanelScheduler";
	
	public static final String CONTROL_PANEL_ALERT_SCHEDULER = "alertScheduler";
	public static final String CONTROL_PANEL_ALERT_SCHEDULER_NEXT_EXECUTION = "alertSchedulerNextExecution";
	public static final String CONTROL_PANEL_ALERT_SCHEDULER_TASK_DONE = "alertSchedulerTaskDone";
	public static final String CONTROL_PANEL_ALERT_SCHEDULER_INTERVAL = "alertSchedulerInterval";
	
	public static final Integer ALERT_SCHEDULER_STATUS_NOT_ACTIVE = 0;
	public static final Integer	ALERT_SCHEDULER_STATUS_ACTIVE = 1;
	public static final Integer ALERT_SCHEDULER_STATUS_SUCCESSFULLY_DONE = 2;
	public static final Integer ALERT_SCHEDULER_STATUS_NOT_SUCCESSFULLY_DONE = 3;
	
	public static final Integer DOWNLOAD_METEO_FILES_SCHEDULER_STATUS_NOT_ACTIVE = 0;
	public static final Integer	DOWNLOAD_METEO_FILES_SCHEDULER_STATUS_ACTIVE = 1;
	public static final Integer DOWNLOAD_METEO_FILES_SCHEDULER_SUCCESSFULLY_DONE = 2;
	public static final Integer DOWNLOAD_METEO_FILES_SCHEDULER_NOT_SUCCESSFULLY_DONE = 3;
	
	public static final String CONTROL_PANEL_ALL_GEOLOCATIONS_COUNTER = "allGeo";
	
	
	/**
	 * LAYER CODES
	 */
	public static final String LAYER_CODE_STANDARD = "L1";
	public static final String LAYER_CODE_LANDSLIDE = "LLS";
	public static final String LAYER_CODE_FLOODING = "LFL";
	
	public static final Integer STANDARD_GEO_ISAT_START  = 2;
	public static final Integer STANDARD_GEO_ISAT_END    = 1000000;
	
	public static final Integer LANDSLIDE_GEO_ISAT_START = 1000000;
	public static final Integer LANDSLIDE_GEO_ISAT_END   = 2000000;
	
	public static final Integer FLOODING_GEO_ISAT_START  = 2000000;
	public static final Integer FLOODING_GEO_ISAT_END    = 3000000;
	
	/**
	 * SFTP local directory paths
	 */
	public static final String DIRECTORY_ROOT_PATH = "../";
	public static final String DIRECTORY_DATA_PATH = "/data";
	public static final String DIRECTORY_LOCATIONS_PATH = "/locations";
	public static final String DIRECTORY_FORECAST_PATH = "/forecast";
	public static final String DIRECTORY_INDEX_PATH = "/index";
	public static final String DIRECTORY_LANDSLIDE_PATH = "/landslide";
	public static final String DIRECTORY_FLOODING_PATH = "/flooding";
	

	/**
	 * SFTP remote server directory paths
	 */
	public static final String SFTP_REMOTE_DATA_DIR = "/data/";
	public static final String SFTP_REMOTE_INDEX_DIR = "/data/index/";
	public static final String SFTP_REMOTE_FORECAST_PATH = "/data/forecast";
	public static final String SFTP_REMOTE_LOCATION_GEOJSON_PATH = "/data/new_locations_GeoJSON/";
	public static final String SFTP_REMOTE_LANDLIDE_PATH = "/data/index/landslide/";
	public static final String SFTP_REMOTE_FLOODING_PATH = "/data/index/flooding/";
	
	/**
	 * SFTP server file names
	 */
	public static final String SFTP_STANDARD_GEOLOCATIONS_DEFINITIONS_FILE_NAME = "locations.csv";
	
	/**
	 * Spring integration messages
	 */
	public static final String SPRING_INTEGRATION_MESSAGE_HEADER_REMOTE_FILE_NAME = "file_remoteFile";
	public static final String SPRING_INTEGRATION_MESSAGE_HEADER_REMOTE_DIRECTORY_NAME = "file_remoteDirectory";
	public static final String SERVER_ROOT_KEY = "server.root";

	
	
	
	/**
	 * OTHER
	 */
	public static final String STROKE_WIDTH = "stroke-width";
	public static final String FILL = "fill";
	public static final String STROKE = "stroke";
	public static final String VALUE = "value";
	public static final String INDEX_VALUE = "indexValue";
	public static final String STYLES = "styles";
	public static final String DATE_AND_TIME_FORMAT_2 = "yyyyMMdd HH:mm:ss";
	public static final String DESCRIPTION = "description";
	public static final String FL_CONSENT_TO_VIEW = "flConsentToView";
	public static final String DATE_AND_HOURS_FORMAT = "dd/MM/yyyy  HH";
	public static final String ISTAT = "ISTAT";
	public static final String EMAIL_PATTERN = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?";
	public static final String USERNAME_PATTERN = "^(?=.{6,255}$)(?![-_.])(?!.*[-_.]{2})[A-Za-z0-9._-]+(?<![-_.])$";
	public static final String PASSWORD_PATTERN = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$";
	public static final String EMPTY_STRING = "";
	public static final Integer DEFAULT_ACCESS_CODE_STRENGTH = 3;
	public static final String SIMBOL_REGEX = ".*(?=.*?[#?!.@$%^&*-]).*";
	public static final String LOWER_LETTERS_REGEX = ".*([a-z]).*";
	public static final String UPPER_LETTERS_REGEX = ".*([A-Z]).*";
	public static final String NUMBER_REGEX = ".*\\d.*";
	
	
	/**
	 * Constructor from superClass.
	 */
	public AppConstants() {
		super();

	}
	
	
}
