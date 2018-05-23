package com.kirey.kjcore.api.pagemappers;

import java.util.List;

import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;

/**Custom mapper created for product form validation
*
*/
@Component
public class FormProductValidationMapper implements KjcFieldMapper {

	/* (non-Javadoc)
	 * @see com.kirey.kjcore.api.pagemappers.FieldMapper#generateErrorsForFields(java.util.List)
	 */
	@Override
	public List<ValidationErrorDto> generateErrorsForFields(List<ValidationErrorDto> errors) {
			
		for (ValidationErrorDto validationErrorDto : errors) {
			switch (validationErrorDto.getErrorCode()) {
			case ValidationErrorConstants.VALIDATION_BUSINESS_PRODUCT_NOT_FOUND:
				validationErrorDto.setFieldName("nameGenericName");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_PRODUCT_AMOUNT_TOO_BIG:
				validationErrorDto.setFieldName("minAmount");
				validationErrorDto.setErrorCode(validationErrorDto.getErrorCode() + validationErrorDto.getAdditionalDataForField());
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_PRODUCT_PRICE:
			case ValidationErrorConstants.VALIDATION_BUSINESS_PRODUCT_PRICE_IS_EMPTY:
				validationErrorDto.setFieldName("price");
				break;
			default:
				break;
			}
		}
		
		return errors;
	}
}
