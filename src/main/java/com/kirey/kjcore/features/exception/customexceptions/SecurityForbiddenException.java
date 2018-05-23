package com.kirey.kjcore.features.exception.customexceptions;

import org.springframework.security.authentication.BadCredentialsException;

import com.kirey.kjcore.api.dto.RestResponseDto;

/**
 * Custom exception class used for Forbidden Validation
 * 
 * @author 
 *
 */
public class SecurityForbiddenException extends BadCredentialsException{

	private static final long serialVersionUID = 6508516339203394429L;

	private RestResponseDto response;

	public SecurityForbiddenException(String errorCode, String message) {
		super(message);
		response = new RestResponseDto();
		response.setErrorCode(errorCode);
		response.setMessage(message);
	}
	
	public SecurityForbiddenException(String msg, Throwable thr) {
		super(msg, thr);
	}

	public RestResponseDto getResponse() {
		return response;
	}

	public void setResponse(RestResponseDto response) {
		this.response = response;
	}
	
	
}
