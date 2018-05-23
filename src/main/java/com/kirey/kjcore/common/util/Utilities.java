package com.kirey.kjcore.common.util;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.data.entity.KjcApplicationRoles;
import com.kirey.kjcore.data.entity.KjcReportParameters;
import com.kirey.kjcore.data.entity.KjcUserAccounts;

/**Class containing utility methods used in multiple classes
 *
 */
public class Utilities {
	
	protected Utilities() {
		super();
	}

	/**A method that extracts error message out of stack trace
	 * @param ex
	 * @return String error message
	 */
	public static String getErrorMessage(Throwable ex) {
		StackTraceElement[] trace = ex.getStackTrace();
		return trace[0].toString();
	}

	/**A method that extracts stack trace for error thrown converting it to string
	 * @param ex
	 * @return String stack trace
	 */
	public static String getErrorStackTrace(Throwable ex) {
		StringWriter sw = new StringWriter();
		ex.printStackTrace(new PrintWriter(sw));
		return sw.toString();
	}

	/**A method that returns request url as string
	 * @param req
	 * @return String request url
	 */
	public static String getUrlFromRequest(HttpServletRequest req) {
		if (req.getQueryString() != null)
			return req.getRequestURL().toString() + "?" + req.getQueryString();
		else
			return req.getRequestURL().toString();
	}
	
	/**
	 * Converts report parameters list to HashMap
	 * @param reportParameters
	 * @return Map<String, Object> containing report parameters for translation
	 * 
	 */
	public static Map<String, Object> createParametersMap(List<KjcReportParameters> reportParameters) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		for (KjcReportParameters param : reportParameters) {
				if((param.getValue() == null && param.getType().equals("HashMap")) || param.getValue() != null) {
					switch (param.getType()) {
					case "String":
						String stringValue = param.getValue();
						String reverseValue;
						if(stringValue.startsWith(AppConstants.TRANSLATION_REVERSE_START_TAG) &&
								stringValue.endsWith(AppConstants.TRANSLATION_REVERSE_END_TAG)){
							
							reverseValue = stringValue.replaceFirst(AppConstants.TRANSLATION_REVERSE_START_TAG,
									AppConstants.TRANSLATION_START_TAG);
							reverseValue = reverseValue.replaceFirst(AppConstants.TRANSLATION_REVERSE_END_TAG,
									AppConstants.TRANSLATION_END_TAG);
							result.put(param.getKey(), reverseValue);
						}else{
							result.put(param.getKey(), stringValue);
						}
						break;
					case "Integer":
						String valueInt = param.getValue();
						result.put(param.getKey(), Integer.parseInt(valueInt));
						break;

					case "Decimal":
						String valueDouble = param.getValue();
						result.put(param.getKey(), Double.parseDouble(valueDouble));
						break;
					case "Date":
						String miliseconds = param.getValue();
						Long milisecondsLong = Long.parseLong(miliseconds);
						Date date = new Date(milisecondsLong);
						result.put(param.getKey(), date);
						break;
					case "Timestamp":
						String milisecondsTime = param.getValue();
						Long milisecondsLongTime = Long.parseLong(milisecondsTime);
						Timestamp timestamp = new Timestamp(milisecondsLongTime);
						result.put(param.getKey(), timestamp);
						break;
					case "HashMap":
						if(param.getKey().equals(AppConstants.REPORT_TRANSLATION_MAP)){
							result.put(param.getKey(), true);
						}
						
						break;
					default:
						break;
					}
				}
		}

		return result;

	}
	
	/**
	 * Converts a string representation of date into Date object. Format param is format of that string representation.
	 * @param dateString
	 * @param format
	 * @return Date
	 */
	public static Date convertToDate(String dateString, String format) {
		SimpleDateFormat formatter = new SimpleDateFormat(format);
		Date parsedDate = null;
		try {
			parsedDate = formatter.parse(dateString);
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
		return parsedDate;
	}
	
	/**
	 * Converts a string representation of date into Date object. Default format is used.
	 * @param dateString
	 * @return Date
	 */
	public static Date convertToDate(String dateString) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date parsedDate = null;
		try {
			parsedDate = formatter.parse(dateString);
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
		return parsedDate;
	}
	

	/**A method that returns logged in user
	 * @return KjcUserAccounts logged in user
	 */
	public static KjcUserAccounts getUserFromContext(){
		
		SecurityContext securityContext = SecurityContextHolder.getContext();
		Object details=null;
		
		try {
			details = securityContext.getAuthentication().getPrincipal();
		} catch (NullPointerException e) {
			details=null;
		}
		
		KjcUserAccounts user = null;
		if (details!=null && details instanceof KjcUserAccounts) {
			user = (KjcUserAccounts) details;
		}
		
		return user;
	}
	
	
	/**A method that returns users default language
	 * @return String default language
	 */
	public static String getUsersDefaultLang() {
		KjcUserAccounts user = Utilities.getUserFromContext();

		if (user != null)
			return user.getDefaultLanguage();
		return null;
	}
	
	/**
	 * Utility method to introduce a random delay (range: 1s to 10s) in order to
	 * avoid synchronization issues in clustering deploy
	 */
	public static void randomSleep() {
		long delay = (long) (10000 * Math.random() + 1);
		try {
			Thread.sleep(delay);
		} catch (InterruptedException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * generates list of ValidationErrorDto from binding result, 
	 * extracts field name and error message for each field and creates ValidationErrorDto for each
	 * @param validationResult
	 * @return List<ValidationErrorDto> containing all errors from binding result
	 */
   public static List<ValidationErrorDto> generateListFromBindingResult(BindingResult validationResult){
		
	    List<ValidationErrorDto> listValidatonErrorDto = new ArrayList<ValidationErrorDto>();
	    
		List<ObjectError> errors = validationResult.getAllErrors();
		for (ObjectError objectError : errors) {
			String fieldName = ((FieldError) objectError).getField().replace("fields.", "");

			ValidationErrorDto validationErrorDto = new ValidationErrorDto();
			validationErrorDto.setFieldName(fieldName);
			validationErrorDto.setErrorCode(objectError.getDefaultMessage());
			listValidatonErrorDto.add(validationErrorDto);
		}
				
		return listValidatonErrorDto;

	}
	
	/**A method returning all available locales
	 * @return Map<String, String> containing available language code as key and display name as value
	 */
	public static Map<String, String> getAvailableLocales(){
		Locale[] locale = Locale.getAvailableLocales();
		HashMap<String, String> map = new HashMap<String, String>();
		for (Locale locale2 : locale) {
			StringBuilder sb = new StringBuilder();
			sb.setLength(0);
			sb.append(locale2.getLanguage());
			sb.append("_");
			sb.append(locale2.getCountry());
			map.put(sb.toString(), locale2.getDisplayName());
		}
		return map;
	}
	
	/**
	 * This method sorts HashMap by value
	 * @param map - unsorted HashMap
	 * @return sorted HashMap
	 */
	public static <K, V extends Comparable<? super V>> Map<K, V> sortByValue(Map<K, V> map) {
	    return map.entrySet()
	              .stream()
	              //uncomment to for descending order
	              .sorted(Map.Entry.comparingByValue(/*Collections.reverseOrder()*/))
	              .collect(Collectors.toMap(
	                Map.Entry::getKey, 
	                Map.Entry::getValue, 
	                (e1, e2) -> e1, 
	                LinkedHashMap::new
	              ));
	}
	
	public static List<String> getGenericParametersCustomTypes(){
		List<String> parametersCustomTypeList = new ArrayList<>();
		parametersCustomTypeList.add("String");
		parametersCustomTypeList.add("Integer");
		parametersCustomTypeList.add("Decimal");
		parametersCustomTypeList.add("Date");
		parametersCustomTypeList.add("Time");
		parametersCustomTypeList.add("Boolean");
		return parametersCustomTypeList;
		
	}
	
	/**
	 * This method is used for getting list of all role names for user in context
	 * @return list of role names
	 */
	public static List<String> getListRoleNamesOfUserInContext(){
		List<KjcApplicationRoles> listUserRoles = Utilities.getUserFromContext().getKjcApplicationRoleses();
		List<String> listRoleNames = new ArrayList<>();
		for (KjcApplicationRoles kjcApplicationRoles : listUserRoles) {
			listRoleNames.add(kjcApplicationRoles.getName());
		}
		return listRoleNames;
	}
	
	public static boolean isRole(String roleName){
		boolean flag = false;
		List<KjcApplicationRoles> listUserRoles = Utilities.getUserFromContext().getKjcApplicationRoleses();
		for (KjcApplicationRoles kjcApplicationRoles : listUserRoles) {
			if(kjcApplicationRoles.getName().equals(roleName))
				flag = true;
		}
		return flag;
	}
	
	public static Date dateWithZeroTime(Date date) {
		DateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
		Date dateWithZeroTime = null;
		try {
			dateWithZeroTime = formatter.parse(formatter.format(date));
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
		return dateWithZeroTime;
	}

	
	/**
	 * This method is used to adjust the date from client request to server in
	 * order to keep the same date value.
	 * 
	 * @return absolute date with time 00:00:00
	 */
	public static Date convertIncomingAbsoluteDate(Long clientMillis) {
		// client time zone retrieved from frontend
		TimeZone clientTimeZone = TimeZone
				.getTimeZone(((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
						.getHeader("Client-TZ-Id"));

		// calculate time difference between client timezone and server timezone (utc) adding the DST time
		long timeDifference = clientMillis + clientTimeZone.getRawOffset() + clientTimeZone.getDSTSavings();

		return setZeroTimeToDate(new Date(timeDifference));	
	}
	
	/**
	 * This method is used to keep the date value from server with time 00:00:00 to client request
	 * in order to keep the same date value.
	 * 
	 * @return absolute date 
	 */
	public static Date convertOutgoingAbsoluteDate(Long utcMillis) {
		// client time zone retrieved from frontend
		TimeZone clientTimeZone = TimeZone
				.getTimeZone(((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
						.getHeader("Client-TZ-Id"));

		// calculate time difference between server timezone and client timezone
		long timeDifference = setZeroTimeToDate(new Date(utcMillis)).getTime() - clientTimeZone.getRawOffset();

		return new Date(timeDifference);
	}
	
	/**
	 * This method is used to add 00:00:00 to received date 
	 * 
	 * @return the date with time 00:00:00
	 */
	public static Date setZeroTimeToDate (Date date){
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		c.set(Calendar.MILLISECOND, 0);
		
		return c.getTime();
	}
	
	/**
	 * This method is used to add current time to received date 
	 * 
	 * @return the date with current time
	 */
	public static Date setCurrentTimeToDate(Date date) {
		Date currentDate = new Date();
		String hours = new SimpleDateFormat("HH").format(currentDate);
		String mins = new SimpleDateFormat("mm").format(currentDate);
		String sec = new SimpleDateFormat("ss").format(currentDate);

		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.HOUR, Integer.parseInt(hours));
		calendar.add(Calendar.MINUTE, Integer.parseInt(mins));
		calendar.add(Calendar.SECOND, Integer.parseInt(sec));

		return calendar.getTime();
	}

	/**
	 * This method convert date to String
	 * @param date inputed value
	 * @param format inputed value of date format
	 * @return date in String format
	 */
	public static String convertToString(Date date, String format) {
		DateFormat df = new SimpleDateFormat(format);
		String dateString = df.format(date);
		return dateString;
	}
}
