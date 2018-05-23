package com.kirey.wscm.common.util;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.TimeZone;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.kirey.wscm.common.constants.AppConstants;

/**
 * Class containing utility methods used in multiple classes.
 *
 */
public class Utilities extends com.kirey.kjcore.common.util.Utilities{

	/**
	 * private constructor.
	 */
	private Utilities() {
		super();
	}
	
	/**
	 * This method finds role name to match service package
	 * @param packageCode
	 * @return String role name
	 */
	public static String packageCodeToRole(String packageCode){
		String role = null;
		if(packageCode.equals(AppConstants.PA))
			role = AppConstants.ROLE_PLATINUM_A;
		if(packageCode.equals(AppConstants.GA))
			role = AppConstants.ROLE_GOLD_A;
		if(packageCode.equals(AppConstants.SA))
			role = AppConstants.ROLE_SILVER_A;
		
		if(packageCode.equals(AppConstants.PI))
			role = AppConstants.ROLE_PLATINUM_I;
		if(packageCode.equals(AppConstants.GI))
			role = AppConstants.ROLE_GOLD_I;
		if(packageCode.equals(AppConstants.SI))
			role = AppConstants.ROLE_SILVER_I;
		
		return role;
	}

	/**
	 * This method generates username by company code
	 * @param companyCode
	 * @return String username
	 */
	public static String generateUsername(String companyCode) {
		StringBuilder username = new StringBuilder();
		username.setLength(0);
		if(companyCode.length() >= 5){
			username.append(companyCode.substring(0, 4)); 
		}else{
			username.append(companyCode.substring(0, companyCode.length()));
			for(int i = 0; i < 5-username.length(); i++){
				username.append("0");
			}
		}
		return username.toString();
	}
	
	/**
	 * This method is used for adding days on certain date
	 * @param date
	 * @param numberOfDays
	 * @return Date 
	 */
	public static Date addDays(Date date, Integer numberOfDays){
		Calendar c = Calendar.getInstance(); 
		c.setTime(date); 
		c.add(Calendar.DATE, numberOfDays);
		return c.getTime();
	}
	
	/**
	 * This method is used for adding 23 hour, 59 minutes and 59 seconds on certain date
	 * @param date
	 * @return date
	 */
	public static Date addDayInHour(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		c.add(Calendar.HOUR, 23);
		c.add(Calendar.MINUTE, 59);
		c.add(Calendar.SECOND, 59);
		return c.getTime();
	}

	/**
	 * This method is used for converting longitude to the centered map 
	 * in case it is not in the range (-180, 180) 
	 * @param longitude
	 * @return longitude
	 */
	public static BigDecimal convertIncomingLongitude(BigDecimal longitude) {
		if(longitude.doubleValue() > 180){
			longitude = BigDecimal.valueOf(longitude.doubleValue() - 360);
		}else if(longitude.doubleValue() < -180){
			longitude = BigDecimal.valueOf(longitude.doubleValue() + 360);
		}
		if(longitude.doubleValue()<180 && longitude.doubleValue() > -180){
			return longitude.setScale(6,RoundingMode.HALF_UP);
		}else{
			return convertIncomingLongitude(longitude);
		}
		
	}

	/**
	 * This method is used to adjust the date from client request to server in
	 * order to keep the same value.
	 * 
	 * @return absolute date
	 */
	public static Date convertIncomingAbsoluteDateWithoutZeroTime(Long clientMillis) {
		// client time zone retrieved from frontend
		TimeZone clientTimeZone = TimeZone
				.getTimeZone(((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
						.getHeader("Client-TZ-Id"));

		// calculate time difference between client timezone and server timezone (utc) adding the DST time
		long timeDifference = clientMillis + clientTimeZone.getRawOffset() + clientTimeZone.getDSTSavings();

		return new Date(timeDifference);	
	}
	
	/**
	 * This method is used to keep the date value from server to client request
	 * in order to keep the same date value.
	 * 
	 * @return absolute date 
	 */
	public static Date convertOutgoingAbsoluteDateWithoutZeroTime(Long serverMills) {
		// client time zone retrieved from frontend
		TimeZone clientTimeZone = TimeZone
				.getTimeZone(((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()
						.getHeader("Client-TZ-Id"));

		// calculate time difference between server timezone and client timezone
		long timeDifference = serverMills - clientTimeZone.getRawOffset() - clientTimeZone.getDSTSavings();

		return new Date(timeDifference);
	}

	
	/**
	 * Method used for finding distinct element by a property or key. Can be used with Stream filter() method 
	 * @param keyExtractor
	 * @since 1.8
	 * @return Predicate instance that maintains state about what is seen previously using ConcurrentHashMap
	 */
	public static <T> Predicate<T> distinctByKey(Function<? super T, Object> keyExtractor)
	{
	    Map<Object, Boolean> map = new ConcurrentHashMap<>();
	    return t -> map.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
	}

}
