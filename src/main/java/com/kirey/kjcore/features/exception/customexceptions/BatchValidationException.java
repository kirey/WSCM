package com.kirey.kjcore.features.exception.customexceptions;

import java.util.ArrayList;
import java.util.List;

import com.kirey.kjcore.data.entity.KjcBatchJobErrors;

/**
 * Custom exception class for Batch validation.
 * 
 * @author
 *
 */
public class BatchValidationException extends RuntimeException {

	private static final long serialVersionUID = -628868893262221270L;

	private List<KjcBatchJobErrors> errors = new ArrayList<>();

	public BatchValidationException(List<KjcBatchJobErrors> errors) {
		this.errors = errors;
	}

	public List<KjcBatchJobErrors> getErrors() {
		return errors;
	}

	public void setErrors(List<KjcBatchJobErrors> errors) {
		this.errors = errors;
	}

}
