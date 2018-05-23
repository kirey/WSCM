package com.kirey.kjcore.api.pagemappers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.features.internationalization.Translation;

/**Custom mapper created for translation administration validation
*
*/
@DependsOn("translation")
@Component
public class AdminTranslationMapper implements KjcFieldMapper{
	
	@Autowired
	private Translation translation;

	/* (non-Javadoc)
	 * @see com.kirey.kjcore.api.pagemappers.FieldMapper#generateErrorsForFields(java.util.List)
	 */
	@Override
	public List<ValidationErrorDto> generateErrorsForFields(List<ValidationErrorDto> errors) {
		for(ValidationErrorDto validationErrorDto: errors){
			if(validationErrorDto.getErrorCode().trim().contains(ValidationErrorConstants.VALIDATION_BUSINESS_SOME_UNSAVED_TRANSLATIONS.trim()) ||
					validationErrorDto.getErrorCode().trim().contains(ValidationErrorConstants.VALIDATION_BUSINESS_CVS_GENERICNAME_MUST_START_AND_END_WITH_TRANSLATION_TAG.trim())
							|| validationErrorDto.getErrorCode().trim().contains(ValidationErrorConstants.VALIDATION_BUSINESS_CVS_WRONG_DELIMITER)){
				validationErrorDto.setFieldName("csvUpload");
				translation.init();
			}	
			if(validationErrorDto.getErrorCode().startsWith(ValidationErrorConstants.VALIDATION_BUSINESS_TRANSLATION_EXISTS) || 
					validationErrorDto.getErrorCode().startsWith(ValidationErrorConstants.VALIDATION_BUSINESS_TRANSLATION_NOT_EXISTS) ||
					validationErrorDto.getErrorCode().startsWith(ValidationErrorConstants.VALIDATION_BUSINESS_MODULE_NOT_EXISTS) ||
					validationErrorDto.getErrorCode().startsWith(ValidationErrorConstants.VALIDATION_BUSINESS_SECTION_NOT_EXISTS) ||
					validationErrorDto.getErrorCode().startsWith(ValidationErrorConstants.VALIDATION_BUSINESS_CVS_MUST_CONTAINS_ONE_ROW) ||
					validationErrorDto.getErrorCode().startsWith(ValidationErrorConstants.VALIDATION_BUSINESS_CVS_FIRST_COLUMM_NAME_IS_NOT_GENERIC_NAME) ||
					validationErrorDto.getErrorCode().startsWith(ValidationErrorConstants.VALIDATION_BUSINESS_CVS_SECOND_COLUMN_NAME_IS_NOT_DEFAULT_TRANSLATON) ||
					validationErrorDto.getErrorCode().startsWith(ValidationErrorConstants.VALIDATION_BUSINESS_CVS_LANGUAGE_HEADER_NOT_IN_RIGHT_FORMAT) ||
					validationErrorDto.getErrorCode().startsWith(ValidationErrorConstants.VALIDATION_BUSINESS_CVS_GENERICNAME_DEFAULT_TRANSLATION_MANDATORY)){
				
				validationErrorDto.setFieldName("mainComponentAlert");
			}
		}
		return errors;
	}

}

