package com.kirey.kjcore.api.restcontrollers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ResponseMessagesConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.compositedao.CompaniesService;
import com.kirey.kjcore.data.dao.KjcApplicationRolesDao;
import com.kirey.kjcore.data.dao.KjcCompaniesDao;
import com.kirey.kjcore.data.dao.KjcUserAccountsDao;
import com.kirey.kjcore.data.entity.KjcApplicationRoles;
import com.kirey.kjcore.data.entity.KjcUserAccounts;
import com.kirey.kjcore.validations.AdminUserRoleValidation;

/**Rest controller used for user administration for KJCore
 * @author 
 *
 */
@RestController
@RequestMapping(value = "/rest/admin/users", produces = "application/json; charset=UTF-8")
public class AdminUserRoleController {
	
	@Autowired
	private KjcUserAccountsDao kjcUserAccountsDao;
	
	@Autowired
	private KjcApplicationRolesDao kjcApplicationRolesDao;

	@Autowired
	private AdminUserRoleValidation adminUserRoleValidation;

	@Autowired
	private KjcCompaniesDao kjcCompaniesDao;
	
	@Autowired
	private CompaniesService companiesService;
	
	/**
	 * This method is used for getting list of all companies
	 * @return ResponseEntity containing the list of companies and HTTP status code
	 */
	@RequestMapping(value = "company", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getCompanies() {
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(kjcCompaniesDao.findAll(), HttpStatus.OK.value()), HttpStatus.OK);	
	}	
	
	/**
	 * This method is used for getting list of all active companies
	 * @return ResponseEntity containing the list of companies and HTTP status code
	 */
	@RequestMapping(value = "/activeCompany", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getCompaniesWithoutDefault() {
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(companiesService.findAllActiveCompanies(), HttpStatus.OK.value()), HttpStatus.OK);	
	}
	
	/**
	 * This method is used for add new user in database
	 * @param kjcUserAccounts
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> addNewUser(@RequestBody KjcUserAccounts kjcUserAccounts) {
		if(Utilities.isRole(AppConstants.ROLE_SUPER_ADMIN)){
			List<String> listRoleNames = new ArrayList<>();
			for (KjcApplicationRoles kjcApplicationRole : kjcUserAccounts.getKjcApplicationRoleses()) {
				listRoleNames.add(kjcApplicationRole.getName());
			}
			if(listRoleNames.contains(AppConstants.ROLE_SUPER_ADMIN)){
				kjcUserAccounts.setKjcCompanies(kjcCompaniesDao.findDefaultCompanyWithCss());
			}	
		}
		if(Utilities.isRole(AppConstants.ROLE_ADMIN)){
			kjcUserAccounts.setKjcCompanies(Utilities.getUserFromContext().getKjcCompanies());
		}
		adminUserRoleValidation.validationForAddNewUser(kjcUserAccounts);
		kjcUserAccountsDao.saveNewUserEncryptPassword(kjcUserAccounts);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_SUCCESSFULLY_ADDED_USER + " " + kjcUserAccounts.getUsername()), HttpStatus.CREATED);
	}

	/**
	 * This method is used for getting users by selected filter.
	 * @param company contains id of company
	 * @param role contains name of role
	 * @param username contains characters for searching by username
	 * @return ResponseEntity containing the list of users and HTTP status code
	 */
	@RequestMapping(value = "/filtered", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllFilteredUsers(@RequestParam(required = false) Integer company, @RequestParam String role, @RequestParam String username) {
		List<KjcUserAccounts> listUsers = new ArrayList<>();
		if(Utilities.isRole(AppConstants.ROLE_SUPER_ADMIN)){
			listUsers = kjcUserAccountsDao.findFiltered(company, role, username);
		}
		if(Utilities.isRole(AppConstants.ROLE_ADMIN) || Utilities.isRole(AppConstants.ROLE_SUBADMIN)){
			listUsers = kjcUserAccountsDao.findFiltered(Utilities.getUserFromContext().getKjcCompanies().getId(), role, username);
		}
		
		if(listUsers.isEmpty()){
		
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), ResponseMessagesConstants.RESPONSE_ALERT_MESSAGE_NO_USER_MATCH), HttpStatus.BAD_REQUEST);
		} else
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(listUsers, HttpStatus.OK.value()), HttpStatus.OK);
	}
		
	/**
	 * This method is used to change the enabled flag of the user. Only user with enabled flag will be able to login on sistem.
	 * @param id of specified user
	 * @param checked contains values 0 or 1 that define whether the enabled flag will be set to true or false.
	 * @return  ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/enable/{id}", method = RequestMethod.PUT)
	public ResponseEntity<RestResponseDto> setEnable(@PathVariable Integer id, @RequestParam(name = "checked") Boolean checked) {
		KjcUserAccounts kjcUserAccounts = kjcUserAccountsDao.findById(id);
		String oldToken = kjcUserAccounts.getToken();
		kjcUserAccounts.setEnabled(checked);
		kjcUserAccounts.setToken(null);
		kjcUserAccountsDao.saveToken(kjcUserAccounts, oldToken);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_USER_STATUS_CHANGED + " " + kjcUserAccounts.getUsername()), HttpStatus.OK);
	}
	 
	/**
	 * This method is used to edit user
	 * @param kjcUserAccounts
	 * @return  ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> editUser(@RequestBody KjcUserAccounts kjcUserAccounts) {
		KjcUserAccounts kjcUserAccountsForEdit = kjcUserAccountsDao.findById(kjcUserAccounts.getId());
		String oldToken = kjcUserAccountsForEdit.getToken();
		if(Utilities.isRole(AppConstants.ROLE_SUPER_ADMIN)){
			List<KjcApplicationRoles> listApplicationRoles = kjcUserAccounts.getKjcApplicationRoleses();
			List<String> listRoleNames = new ArrayList<>();
			for (KjcApplicationRoles kjcApplicationRoles : listApplicationRoles) {
				listRoleNames.add(kjcApplicationRoles.getName());
			}
			if(listRoleNames.contains(AppConstants.ROLE_SUPER_ADMIN)){
				kjcUserAccounts.setKjcCompanies(kjcCompaniesDao.findDefaultCompanyWithCss());
			}				
		}
		adminUserRoleValidation.validationForEditUser(kjcUserAccounts, kjcUserAccountsForEdit);
		kjcUserAccounts.setToken(null);
		if (kjcUserAccounts.getPassword() == null) {
			kjcUserAccountsDao.editUser(kjcUserAccounts, oldToken);
		} else {
			kjcUserAccountsDao.editUser(kjcUserAccounts, oldToken);
			kjcUserAccountsDao.changePassword(kjcUserAccounts);			
		}
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_SUCCESSFULLY_EDITED_USER + " " + kjcUserAccounts.getUsername()), HttpStatus.OK);
	}
	
	/**
	 * This method is used to edit user
	 * @param kjcUserAccounts
	 * @return  ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/role", method = RequestMethod.POST)
	public ResponseEntity<Object> addNewRole(@RequestBody KjcApplicationRoles kjcApplicationRoles){
		adminUserRoleValidation.validationForAddNewRole(kjcApplicationRoles);
		kjcApplicationRolesDao.attachDirty(kjcApplicationRoles);
		
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_SUCCESSFULLY_ADDED_ROLE + " " + kjcApplicationRoles.getName()), HttpStatus.OK);
	}

	/**
	 * This method gets list of roles for user logged as ROLE_ADMIN
	 * @return ResponseEntity containing list of all roles and HTTP status code
	 */
	@RequestMapping(value = "/role", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getRoles() {
		List<KjcApplicationRoles> roleList = new ArrayList<>();
		if(Utilities.isRole(AppConstants.ROLE_SUPER_ADMIN)){
			roleList = kjcApplicationRolesDao.findAll();
		}
		if(Utilities.isRole(AppConstants.ROLE_ADMIN) || Utilities.isRole(AppConstants.ROLE_SUBADMIN)){
			roleList = kjcApplicationRolesDao.findAllWithoutSuperAdmin();
		}
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(roleList, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * This method deletes role from database
	 * @param id
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/role/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteRole(@PathVariable Integer id) {
		
		KjcApplicationRoles kjcApplicationRoles = adminUserRoleValidation.validationForDeleteRole(id);
		kjcApplicationRolesDao.delete(kjcApplicationRoles);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_SUCCESSFULLY_DELETED_ROLE + " " + kjcApplicationRoles.getName()),	HttpStatus.OK);
	}

	/**
	 * This method edits role in database
	 * @param kjcApplicationRoles
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/role", method = RequestMethod.PUT)
	public ResponseEntity<Object> editRole(@RequestBody KjcApplicationRoles kjcApplicationRoles) {
		adminUserRoleValidation.validationForEditRole(kjcApplicationRoles);
		kjcApplicationRolesDao.updateRole(kjcApplicationRoles);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_SUCCESSFULLY_EDITED_ROLE + " " + kjcApplicationRoles.getName()), HttpStatus.OK);
		
	}

}
