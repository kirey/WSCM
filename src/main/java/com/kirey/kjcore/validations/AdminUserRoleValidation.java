package com.kirey.kjcore.validations;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.compositedao.UserRoleService;
import com.kirey.kjcore.data.dao.KjcApplicationRolesDao;
import com.kirey.kjcore.data.dao.KjcUserAccountsDao;
import com.kirey.kjcore.data.entity.KjcApplicationRoles;
import com.kirey.kjcore.data.entity.KjcUserAccounts;
import com.kirey.kjcore.features.exception.customexceptions.BusinessValidationException;

/**A component used to handle user role administration validation
 * @author
 *
 */
@Component
public class AdminUserRoleValidation extends BaseValidation{
	
	@Autowired
	private KjcUserAccountsDao kjcUserAccountsDao;
	
	@Autowired
	private KjcApplicationRolesDao kjcApplicationRolesDao;
	
	@Autowired
	private UserRoleService userRoleService;
	

	/**
	 * This method validates multiple roles and multiple companies assigned to user
	 * @param kjcUserAccounts
	 * @return List<ValidationErrorDto> with errors
	 */
	private List<ValidationErrorDto> multipleSelectValidation(KjcUserAccounts kjcUserAccounts){
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		
		List<KjcApplicationRoles> listRoles = kjcUserAccounts.getKjcApplicationRoleses();
		List<String> listRoleNames = new ArrayList<>();
		for (KjcApplicationRoles kjcApplicationRoles : listRoles) {
			listRoleNames.add(kjcApplicationRoles.getName());
			if(!userRoleService.findFilteredRoleNames().contains(kjcApplicationRoles.getName())){
				validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_IS_NOT_ALLOWED));
			}
		}
		
		if(listRoles.size() > 1 && listRoleNames.contains(AppConstants.ROLE_SUPER_ADMIN)){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_SUPER_ADMIN_UNIQUE));
		}
		
		if(listRoles.size() > 1 && listRoleNames.contains(AppConstants.ROLE_ADMIN)){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_ADMIN_UNIQUE));
		}
		
		if(listRoles.size() > 1 && listRoleNames.contains(AppConstants.ROLE_SUBADMIN)){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_SUB_ADMIN_UNIQUE));
		}
		
		if(!listRoleNames.contains(AppConstants.ROLE_SUPER_ADMIN) && AppConstants.DEFAULT_COMPANY_CODE.equals(kjcUserAccounts.getKjcCompanies().getCode())){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_ADMIN_DEFAULT_COMPANY_ERROR));
		}

		return validationErrorDtos;
	}
	
		
	/**This method validates user for saving in database
	 * @param kjcUserAccounts
	 * @throws BusinessValidationException
	 */
	public void validationForAddNewUser(KjcUserAccounts kjcUserAccounts) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		KjcUserAccounts kjcUserAccountsTemp = kjcUserAccountsDao.findByUsername(kjcUserAccounts.getUsername());
		if(kjcUserAccountsTemp != null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_USER_NAME_EXISTS));
		}
		Boolean flag = false;
		if (kjcUserAccounts.getEmail() != null){
	        Pattern p = Pattern.compile("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
	        Matcher m = p.matcher(kjcUserAccounts.getEmail());
	        flag = m.find();
	    }
		if(!flag){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_USER_EMAIL_FORMAT_BAD));
		}
		List<String> listEmails = kjcUserAccountsDao.findAllEmails();
		if(listEmails.contains(kjcUserAccounts.getEmail())){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_EXISTS));
		}	
		
		KjcUserAccounts kjcUserAccountsFromContext = Utilities.getUserFromContext();
		
		if(kjcUserAccounts.getAccountExpiryDate() != null && kjcUserAccountsFromContext.getAccountExpiryDate() != null && kjcUserAccounts.getAccountExpiryDate() > kjcUserAccountsFromContext.getAccountExpiryDate()){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_BAD_USER_EXPIRY_DATE));
		}
		
		if(kjcUserAccounts.getKjcCompanies() == null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_COMPANY_REQUIRED));
		}
		
		
		validationErrorDtos.addAll(this.multipleSelectValidation(kjcUserAccounts));

		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
	
	/**This method validates if role already exists in database
	 * @param kjcApplicationRoles
	 * @throws BusinessValidationException
	 */
	public void validationForAddNewRole(KjcApplicationRoles kjcApplicationRoles){
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		if(kjcApplicationRolesDao.findByName(kjcApplicationRoles.getName()) != null){		
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_EXISTS));
		}
		
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
	
	/**This method validates if translation rolename exists in database or role doesn't exist in database
	 * @param kjcApplicationRoles
	 * @throws BusinessValidationException
	 */
	public void validationForEditRole(KjcApplicationRoles kjcApplicationRoles){
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		List<KjcApplicationRoles> list = kjcApplicationRolesDao.findAllWithoutOne(kjcApplicationRoles.getId());
		for (KjcApplicationRoles kjcApplicationRoles2 : list) {
			if(kjcApplicationRoles2.getName().equals(kjcApplicationRoles.getName())){				
				validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_NAME_EXISTS));
			}
		}
		KjcApplicationRoles kjcApplicationRolesTemp = kjcApplicationRolesDao.findById(kjcApplicationRoles.getId());
			if(kjcApplicationRolesTemp == null) {
				validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_DOESNOT_EXISTS));
			}
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
	
	/**This method validates if translation username or email exist in database
	 * @param kjcUserAccounts
	 * @param kjcUserAccountsForEdit
	 * @throws BusinessValidationException
	 */
	public void validationForEditUser(KjcUserAccounts kjcUserAccounts, KjcUserAccounts kjcUserAccountsForEdit) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		if (!kjcUserAccounts.getUsername().equals(kjcUserAccountsForEdit.getUsername())) {
			if (kjcUserAccountsDao.findByUsername(kjcUserAccounts.getUsername()) != null) {
				validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_USER_NAME_EXISTS));
			}
		}
		List<String> listEmails = kjcUserAccountsDao.findAllEmails();
		if(!kjcUserAccounts.getEmail().equals(kjcUserAccountsForEdit.getEmail()) && listEmails.contains(kjcUserAccounts.getEmail())){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_EXISTS));
		}
		
		KjcUserAccounts kjcUserAccountsFromContext = Utilities.getUserFromContext();
		
		if(kjcUserAccounts.getAccountExpiryDate() != null && kjcUserAccountsFromContext.getAccountExpiryDate() != null && kjcUserAccounts.getAccountExpiryDate() > kjcUserAccountsFromContext.getAccountExpiryDate()){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_BAD_USER_EXPIRY_DATE));
		}
		
		if(kjcUserAccounts.getKjcCompanies() == null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_COMPANY_REQUIRED));
		}
		
		validationErrorDtos.addAll(this.multipleSelectValidation(kjcUserAccounts));
		
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
	
	/**This method validates if role doesn't exist in database
	 * @param id
	 * @return
	 * @throws BusinessValidationException
	 */
	public KjcApplicationRoles validationForDeleteRole(Integer id){
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		KjcApplicationRoles kjcApplicationRoles = kjcApplicationRolesDao.findById(id);
		if(kjcApplicationRoles == null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_DOESNOT_EXISTS));
		}
		
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
		return kjcApplicationRoles;
	}


	public void validationForGetUsers(String username) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		if(username == null || username.length() < 3){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_USERNAME_BAD_LENGTH));
		}
		
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}


}
