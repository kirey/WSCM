package com.kirey.wscm.api.dto;

import java.io.Serializable;

/**
 * Custom DTO used for rest responses and validation
 */
public class RestResponseDto implements Serializable {

	private static final long serialVersionUID = -4990734081656652299L;
	
	private String message;
    private String errorCode;
    private int statusCode;
    private Object data;
    private Object validationObject;
   	

	public RestResponseDto(){}
	
	
	public RestResponseDto(Object data, int statusCode){
		this.data = data;
		this.statusCode = statusCode;
	}
	
	public RestResponseDto(Object data, String msg){
		this.data = data;
		this.message = msg;
	}
	
    public RestResponseDto(Object data, int status, String msg){
    	this.data = data;
    	this.statusCode = status;
		this.message = msg;
	}

	
    public RestResponseDto(int status, String msg){
		this.message = msg;
		this.statusCode = status;
	}
    
    public RestResponseDto(int status, String errorCode, String msg){
    	this.statusCode = status;
		this.message = msg;
		this.errorCode = errorCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public Object getValidationObject() {
		return validationObject;
	}

	public void setValidationObject(Object validationObject) {
		this.validationObject = validationObject;
	}

}
