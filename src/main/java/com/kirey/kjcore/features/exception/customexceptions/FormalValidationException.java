package com.kirey.kjcore.features.exception.customexceptions;

import org.springframework.validation.BindingResult;

/**
 * Validation exception which is used when doing formal validation in controller
 * @author kitanoskan
 *
 */
public class FormalValidationException extends RuntimeException{

	private static final long serialVersionUID = 6077438965335586243L;

	private transient BindingResult validationResult; 
	
	public FormalValidationException(BindingResult validationResult) {
		this.validationResult = validationResult;
	}

	public BindingResult getValidationResult() {
		return validationResult;
	}

	public void setValidationResult(BindingResult validationResult) {
		this.validationResult = validationResult;
	}

}
