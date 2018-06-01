package com.kirey.kjcore.api.restcontrollers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.ResponseMessagesConstants;
import com.kirey.kjcore.data.dao.KjcClassCategoriesDao;
import com.kirey.kjcore.data.dao.KjcClassesDao;
import com.kirey.kjcore.data.entity.KjcClassCategories;
import com.kirey.kjcore.data.entity.KjcClasses;
import com.kirey.kjcore.features.classloading.BaseObjectFactory;
import com.kirey.kjcore.validations.ClassLoadingValidation;


/**Rest controller used for classloading feature
 * @author 
 *
 */
@RestController
@RequestMapping(value = "/rest/classLoading", produces = "application/json; charset=UTF-8")
public class ClassLoadingController {

	@Autowired
	private KjcClassesDao kjcClassesDao;
		
	@Autowired
	private KjcClassCategoriesDao kjcClassCategoriesDao;

	@Autowired
	private BaseObjectFactory baseObjectFactory;
	
	@Autowired
	private ClassLoadingValidation classLoadingValidation;
	
	
	/**
	 * This method returns all classes from the database 
	 * @return ResponseEntity containing the list of all classes along with HTTP status
	 */
	@RequestMapping(value = "/classes", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllClasses() {
		List<KjcClasses> listClasses = kjcClassesDao.findAll();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listClasses, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * This method uploads the class file 
	 * @param javaFile
	 * @param compiledFile
	 * @param kjcClass
	 * @param bindingResult
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/classes", method = RequestMethod.POST, consumes="multipart/form-data")
	public ResponseEntity<Object> uploadFile(@RequestPart(name="javaFile", required=true) MultipartFile javaFile,  
			@RequestPart(name="compiledFile", required=true) MultipartFile compiledFile, 
			@RequestPart(name="kjcClass") @Valid KjcClasses kjcClass, BindingResult bindingResult) {

		kjcClassesDao.uploadClass(kjcClass, javaFile, compiledFile, bindingResult);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_CLASS_SUCCESSFULLY_UPLOADED + " " + kjcClass.getName()), HttpStatus.OK);
	}
	

	/**
	 * This method is used to change either the java class BLOB or any of the class fields including the name, category and description
	 * @param qualifiedClassName specifies the edited class. Qualified name includes the package name along with the class name. 
	 * @param compiledFile
	 * @param descrtiption
	 * @param kjcCategories 
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/classes/edited", method = RequestMethod.POST, consumes="multipart/form-data")
	public ResponseEntity<Object> editFile(@RequestPart(name = "qualifiedClassName", required=true) String qualifiedClassName,
			@RequestPart(required = false, name = "compiledFile") MultipartFile compiledFile,
			@RequestPart(required = false, name = "description") String description,
			@RequestPart(name = "kjcCategories") KjcClassCategories kjcCategories) {

		kjcClassesDao.editClass(qualifiedClassName, compiledFile, description, kjcCategories);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_CLASS_SUCCESSFULLY_EDITED + " " + qualifiedClassName), HttpStatus.OK);
	}

	/**
	 * This method deletes the class specified by the qualified class name.
	 * @param qualifiedClassName specifies the edited class. Qualified name includes the package name along with the class name.
	 * @return  ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/classes", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteClass(@RequestParam(name = "name", required=true) String qualifiedClassName) {
			List<String> listChildrenNames = kjcClassesDao.deleteClass(qualifiedClassName);
			return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_CLASS_SUCCESSFULLY_DELETED + " " + qualifiedClassName +listChildrenNames), HttpStatus.OK);
	}

	/**
	 * This method is used to change the enabled flag of the class. When loading classes to the JVM, only the 
	 * classes with this flag will be uploaded into JVM.
	 * @param id
	 * @param checked contains values 0 or 1 that define whether the enabled flag will be set to true or false.
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/classes/checkmarks/{id}", method = RequestMethod.POST)
	public ResponseEntity<Object> setCheckmark(@PathVariable Integer id, @RequestParam(name = "checked") int checked) {
		KjcClasses kjcClass = kjcClassesDao.setCheckmark(id, checked);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_CLASS_SUCESSFULLY_EDITED_ENABLED + " " +kjcClass.getName()), HttpStatus.OK);
	}

	/**
	 * This method sets the enabled flags of all classes to the value specified by the parameter checked 
	 * @param checked contains values 0 or 1 that define whether the enabled flag will be set to true or false.
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/classes/checkmarks", method = RequestMethod.POST)
	public ResponseEntity<Object> setCheckmarkAll(@RequestParam(name = "checked") int checked) {
		kjcClassesDao.setAllCheckmarks(checked);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_SUCESSFULLY_EDITED_ENABLED_ALL_CLASSES), HttpStatus.OK);
	}
	
	/**
	 * This method is used to get class name, category and description from the class specified by parameter qualifiedClassName.
	 * @param qualifiedClassName specifies the edited class. Qualified name includes the package name along with the class name.
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	 @RequestMapping(value = "/classes/info", method = RequestMethod.GET)
	 public ResponseEntity<RestResponseDto> getClassInfo(@RequestParam(name = "name", required=true) String qualifiedClassName) {
	  KjcClasses kjcClass = kjcClassesDao.findClassByQualifiedName(qualifiedClassName);
	  classLoadingValidation.validationForExecutingAndClassInfo(qualifiedClassName);
	  KjcClassCategories kjcClassCategories = kjcClass.getKjcClassCategories();
	  String description = kjcClass.getDescription();
	  Map<String, Object> map = new HashMap<>();
	  map.put("description", description);
	  map.put("kjcClassCategories", kjcClassCategories);
	  return new ResponseEntity<RestResponseDto>(new RestResponseDto(map, HttpStatus.OK.value()), HttpStatus.OK);
	 }
	 
	/**
	 * This method is used to upload into JVM all the classes with the enabled flag set.
	 * If there is no class with the enabled flag set in the database, then new class loading scope will be created.
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/classes/load", method = RequestMethod.PUT)
	public ResponseEntity<Object> loadAllClasses() {
		baseObjectFactory.loadAllClasses();
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_CLASSES_LOADED), HttpStatus.OK);
	}
	
	/**
	 * This method returns available class categories 
	 * @return ResponseEntity containing the list of all categories along with HTTP status
	 */
	@RequestMapping(value = "/categories", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllCategories() {
		List<KjcClassCategories> listCategories = kjcClassCategoriesDao.findAll();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listCategories, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method is used for add category
	 * @param kjcClassCategories
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/categories", method = RequestMethod.POST)
	public ResponseEntity<Object> addCategories(@RequestBody KjcClassCategories kjcClassCategories){
		classLoadingValidation.validationForAddNewCategory(kjcClassCategories);
		kjcClassCategoriesDao.attachDirty(kjcClassCategories);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_CATEGORY_SUCCESSFULLY_ADDED), HttpStatus.OK);
	}
	
	/**
	 * This method is used for edit category
	 * @param kjcClassCategories
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/categories", method = RequestMethod.PUT)
	public ResponseEntity<Object> editCategories(@RequestBody KjcClassCategories kjcClassCategories){
		classLoadingValidation.validationForEditCategory(kjcClassCategories);
		kjcClassCategoriesDao.editCategory(kjcClassCategories);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_CATEGORY_SUCCESSFULLY_EDITED), HttpStatus.OK);
	}
	
	/**
	 * This method is used for delete category
	 * @param id
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/categories/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteCategories(@PathVariable int id){
		KjcClassCategories kjcClassCategories = classLoadingValidation.validationForDeleteCategory(id);
		kjcClassCategoriesDao.delete(kjcClassCategories);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_CATEGORY_SUCCESSFULLY_DELETEED), HttpStatus.OK);
	}
	
}