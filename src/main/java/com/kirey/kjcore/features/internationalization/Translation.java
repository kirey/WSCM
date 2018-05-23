package com.kirey.kjcore.features.internationalization;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.dao.KjcDictionaryDao;
import com.kirey.kjcore.data.dao.KjcResourceBundleDao;
import com.kirey.kjcore.data.entity.KjcDictionary;
import com.kirey.kjcore.data.entity.KjcResourceBundle;
import com.kirey.kjcore.validations.AdminTranslationValidation;

/**
 * Class containing all the methods needed for translating 
 * 
 * @author 
 *
 */
public class Translation {

	private Map<String, Object> mapDictionary;

	@Autowired
	KjcDictionaryDao kjcDictionaryDao;

	@Autowired
	AdminTranslationValidation adminTranslationValidation;

	@Autowired
	KjcResourceBundleDao resourceBundleDao;
	
	@Autowired
	ObjectMapper objectMapper;

	@PostConstruct
	public void init() {
		load();
	}

	/**
	 * This method loads dictionary in HashMap
	 */
	private void load() {
		List<KjcDictionary> list = kjcDictionaryDao.findAll();
		mapDictionary = new HashMap<String, Object>();
		for (KjcDictionary kjcDictionary : list) {
			mapDictionary.put(kjcDictionary.getGenericName(), kjcDictionary);
		}
	}

	public Map<String, Object> getMapDictionary() {
		return mapDictionary;
	}

	public void setMapDictionary(Map<String, Object> mapDictionary) {
		this.mapDictionary = mapDictionary;
	}

	
	/**
	 * This method extracts generic name from string, adds translation for that generic name to string and returns it
	 * @param translatableText
	 * @return String that represents generic name 
	 */
	public String translate(String translatableText) {

		StringBuilder sb = new StringBuilder(0);
		String remaining = translatableText;

		while (remaining.indexOf(AppConstants.TRANSLATION_START_TAG) >= 0) {

			// njamb
			int startIndex = remaining.indexOf(AppConstants.TRANSLATION_START_TAG);

			sb.append(remaining.substring(0, startIndex));
			remaining = remaining.substring(startIndex, remaining.length());

			// bljab
			int indexBljab = remaining.indexOf(AppConstants.TRANSLATION_END_TAG);
			if (indexBljab >= 0) {

				// translation key too big
				if ((indexBljab - startIndex) <= AppConstants.TRANSLATION_KEY_MAX_LENGTH) {

					// genericName
					String transItem = remaining.substring(0, indexBljab + AppConstants.TRANSLATION_END_TAG.length());

					// translate
					String translation = findTranslationByGenericKey(transItem,	Utilities.getUsersDefaultLang());

					// add translation
					sb.append(translation);

					remaining = remaining.substring(indexBljab + AppConstants.TRANSLATION_END_TAG.length(),
							remaining.length());
				} else {
					sb.append(remaining.substring(0, indexBljab + AppConstants.TRANSLATION_END_TAG.length()));
					remaining = remaining.substring(indexBljab + AppConstants.TRANSLATION_END_TAG.length(),
							remaining.length());
				}
			} else {
				break;
			}
		}
		// add rest
		sb.append(remaining);

		return sb.toString();
	}

	/**
	 * This method is used to find translation by generic name
	 * @param genKey
	 * @param lang
	 * @return String translation
	 */
	public String findTranslationByGenericKey(String genKey, String lang) {
		KjcDictionary dictionary = (KjcDictionary) mapDictionary.get(genKey);
		String translated = "";
		Boolean flag = false;
		if (dictionary != null) {

			if (!dictionary.getKjcResourceBundles().isEmpty()) {
				for (KjcResourceBundle amBundle : dictionary.getKjcResourceBundles()) {
					// if bundle on wanted language exist
					if (amBundle.getLanguage().equals(lang)
							&& amBundle.getKjcDictionary().getGenericName().equals(genKey)) {
						translated = amBundle.getTranslation();
						flag = true;
					}
				}
			}
			if (!flag) {
				if (dictionary.getDefaultTranslation() != null && !"".equals(dictionary.getDefaultTranslation().trim()))
					translated = dictionary.getDefaultTranslation();
				else
					translated = dictionary.getGenericName();
			}

		} else
			translated = genKey;
		return translated;
	}

	/**
	 * This method is used to translate error message
	 * @param errorResponse
	 * @return String translation that is error message translation
	 * @throws JsonProcessingException
	 */
	public String translateErrorMessage(RestResponseDto errorResponse) throws JsonProcessingException {

		String translationString;
		String translationOfError;

		translationString = objectMapper.writer().writeValueAsString(errorResponse);
		translationOfError = translate(translationString);
		return translationOfError;
	}

	/**
	 * Method that gets String representing module name, and returns all front end translations related to that module as a map.
	 * @param moduleName
	 * @return Map<String, String> map containing front end translations for module recieved
	 */
	public Map<String, String> findFrontEndTranslation(String moduleName) {
		Map<String, String> map = new HashMap<String, String>();
		// loop trought map keyes
		for (String key : mapDictionary.keySet()) {
			String[] str = key.split("\\.");
			if (str[1].equals(AppConstants.FRONT_END) && str[2].equals(moduleName)
					|| str[1].equals(AppConstants.FRONT_END) && str[2].equals(AppConstants.GENERAL_COMPONENT_CONTENT)) {

				map.put(key.substring(AppConstants.TRANSLATION_START_TAG.length(),
						key.length() - AppConstants.TRANSLATION_END_TAG.length()), key);
			}

		}
		return map;
	}

	/**
	 * Method that returns map containing translations for each dictionary loaded 
	 * @return Map<String,String> translationMap containing generic name as a key and translation as value 
	 */
	public Map<String, String> createTranslatedMap() {
		Map<String, String> translationMap = new HashMap<String, String>();
		for (String key : mapDictionary.keySet()) {
			String translated = this.findTranslationByGenericKey(key,
					Utilities.getUserFromContext().getDefaultLanguage());

			// start with njamb.jr - ends with .bljab
			if (key.startsWith(AppConstants.TRANSLATION_START_TAG.concat(AppConstants.JASPER_REPORT))
					&& key.endsWith(AppConstants.TRANSLATION_END_TAG)) {

				// strip njamb. and .bljab
				key = key.substring(AppConstants.TRANSLATION_START_TAG.length(),
						key.length() - AppConstants.TRANSLATION_END_TAG.length());
				translationMap.put(key, translated);
			} else
				translationMap.put(key, translated);
		}
		return translationMap;
	}

	/**
	 * A method that returns list of all section names from dictionary. 
	 * @return List<String> listSection containing strings built like njamb.section_name
	 */
	public List<String> findSections() {
		List<String> listSection = new ArrayList<String>();
		for (String key : mapDictionary.keySet()) {
			String[] rez1 = key.split("\\.");
			String rez = rez1[0] + "." + rez1[1];
			if (!listSection.contains(rez))
				listSection.add(rez);
		}
		return listSection;
	}

	/**
	 * A method that finds all generic names and creates reversed strings.
	 * @return List<String> genericNames containing reversed generic names
	 */
	public List<String> fingAllReverseGenericNames() {
		Set<String> keys = mapDictionary.keySet();
		List<String> genericNames = new ArrayList<String>();
		String reverseKey;
		for (String key : keys) {
			reverseKey = key.replace(AppConstants.TRANSLATION_START_TAG, AppConstants.TRANSLATION_REVERSE_START_TAG);
			reverseKey = reverseKey.replace(AppConstants.TRANSLATION_END_TAG, AppConstants.TRANSLATION_REVERSE_END_TAG);
			genericNames.add(reverseKey);
		}
		return genericNames;
	}

	/**
	 * A method that finds modules for section using section name and returns them as a list
	 * @param section
	 * @return List<String> listModuleName containing module names built like njamb.section_name.module_name
	 */
	public List<String> findModulesBySection(String section) {
		List<String> listModuleName = new ArrayList<String>();
		for (String key : mapDictionary.keySet()) {
			String[] res1 = key.split("\\.");
			String resModule = res1[0] + "." + res1[1] + "." + res1[2];
			String resSection = res1[0] + "." + res1[1];
			if (resSection.equals(section) && !listModuleName.contains(resModule)) {
					listModuleName.add(resModule);
			}
		}
		return listModuleName;
	}

	/**A method that returns a list of KjcDictonary objects from loaded map where dictionary belongs to received section
	 * @param section
	 * @return List<KjcDictionary> containing all KJCDictionaryes that belong to received section
	 */
	public List<KjcDictionary> findBySection(String section) {
		List<KjcDictionary> listKjcDictionary = new ArrayList<>();
		for (Map.Entry<String, Object> entry : mapDictionary.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			String[] res1 = key.split("\\.");
			String res = res1[0] + "." + res1[1];
			if (res.equals(section)) {
				listKjcDictionary.add((KjcDictionary) value);
			}
		}
		return listKjcDictionary;
	}

	/**A method that returns list of of KjcDictonary objects from loaded map where dictionary belongs to received section
	 * @param module
	 * @return List<KjcDictionary> listTranslation containing all translations for received module
	 */
	public List<KjcDictionary> findByModule(String module) {
		List<KjcDictionary> listTranslation = new ArrayList<>();
		for (Map.Entry<String, Object> entry : mapDictionary.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			String[] res1 = key.split("\\.");
			String res = res1[0] + "." + res1[1] + "." + res1[2];
			if (res.equals(module)) {
				listTranslation.add((KjcDictionary) value);
			}
		}
		return listTranslation;
	}

	/**A method that returns KjcDictionary from loaded map where key equals received generic name
	 * @param genericName
	 * @return KjcDictionary that has the same generic name as param received
	 */
	public KjcDictionary findByGenericName(String genericName) {
		for (Map.Entry<String, Object> entry : mapDictionary.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			if (key.equals(genericName)) {
				return (KjcDictionary) value;
			}
		}
		return null;
	}

	/**A method that saves new translations in database and loaded map
	 * @param listKjcDictionary
	 * @return ArrayList<String> that contains default translations for each dictionary that is saved to database
	 */
	public List<String> saveNewTranslations(List<KjcDictionary> listKjcDictionary) {
		adminTranslationValidation.validationForSaveNewTranslation(listKjcDictionary);
		List<String> namesForResponse = new ArrayList<String>();
		for (KjcDictionary kjcDictionary : listKjcDictionary) {
			namesForResponse.add(kjcDictionary.getDefaultTranslation());
			List<KjcResourceBundle> listResourceBundle = kjcDictionary.getKjcResourceBundles();
			for (KjcResourceBundle kjcResourceBundle : listResourceBundle) {
				kjcResourceBundle.setKjcDictionary(kjcDictionary);
			}
			kjcDictionary.setKjcResourceBundles(listResourceBundle);
			kjcDictionaryDao.attachDirty(kjcDictionary);
			mapDictionary.put(kjcDictionary.getGenericName(), kjcDictionary);
		}
		return namesForResponse;
	}

	/**A method used to update existing translations in database and loaded map
	 * @param kjcDictionary
	 */
	public void updateTranslation(KjcDictionary kjcDictionary) {
		KjcDictionary kjcDictionaryForDelete = (KjcDictionary) mapDictionary.get(kjcDictionary.getGenericName());
		adminTranslationValidation.validationForUpdateTranslation(kjcDictionaryForDelete);

		List<KjcResourceBundle> listResourceBundleDelete = kjcDictionaryForDelete.getKjcResourceBundles();
		for (KjcResourceBundle resourceBundleDelete : listResourceBundleDelete) {
			resourceBundleDao.delete(resourceBundleDelete);
		}
		List<KjcResourceBundle> listResourceBundle = kjcDictionary.getKjcResourceBundles();
		for (KjcResourceBundle kjcResourceBundle : listResourceBundle) {
			kjcResourceBundle.setKjcDictionary(kjcDictionary);

		}
		kjcDictionaryDao.attachDirty(kjcDictionary);
		if (mapDictionary.containsKey(kjcDictionary.getGenericName())) {
			mapDictionary.put(kjcDictionary.getGenericName(), kjcDictionary);
		}

	}

	/**A method used to delete a section
	 * It also deletes all the dictionaries and translations related to the section from database and loaded map
	 * @param section
	 */
	public void deleteSection(String section) {
		List<KjcDictionary> listKjcDictionary = new ArrayList<KjcDictionary>();
		for (Map.Entry<String, Object> entry : mapDictionary.entrySet()) {
			String key = entry.getKey();
			Object value = entry.getValue();
			String[] res1 = key.split("\\.");
			String res = res1[0] + "." + res1[1];
			if (res.equals(section)) {
				listKjcDictionary.add((KjcDictionary) value);
			}
		}
		for (KjcDictionary kjcDictionary : listKjcDictionary) {
			kjcDictionaryDao.delete(kjcDictionary);
			mapDictionary.remove(kjcDictionary.getGenericName(), kjcDictionary);
		}
	}

	/**A method used to delete a module
	 *It also deletes all the dictionaries and translations related to the module from database and loaded map
	 * @param module
	 */
	public void deleteModule(String module) {
		List<KjcDictionary> listKjcDictionary = this.findByModule(module);
		for (KjcDictionary kjcDictionary : listKjcDictionary) {
			kjcDictionaryDao.delete(kjcDictionary);
			mapDictionary.remove(kjcDictionary.getGenericName(), kjcDictionary);
		}

	}

	/***A method used to delete a translation
	 *It also deletes dictionary related to the translation from database and loaded map
	 * @param translations
	 */
	public void deleteTranslation(String translations) {
		KjcDictionary kjcDictionary = (KjcDictionary) mapDictionary.get(translations);
		kjcDictionaryDao.delete(kjcDictionary);
		mapDictionary.remove(kjcDictionary.getGenericName(), kjcDictionary);
	}

	/**A method that updates the module and all the dictionaries and resource bundles belonging to that module in database and loaded map
	 * @param moduleName
	 * @param editedModuleName
	 */
	public void updateModule(String moduleName, String editedModuleName) {
		List<KjcDictionary> listKjcDictionary = this.findByModule(moduleName);
		String oldGenericName;
		for (KjcDictionary kjcDictionary : listKjcDictionary) {
			oldGenericName = kjcDictionary.getGenericName();
			String newGenericName = kjcDictionary.getGenericName().replaceFirst(moduleName, editedModuleName);
			kjcDictionary.setGenericName(newGenericName);
			List<KjcResourceBundle> listBoundles = kjcDictionary.getKjcResourceBundles();
			List<KjcResourceBundle> newListBoundles = new ArrayList<KjcResourceBundle>();
			for (KjcResourceBundle kjcResourceBundle : listBoundles) {
				kjcResourceBundle.setKjcDictionary(kjcDictionary);
				newListBoundles.add(kjcResourceBundle);
			}
			kjcDictionary.setKjcResourceBundles(newListBoundles);
			kjcDictionaryDao.attachDirty(kjcDictionary);
			mapDictionary.put(kjcDictionary.getGenericName(), kjcDictionary);
			if(!moduleName.equals(editedModuleName)){
				kjcDictionaryDao.deleteByGenericName(oldGenericName);
				mapDictionary.remove(oldGenericName);
			}
		}

	}

	/**A method that updates the section and all the dictionaries and resource bundles belonging to that section in database and loaded map
	 * @param genericName
	 * @param editedName
	 */
	public void updateSection(String genericName, String editedName) {
		List<KjcDictionary> listKjcDictionary = this.findBySection(genericName);
		String oldGenericName;
		for (KjcDictionary kjcDictionary : listKjcDictionary) {
			oldGenericName = kjcDictionary.getGenericName();
			String newGenericName = kjcDictionary.getGenericName().replaceFirst(genericName, editedName);
			kjcDictionary.setGenericName(newGenericName);
			List<KjcResourceBundle> listBoundles = kjcDictionary.getKjcResourceBundles();
			List<KjcResourceBundle> newListBoundles = new ArrayList<KjcResourceBundle>();
			for (KjcResourceBundle kjcResourceBundle : listBoundles) {
				kjcResourceBundle.setKjcDictionary(kjcDictionary);
				newListBoundles.add(kjcResourceBundle);
			}
			kjcDictionary.setKjcResourceBundles(newListBoundles);
			kjcDictionaryDao.attachDirty(kjcDictionary);
			mapDictionary.put(kjcDictionary.getGenericName(), kjcDictionary);
			if(!genericName.equals(editedName)){
				kjcDictionaryDao.deleteByGenericName(oldGenericName);
				mapDictionary.remove(oldGenericName);
			}
		}

	}

	/**A method that finds all distinct languages existing in database
	 * @return List<String> listLanguages that contains all distinct languages existing in database
	 */
	public List<String> findDistinctLanguages() {
		List<String> listLanguages = new ArrayList<>();
		for (Map.Entry<String, Object> entry : mapDictionary.entrySet()) {
			Object value = entry.getValue();
			KjcDictionary kjcDictionary = (KjcDictionary) value;
			List<KjcResourceBundle> listBundles = kjcDictionary.getKjcResourceBundles();
			for (KjcResourceBundle kjcResourceBundle : listBundles) {
				if (!listLanguages.contains(kjcResourceBundle.getLanguage())) {
					listLanguages.add(kjcResourceBundle.getLanguage());
				}
			}
		}
		return listLanguages;
	}
	
	/**
	 * @return Map<String, String> that contains all the distinct languages sorted by country name 
	 */
	public Map<String, String> findFullNameDistinctLanguages() {
		HashMap<String, String> listAvailableLanguages = (HashMap<String, String>) Utilities.getAvailableLocales();
		HashMap<String, String> hashMapListLanguages = new HashMap<>();
		List<String> listLanguages = findDistinctLanguages();
		for (String string : listLanguages) {
			Iterator it = listAvailableLanguages.entrySet().iterator();
			while (it.hasNext()) {
				Map.Entry pair = (Map.Entry) it.next();
				if (string.equals(pair.getKey())) {
					hashMapListLanguages.put((String) pair.getKey(),(String) pair.getValue());
				}
			}
		}
		return Utilities.sortByValue(hashMapListLanguages);
	}

}
