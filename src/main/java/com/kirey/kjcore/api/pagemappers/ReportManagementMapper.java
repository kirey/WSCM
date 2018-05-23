package com.kirey.kjcore.api.pagemappers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.features.internationalization.Translation;

/**Custom mapper created for report management validation
*
*/
@DependsOn("translation")
@Component
public class ReportManagementMapper implements KjcFieldMapper {
	
	@Autowired
	private Translation translation;

	/* (non-Javadoc)
	 * @see com.kirey.kjcore.api.pagemappers.FieldMapper#generateErrorsForFields(java.util.List)
	 */
	@Override
	public List<ValidationErrorDto> generateErrorsForFields(List<ValidationErrorDto> errors) {
		
		for (ValidationErrorDto validationErrorDto : errors) {
			if(validationErrorDto.getErrorCode().trim().contains(ValidationErrorConstants.VALIDATION_BUSINESS_SOME_UNSAVED_TRANSLATIONS.trim()) ||
					validationErrorDto.getErrorCode().trim().contains(ValidationErrorConstants.VALIDATION_BUSINESS_CVS_GENERICNAME_MUST_START_AND_END_WITH_TRANSLATION_TAG.trim())
							|| validationErrorDto.getErrorCode().trim().contains(ValidationErrorConstants.VALIDATION_BUSINESS_CVS_WRONG_DELIMITER)){
				validationErrorDto.setFieldName("csvUpload");
				translation.init();
			}
			switch (validationErrorDto.getErrorCode()) {
			case ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_ALREADY_EXISTS:
				validationErrorDto.setFieldName("reportName");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_CLASS_ALREADY_EXISTS_IN_DB:
				validationErrorDto.setFieldName("javaValidationClass");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_RESULT_EMPTY:
			case ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_NOT_EXISTS:
			case ValidationErrorConstants.VALIDATION_BUSINESS_BOOKED_REPORT_COULD_NOT_DELETE:
			case ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_MUST_HAVE_COMPANY:
				validationErrorDto.setFieldName("mainComponentAlert");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_VALIDATION_CLASS_DESCRIPTION:
				validationErrorDto.setFieldName("validationClassDescription");
				break;
			case ValidationErrorConstants.VALIDATION_BUSINESS_BOOKED_REPORT_UNAVAILABLE_DATE:
				validationErrorDto.setFieldName("bookedDate");
				break;	
			default:
				break;
		
		     }
		}
		return errors;
    }
}
