package com.kirey.kjcore.api.restcontrollers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.api.dto.UserTransfer;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ResponseMessagesConstants;
import com.kirey.kjcore.common.constants.SecurityErrorConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.dao.KjcUrlRoutesDao;
import com.kirey.kjcore.data.dao.KjcUserAccountsDao;
import com.kirey.kjcore.data.entity.KjcApplicationRoles;
import com.kirey.kjcore.data.entity.KjcUrlRoutes;
import com.kirey.kjcore.data.entity.KjcUserAccounts;
import com.kirey.kjcore.features.exception.customexceptions.SecurityUnauthorizedException;
import com.kirey.kjcore.features.internationalization.Translation;
import com.kirey.kjcore.features.security.CaptchaCache;
import com.kirey.kjcore.features.security.Captcha;
import com.kirey.kjcore.validations.RegistrationValidation;

/**Rest controller for user profile administration
 * @author 
 *
 */
@RestController
@RequestMapping(value = "/rest/users")
public class UserProfileController {

	@Autowired
	@Qualifier("authenticationManager")
	private AuthenticationManager authManager;

	@Autowired
	private KjcUserAccountsDao kjcUserAccountsDao;

	@Autowired
	private KjcUrlRoutesDao kjcUrlRoutesDao;

	@Autowired
	private Translation translation;
	
	@Autowired
	private RegistrationValidation registrationValidation;
	
	/**
	 * This method returns all details for current user
	 * @return Response Entity containing user details and HTTP status
	 */
	@RequestMapping(value = "/userDetails", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getUserDetails() {
		KjcUserAccounts userAccount = Utilities.getUserFromContext();
		List<String> roles = new ArrayList<String>();
		List<KjcApplicationRoles> listRole = userAccount.getKjcApplicationRoleses();
		for (KjcApplicationRoles rola : listRole) {
			roles.add(rola.getName());
		}
		KjcUserAccounts updateUser = kjcUserAccountsDao.findById(userAccount.getId());
		List<KjcUrlRoutes> userRoutes = kjcUrlRoutesDao.findRoutesByUser(updateUser);
		for (KjcUrlRoutes kjcUrlRoutes : userRoutes) {
			kjcUrlRoutes.setKjcApplicationRoleses(null);
		}
		Map<String, String> languages = translation.findFullNameDistinctLanguages();
		UserTransfer userTransfer = new UserTransfer(userAccount.getUsername(), roles, AppConstants.CSS_COMPANY_PREFIX,
				userAccount.getDefaultLanguage(), userRoutes, userAccount.getEmail(), languages,
				userAccount.getKjcCompanies() == null ? null : userAccount.getKjcCompanies().getId(), userAccount.getAccountExpiryDate());
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(userTransfer, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	
	/*
	 * UNUSED!!
	 
	/**
	 * This method sets active company to user
	 * @param companyId
	 * @return Response Entity containing response message and  HTTP status
	 /
	@RequestMapping(value = "/selectCompany", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> selectCompany(@RequestParam Integer companyId) {
		KjcUserAccounts kjcUserAccounts = Utilities.getUserFromContext();
		boolean flag = false;
		if (kjcUserAccounts.getKjcCompanieses().size() > 1) {
			for (KjcCompanies kjcCompany : kjcUserAccounts.getKjcCompanieses()) {
				if (kjcCompany.getId() == companyId) {
					kjcUserAccounts.setKjcCompanies(kjcCompany);
					flag = true;
				}
			}					
		}	
		if (flag) {
			kjcUserAccountsDao.attachDirty(kjcUserAccounts);
		} else {
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), ResponseMessagesConstants.RESPONSE_ALERT_MESSAGE_BAD_COMPANY), HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<RestResponseDto>(HttpStatus.OK);
	}
	*/
	/**
	 * This method is used for logout 
	 * @return Response Entity containing HTTP status
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> logout() {

		kjcUserAccountsDao.logoutUser(Utilities.getUserFromContext());
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), ""), HttpStatus.OK);
	}
	
	/**A method that creates role map
	 * @param userDetails
	 * @return Map<String, Boolean> containing user roles
	 */
	@SuppressWarnings("unused")
	private Map<String, Boolean> createRoleMap(UserDetails userDetails) {
		Map<String, Boolean> roles = new HashMap<String, Boolean>();
		for (GrantedAuthority authority : userDetails.getAuthorities()) {
			roles.put(authority.getAuthority(), Boolean.TRUE);
		}
		return roles;
	}
	
	
	/*
	 * UNUSED

	/**A method that returns all active companies but default 
	 * @param kjcUserAccounts
	 * @return LinkedHashMap<Integer, String> containing company details
	 /
	private LinkedHashMap<Integer, String> getActiveCompaniesWithoutDefault(KjcUserAccounts kjcUserAccounts) {
		LinkedHashMap<Integer, String> companies = new LinkedHashMap<>();
		List<KjcCompanies> companiesList = kjcUserAccounts.getKjcCompanieses();
		for (KjcCompanies company : companiesList) {
			if (company.isFlActive() && !AppConstants.DEFAULT_COMPANY_CODE.equals(company.getCode())) {
				companies.put(company.getId(), company.getName());
			}
		}
		return companies;
	}
	 */

	/**
	 * This method changes user password
	 * @param oldNewPass contains old password and new password through Map
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/userPassword", method = RequestMethod.PUT)
	public ResponseEntity<RestResponseDto> editPassword(@RequestParam String code, @RequestParam String hashCode, @RequestBody Map<String, String> oldNewPass) {
		registrationValidation.validationCaptcha(code, hashCode);
		kjcUserAccountsDao.changePasswordByUser(oldNewPass);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_PASSCODE_SUCCESSFULLY_EDITED), HttpStatus.OK);
	}

	/**
	 * This method edits user details
	 * @param kjcUserAccounts
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/userDetails", method = RequestMethod.PUT)
	public ResponseEntity<Object> editUserDetails(@RequestParam String code, @RequestParam String hashCode, @RequestBody KjcUserAccounts kjcUserAccounts) {
		registrationValidation.validationCaptcha(code, hashCode);
		KjcUserAccounts kjcUserAccountsForEdit = Utilities.getUserFromContext();
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				kjcUserAccountsForEdit.getUsername(), kjcUserAccounts.getPassword());
		try {
			this.authManager.authenticate(authenticationToken);
		} catch (Exception e) {
			throw new SecurityUnauthorizedException(
					SecurityErrorConstants.ERROR_CODE_SECURITY_EDIT_DETAILS_BAD_CREDENTIALS,
					SecurityErrorConstants.ERROR_SECURITY_EDIT_DETAILS_BAD_CREDENTIALS);
		}
		kjcUserAccountsForEdit.setDefaultLanguage(kjcUserAccounts.getDefaultLanguage());
		registrationValidation.validationForEditUserDetails(kjcUserAccounts);
		kjcUserAccountsForEdit.setEmail(kjcUserAccounts.getEmail());
		kjcUserAccountsDao.attachDirty(kjcUserAccountsForEdit);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_USER_SUCCESSFULLY_EDITED), HttpStatus.OK);
	}	
}