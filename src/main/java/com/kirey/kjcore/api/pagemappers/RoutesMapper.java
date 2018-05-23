package com.kirey.kjcore.api.pagemappers;

import java.util.List;

import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;

/**Custom mapper created for route administration validation
*
*/
@Component
public class RoutesMapper implements KjcFieldMapper{

	/* (non-Javadoc)
	 * @see com.kirey.kjcore.api.pagemappers.FieldMapper#generateErrorsForFields(java.util.List)
	 */
	@Override
	public List<ValidationErrorDto> generateErrorsForFields(List<ValidationErrorDto> errors) {
		for(ValidationErrorDto validationErrorDto: errors){
			switch(validationErrorDto.getErrorCode()){
			case ValidationErrorConstants.VALIDATION_BUSINESS_ROUTE_NAME_EXISTS:
			case ValidationErrorConstants.VALIDATION_BUSINESS_URL_EXISTS:
				validationErrorDto.setFieldName("routeName");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_ROUTE_DOESNOT_EXIST:
				validationErrorDto.setFieldName("mainComponentAlert");
				break;
			default:
				break;
			}
		}
		return errors;
	}

}
