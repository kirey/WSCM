package com.kirey.wscm.common.constants;

/**
 * Validation error constants.
 * @author dumeljicj
 *
 */
public class ValidationErrorConstants {
	
	public static final String VALIDATION_BUSINESS_MAX_NUM_OF_ACCOUNTS = "njamb.validation.business.maxNumOfAccounts.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_PLATINUM_A_UNIQUE = "njamb.validation.business.rolePlatinumAUnique.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_GOLD_A_UNIQUE = "njamb.validation.business.roleGoldAUnique.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_SILVER_A_UNIQUE = "njamb.validation.business.roleSilverAUnique.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_PLATINUM_I_UNIQUE = "njamb.validation.business.rolePlatinumIUnique.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_GOLD_I_UNIQUE = "njamb.validation.business.roleGoldIUnique.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_SILVER_I_UNIQUE = "njamb.validation.business.roleSilverIUnique.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_DOESNOT_EXIST_FOR_THIS_PACKAGE = "njamb.validation.business.roleDoesnotExistForThisPackage.bljab";
	public static final String VALIDATION_BUSINESS_MIN_ONE_SEARCH_CRITERIA_MUST_BE_INPUT = "njamb.validation.business.minOneSearchCriteriaMustBeInput.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_ADMIN_A_UNIQUE = "njamb.validation.business.roleAdminAUnique.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_ADMIN_I_UNIQUE = "njamb.validation.business.roleAdminIUnique.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_SUBADMIN_A_UNIQUE = "njamb.validation.business.roleSubadminAUnique.bljab";
	public static final String VALIDATION_BUSINESS_ROLE_SUBADMIN_I_UNIQUE = "njamb.validation.business.roleSubadminIUnique.bljab";
	public static final String VALIDATION_BUSINESS_PASSWORD_BAD_FORMAT = "njamb.validation.business.passwordBadFormat.bljab";
	public static final String VALIDATION_BUSINESS_USERNAME_BAD_FORMAT = "njamb.validation.business.usernameBadFormat.bljab";
	public static final String VALIDATION_BUSINESS_USER_NAME_NOT_EXIST = "njamb.validation.business.userDoesNotExist.bljab";


	/**
	 * Company management
	 */
	public static final String VALIDATION_BUSINESS_COMPANY_MUST_HAVE_ONE_TYPE = "njamb.validation.business.companyMustHaveOneType.bljab";
	public static final String VALIDATION_BUSINESS_COMPANY_INSURANCE_PACKAGES_CLIENT = "njamb.validation.business.companyInsuranceCantHaveClientPackages.bljab";
	public static final String VALIDATION_BUSINESS_COMPANY_CLIENT_PACKAGES_INSURANCE = "njamb.validation.business.companyClientCantHaveInsurancePackages.bljab";
	public static final String VALIDATION_BUSINESS_COMPANY_CLIENT_MAX_LOCATION_FOR_GI_5 = "njamb.validation.business.companyClientMaxLocationForPiIs5.bljab";
	public static final String VALIDATION_BUSINESS_COMPANY_CLIENT_MAX_LOCATION_FOR_SI_1 = "njamb.validation.business.companyClientMaxLocationForSiIs1.bljab";
	public static final String VALIDATION_BUSINESS_COMPANY_CLIENT_MAX_ONE_HEADQUARTER = "njamb.validation.business.companyClientMaxOneHeadquarter.bljab";
	public static final String VALIDATION_BUSINESS_WRONG_CODE = "njamb.validation.business.wrongCode.bljab";
	public static final String VALIDATION_BUSINESS_CLIENT_LOCATION_NOT_ALLOWED = "njamb.validation.business.clientLocationNotAllowed.bljab";
	public static final String VALIDATION_BUSINESS_CLIENT_LOCATION_DOESNOT_HAVE_INSURANCE_COMPANY = "njamb.validation.business.clientCompanyLocationsDoesnotHaveInsuranceComapny.bljab";	
	public static final String VALIDATION_BUSINESS_NO_GEOLOCATION_FOR_COMPANY_LOCATION = "njamb.validation.business.noGeolocationForCompanyLocaion.bljab";	
	public static final String VALIDATION_BUSINESS_CLIENT_COMPANY_DOESNOT_EXIST = "njamb.validation.business.clientCompanyDoesnotExist.bljab";
	public static final String VALIDATION_BUSINESS_CLIENT_LOCATION_DOESNOT_EXIST = "njamb.validation.business.clientLocationDoesnotExist.bljab";
	public static final String VALIDATION_BUSINESS_CANNOT_CHANGE_YOUR_OWN_ROLE = "njamb.validation.business.cannotChangeYourOwnRole.bljab";
	public static final String VALIDATION_BUSINESS_LAST_ROLE_ADMIN_CANNOT_BE_CHANGED = "njamb.validation.business.lastRoleAdminCannotBeChanged.bljab";
	public static final String VALIDATION_BUSINESS_ACCESS_CODE_TIMEOUT_IS_REQUIRED = "njamb.validation.business.accessCodeTimeoutIsRequired.bljab";
	public static final String VALIDATION_BUSINESS_INSURANCE_COMPANY_ALREADY_JOINED = "njamb.validation.business.insuranceCompanyAlreadyJoined.bljab";
	public static final String VALIDATION_BUSINESS_GEOLOCATION_NOT_FOUND = "njamb.validation.business.geolocationNotFound.bljab";
	public static final String VALIDATION_BUSINESS_ZIP_CODE_LENGTH_MANDATORY_5 = "njamb.validation.business.zipCodeLengthMandatory5.bljab";
	
	
	/**
	 * DIC RISK TYPES
	 */
	public static final String VALIDATION_BUSINESS_DIC_RISK_TYPE_ALREADY_EXISTS = "njamb.validation.business.riskTypeAlreadyExists.bljab";
	public static final String VALIDATION_BUSINESS_DIC_RISK_TYPE_NOT_EXISTS = "njamb.validation.business.riskTypeNotExists.bljab";
	public static final String VALIDATION_BUSINESS_DIC_RISK_TYPE_CONTAINS_SUBTYPES = "njamb.validation.business.riskTypeContainsSubtypes.bljab";
	public static final String VALIDATION_BUSINESS_DIC_RISK_TYPE_WITH_GIVEN_CODE_EXISTS = "njamb.validation.business.riskTypeWithCodeExists.bljab";
	
	/**
	 * DIC RISK TYPES
	 */
	public static final String VALIDATION_BUSINESS_SUBTYPE_ALREADY_EXISTS = "njamb.validation.business.subtypeAlreadyExists.bljab";
	public static final String VALIDATION_BUSINESS_SUBTYPE_CODE_ALREADY_EXISTS = "njamb.validation.business.subtypeCodeAlreadyExists.bljab";
	public static final String VALIDATION_BUSINESS_SUBTYPE_NOT_EXISTS = "njamb.validation.business.subtypeNotAlreadyExists.bljab";
	public static final String VALIDATION_BUSINESS_SUBTYPE_CONTAINS_ACTIONS = "njamb.validation.business.subtypeContainsActions.bljab";
	public static final String VALIDATION_BUSINESS_SUBTYPE_CONTAINS_ALERTS = "njamb.validation.business.subtypeContainsAlerts.bljab";
	
	
	/**
	 * ACTIONS
	 */
	public static final String VALIDATION_BUSINESS_ACTION_NOT_EXISTS = "njamb.validation.business.actionNotExists.bljab";
	public static final String VALIDATION_BUSINESS_ACTION_IS_IN_CLIENT = "njamb.validation.business.actionIsInClient.bljab";
	
	/**
	 * ALERTS
	 */
	public static final String VALIDATION_BUSINESS_ALERT_RANGE_ALREADY_EXIST = "njamb.validation.business.alertWithThisRangeAlreadyExists.bljab";
	public static final String VALIDATION_BUSINESS_ALERT_WITH_THIS_NAME_ALREADY_EXISTS = "njamb.validation.business.alertNameAlreadyExists.bljab";
	public static final String VALIDATION_BUSINESS_ALERT_NOT_EXISTS = "njamb.validation.business.alertNotExists.bljab";
	public static final String VALIDATION_BUSINESS_ALERT_LEVEL_ALREADY_EXIST = "njamb.validation.business.alertLevelAlreadyExists.bljab";
	public static final String VALIDATION_BUSINESS_ALERT_IS_IN_CLIENT = "njamb.validation.business.alertIsInClient.bljab";
	public static final String VALIDATION_BUSINESS_ALERT_MIN_MAX_EQUALS = "njamb.validation.business.alertMinMaxEquals.bljab";
	
	/**
	 * GEOLOCATIONS
	 */
	public static final String VALIDATION_BUSINESS_THERE_ARE_RISK_INDEXES_FOR_GEOLOCATION = "njamb.validation.business.thereAreRiskIndexesForGeolocation.bljab";
	public static final String VALIDATION_BUSINESS_THERE_ARE_FORECAST_INDEXES_FOR_GEOLOCATION ="njamb.validation.business.thereAreForecastIndexesForGeolocation.bljab";
	public static final String VALIDATION_BUSINESS_THERE_ARE_COMPANY_LOCATIONS_FOR_GEOLOCATION = "njamb.validation.business.thereAreCompanyLocaitonsForGeolocation.bljab";
	public static final String VALIDATION_BUSINESS_THERE_ARE_FORECAST_MEASURED_VALUES_FOR_GEOLOCATION = "njamb.validation.business.thereAreForecastMeasuredValuesForGeolocation.bljab";
	public static final String VALIDATION_BUSINESS_THERE_ARE_RISK_MEASURED_VALUES_FOR_GEOLOCATION = "njamb.validation.business.thereAreRiskMeasuredValuesForGeolocation.bljab";
	public static final String VALIDATION_BUSINESS_GEOLOCATION_WITH_ISTAT_SUB_EXISTS ="njamb.validation.business.geolocationWithIstatSubExists.bljab";
	
	/**
	 * STYLES
	 */
	public static final String VALIDATION_BUSINESS_STYLE_RANGE_ALREADY_EXIST = "njamb.validation.business.styleWithThisRangeAlreadyExists.bljab";
	public static final String VALIDATION_BUSINESS_UNDEFINDED_STYLE_ALREADY_EXIST = "njamb.validation.business.undefinedStyleAlreadyExists.bljab";
	public static final String VALIDATION_BUSINESS_PIN_IMAGE_DOES_NOT_EXIST = "njamb.validation.business.pinImageDoesNotExist.bljab";
	public static final String VALIDATION_BUSINESS_PIN_IMAGE_FOR_INDEX_VALUE_EXISTS = "njamb.validation.business.pinImageForIndexValueExists.bljab";
	public static final String VALIDATION_BUSINESS_STYLE_INDEX_ALREADY_EXIST = "njamb.validation.business.styleWithThisIndexAlreadyExists.bljab";
	public static final String VALIDATION_BUSINESS_STYLE_NUMERIC_INDEX_ALREADY_EXIST = "njamb.validation.business.styleWithThisNumericIndexAlreadyExists.bljab";
	public static final String VALIDATION_BUSINESS_STYLE_ENTER_ALL_VALUES = "njamb.validation.business.pleaseEnterAllIndexValues.bljab";
	
	/**
	 * PLACEHOLDERS
	 */
	public static final String VALIDATION_BUSINESS_PLACEHOLDER_CODE_ALREADY_EXISTS = "njamb.validation.business.placeholderCodeAlreadyExists.bljab";
	public static final String VALIDATION_BUSINESS_PLACEHOLDER_NAME_ALREADY_EXISTS = "njamb.validation.business.placeholderNameAlreadyExists.bljab";
	
	/**
	 * MEASURE STYLES
	 */
	public static final String VALIDATION_BUSINESS_MIN_VALUE_MUST_BE_LESS_THEN_MAX_VALUE = "njamb.validation.business.minValueMustBeLessThenMaxValue.bljab";
	
	/**
	 * CONTROL PANEL
	 */
	public static final String VALIDATION_BUSINESS_STANDARD_GEOLOCATIONS_NOT_LOADED_IN_CACHE = "njamb.validation.business.standardGeolocationsNotLoadedInCache.bljab";
	public static final String VALIDATION_BUSINESS_FORECAST_INDEX_VALUES_NOT_LOADED = "njamb.validation.business.forecastIndexValuesNotLoadedIntoCache.bljab";
	public static final String VALIDATION_BUSINESS_STANDARD_GEOLOCATIONS_ALREADY_LOADED_IN_CACHE = "njamb.validation.business.standardGeolocationsAlreadyLoadedInCache.bljab";
	public static final String VALIDATION_BUSINESS_CONTROL_PANEL_FILE_IS_ALREADY_PROCESSED =  "njamb.validation.business.fileIsAlreadyProcessed.bljab";
	public static final String VALIDATION_BUSINESS_ALL_GEOLOCATIONS_NOT_LOADED_IN_CACHE = "njamb.validation.business.allGeolocationsNotLoadedInCache.bljab";
	
	/**
	 * ConstrUCtor from superClass.
	 */
	public ValidationErrorConstants() {
		super();
	}
	
	
}
