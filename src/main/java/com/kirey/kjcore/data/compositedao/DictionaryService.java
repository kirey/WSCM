package com.kirey.kjcore.data.compositedao;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.data.dao.KjcDictionaryDao;
import com.kirey.kjcore.data.dao.KjcResourceBundleDao;
import com.kirey.kjcore.data.entity.KjcDictionary;
import com.kirey.kjcore.data.entity.KjcResourceBundle;
import com.kirey.kjcore.features.exception.customexceptions.BusinessValidationException;
import com.kirey.kjcore.features.internationalization.Translation;
import com.kirey.kjcore.validations.BaseValidation;

/**A service containing methods related to translations
 * @author
 *
 */
@DependsOn("translation")
@Service
public class DictionaryService extends BaseValidation{

	@Autowired
	KjcDictionaryDao kjcDictionaryDao;

	@Autowired
	KjcResourceBundleDao kjcResourceBundleDao;

	@Autowired
	private Translation translation;


	/**
	 * This method is used to save translation from csv file, if checked is set then method
	 * override existing translation
	 * @param csvFile
	 * @param checked
	 * @throws BusinessValidationException
	 */
	@Transactional
	public void saveTranslationsFromCsvFile(MultipartFile csvFile, int checked) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();

		byte[] bytes;
		try {
			bytes = csvFile.getBytes();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		String completeData = new String(bytes);
		String[] rows = completeData.split("\n");
		String[] header = rows[0].split(AppConstants.CVS_FILE_DELIMITER);
		KjcDictionary kjcDictionary;

		for (int i = 1; i < rows.length; i++) {
			String[] columns = rows[i].split(AppConstants.CVS_FILE_DELIMITER);
			KjcDictionary existInDb = translation.findByGenericName(columns[0]);
			kjcDictionary = new KjcDictionary();
			kjcDictionary.setGenericName(columns[0].trim());
			kjcDictionary.setDefaultTranslation(columns[1].trim());

			if (existInDb == null) {
				for (int j = 2; j < columns.length; j++) {
					if (columns[j] != null && !"".equals(columns[j].trim())) {
						KjcResourceBundle rb = new KjcResourceBundle();
						rb.setKjcDictionary(kjcDictionary);
						rb.setLanguage(header[j].trim());
						rb.setTranslation(columns[j].trim());
						kjcDictionary.getKjcResourceBundles().add(rb);
					}
				}
				kjcDictionaryDao.attachDirty(kjcDictionary);
			} else {
				List<KjcResourceBundle> existRB = existInDb.getKjcResourceBundles();				
				boolean flag = false;
				for (int j = 2; j < columns.length; j++) {
					for (KjcResourceBundle item : existRB) {
						if (header[j].trim().equals(item.getLanguage())) {
							flag = true;
							//if checked all translations from database will be override, if not there will be business validation messages wich translations are not same
							if(checked==1){
								if(columns[j].trim() == null || "".equals(columns[j].trim())){
									kjcResourceBundleDao.delete(item);
								}else{
									item.setTranslation(columns[j].trim());
									kjcResourceBundleDao.attachDirty(item);
								}
									
							}else if(!columns[j].trim().equals(item.getTranslation())){
								validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_SOME_UNSAVED_TRANSLATIONS + " " + item.getTranslation()));
							}			
							break;
						} else
							flag = false;
					}
					if (flag == false) {
						KjcResourceBundle rb = new KjcResourceBundle();
						rb.setKjcDictionary(existInDb);
						rb.setLanguage(header[j].trim());
						rb.setTranslation(columns[j].trim());
						existInDb.getKjcResourceBundles().add(rb);
						kjcResourceBundleDao.attachDirty(rb);
					}
				}
			}
		}
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
}
