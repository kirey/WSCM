package com.kirey.wscm.security;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import com.kirey.wscm.data.entity.WscmUserAccounts;

/**
 * @author paunovicm
 *
 */

public class SecurityUtils {
	
	
	public static WscmUserAccounts getUserFromContext() {

		SecurityContext securityContext = SecurityContextHolder.getContext();
		Object details = null;

		try {
			details = securityContext.getAuthentication().getPrincipal();
		} catch (NullPointerException e) {
			details = null;
		}

		WscmUserAccounts user = null;
		if (details != null && details instanceof WscmUserAccounts) {
			user = (WscmUserAccounts) details;
		}

		return user;
	}
	

}
