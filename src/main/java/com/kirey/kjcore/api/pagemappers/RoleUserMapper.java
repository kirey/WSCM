package com.kirey.kjcore.api.pagemappers;

import java.util.List;

import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;

/**Custom mapper created for user role management validation
*
*/
@Component
public class RoleUserMapper implements KjcFieldMapper{

	/* (non-Javadoc)
	 * @see com.kirey.kjcore.api.pagemappers.FieldMapper#generateErrorsForFields(java.util.List)
	 */
	@Override
	public List<ValidationErrorDto> generateErrorsForFields(List<ValidationErrorDto> errors) {
		for(ValidationErrorDto validationErrorDto: errors){
			switch(validationErrorDto.getErrorCode()){
			case ValidationErrorConstants.VALIDATION_BUSINESS_USER_NAME_EXISTS:
				validationErrorDto.setFieldName("addUsername");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_EXISTS:
			case ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_NAME_EXISTS:
				validationErrorDto.setFieldName("roleName");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_USER_EMAIL_FORMAT_BAD:
			case ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_EXISTS:
				validationErrorDto.setFieldName("email");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_BAD_USER_EXPIRY_DATE:
				validationErrorDto.setFieldName("date");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_COMPANY_REQUIRED:
			case ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_ADMIN_DEFAULT_COMPANY_ERROR:
				validationErrorDto.setFieldName("company");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_SUPER_ADMIN_UNIQUE:
			case ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_ADMIN_UNIQUE:
			case ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_SUB_ADMIN_UNIQUE:
				validationErrorDto.setFieldName("authorities");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_DOESNOT_EXISTS:

			case ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_ADMIN_MULTIPLE_COMPANY_ERROR:
			case ValidationErrorConstants.VALIDATION_BUSINESS_ROLE_SUPER_ADMIN_DEFAULT_COMPANY_ONLY:
			case ValidationErrorConstants.VALIDATION_BUSINESS_USERNAME_BAD_LENGTH:
				validationErrorDto.setFieldName("mainComponentAlert");
				break;
			default:
				break;
			}
		}
		return errors;
	}
}
