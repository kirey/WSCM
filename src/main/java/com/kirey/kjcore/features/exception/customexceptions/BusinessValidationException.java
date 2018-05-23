package com.kirey.kjcore.features.exception.customexceptions;

import java.util.ArrayList;
import java.util.List;

import com.kirey.kjcore.api.dto.ValidationErrorDto;

/**
 * Validation exception which is used in all cases when doing business validation
 * contains list of all ValidationErrorDto's which occurred during business validation and each of them contains details about specific validation error
 * @author kitanoskan
 *
 */
public class BusinessValidationException extends RuntimeException {

	private static final long serialVersionUID = -3381151197765276157L;

	private List<ValidationErrorDto> errors = new ArrayList<ValidationErrorDto>();
	
	public BusinessValidationException(List<ValidationErrorDto> errors) {
		this.setErrors(errors);
	}

	public List<ValidationErrorDto> getErrors() {
		return errors;
	}

	public void setErrors(List<ValidationErrorDto> errors) {
		this.errors = errors;
	}
}
