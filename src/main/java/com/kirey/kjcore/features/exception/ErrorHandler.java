package com.kirey.kjcore.features.exception;

import java.nio.charset.StandardCharsets;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.api.pagemappers.KjcFieldMapper;
import com.kirey.kjcore.common.constants.ErrorConstants;
import com.kirey.kjcore.common.constants.SecurityErrorConstants;
import com.kirey.kjcore.common.util.PrintingToConsole;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.compositedao.ExceptionLoggerService;
import com.kirey.kjcore.features.exception.customexceptions.BusinessValidationException;
import com.kirey.kjcore.features.exception.customexceptions.BusinessWarningException;
import com.kirey.kjcore.features.exception.customexceptions.SecurityForbiddenException;
import com.kirey.kjcore.features.exception.customexceptions.FormalValidationException;
import com.kirey.kjcore.features.exception.customexceptions.ResourceNotFoundException;
import com.kirey.kjcore.features.exception.customexceptions.SecurityUnauthorizedException;
import com.kirey.kjcore.features.internationalization.Translation;

/**ExceptionHandler object that contains methods that are handling exceptions caught in controllers
 * @author 
 *
 */
@ControllerAdvice
@DependsOn("translation")
public class ErrorHandler extends ResponseEntityExceptionHandler {

	@Autowired
	private ExceptionLoggerService exceptionLoggerService;

	@Autowired
	private PrintingToConsole printer;

	@Autowired
	private Translation translation;
	
	@Autowired
	private ApplicationContext applicationContext;
	
	private static final String APPLICATION = "application";

	/**
	 * This method handles all exceptions handled by
	 * ResponseEntityExceptionHandler
	 * 
	 * @param ex
	 * @param body
	 * @param headers
	 * @param status
	 * @param request
	 * @return ResponseEntity<Object> containing error message, headers and http
	 *         status to return in controller
	 */
	@Override
	protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers,
			HttpStatus httpStatus, WebRequest request) {
		
		if (HttpStatus.INTERNAL_SERVER_ERROR.equals(httpStatus)) {
			request.setAttribute("javax.servlet.error.exception", ex, WebRequest.SCOPE_REQUEST);
		}
		
		HttpHeaders httpHeaders = createHeader();

		RestResponseDto restMessageDto = new RestResponseDto(HttpStatus.INTERNAL_SERVER_ERROR.value(),
				HttpStatus.INTERNAL_SERVER_ERROR.toString(), ErrorConstants.ERROR_KEY_GENERAL);

		printer.printMessage(this.getClass(), ErrorConstants.ERROR_INVOKING_URL + Utilities.getUrlFromRequest(
				((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()));
		printer.printMessage(this.getClass(), ErrorConstants.ERROR_IN + ex.getStackTrace()[0].getClassName() + ":"
				+ ex.getStackTrace()[0].getMethodName(), ex);

		try {
			exceptionLoggerService.saveException(ex, Utilities.getUrlFromRequest(
					((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()));
		}
		// in case of error when saving in DB
		catch (Exception exception) {
			printer.printMessage(this.getClass(), ErrorConstants.ERROR_SAVING_LOG, exception);
			restMessageDto.setMessage(ErrorConstants.ERROR_SAVING_LOG);
		}
		return translateResponse(restMessageDto, httpHeaders, httpStatus);
	}
	
	/**
	 * This method handles all exceptions and saves them in database
	 * @param ex
	 * @param req
	 * @return ResponseEntity<Object> containing error message, headers and http status to return in controller
	 */
	@ExceptionHandler(Exception.class)
	protected ResponseEntity<Object> handleRuntimeException(Exception ex, HttpServletRequest req){

			HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;				
			HttpHeaders headers = createHeader();
			
			RestResponseDto restMessageDto = new RestResponseDto(HttpStatus.INTERNAL_SERVER_ERROR.value(), HttpStatus.INTERNAL_SERVER_ERROR.toString(), ErrorConstants.ERROR_KEY_GENERAL);
			
			printer.printMessage(this.getClass(),ErrorConstants.ERROR_INVOKING_URL + Utilities.getUrlFromRequest(req));
			printer.printMessage(this.getClass(),ErrorConstants.ERROR_IN + ex.getStackTrace()[0].getClassName()+ ":" + ex.getStackTrace()[0].getMethodName(), ex);
			
			//Only RunTimeExceptions are saved into database
			try{
				exceptionLoggerService.saveException(ex, Utilities.getUrlFromRequest(req));
			}
			//in case of error when saving in DB 
			catch(Exception exception){
				printer.printMessage(this.getClass(),ErrorConstants.ERROR_SAVING_LOG, exception);
				restMessageDto.setMessage(ErrorConstants.ERROR_SAVING_LOG);
			}
			return translateResponse(restMessageDto, headers, httpStatus);
	}
 

	/**
	 * This method handles formal validation
	 * @param ex
	 * @return ResponseEntity<Object> containing list of binding results, http status, headers
	 */
	@ExceptionHandler(FormalValidationException.class)
	protected ResponseEntity<Object> handleValidationFormalException(FormalValidationException ex){

		HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
		HttpHeaders headers = createHeader();
		
		RestResponseDto restMessageDto = new RestResponseDto(Utilities.generateListFromBindingResult(ex.getValidationResult()));
		restMessageDto.setStatusCode(HttpStatus.BAD_REQUEST.value());
		restMessageDto.setMessage(ErrorConstants.ERROR_VALIDATION_KEY);
		return translateResponse(restMessageDto, headers, httpStatus);
	}
	
	/**
	 * This method handles bussines validation(invokes mapper based on pageId from BusinessValidationException and then creates response)
	 * @param ex
	 * @return ResponseEntity<Object> containing list of binding results, http status, headers
	 */
	@ExceptionHandler(BusinessValidationException.class)
	protected ResponseEntity<Object> handleBussinessValidationException(BusinessValidationException ex) {

		KjcFieldMapper className = (KjcFieldMapper) applicationContext.getBean("defaultMapper"); 
		if (ex.getErrors() != null && !ex.getErrors().isEmpty() && ex.getErrors().get(0).getPageId() != null) {
			className = (KjcFieldMapper) applicationContext.getBean(ex.getErrors().get(0).getPageId() + "Mapper");
		}
		
		RestResponseDto restMessageDto = new RestResponseDto(className.generateErrorsForFields(ex.getErrors()));
		restMessageDto.setStatusCode(HttpStatus.BAD_REQUEST.value());
		restMessageDto.setMessage(ErrorConstants.ERROR_VALIDATION_KEY);
			
		HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
		HttpHeaders headers = createHeader();
		return translateResponse(restMessageDto, headers, httpStatus);
	}

	/**
	 * This method handles bad credentials exception
	 * @param ex
	 * @param req
	 * @return ResponseEntity<RestResponseDto>
	 */
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<RestResponseDto> handleBadCredentialsException(BadCredentialsException ex, HttpServletRequest req) {
		try{
			exceptionLoggerService.saveException(ex, Utilities.getUrlFromRequest(req));
		}
		//in case of error when saving in DB 
		catch(Exception exception){
			printer.printMessage(this.getClass(),ErrorConstants.ERROR_SAVING_LOG, exception);			
		}		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.UNAUTHORIZED.value(),
				SecurityErrorConstants.ERROR_SECURITY_BAD_CREDENTIALS), HttpStatus.UNAUTHORIZED);
	}
	
	/**
	 * This method handles SecurityUnauthorizedException, custom exception which is used for UNAUTHORIZED exceptions like expired token and user disabled
	 * @param ex
	 * @return ResponseEntity<Object> containing RestResponseDto instance, http status, headers
	 */
	@ExceptionHandler(SecurityUnauthorizedException.class)
	protected ResponseEntity<Object> handleCredentialsException(SecurityUnauthorizedException ex){
		
		RestResponseDto restMessageDto = ex.getResponse();
		restMessageDto.setStatusCode(HttpStatus.UNAUTHORIZED.value());
				
		HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;
		HttpHeaders headers = createHeader();
		return translateResponse(restMessageDto, headers, httpStatus);
	}

	/**
	 * This method handles SecurityForbiddenException, custom exception which is used for FORBIDDEN exceptions and user disabled
	 * @param ex
	 * @return ResponseEntity<Object> containing RestResponseDto instance, http status, headers
	 */
	@ExceptionHandler(SecurityForbiddenException.class)
	protected ResponseEntity<Object> handleSecurityForbiddenException(SecurityForbiddenException ex){
		
		RestResponseDto restMessageDto = ex.getResponse();
		restMessageDto.setStatusCode(HttpStatus.FORBIDDEN.value());
				
		HttpStatus httpStatus = HttpStatus.FORBIDDEN;
		HttpHeaders headers = createHeader();
		return translateResponse(restMessageDto, headers, httpStatus);
	}

	/**This method handles HTTP status not found related exceptions
	 * @return ResponseEntity<RestResponceDto> containing headers and http status
	 */
	@ExceptionHandler(ResourceNotFoundException.class)
	protected ResponseEntity<RestResponseDto> handleNotFoundException() {
		
		HttpStatus httpStatus = HttpStatus.NOT_FOUND;
		HttpHeaders headers = createHeader();
		return new ResponseEntity<RestResponseDto>(null, headers, httpStatus);
	}

	/**This method handles BusinessWarningException
	 * @param ex
	 * @return ResponseEntity<Object> containing RestResponseDto instance, headers and HTTP status
	 */
	@ExceptionHandler(BusinessWarningException.class)
	protected ResponseEntity<Object> handleBussinessWarningException(BusinessWarningException ex) {

		KjcFieldMapper className = (KjcFieldMapper) applicationContext.getBean("defaultMapper"); 
		if (ex.getErrors() != null && !ex.getErrors().isEmpty() && ex.getErrors().get(0).getPageId() != null) {
			className = (KjcFieldMapper) applicationContext.getBean(ex.getErrors().get(0).getPageId() + "Mapper");
		}
		
		RestResponseDto restResponseDto = new RestResponseDto(className.generateErrorsForFields(ex.getErrors()), ex.getObject(), ex.getData());
		restResponseDto.setStatusCode(HttpStatus.ACCEPTED.value());	
		restResponseDto.setMessage(ErrorConstants.ERROR_VALIDATION_KEY);
		restResponseDto.setValidationObject(ex.getObject());
			
		HttpStatus httpStatus = HttpStatus.ACCEPTED;
		HttpHeaders headers = createHeader();
		return translateResponse(restResponseDto, headers, httpStatus);
	}
	
	
	/**A method that creates header ResponseEntities returning 
	 * @return HttpHeaders created
	 */
	private HttpHeaders createHeader() {
		HttpHeaders headers = new HttpHeaders();
		MediaType mediaType = new MediaType(APPLICATION, "json", StandardCharsets.UTF_8);
		headers.setContentType(mediaType);
		return headers;
	}
	
	/**This method is used to translate error messages
	 * @param restMessageDto
	 * @param headers
	 * @param httpStatus
	 * @return ResponseEntity<Object> containing headers and HTTP status
	 */
	private ResponseEntity<Object> translateResponse(RestResponseDto restMessageDto, HttpHeaders headers, HttpStatus httpStatus){
		
		String translationOfError;
		try {
			translationOfError = translation.translateErrorMessage(restMessageDto);
			return new ResponseEntity<Object>(translationOfError, headers, httpStatus);
		} catch (JsonProcessingException e) {
			printer.printMessage(this.getClass(), ErrorConstants.ERROR_TRANSLATION_JSON_PROCESSING);
			return new ResponseEntity<Object>(null, headers, httpStatus);
		}	
	}
}
