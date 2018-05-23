package com.kirey.kjcore.features.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.ErrorConstants;
import com.kirey.kjcore.common.constants.SecurityErrorConstants;
import com.kirey.kjcore.common.util.PrintingToConsole;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.compositedao.ExceptionLoggerService;

public class ExceptionHandlerFilter extends OncePerRequestFilter {
	
	@Autowired
	private ExceptionLoggerService exceptionLoggerService;
	
	@Autowired
	private PrintingToConsole printer;
	
	@Autowired
	ObjectMapper objectMapper;

	/* (non-Javadoc)
	 * @see org.springframework.web.filter.OncePerRequestFilter#doFilterInternal(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, javax.servlet.FilterChain)
	 */
	@Override
	public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) {
		try {
			filterChain.doFilter(request, response);
		} catch (RuntimeException | ServletException |IOException e) {

			// General security error response
			// -------------------------------
			RestResponseDto restResponse = new RestResponseDto();
			restResponse.setMessage(SecurityErrorConstants.ERROR_SECURITY_GENERAL);
			restResponse.setStatusCode(500);

			response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
			try {
				//write into db
				exceptionLoggerService.saveSecurityException(e, Utilities.getUrlFromRequest(request));
			} catch (Exception e1) {
				printer.printMessage(this.getClass(),ErrorConstants.ERROR_SAVING_LOG, e1);
			}
			
			try {
				response.getWriter().write(SecurityUtils.convertObjectToJson(objectMapper, restResponse));
			} catch (IOException e2) {
				printer.printMessage(this.getClass(),SecurityErrorConstants.ERROR_SECURITY_GENERAL, e2);
				
			}
		}
	}

}
