package com.kirey.kjcore.api.restcontrollers;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.ResponseMessagesConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.compositedao.DictionaryService;
import com.kirey.kjcore.data.entity.KjcDictionary;
import com.kirey.kjcore.features.internationalization.Translation;
import com.kirey.kjcore.validations.AdminTranslationValidation;
import com.kirey.kjcore.validations.CsvFileValidation;

/**Rest controller used for translations administration
 * @author 
 *
 */
@RestController
@DependsOn("translation")
@RequestMapping(value = "/rest/adminTranslation", produces = "application/json; charset=UTF-8")
public class AdminTranslationController {

	@Autowired
	private DictionaryService dictionaryService;

	@Autowired
	private Translation translation;

	@Autowired
	private CsvFileValidation csvFileValidation;
	
	@Autowired
	private AdminTranslationValidation adminTranslationValidation;

	/**
	 * This method returns list of all thematic unit
	 * @return Response Entity containing list of all sections and HTTP status
	 */
	@RequestMapping(value = "/section", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getSection() {

		List<String> listSection = translation.findSections();

		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listSection, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method returns list of module names from dictionary table based on section
	 * @param section
	 * @return Response Entity containing list of all modules for section and HTTP status
	 */
	@RequestMapping(value = "/module", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getModule(@RequestParam(value = "section") String section) {
		adminTranslationValidation.validationIfSectionExist(section);
		List<String> listModuleName = translation.findModulesBySection(section);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listModuleName, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method returns list of dictionary objects from dictionary table based on module name
	 * @param module
	 * @return Response Entity containing list of all translations by module and HTTP status
	 */
	@RequestMapping(value = "/translation", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getTranslation(@RequestParam(value = "module") String module) {
		List<KjcDictionary> listTranslation = translation.findByModule(module);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listTranslation, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method saves new records in database in dictionary table 
	 * @param listKjcDictionary
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/translation", method = RequestMethod.POST)
	public ResponseEntity<Object> saveTranslation(@RequestBody List<KjcDictionary> listKjcDictionary) {
		List<String> namesForResponse = translation.saveNewTranslations(listKjcDictionary);
		return new ResponseEntity<Object>(
				new RestResponseDto(HttpStatus.OK.value(),
						ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_TRANSLATION_INSERT_SUCCESS + " " + namesForResponse),
				HttpStatus.OK);
	}

	/**
	 * This method is used for edit existing dictionary table in database
	 * @param kjcDictionary
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/translation", method = RequestMethod.PUT)
	public ResponseEntity<Object> updateTranslation(@RequestBody KjcDictionary kjcDictionary) {
		translation.updateTranslation(kjcDictionary);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_TRANSLATION_SUCCESSFULLY_EDITED + " "
						+ kjcDictionary.getGenericName()),
				HttpStatus.OK);
	}

	/**
	 * This method is used for delete thematic unit and all record with this thematic unit from database
	 * @param section
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/section", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteSection(@RequestParam(value = "section") String section) {
		adminTranslationValidation.validationIfSectionExist(section);
		translation.deleteSection(section);
		return new ResponseEntity<Object>(
				new RestResponseDto(HttpStatus.OK.value(),
						ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_SUCCESSFULLY_DELETED_SECTION + " " + section),
				HttpStatus.OK);
	}

	/**
	 * This method is used for delete module and all record with this module from database
	 * @param module
	 * @param pageId
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/module", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteModule(@RequestParam(value = "name") String module, @RequestParam String pageId) {
		adminTranslationValidation.validationIfModuleExist(module);
		translation.deleteModule(module);
		return new ResponseEntity<Object>(
				new RestResponseDto(HttpStatus.OK.value(),
						ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_SUCCESSFULLY_DELETED_MODULE + " " + module),
				HttpStatus.OK);
	}

	/**
	 * This method deletes record from database
	 * @param translations
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/translation", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteTranslation(@RequestParam(value = "name") String translations) {
		adminTranslationValidation.validationForDeleteTranslation(translations);
		translation.deleteTranslation(translations);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_TRANSLATION_SUCCESSFULLY_DELETED + " " + translations),
				HttpStatus.OK);
	}

	/**
	 * This method is used for edit module name in database
	 * @param moduleName - contains string of existing module name
	 * @param editedModuleName - contains string of edited module name
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/module", method = RequestMethod.PUT)
	public ResponseEntity<Object> editModule(@RequestParam(value = "moduleName") String moduleName,
			@RequestParam(value = "editedModuleName") String editedModuleName) {
		adminTranslationValidation.validationIfModuleExist(moduleName);
		translation.updateModule(moduleName, editedModuleName);
		return new ResponseEntity<Object>(
				new RestResponseDto(HttpStatus.OK.value(),
						ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_SUCCESSFULLY_EDITED_MODULE + " " + editedModuleName),
				HttpStatus.OK);
	}

	/**
	 * This method is used for edit module name in database
	 * @param sectionName - contains string of existing module name
	 * @param editedSectionName - contains string of edited module name
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/section", method = RequestMethod.PUT)
	public ResponseEntity<Object> editSection(@RequestParam(value = "sectionName") String sectionName,
			@RequestParam(value = "editedSectionName") String editedSectionName) {
		adminTranslationValidation.validationIfSectionExist(sectionName);
		translation.updateSection(sectionName, editedSectionName);
		return new ResponseEntity<Object>(
				new RestResponseDto(HttpStatus.OK.value(),
						ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_SUCCESSFULLY_EDITED_SECTION + " " + editedSectionName),
				HttpStatus.OK);
	}

	/**
	 * This method uploads translation from csv file
	 * @param translationFile contains list of translations
	 * @param checked
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/uploadTranslation", method = RequestMethod.POST, consumes = "multipart/form-data")
	public ResponseEntity<Object> uploadTranslation(@RequestPart(required = false, name = "translationFile") MultipartFile translationFile, 
			@RequestParam int checked)  {

			csvFileValidation.doValidation(translationFile);
			if (translationFile != null && !translationFile.isEmpty()){
				dictionaryService.saveTranslationsFromCsvFile(translationFile, checked);
				translation.init();
			}
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_TRANSLATION_SUCCESSFULLY_ADDED), HttpStatus.OK);
	}

	/**
	 * This method returns list of distinct languages
	 * @return ResponseEntity containing list of distinct languages and HTTP status code
	 */
	@RequestMapping(value = "/languages", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllDistinctLanguages() {
		List<String> listLanguages = translation.findDistinctLanguages();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listLanguages, HttpStatus.OK.value()), HttpStatus.OK);

	}

	/**
	 * This method returns all available languages except using languages
	 * @return ResponseEntity containing list of available languages and HTTP status code
	 */
	@RequestMapping(value = "/availableLanguages", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllavailableLanguages() {

		Map<String, String> listAvailableLanguages = Utilities.getAvailableLocales();
		List<String> listLanguages = translation.findDistinctLanguages();
		for (String string : listLanguages) {
			Iterator it = listAvailableLanguages.entrySet().iterator();
			while (it.hasNext()) {
				Map.Entry pair = (Map.Entry) it.next();
				if (string.equals(pair.getKey()) || "".equals(pair.getValue())) {
					it.remove();
				}
			}
		}
		HashMap<String, String> sortedMap = (HashMap<String, String>) Utilities.sortByValue(listAvailableLanguages);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(sortedMap, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/*
	 *  This method is used for reload translation
	 * @return
	 */
	/*@RequestMapping(value = "/reload", method = RequestMethod.GET)
	public ResponseEntity<Object> getTranslation() {
		translation.init();
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.ADMIN_TRANSLATION_SUCCESSFULLY_RELOADED), HttpStatus.OK);
	}*/

}
