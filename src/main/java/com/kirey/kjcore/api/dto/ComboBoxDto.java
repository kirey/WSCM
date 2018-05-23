package com.kirey.kjcore.api.dto;

import java.io.Serializable;

/**
 * Custom DTO used for Combobox
 */
public class ComboBoxDto implements Serializable {

	private static final long serialVersionUID = 7967118963397452247L;

	private Integer key;

	private String value;

	public Integer getKey() {
		return key;
	}

	public void setKey(Integer key) {
		this.key = key;
	}

	public String getName() {
		return value;
	}

	public void setName(String name) {
		this.value = name;
	}
}
