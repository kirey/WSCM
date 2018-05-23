package com.kirey.kjcore.api.pagemappers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ResponseMessagesConstants;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;

/**Custom mapper created for class loading validation
*
*/
@Component
public class ClassLoadingMapper implements KjcFieldMapper {

	/* (non-Javadoc)
	 * @see com.kirey.kjcore.api.pagemappers.FieldMapper#generateErrorsForFields(java.util.List)
	 */
	@Override
	public List<ValidationErrorDto> generateErrorsForFields(List<ValidationErrorDto> errors) {
		
		List<ValidationErrorDto> newFieldsError = new ArrayList<ValidationErrorDto>();
		ValidationErrorDto valDto;
		
		for (ValidationErrorDto validationErrorDto : errors) {
			switch (validationErrorDto.getErrorCode()) {
			case ValidationErrorConstants. VALIDATION_BUSINESS_ATTEMPT_TO_UPLOAD_CLASS_WITH_INTERFACE:
			case ValidationErrorConstants. VALIDATION_BUSINESS_ATTEMPT_TO_UPLOAD_CLASS_WITHOUT_INTERFACE:	
			case ValidationErrorConstants. VALIDATION_BUSINESS_CLASS_ALREADY_EXISTS_IN_DB:	
			case ValidationErrorConstants. VALIDATION_BUSINESS_CLASSNAME_MISMATCH:	
			case ValidationErrorConstants. VALIDATION_BUSINESS_ATTEMPT_TO_UPLOAD_CLASS_WITHOUT_PARENT:
			case ValidationErrorConstants. VALIDATION_BUSINESS_CLASS_EMPTY:
				validationErrorDto.setFieldName("javaFile"); 
				valDto = new ValidationErrorDto(validationErrorDto.getPageId(),validationErrorDto.getErrorCode());
				valDto.setFieldName("compiledFile");
				newFieldsError.add(valDto);
			break;
			case ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_CATEGORY_SUCCESSFULLY_DELETEED:
				validationErrorDto.setFieldName("categoriesTable");
			break;
			case ValidationErrorConstants. VALIDATION_BUSINESS_CATEGORIES_EXIST:
				validationErrorDto.setFieldName("categoryEdit");
			break;
			case ValidationErrorConstants. VALIDATION_BUSINESS_CLASS_REPORT_EXIST:
			case ValidationErrorConstants. VALIDATION_BUSINESS_CLASS_ALREADY_DELETED:
			case ValidationErrorConstants. VALIDATION_BUSINESS_CATEGORIES_CONTAINS_CLASSES:
			case ValidationErrorConstants. VALIDATION_BUSINESS_CLASS_NOTFOUND:
			case ValidationErrorConstants. VALIDATION_BUSINESS_CLASS_NOT_EXISTS_IN_DB:
			case ValidationErrorConstants.VALIDATION_BUSINESS_CATEGORIES_ALREADY_DELETED:
				validationErrorDto.setFieldName("mainComponentAlert");
			break;
			default:
				break;
			}
		}
		
		if(!newFieldsError.isEmpty())
			errors.addAll(newFieldsError);
		return errors;
	}
}
