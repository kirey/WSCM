package com.kirey.kjcore.api.pagemappers;

import java.util.List;

import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;

/**Custom mapper created for email administration validation
*
*/
@Component
public class AdminEmailsMapper implements KjcFieldMapper{

	/* (non-Javadoc)
	 * @see com.kirey.kjcore.api.pagemappers.FieldMapper#generateErrorsForFields(java.util.List)
	 */
	@Override
	public List<ValidationErrorDto> generateErrorsForFields(List<ValidationErrorDto> errors) {
		for(ValidationErrorDto validationErrorDto: errors){
			switch(validationErrorDto.getErrorCode()){
			case ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_CONFIG_ALREADY_EXISTS_IN_DB:
			case ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_CONFIG_NAME_FORMAT_BAD:	
			case ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_TEMPLATE_ALREADY_EXISTS_IN_DB:
			case ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_TEMPLATE_NAME_FORMAT_BAD:				
				validationErrorDto.setFieldName("name");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_CONFIG_EMAIL_FORMAT_BAD:
				validationErrorDto.setFieldName("emailAddress");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_TEMPLATE_CID_DUPLICATED:
				validationErrorDto.setFieldName("cdResource");
				break;
			default:
				break;
			}
		}
		return errors;
	}

}
