package com.kirey.kjcore.features.security;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.ErrorConstants;
import com.kirey.kjcore.common.constants.SecurityErrorConstants;
import com.kirey.kjcore.common.util.PrintingToConsole;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.compositedao.ExceptionLoggerService;


/**
 * 403 exception handling
 * @author randjelovicv
 *
 */
public class AccessDeniedExceptionHandler implements AccessDeniedHandler  {

	@Autowired
	private ExceptionLoggerService exceptionLoggerService;
	
	@Autowired
	private PrintingToConsole printer;
	
	@Autowired
	ObjectMapper objectMapper;
	
    /* (non-Javadoc)
     * @see org.springframework.security.web.access.AccessDeniedHandler#handle(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, org.springframework.security.access.AccessDeniedException)
     */
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException ex) {
		RestResponseDto restResponse = new RestResponseDto();
		restResponse.setMessage(SecurityErrorConstants.ERROR_SECURITY_FORBIDDEN);
		restResponse.setStatusCode(HttpStatus.FORBIDDEN.value());

    	
    	try{
    		exceptionLoggerService.saveException(ex, Utilities.getUrlFromRequest(request));  
		}
		catch(Exception exception){
			printer.printMessage(this.getClass(),ErrorConstants.ERROR_SAVING_LOG, exception);
		}
    	finally {
    		response.setStatus(HttpStatus.FORBIDDEN.value());
    		try {
				response.getWriter().write(SecurityUtils.convertObjectToJson(objectMapper, restResponse));
			} catch (IOException e) {
				printer.printMessage(this.getClass(),ErrorConstants.ERROR_SAVING_LOG, e);
			}
		}
    }
}