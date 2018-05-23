package com.kirey.kjcore.validations;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.features.exception.customexceptions.BusinessValidationException;

/**Service used to handle CSV file uploading validation
 * @author 
 *
 */
@Service(value="csvFileValidation")
public class CsvFileValidation extends BaseValidation {

	/**This method validates if CSV being uploaded has wrong delimeter type,is empty, headers aren't formated well,
	 * inputs are missing start and end tag.
	 * @param csvFile
	 * @throws BusinessValidationException
	 */
	public void doValidation(MultipartFile csvFile) {

		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		Map<String, String> availableLocales = Utilities.getAvailableLocales();
		
		byte[] bytes;
		try {
			bytes = csvFile.getBytes();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		
		String completeData = new String(bytes);
		String[] rows = completeData.split("\n");
		String[] header = rows[0].split(AppConstants.CVS_FILE_DELIMITER);
		
		String[] header1 = rows[0].split("\\s*,\\s*");
		String[] header2 = rows[0].split("\\t");
		String[] header3 = rows[0].split("\\|");
		
		if((header1.length>1 || header2.length>1 || header3.length>1) || (header.length<2)){
			validationErrorDtos.add(new ValidationErrorDto(getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CVS_WRONG_DELIMITER));
		}
		else{
		
			if (rows.length < 2) {
				validationErrorDtos.add(new ValidationErrorDto(getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CVS_MUST_CONTAINS_ONE_ROW));
			}
			if (!"genericName".equalsIgnoreCase(header[0])) {
				validationErrorDtos.add(new ValidationErrorDto(getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CVS_FIRST_COLUMM_NAME_IS_NOT_GENERIC_NAME));
			}
			if (!"defaultTranslation".equalsIgnoreCase(header[1])) {
				validationErrorDtos.add(new ValidationErrorDto(getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CVS_SECOND_COLUMN_NAME_IS_NOT_DEFAULT_TRANSLATON));
			}
	
			for (int i = 2; i < header.length; i++) {
				if (!availableLocales.containsKey(header[i].trim())) {
					validationErrorDtos.add(new ValidationErrorDto(getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CVS_LANGUAGE_HEADER_NOT_IN_RIGHT_FORMAT));
				}
			}
	
			for (int i = 1; i < rows.length; i++) {
				String[] columns = rows[i].split(AppConstants.CVS_FILE_DELIMITER);
				// first and second column
				if ((columns[0] == null || columns[0].equals("".trim()))
						&& (columns[1] == null || columns[1].equals("".trim()))) {
					validationErrorDtos.add(new ValidationErrorDto(getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CVS_GENERICNAME_DEFAULT_TRANSLATION_MANDATORY));
				}
	
				if (!columns[0].startsWith(AppConstants.TRANSLATION_START_TAG) || !columns[0].endsWith(AppConstants.TRANSLATION_END_TAG) ) {
					validationErrorDtos.add(new ValidationErrorDto(getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CVS_GENERICNAME_MUST_START_AND_END_WITH_TRANSLATION_TAG));
				}
	
			}
		}
		
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
}
