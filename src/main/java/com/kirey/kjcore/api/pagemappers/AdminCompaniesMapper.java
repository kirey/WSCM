package com.kirey.kjcore.api.pagemappers;

import java.util.List;

import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;

/**Custom mapper created for companies administration validation
 *
 */
@Component
public class AdminCompaniesMapper implements KjcFieldMapper {
	
	/* (non-Javadoc)
	 * @see com.kirey.kjcore.api.pagemappers.FieldMapper#generateErrorsForFields(java.util.List)
	 */
	@Override
	public List<ValidationErrorDto> generateErrorsForFields(List<ValidationErrorDto> errors) {
		for (ValidationErrorDto validationErrorDto : errors) {
			switch (validationErrorDto.getErrorCode()) {
			case ValidationErrorConstants.VALIDATION_BUSINESS_COMPANY_ALREADY_EXISTS_IN_DB:
			case ValidationErrorConstants.VALIDATION_BUSINESS_COMPANY_CODE_BAD_FORMAT:
				validationErrorDto.setFieldName("company.code");
				break;
			default:
				break;
			}
		}
		return errors;
	}
}
