package com.kirey.kjcore.features.exception.customexceptions;

import org.springframework.security.authentication.BadCredentialsException;

import com.kirey.kjcore.api.dto.RestResponseDto;

/**
 * Exception which is used in specific Unauthorized exceptions
 * for example DisabledException or CredentialsExpiredException
 * @author kitanoskan
 *
 */
public class SecurityUnauthorizedException extends BadCredentialsException {
	
	private static final long serialVersionUID = -4718556154069260197L;
	
	private RestResponseDto response;

	public SecurityUnauthorizedException(String errorCode, String message) {
		super(message);
		response = new RestResponseDto();
		response.setErrorCode(errorCode);
		response.setMessage(message);
	}
	
	public SecurityUnauthorizedException(String msg, Throwable thr) {
		super(msg, thr);
	}

	public RestResponseDto getResponse() {
		return response;
	}

	public void setResponse(RestResponseDto response) {
		this.response = response;
	}
	
	

}
