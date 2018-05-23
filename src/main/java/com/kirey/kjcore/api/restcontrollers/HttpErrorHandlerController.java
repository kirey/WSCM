package com.kirey.kjcore.api.restcontrollers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.SecurityErrorConstants;

@RestController
public class HttpErrorHandlerController {

	@RequestMapping(value = "/404")
	public ResponseEntity<RestResponseDto> error404() {
		RestResponseDto restResponse = new RestResponseDto();
		restResponse.setMessage(SecurityErrorConstants.ERROR_SECURITY_NOTFOUND);
		restResponse.setStatusCode(HttpStatus.NOT_FOUND.value());

		return new ResponseEntity<RestResponseDto>(restResponse, HttpStatus.NOT_FOUND);
	}
	
	
	@RequestMapping(value = "/403")
	public ResponseEntity<RestResponseDto> error403() {
		RestResponseDto restResponse = new RestResponseDto();
		restResponse.setMessage(SecurityErrorConstants.ERROR_SECURITY_FORBIDDEN);
		restResponse.setStatusCode(HttpStatus.FORBIDDEN.value());

		return new ResponseEntity<RestResponseDto>(restResponse, HttpStatus.FORBIDDEN);
	}

}
