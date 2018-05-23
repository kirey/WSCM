package com.kirey.kjcore.api.dto;

import java.io.Serializable;

/**
 * Class used for the companies css files management
 * 
 * @author darabanan
 *
 */
public class CompanyCssDto implements Serializable {

	private static final long serialVersionUID = -7468301775364578966L;

	private String key;
	private String name;
	private String value;
	
	
	public CompanyCssDto() {
		super();
	}

	public CompanyCssDto(String key, String name, String value) {
		super();
		this.key = key;
		this.name = name;
		this.value = value;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

}
