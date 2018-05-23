package com.kirey.kjcore.features.security;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.SecurityErrorConstants;


/**
 * 401 exception handling
 * @author randjelovicv
 *
 */
public class UnauthorizedEntryPoint implements AuthenticationEntryPoint {
	
	@Autowired
	ObjectMapper objectMapper;
	/* (non-Javadoc)
	 * @see org.springframework.security.web.AuthenticationEntryPoint#commence(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, org.springframework.security.core.AuthenticationException)
	 */
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) {

		// 401 security error response with RestMessageDto
		// ------------------------------------------------
		RestResponseDto restMessage = new RestResponseDto();
		restMessage.setMessage(SecurityErrorConstants.ERROR_SECURITY_UNAUTORIZED);
		restMessage.setStatusCode(HttpStatus.UNAUTHORIZED.value());

		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		
		
		try {
			response.getWriter().write(SecurityUtils.convertObjectToJson(objectMapper,restMessage));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}