package com.kirey.kjcore.api.dto;

import java.io.Serializable;

/**
 * Custom DTO used for inline resources
 */
public class InlineResourcesDto implements Serializable {

	private static final long serialVersionUID = 4288878797542381241L;
	
	private Integer id;
	private String resourceFile;
	private String cdResource;
	private String description;
	private String resourceName;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getResourceFile() {
		return resourceFile;
	}

	public void setResourceFile(String resourceFile) {
		this.resourceFile = resourceFile;
	}

	public String getCdResource() {
		return cdResource;
	}

	public void setCdResource(String cdResource) {
		this.cdResource = cdResource;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getResourceName() {
		return resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

}
