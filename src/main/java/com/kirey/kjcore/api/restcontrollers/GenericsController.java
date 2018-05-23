package com.kirey.kjcore.api.restcontrollers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.ResponseMessagesConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.dao.KjcGenericsDao;
import com.kirey.kjcore.data.entity.KjcGenerics;
import com.kirey.kjcore.features.exception.customexceptions.FormalValidationException;

/**
 * GenericsController is used for displaying generic parameters,
 * insert, delete a generic parameter
 * update or delete the category and subcategory of the parameters,
 * filter generic parameters by category and subcategory
 * 
 * @author Alexandra Onofrei
 */

@RestController
@RequestMapping(value = "/rest/generics", produces = "application/json; charset=UTF-8")
public class GenericsController {

	@Autowired
	private KjcGenericsDao kjcGenericsDao;

	/**
	 * This method returns a list with all generic parameters
	 * @return ResponseEntity containing the list with all the generic
	 *         parameters along with HTTP status
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getGenericParameters() {
		HashMap<String, Object> genericsMap = new HashMap<String, Object>();

		List<KjcGenerics> kjcGenericsList = kjcGenericsDao.findAll();
		genericsMap.put("kjcGenericsList", kjcGenericsList);

		List<String> paratemersCustomTypeList = Utilities.getGenericParametersCustomTypes();
		genericsMap.put("customType", paratemersCustomTypeList);

		return new ResponseEntity<RestResponseDto>(new RestResponseDto(genericsMap, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method is used to save a generic parameter
	 * @param KjcGenerics
	 * @param bindingResult
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> saveGenericParameter(@RequestBody(required = true) @Valid KjcGenerics kjcGenerics,
			BindingResult bindingResult) {

		if (bindingResult.hasErrors()) {
			throw new FormalValidationException(bindingResult);
		} else {
			kjcGenericsDao.attachDirty(kjcGenerics);

			return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_GENERIC_PARAMETER_SAVED_SUCCESSFULLY),HttpStatus.OK);

		}
	}
	/**
	 * This method is used to update a generic parameter
	 * @param KjcGenerics
	 * @param bindingResult
	 * @param oldKey - to identify the entity to update
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> updateGenericParameter(@RequestBody(required = true) @Valid KjcGenerics kjcGenerics,
			BindingResult bindingResult, @RequestParam(required = true) String oldKey) {

		if (bindingResult.hasErrors()) {
			throw new FormalValidationException(bindingResult);
		} else {
			//delete the old generic
			kjcGenericsDao.deleteByKey(oldKey);
			//replace old generic with the new one
			kjcGenericsDao.persist(kjcGenerics);
			
			return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_GENERIC_PARAMETER_UPDATED_SUCCESSFULLY),
					HttpStatus.OK);

		}
	}

	/**
	 * This method is used to update a category for a generic parameter
	 * @param requestBodyParameters - object containing oldCategory, newCategory
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/updateCategory", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> updateCategory(@RequestBody Map<String, String> requestBodyParameters) {
		List<KjcGenerics> kjcGenericList = kjcGenericsDao.findByCategory(requestBodyParameters.get("oldCategory"));
		for (KjcGenerics kjcGenerics : kjcGenericList) {
			String oldKey = kjcGenerics.getKey();
			String newKey = kjcGenerics.getKey().replaceFirst(requestBodyParameters.get("oldCategory"),
					requestBodyParameters.get("newCategory"));
			kjcGenerics.setKey(newKey);
			kjcGenericsDao.deleteByKey(oldKey);
			kjcGenericsDao.persist(kjcGenerics);
		}

		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_GENERIC_PARAMETER_CATEGORY_UPDATED_SUCCESSFULLY),
				HttpStatus.OK);
	}
	/**
	 * This method is used to update a subcategory for a generic parameter
	 * @param requestBodyParameters - object containing category, newSubcategory, oldSubcategory properties
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/updateSubcategory", method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> updateSubCategory(@RequestBody Map<String, String> requestBodyParameters) {
		List<KjcGenerics> kjcGenericList = kjcGenericsDao.findBySubcategory(requestBodyParameters.get("category"),
				requestBodyParameters.get("oldSubcategory"));
		for (KjcGenerics kjcGenerics : kjcGenericList) {
			String oldKey = kjcGenerics.getKey();
			String newKey = kjcGenerics.getKey().replaceFirst(requestBodyParameters.get("oldSubcategory"),
					requestBodyParameters.get("newSubcategory"));
			kjcGenerics.setKey(newKey);
			kjcGenericsDao.deleteByKey(oldKey);
			kjcGenericsDao.persist(kjcGenerics);
			
		}

		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_GENERIC_PARAMETER_SUBCATEGORY_UPDATED_SUCCESSFULLY),
				HttpStatus.OK);
	}

	/**
	 * This method is used to delete from DB a generic parameter
	 * @param key - the key of the generic to delete
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/{key:.+}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteGenericParameter(@PathVariable String key) {
		kjcGenericsDao.deleteByKey(key);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_GENERIC_PARAMETER_DELETED_SUCCESSFULLY),
				HttpStatus.OK);
	}

	/**
	 * This method is used to delete from DB the category of generic parameters
	 * @param category - the category to delete
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/deleteCategory/{category}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteCategory(@PathVariable String category) {
		kjcGenericsDao.deleteByCategory(category);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_GENERIC_PARAMETER_CATEGORY_DELETED_SUCCESSFULLY),
				HttpStatus.OK);
	}
	
	/**
	 * This method is used to delete from DB the subcategory of generic parameters
	 * @param category 
	 * @param subcategory - the subcategory to delete
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/deleteSubcategory/{category}/{subcategory:.+}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteSubCategory(@PathVariable String category, @PathVariable String subcategory) {
		kjcGenericsDao.deleteByCategory(category + "." + subcategory);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_GENERIC_PARAMETER_SUBCATEGORY_DELETED_SUCCESSFULLY),
				HttpStatus.OK);
	}
	
	/**
	 * This method is used to retrieve generic parameters from the DB filtered by category and subcategory
	 * @param category 
	 * @param subcategory
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/filterResult/{category}/{subcategory:.+}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> filter(@PathVariable String category, @PathVariable String subcategory) {
		List<KjcGenerics> kjcGenericList = kjcGenericsDao.findBySubcategory(category, subcategory);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(kjcGenericList, HttpStatus.OK.value()), HttpStatus.OK);
	}

}
