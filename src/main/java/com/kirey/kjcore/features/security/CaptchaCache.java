package com.kirey.kjcore.features.security;

import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * CaptchaCache class is designed to keep record of all Captcha objects.
 * 
 * @author mpaunovic
 *
 */
public class CaptchaCache extends HashSet {

	private static List<Captcha> cache;
	private static final CaptchaCache captchaCache = new CaptchaCache();

	private CaptchaCache() {
		// Create cache as the synchronized HashMap
		cache = Collections.synchronizedList(new LinkedList<Captcha>());
	}

	/**
	 * This method is used to create Captcha object and put it in cache
	 * 
	 * @param ipAddress
	 *            contains remote ip address of user
	 * @return created Captcha object
	 */
	public static Captcha createCaptcha(String ipAddress) {
		Captcha captcha = new Captcha();
		captcha.setIpAddress(ipAddress);
		cache.add(captcha);
		return captcha;
	}

	/**
	 * This method is used to delete all records from cache
	 */
	public static void cleanCache() {
		cache.clear();
	}


	/**
	 * This method is used for getting number of items in cache
	 * 
	 * @return cache size
	 */
	public static int getNumberOfItemsInCache() {
		return cache.size();
	}

	/**
	 * This method is used for removing Captcha object from cache which has the
	 * earliest issue date
	 * 
	 * @param ipAddress
	 *            contains remote ip address of user
	 */
	public static void removeOldestCaptchaFromCache(String ipAddress) {
		List<Captcha> listCapctchaByIp = cache.stream().filter(item -> item.getIpAddress().equals(ipAddress))
				.collect(Collectors.toList());
		Collections.sort(listCapctchaByIp);
		cache.remove(listCapctchaByIp.get(0));
	}

	/**
	 * This method is used for removing specific Captcha object from cache
	 * 
	 * @param captcha
	 *            contains specific Captcha object
	 */
	public static void removeCaptchafromCache(Captcha captcha) {
		cache.remove(captcha);
	}

	/**
	 * This method is used for removing specific Captcha object from cache by
	 * hashCode
	 * 
	 * @param hashCode
	 *            contains captcha code which is hashed with sha256
	 */
	public static void removeCaptchafromCacheByHashCode(String hashCode) {
		Optional<Captcha> captchaFromCache = cache.stream().filter(item -> item.getHashCode().equals(hashCode))
				.findFirst();
		if (captchaFromCache.isPresent()) {
			cache.remove(captchaFromCache.get());
		}

	}

	 
	 /**
	  * This method is used to delete all Captcha objects from cache which are older than specific date 
	  * @param date 
	  */
	 public static void removeFromCacheOlderThan(Date date){
		 List<Captcha> captchaFromCacheOlderThan = cache.stream()
			     .filter(item -> item.getIssueTime().before(date)).collect(Collectors.toList());
		 cache.removeAll(captchaFromCacheOlderThan);
	 }

	 /**
	  * This method is used for getting number of items in cache
	  * @return cache size
	  */
	 public static int getNumberOfItemsInCacheByIp(String ipAddress) {
         List<Captcha> listCapctchaByIp = cache.stream().filter(item -> item.getIpAddress().equals(ipAddress)).collect(Collectors.toList());
	  return listCapctchaByIp.size();
	 }
	 
	 
	 
	 /**
	  * This method is used for update captcha data in cache
	  * @param captcha specific Captcha object
	  */
	 public static void updateCaptcha(Captcha captcha){
		Optional<Captcha> captchaFromCache = cache.stream()
				.filter(item -> item.getHashCode().equals(captcha.getHashCode())).findFirst();

		if (captchaFromCache.isPresent()) {
			removeCaptchafromCache(captchaFromCache.get());
			cache.add(captcha);
		}
	}

	/**
	 * This method is used for checking if Captcha object exists in cache by
	 * specific hashCode and remove it
	 * 
	 * @param hashCode contains captcha code which is hashed with sha256
	 * @return true if captcha exists or false if not
	 */
	public static boolean validateAndRemove(String hashCode) {
        Optional<Captcha> captchaFromCache = cache.stream().filter(item -> item.getHashCode().equals(hashCode)).findFirst();
        if (captchaFromCache.isPresent()) {
            cache.remove(captchaFromCache.get());
            return true;
        } else {
            return false;
		}

	}
}
