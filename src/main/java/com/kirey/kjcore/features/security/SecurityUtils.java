package com.kirey.kjcore.features.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.crypto.codec.Hex;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kirey.kjcore.common.constants.SecurityErrorConstants;
import com.kirey.kjcore.data.entity.KjcApplicationRoles;
import com.kirey.kjcore.data.entity.KjcUserAccounts;

/**
 * The class has a number of static methods used as token utilities
 * @author randjelovicv
 *
 */
public class SecurityUtils {
	
	private SecurityUtils(){
	}
	
	/**
	 * Create token as a String based on data from User object 
	 * @param user is object of User entity
	 * @return token as a String
	 */
	public static String createToken(KjcUserAccounts user) {
		long currnetTime = System.currentTimeMillis();
		
		StringBuilder signatureBuilder = new StringBuilder();
		signatureBuilder.append(user.getId());
		signatureBuilder.append(currnetTime);

		MessageDigest digest;
		try {
			digest = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			throw new IllegalStateException("No MD5 algorithm available!");
		}
		return new String(Hex.encode(digest.digest(signatureBuilder.toString().getBytes())));
	}
	
	public static String createMailHashSecret(KjcUserAccounts user){
		long currnetTime = System.currentTimeMillis();
		
		StringBuilder signatureBuilder = new StringBuilder();
		signatureBuilder.append(user.getId());
		signatureBuilder.append(currnetTime);

		MessageDigest digest;
		try {
			digest = MessageDigest.getInstance("SHA-256");
		} catch (NoSuchAlgorithmException e) {
			throw new IllegalStateException("No MD5 algorithm available!");
		}

		return new String(Hex.encode(digest.digest(signatureBuilder.toString().getBytes())));
	}
	

	/**
	 * Validate if the token supplied as authToken argument is valid. The token is valid if
	 * it is equal to the token stored in the User object and if its session has not expired. 
	 * 
	 * @param user
	 * @param authToken
	 * @return boolean validation result
	 */
	public static boolean validateToken(KjcUserAccounts user, String authToken) {
		boolean validationResult=false;
		long currnetTime = System.currentTimeMillis();
		long tokenIssuedTime = 0;
		if (user != null) 
			tokenIssuedTime = user.getTokenTimestamp();
		long calculatedSessonTime =  currnetTime - tokenIssuedTime;
		
		if (user != null && user.getToken().equals(authToken) && (calculatedSessonTime<maxSessionDuration(user)) && (calculatedSessonTime>0)){
			validationResult=true;
		}
		
//		Throw exception if token expired
//		--------------------------------
//		if (!((calculatedSessonTime<maxSessionDuration(user)) && (calculatedSessonTime>0))){
//			throw new RuntimeException("Token elapsed!", new AuthenticationException());
//		}

		return validationResult;
	}
	
	
	/**
	 * Validate if the token supplied as mobileToken argument is valid. The token is valid if
	 * it is equal to the mobileToken stored in the User object and if its session has not expired. 
	 * 
	 * @param user
	 * @param mobileToken
	 * @return boolean validation result
	 */
	public static boolean validateMobileToken(KjcUserAccounts user, String mobileToken) {
		boolean validationResult=false;
		long currnetTime = System.currentTimeMillis();
		long tokenIssuedTime = 0;
		if (user != null) 
			tokenIssuedTime = user.getMobileTokenTimestamp();
		long calculatedSessonTime =  currnetTime - tokenIssuedTime;
		
		if (user != null && user.getMobileToken().equals(mobileToken) && (calculatedSessonTime>0)){
			validationResult=true;
		}
		
//		Throw exception if token expired
//		--------------------------------
//		if (!((calculatedSessonTime<maxSessionDuration(user)) && (calculatedSessonTime>0))){
//			throw new RuntimeException("Token elapsed!", new AuthenticationException());
//		}

		return validationResult;
	}

	
	/**
	 * The method calculates the max session duration in the following way:
	 * 		- if user has a timeout defined, then this time is used as the session duration
	 * 		- if user does not have a timeout defined, then session duration is taken as timeout filed from the role with the longest timeout defined. 
	 * @param user
	 * @return String result
	 */
	public static long maxSessionDuration(KjcUserAccounts user){
		if(user.getTimeout() != null && user.getTimeout()>0){
			return user.getTimeout();
		}
		
	    long sessionDuration=0;
		for(KjcApplicationRoles role : user.getKjcApplicationRoleses()){
			if(role.getTimeout() != null && role.getTimeout()>sessionDuration) 
				sessionDuration=role.getTimeout();
		}
		return sessionDuration;
	}
	
	
    public static String convertObjectToJson( ObjectMapper mapper, Object object) {
        if (object == null) {
            return null;
        }
        String result;
		try {
			result = mapper.writeValueAsString(object);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
        return result;
    }
    
    /**
	 * Extract X-AUTH-TOKEN from the HTTP request
	 * 
	 * @param httpRequest of type HttpServletRequest
	 * @return X-AUTH-TOKEN of String type
	 */
	public static String extractAuthTokenFromRequest(HttpServletRequest httpRequest) {
		/* Get token from header */
		String authToken = httpRequest.getHeader("X-Auth-Token");

		/* If token not found get it from request parameter */
		if (authToken == null) {
			authToken = httpRequest.getParameter("token");
		}
		return authToken;
	}
	
	 /**
		 * Extract Mobile-Auth-Token from the HTTP request
		 * 
		 * @param httpRequest of type HttpServletRequest
		 * @return Mobile-Auth-Token of String type
		 */
	public static String extractMobileAuthTokenFromRequest(HttpServletRequest httpRequest) {
		/* Get token from header */
		String mobileToken = httpRequest.getHeader("Mobile-Auth-Token");

		/* If token not found get it from request parameter */
		if (mobileToken == null) {
			mobileToken = httpRequest.getParameter("mobileToken");
		}
		return mobileToken;
	}
	
	
	/**
	 * Convert the ServletRequest into HttpServletRequest
	 * 
	 * @param request of type ServletRequest
	 * @return HttpServletRequest
	 */
	public static HttpServletRequest getAsHttpRequest(ServletRequest request) {
		if (!(request instanceof HttpServletRequest)) {
			throw new RuntimeException(SecurityErrorConstants.HTTP_REQUEST_EXPECTED);
		}
		return (HttpServletRequest) request;
	}
	
	public static String generateRandomWords(int lenght) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiopasdfhgjklzxcvbnm1234567890";
        StringBuilder sb = new StringBuilder();
        Random rnd = new Random();
        while (sb.length() < lenght) {
            int index = rnd.nextInt(chars.length());
            sb.append(chars.charAt(index));
        }
        return sb.toString();
    }

	
	
}