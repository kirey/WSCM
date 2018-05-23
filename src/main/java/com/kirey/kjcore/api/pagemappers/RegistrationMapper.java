package com.kirey.kjcore.api.pagemappers;

import java.util.List;

import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;


@Component
public class RegistrationMapper implements KjcFieldMapper{

	/* (non-Javadoc)
	 * @see com.kirey.kjcore.api.pagemappers.FieldMapper#generateErrorsForFields(java.util.List)
	 */
	@Override
	public List<ValidationErrorDto> generateErrorsForFields(List<ValidationErrorDto> errors) {
		for(ValidationErrorDto validationErrorDto: errors){
			switch(validationErrorDto.getErrorCode()){
			case ValidationErrorConstants.VALIDATION_BUSINESS_USER_EXIST:
				validationErrorDto.setFieldName("username");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_CAPTCHA_INCORECT:
				validationErrorDto.setFieldName("captcha");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_USER_ADD_EMAIL_EXISTS:
				validationErrorDto.setFieldName("email");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_MAILHASH_INCORECT:
				validationErrorDto.setFieldName("mailHash");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_EXISTS:
				validationErrorDto.setFieldName("mainComponentAlert");
			default:
				break;
			}
		}
		return errors;
	}

}
