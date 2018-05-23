package com.kirey.kjcore.api.dto;

import java.io.Serializable;

import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotBlank;

import com.kirey.kjcore.common.constants.ValidationErrorConstants;

/**
 * Custom DTO used for companies
 */
public class CompanyDto implements Serializable {

	/**
	 * 
	 */
	protected static final long serialVersionUID = 8436711870885192346L;
	protected Integer id;
	protected String code;
	@NotBlank(message = ValidationErrorConstants.VALIDATION_FORMAL_COMPANY_DESCRIPTION_EMPTY)
	@Size(min = 1, max = 255, message = ValidationErrorConstants.VALIDATION_FORMAL_COMPANY_DESCRIPTION_TOO_LONG)
	protected String description;
	@NotBlank(message = ValidationErrorConstants.VALIDATION_FORMAL_COMPANY_NAME_EMPTY)
	@Size(min = 1, max = 255, message = ValidationErrorConstants.VALIDATION_FORMAL_COMPANY_NAME_TOO_LONG)
	protected String name;
	protected boolean flActive;
	protected Long passwordTimeout;

	public CompanyDto() {
		super();
	}

	public CompanyDto(Integer id, String code, String description, String name, boolean flActive, Long passwordTimeout) {
		super();
		this.id = id;
		this.code = code;
		this.description = description;
		this.name = name;
		this.flActive = flActive;
		this.passwordTimeout = passwordTimeout;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isFlActive() {
		return flActive;
	}

	public void setFlActive(boolean flActive) {
		this.flActive = flActive;
	}

	public Long getPasswordTimeout() {
		return passwordTimeout;
	}

	public void setPasswordTimeout(Long passwordTimeout) {
		this.passwordTimeout = passwordTimeout;
	}

}
