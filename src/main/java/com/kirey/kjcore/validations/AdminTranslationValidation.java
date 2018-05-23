package com.kirey.kjcore.validations;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.data.entity.KjcDictionary;
import com.kirey.kjcore.features.exception.customexceptions.BusinessValidationException;
import com.kirey.kjcore.features.internationalization.Translation;

/**A component used to handle translation administration validation
 * @author 
 *
 */
@DependsOn("translation")
@Component
public class AdminTranslationValidation extends BaseValidation{
	
	@Autowired
	private Translation translation;
	
	
	private List<ValidationErrorDto> validationErrorDtos = new ArrayList<>();

	
	/**This method validates if translation already exists in database
	 * @param listKjcDictionary
	 * @throws BusinessValidationException
	 */
	public void validationForSaveNewTranslation(List<KjcDictionary> listKjcDictionary) {
		validationErrorDtos = new ArrayList<>();
		HashMap<String, Object> mapDictionary = (HashMap<String, Object>) translation.getMapDictionary();
		for (KjcDictionary kjcDictionary : listKjcDictionary) {
			if (mapDictionary.containsKey(kjcDictionary.getGenericName())) {
				String genericName = "";
				String[] res = kjcDictionary.getGenericName().split("\\.");
				for (int i = 3; i<res.length-1; i++) {
					genericName = genericName.concat(res[i]+".");
				}
				genericName = genericName.substring(0, genericName.length()-1);
				validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_TRANSLATION_EXISTS+ ": " + genericName));
			}
		}
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
	
	/**This method validates if translation doesn't exist in database
	 * @param kjcDictionary
	 * @throws BusinessValidationException
	 */
	public void validationForUpdateTranslation(KjcDictionary kjcDictionary){
		validationErrorDtos = new ArrayList<>();
		if(kjcDictionary == null){			
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_TRANSLATION_NOT_EXISTS));			
		}
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**This method validates if translation doesn't exists in loaded map
	 * @param translations
	 * @throws BusinessValidationException
	 */
	public void validationForDeleteTranslation(String translations) {
		validationErrorDtos = new ArrayList<>();
		Map<String, Object> mapDictionary = translation.getMapDictionary();
		if(!mapDictionary.containsKey(translations)){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_TRANSLATION_NOT_EXISTS));
		}
		
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
	
	/**This method validates if module doesn't exist in database
	 * @param module
	 * @throws BusinessValidationException
	 */
	public void validationIfModuleExist(String module) {
		validationErrorDtos = new ArrayList<>();
		List<KjcDictionary> modulTemp = translation.findByModule(module);
		if(modulTemp.isEmpty()){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_MODULE_NOT_EXISTS));
		}
		
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**This method validates if section doesn't exist in database
	 * @param section
	 * @throws BusinessValidationException
	 */
	public void validationIfSectionExist(String section) {
		validationErrorDtos = new ArrayList<>();
		List<KjcDictionary> sectionTemp = translation.findBySection(section);
		if(sectionTemp.isEmpty()){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_SECTION_NOT_EXISTS));
		}
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
}
