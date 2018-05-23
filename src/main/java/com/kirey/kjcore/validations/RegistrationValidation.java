package com.kirey.kjcore.validations;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.hash.Hashing;
import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.dao.KjcUserAccountsDao;
import com.kirey.kjcore.data.entity.KjcUserAccounts;
import com.kirey.kjcore.features.exception.customexceptions.BusinessValidationException;
import com.kirey.kjcore.features.security.CaptchaCache;


/**Service used for handling registration related validation
 * @author 
 *
 */
@Service(value="registrationValidation")
public class RegistrationValidation extends BaseValidation{
	
	@Autowired
	private KjcUserAccountsDao kjcUserAccountsDao;

	
	/**This method is used to validate sign up when account exists or email exists in database
	 * @param kjcUserAccounts
	 * @throws BusinessValidationException
	 */
	public void validationForSignUp(KjcUserAccounts kjcUserAccounts){
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		
		KjcUserAccounts kjcUserAccountsTemp = kjcUserAccountsDao.findByUsername(kjcUserAccounts.getUsername());
		if(kjcUserAccountsTemp != null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_USER_EXIST));
		}
		
		List<String> listEmails = kjcUserAccountsDao.findAllEmails();
		if(listEmails.contains(kjcUserAccounts.getEmail())){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_USER_ADD_EMAIL_EXISTS));
		}
		
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
	
	/**The method validates when captcha is incorrect
	 * @param code
	 * @param hashCode
	 * @throws BusinessValidationException
	 */
	public void validationCaptcha(String code, String hashCode){
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		String tempHashCode = Hashing.sha256().hashString(code, StandardCharsets.UTF_8).toString();
		if (CaptchaCache.validateAndRemove(hashCode) && !hashCode.equals(tempHashCode)) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CAPTCHA_INCORECT));
		}
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**The method validates when email is incorrect
	 * @param email
	 * @throws BusinessValidationException
	 */
	public void validationForSaveMailHash(String email) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();		
		KjcUserAccounts kjcUserAccounts = kjcUserAccountsDao.findByEmail(email);
		if(kjcUserAccounts == null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_INCORECT));
		}
		
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
		
	}

	/**The method validates when mailhash is incorrect
	 * @param mailHash
	 * @throws BusinessValidationException
	 */
	public void validationForUserInfo(String mailHash) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();		
		KjcUserAccounts kjcUserAccounts = kjcUserAccountsDao.findByMailHash(mailHash);
		if(kjcUserAccounts == null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_MAILHASH_INCORECT));
		}
		
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**The method validates when secret code is incorrect
	 * @param mailHashSecret
	 * @throws BusinessValidationException
	 */
	public void validationForSaveNewPassword(String mailHashSecret) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();		
		KjcUserAccounts kjcUserAccounts = kjcUserAccountsDao.findBySecretHash(mailHashSecret);
		if(kjcUserAccounts == null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_MAILHASH_SECRET_INCORECT));
		}
		if (System.currentTimeMillis() - kjcUserAccounts.getMailHashTimestamp() > AppConstants.MAIL_HASH_DURATION_MILLIS) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_MAILHASH_EXPIRED));
		}
		
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
		
	}

	/**This method validates when mailhash is incorrect, or expired
	 * @param mailHash
	 * @throws BusinessValidationException
	 */
	public void validationForConfirmationRegistration(String mailHash) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		KjcUserAccounts kjcUserAccounts = kjcUserAccountsDao.findByMailHash(mailHash);
		if (kjcUserAccounts == null) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_MAILHASH_INCORECT));
		} else if (System.currentTimeMillis() - kjcUserAccounts.getMailHashTimestamp() > AppConstants.MAIL_HASH_DURATION_MILLIS) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_MAILHASH_EXPIRED));
		}
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**
	 * This method validates e-mail for editing userDetails
	 * @param kjcUserAccounts
 	 * @throws BusinessValidationException
	 */
	public void validationForEditUserDetails(KjcUserAccounts kjcUserAccounts) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		List<String> listEmails = kjcUserAccountsDao.findAllEmails();
		if(!Utilities.getUserFromContext().getEmail().equals(kjcUserAccounts.getEmail()) && listEmails.contains(kjcUserAccounts.getEmail())){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_EXISTS));
		}
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
}
