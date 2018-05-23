package com.kirey.kjcore.api.pagemappers;

import java.util.List;

import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;

/**Custom mapper created for batch management validation
*
*/
@Component
public class BatchManagementValidationMapper implements KjcFieldMapper {

	/* (non-Javadoc)
	 * @see com.kirey.kjcore.api.pagemappers.FieldMapper#generateErrorsForFields(java.util.List)
	 */
	@Override
	public List<ValidationErrorDto> generateErrorsForFields(List<ValidationErrorDto> errors) {
		for (ValidationErrorDto validationErrorDto : errors) {
			switch (validationErrorDto.getErrorCode()) {
			case ValidationErrorConstants.VALIDATION_BUSINESS_JOB_NAME_DOESNT_EXIST:
			case ValidationErrorConstants.VALIDATION_BUSINESS_JOB_ALREADY_USED:
			case ValidationErrorConstants.VALIDATION_BUSINESS_FAKE_USER_DOESNT_EXIST:
				validationErrorDto.setFieldName("jobName");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_TRIGGER_NAME_DOESNT_EXIST:
			case ValidationErrorConstants.VALIDATION_BUSINESS_TRIGGER_ALREADY_USED:
				validationErrorDto.setFieldName("triggerName");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_PARAMETER_ALREADY_EXIST:
				validationErrorDto.setFieldName("kjcTaskParameterses");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_SCHEDULER_ALREADY_EXIST:
				validationErrorDto.setFieldName("name");
				break;
			default:
				break;
			}
		}
		
		return errors;
	}

}
