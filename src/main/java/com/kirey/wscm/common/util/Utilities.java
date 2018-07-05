package com.kirey.wscm.common.util;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;

import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.data.entity.LinksCategories;

/**
 * Class containing utility methods used in multiple classes.
 *
 * @author paunovicm
 */

public class Utilities {

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
	
    public static void main(String[] args) {
        String pattern = "/wscm/rest/content/test?name=bank";
        String url = "/wscm/rest/content/test?name=bank?";
        boolean result = searchUrl(pattern, url);
       
        System.out.println(result);
    }
    
    
    
	public static boolean searchUrl(String pattern, String url) {
		int pattLength = pattern.length();
		int urlLength = url.length();
		char wildcard = '*';
		char wildcard2 = '?';
		boolean match = true;
		int i = 0; // for url
		int j = 0; // for pattern

		while (i < urlLength && j < pattLength) {
			if (pattern.charAt(j) == url.charAt(i) && 
					((j == pattLength - 1 && i != urlLength - 1 && i != urlLength - 2	&& url.charAt(i + 2) != wildcard) || 
							(i == urlLength - 1 && j != pattLength - 1 && url.charAt(i) != wildcard) ||
							j == pattLength -1 && i == urlLength -2 && url.charAt(i+1) != wildcard)) {
				match = false;
				break;
			}
			if (j == pattLength - 1 && i != urlLength - 1 && i != urlLength - 2 && i != urlLength - 3 && url.charAt(i + 2) == wildcard) {
				match = false;
			}
			if (pattern.charAt(j) == url.charAt(i)) {
				i++;
				j++;
			} else if (url.charAt(i) != pattern.charAt(j) && url.charAt(i) == wildcard && i != urlLength - 1) {
				if(url.charAt(i) == wildcard && i == 0) {
					i++;
					while (url.charAt(i) != pattern.charAt(j) && j < pattLength - 1) {
						j++;
					}
				}else {
					i++;
					j++;
					while (url.charAt(i) != pattern.charAt(j) && j < pattLength - 1) {
						j++;
					}
				}
				
			} else if (url.charAt(i) != pattern.charAt(j) && url.charAt(i) == wildcard && i == urlLength - 1) {
				match = true;
				break;
			}else if (url.charAt(i) != pattern.charAt(j) && url.charAt(i) == wildcard2) {
				if(j == pattLength -1 && i != urlLength -1) {
					match = false;
					break;
				}else {
					match = true;
					i++;
					j++;	
				}
			}
			else {
				match = false;
				break;
			}

		}
//		if (match) {
//			return url;
//		} else {
//			return pattern;
//		}
		return match;
	}
    
	/*
    public static String searchUrlOldOld(String pattern, String url) {
        int pattLength = pattern.length();
        int urlLength = url.length();
        char wildcard = '*';
        int i = 0; //for url
        int j = 0; //for pattern
        if(urlLength > pattLength) {
            while (i < pattLength) {
                if(pattern.charAt(j) == url.charAt(i)) {
                    i++;
                    j++;
                } else if(pattern.charAt(j) != url.charAt(i) && pattern.charAt(j) == wildcard) {
                    return pattern;
                } else {
                    break;
                }
            }
            if(urlLength-pattLength == 2 && url.charAt(j)== '/' && url.charAt(j+1) == '*') {
                return url;
            }
            if(urlLength-pattLength == 1 && url.charAt(j)== '*') {
                return url;
            }
        }else if (urlLength < pattLength) {
            while (i < urlLength) {
                if(pattern.charAt(j) == url.charAt(i)) {
                    i++;
                    j++;
                } else if(pattern.charAt(j) != url.charAt(i) && url.charAt(j) == wildcard) {
                    return url;
                } else {
                    break;
                }
            }
            if(pattLength-urlLength == 2 && pattern.charAt(j)== '/' && pattern.charAt(j+1) == '*') {
                return pattern;
            }
            if(pattLength-urlLength == 1 && pattern.charAt(j)== '*') {
                return pattern;
            }
        } else if (urlLength == pattLength) {
        	return pattern;
        }
        
        return pattern;
    }

    
    public static String searchUrlOld(String pattern, String url) {
        int pattLength = pattern.length();
        int urlLength = url.length();
        char wildcard = '*';
        int i = 0; //for url
        int j = 0; //for pattern
        if(urlLength > pattLength) {
            while (i < pattLength) {
                if(pattern.charAt(j) == url.charAt(i)) {
                    i++;
                    j++;
                } else if(pattern.charAt(j) != url.charAt(i) && pattern.charAt(j) == wildcard) {
                    return url;
                } else {
                    break;
                }
            }
            if(urlLength-pattLength == 2 && url.charAt(j)== '/' && url.charAt(j+1) == '*') {
                return pattern;
            }
            if(urlLength-pattLength == 1 && url.charAt(j)== '*') {
                return pattern;
            }
        }else if (urlLength < pattLength) {
            while (i < urlLength) {
                if(pattern.charAt(j) == url.charAt(i)) {
                    i++;
                    j++;
                } else if(pattern.charAt(j) != url.charAt(i) && url.charAt(j) == wildcard) {
                    return pattern;
                } else {
                    break;
                }
            }
            if(pattLength-urlLength == 2 && pattern.charAt(j)== '/' && pattern.charAt(j+1) == '*') {
                return url;
            }
            if(pattLength-urlLength == 1 && pattern.charAt(j)== '*') {
                return url;
            }
        }
        
        return null;
    }
    */
    
    public static List<LinksCategories> getDistinctCategoryMaxWeight(List<LinksCategories> linksCategories) {
        List<LinksCategories> distinctList = new ArrayList<>();
        
        for (LinksCategories linksCategory : linksCategories) {
            LinksCategories maxValue = linksCategories.stream().filter(e -> e.getCategories().getId().equals(linksCategory.getCategories().getId()))
                                                               .max(Comparator.comparingInt(e -> e.getWeight())).get();
            boolean exist = distinctList.stream().anyMatch(e -> e.getId().equals(maxValue.getId()));
            if(!exist) {
                distinctList.add(maxValue);
            }
        }
        return distinctList;
    }


}
