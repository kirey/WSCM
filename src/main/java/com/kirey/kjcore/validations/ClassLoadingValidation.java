package com.kirey.kjcore.validations;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.dao.KjcClassCategoriesDao;
import com.kirey.kjcore.data.dao.KjcClassesDao;
import com.kirey.kjcore.data.entity.KjcClassCategories;
import com.kirey.kjcore.data.entity.KjcClasses;
import com.kirey.kjcore.features.exception.customexceptions.BusinessValidationException;

/**Component used for handling ClassLoading related validations
 * @author
 *
 */
@Component
public class ClassLoadingValidation extends BaseValidation {

	
	@Autowired
	private KjcClassesDao kjcClassesDao;
	
	@Autowired
	private KjcClassCategoriesDao kjcClassCategoriesDao;

	private List<ValidationErrorDto> validationErrorDtos;


	/**
	 * This method validates the upload parameters when class already exists, class names don't match, class without parent or interface
	 * is being uploaded
	 * @param javaCodeParameters contains hash map with parameters for class upload
	 * @param kjcClass specifies the class for uploading	 
	 * @param bindingResult
	 * @throws BusinessValidationException
	 */
	public void validationForUpload(Map<String, Object> javaCodeParameters, KjcClasses kjcClass, BindingResult bindingResult) {
		validationErrorDtos = new ArrayList<ValidationErrorDto>();
		kjcClass.setKjcClasses((KjcClasses) javaCodeParameters.get("parentClass"));
		
		// check if class exists
		KjcClasses kjcClassTemp = kjcClassesDao.findClassByQualifiedName(javaCodeParameters.get("packageName") + "." + kjcClass.getName());
		if (kjcClassTemp != null) {
			validationErrorDtos.add( new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CLASS_ALREADY_EXISTS_IN_DB));
		}
		
		// check if names match
		if (!kjcClass.getName().equals(javaCodeParameters.get("className"))) {
			validationErrorDtos.add( new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CLASSNAME_MISMATCH));
		}

		// check if parent exists in database
		if (javaCodeParameters.get("parentClass") == null && javaCodeParameters.get("parentClassName") != null) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ATTEMPT_TO_UPLOAD_CLASS_WITHOUT_PARENT/* + kjcClass.getName()*/));
		}
		
		//check if class has interface or parent
		if (kjcClass.getKjcClasses() == null && (!(boolean)javaCodeParameters.get("checkInterface"))) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ATTEMPT_TO_UPLOAD_CLASS_WITHOUT_INTERFACE));
		} else if (kjcClass.getKjcClasses() != null && ((boolean)javaCodeParameters.get("checkInterface"))) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ATTEMPT_TO_UPLOAD_CLASS_WITH_INTERFACE));
		}	
		
		// creating BusinessValidationException
		if(bindingResult != null)
			validationErrorDtos.addAll(Utilities.generateListFromBindingResult(bindingResult));
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
	
	/**
	 * This method validates the class for editing when class doesn't exist in database, class names aren't matching or class is empty
	 * @param kjcClass
	 * @param compiledFileBytes
	 * @param compiledFileName
	 * @param bindingResult
	 * @throws BusinessValidationException
	 */
	public void validationForEdit(KjcClasses kjcClass, byte[] compiledFileBytes, String compiledFileName, BindingResult bindingResult) {
		validationErrorDtos = new ArrayList<ValidationErrorDto>();
		//check if class exists
		if (kjcClass == null) {
			validationErrorDtos.add( new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CLASS_NOT_EXISTS_IN_DB));
		}
		
		//check if names match
		if(compiledFileName != null){
			KjcClasses kjcClassTemp = kjcClassesDao.findByName(compiledFileName.replace(".class", ""));
			if (kjcClassTemp == null) {
				validationErrorDtos.add(new ValidationErrorDto (this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CLASSNAME_MISMATCH));
			}
		}
			
		if(compiledFileBytes != null && compiledFileBytes.length == 0){
			validationErrorDtos.add(new ValidationErrorDto (this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CLASS_EMPTY));
		}

		// creating BusinessValidationException
		if(bindingResult != null)
			validationErrorDtos.addAll(Utilities.generateListFromBindingResult(bindingResult));
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
	
	
	/**
	 * This method validates the class for deletion when class is already deleted or report related to the class exists
	 * @param qualifiedClassName specifies the edited class. Qualified name includes the package name along with the class name. 
	 * @throws BusinessValidationException
	 */
	public void validationForDelete(String qualifiedClassName)  {
		validationErrorDtos = new ArrayList<ValidationErrorDto>();
		KjcClasses kjcClass = kjcClassesDao.findClassByQualifiedName(qualifiedClassName);
		//check if class exists
		if(kjcClass == null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CLASS_ALREADY_DELETED /*+ classLoadingUtil.getClassName(qualifiedClassName)*/));
		}else if(!kjcClass.getKjcReportses().isEmpty()){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CLASS_REPORT_EXIST));
		}
		// creating BusinessValidationException
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
	
	
	/**
	 * This method validates class for which the enabled flag is set when class doesn't exist
	 * @param kjcClass
	 * @throws BusinessValidationException
	 */
	public void validationForCheckmark(KjcClasses kjcClass) {
		validationErrorDtos = new ArrayList<ValidationErrorDto>();
		//check if class exists
		if(kjcClass == null){
			validationErrorDtos.add(new ValidationErrorDto (this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CLASS_NOT_EXISTS_IN_DB));
		}
		
		// creating BusinessValidationException
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
		
	}
	
	/**This method validates when class is already deleted, class has a report related to it or has children
	 * @param kjcClass
	 * @throws BusinessValidationException
	 */
	public void validationForDeleteValidationClass(KjcClasses kjcClass) {
		validationErrorDtos = new ArrayList<ValidationErrorDto>();
		if(kjcClass == null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CLASS_ALREADY_DELETED /*+ classLoadingUtil.getClassName(qualifiedClassName)*/));
		}
		else{
			if (kjcClass.getKjcReportses() != null && kjcClass.getKjcReportses().size() > 1) {

				validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CLASS_REPORT_EXIST));
			}
			if (!kjcClassesDao.findAllChildren(kjcClass).isEmpty()) {
				validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CLASS_HAVE_CHILDREN));
			}
		}

		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**This method validates if category exists
	 * @param kjcClassCategories
	 * @throws BusinessValidationException
	 */
	public void validationForAddNewCategory(KjcClassCategories kjcClassCategories) {
		validationErrorDtos = new ArrayList<ValidationErrorDto>();
		List<String> listCategories = kjcClassCategoriesDao.findAllCategoryNames();	
		if(listCategories.contains(kjcClassCategories.getName())){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CATEGORIES_EXIST));
		}
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**This method validates if category had already been deleted or contains classes related to it
	 * @param id
	 * @return KjcClassCategories presenting deleted category
	 * @throws BusinessValidationException
	 */
	public KjcClassCategories validationForDeleteCategory(int id) {
		validationErrorDtos = new ArrayList<ValidationErrorDto>();
		KjcClassCategories kjcClassCategories = kjcClassCategoriesDao.findById(id);
		if(kjcClassCategories == null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CATEGORIES_ALREADY_DELETED));
		}else if(!kjcClassCategories.getKjcClasseses().isEmpty()){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CATEGORIES_CONTAINS_CLASSES));
		}
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
		return kjcClassCategories;
	}

	/**This method validates if category doesn't exist  or category with the same name exists in database
	 * @param kjcClassCategories
	 * @throws BusinessValidationException
	 */
	public void validationForEditCategory(KjcClassCategories kjcClassCategories) {
		validationErrorDtos = new ArrayList<ValidationErrorDto>();
		KjcClassCategories kjcClassCategoriesTemp = kjcClassCategoriesDao.findById(kjcClassCategories.getId());
		if(kjcClassCategoriesTemp == null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CATEGORIES_ALREADY_DELETED));
		}
		List<String> listCategories = kjcClassCategoriesDao.findAllCategoryNamesWithoutOne(kjcClassCategories);	
		if(listCategories.contains(kjcClassCategories.getName())){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CATEGORIES_EXIST));
		}
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**This method validates if class doesn't exist in database
	 * @param qualifiedClassName
	 * @throws BusinessValidationException
	 */
	public void validationForExecutingAndClassInfo(String qualifiedClassName) {
		validationErrorDtos = new ArrayList<ValidationErrorDto>();
		KjcClasses kjcClass = kjcClassesDao.findClassByQualifiedName(qualifiedClassName);
		//check if class exists
		if(kjcClass == null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_CLASS_NOTFOUND));
		}		
		// creating BusinessValidationException
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
		
	}

}
