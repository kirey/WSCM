package com.kirey.kjcore.features.exception.customexceptions;

import java.util.List;

import com.kirey.kjcore.api.dto.ValidationErrorDto;

/**Custom exception class used for Bussiness Validation
 * @author
 *
 */
public class BusinessWarningException extends BusinessValidationException{

	private static final long serialVersionUID = 7412529087639322284L;
	private Object object;
	private Object data; 
	
	public BusinessWarningException(List<ValidationErrorDto> errors) {
		super(errors);
		object = null;
	}

	public BusinessWarningException(List<ValidationErrorDto> errors, Object object) {
		super(errors);
		this.object = object;
	} 
	
	public BusinessWarningException(List<ValidationErrorDto> errors, Object object, Object data) {
		super(errors);
		this.object = object;
		this.data =  data;
	}

	public Object getObject() {
		return object;
	}

	public void setObject(Object object) {
		this.object = object;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}
}
