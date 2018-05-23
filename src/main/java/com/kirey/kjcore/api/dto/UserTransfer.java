package com.kirey.kjcore.api.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.kirey.kjcore.data.entity.KjcUrlRoutes;

/**
 * Custom DTO used for user transfer
 */
public class UserTransfer implements Serializable {

	private static final long serialVersionUID = -4286361033799013538L;

	private final String username;
	private List<String> roles;
	private final String companyCssPrefix; 
	private final String defaultLanguage;
	private final List<KjcUrlRoutes> userRoutes;
	private final String email;
	private final Map<String, String> languages;
	private final Integer companyId;
	private final Long accountExpiryDate;

	public UserTransfer(String username, List<String> roles, String companyCssPrefix, String defaultLanguage,
			List<KjcUrlRoutes> userRoutes, String email, Map<String, String> languages, Integer companyId, Long accountExpiryDate) {
		this.username = username;
		this.roles = roles;
		this.companyCssPrefix = companyCssPrefix;
		this.defaultLanguage = defaultLanguage;
		this.userRoutes = userRoutes;
		this.email = email;
		this.languages = languages;
		this.companyId = companyId;
		this.accountExpiryDate = accountExpiryDate;
	}

	public String getUsername() {
		return this.username;
	}

	public List<String> getRoles() {
		return this.roles;
	}

	public String getCompanyCssPrefix() {
		return companyCssPrefix;
	}

	public String getDefaultLanguage() {
		return defaultLanguage;
	}

	public List<KjcUrlRoutes> getUserRoutes() {
		return userRoutes;
	}

	public String getEmail() {
		return email;
	}

	public Map<String, String> getLanguages() {
		return languages;
	}

	public Integer getCompanyId() {
		return companyId;
	}

	public Long getAccountExpiryDate() {
		return accountExpiryDate;
	}


}