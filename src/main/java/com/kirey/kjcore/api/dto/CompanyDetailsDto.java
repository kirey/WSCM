package com.kirey.kjcore.api.dto;

import java.io.Serializable;
import java.util.List;

/**
 * Custom DTO used for Companies
 */
public class CompanyDetailsDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8062175144001430751L;
	private CompanyDto company;
	protected List<CompanyCssDto> activeCss;
	protected List<CompanyCssDto> previousCss;
	protected List<CompanyCssDto> defaultCss;

	private List<CompanyCssDto> newCss;

	public CompanyDto getCompany() {
		return company;
	}

	public void setCompany(CompanyDto company) {
		this.company = company;
	}

	public List<CompanyCssDto> getActiveCss() {
		return activeCss;
	}

	public void setActiveCss(List<CompanyCssDto> activeCss) {
		this.activeCss = activeCss;
	}

	public List<CompanyCssDto> getPreviousCss() {
		return previousCss;
	}

	public void setPreviousCss(List<CompanyCssDto> previousCss) {
		this.previousCss = previousCss;
	}

	public List<CompanyCssDto> getDefaultCss() {
		return defaultCss;
	}

	public void setDefaultCss(List<CompanyCssDto> defaultCss) {
		this.defaultCss = defaultCss;
	}

	public List<CompanyCssDto> getNewCss() {
		return newCss;
	}

	public void setNewCss(List<CompanyCssDto> newCss) {
		this.newCss = newCss;
	}

}
