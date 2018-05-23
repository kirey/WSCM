package com.kirey.kjcore.api.restcontrollers;

import java.io.IOException;
import java.util.List;

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

import com.kirey.kjcore.api.dto.CompanyCssDto;
import com.kirey.kjcore.api.dto.CompanyDto;
import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ResponseMessagesConstants;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.compositedao.CompaniesService;
import com.kirey.kjcore.data.dao.KjcCompaniesDao;
import com.kirey.kjcore.data.dao.KjcCompanyCssDao;
import com.kirey.kjcore.data.entity.KjcCompanies;
import com.kirey.kjcore.features.exception.customexceptions.FormalValidationException;
import com.kirey.kjcore.validations.AdminCompaniesValidation;

/**Rest controller used for company administration
 * @author nicutac
 *
 */

@RestController
@RequestMapping(value = "/rest/adminCompanies", produces = "application/json; charset=UTF-8")
public class AdminCompaniesController {

	@Autowired
	private CompaniesService companiesService;

	@Autowired
	private KjcCompaniesDao kjcCompaniesDao;

	@Autowired
	private KjcCompanyCssDao kjcCompanyCssDao;

	@Autowired
	private AdminCompaniesValidation adminCompaniesValidation;

	/**
	 * This method gets the list of companies without the default one
	 * 
	 * @return ResponseEntity containing the list of all companies along side with
	 *         CSS data and HTTP status
	 */
	@RequestMapping(value = "/superAdmin/company", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getCompanies() {

		return new ResponseEntity<RestResponseDto>(new RestResponseDto(companiesService.findCompaniesWithoutDefault(), HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method saves a company
	 * 
	 * @param companyDto
	 *            specifies the company details
	 * @param result
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/superAdmin/company", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> addNewCompany(@RequestPart @Valid CompanyDto companyDto, @RequestPart MultipartFile logo, BindingResult result) {

		// formal validation
		if (result.hasErrors()) {
			throw new FormalValidationException(result);
		}

		adminCompaniesValidation.validationForSaveCompany(companyDto);
		byte[] logoBytes = null;
		try {
			logoBytes = logo != null ? logo.getBytes() : null;
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		companiesService.addNewCompany(companyDto, logoBytes);

		return new ResponseEntity<RestResponseDto>(
				new RestResponseDto(HttpStatus.OK.value(),
						ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_ADDED_SUCCESSFULLY + ": " + companyDto.getCode()),
				HttpStatus.OK);
	}
	
	/**
	 * This method gets company profile based on company id along side with css
	 * settings
	 * 
	 * @param companyId
	 *            - specifies the company id
	 * @return ResponseEntity containing the list of all companies along with
	 *         CSS data and HTTP status
	 */
	@RequestMapping(value = "/superAdmin/company/{companyId}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getCompany(@PathVariable int companyId) {
		
		return new ResponseEntity<RestResponseDto>(
				new RestResponseDto(companiesService.getCompany(companyId), HttpStatus.OK.value()),
				HttpStatus.OK);
	}


	/**
	 * This method updates a company
	 * 
	 * @param companyDto
	 *            specifies the company details
	 * @param result
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/superAdmin/company", method = RequestMethod.PUT)
	public ResponseEntity<Object> editCompanySuperAdmin(@RequestBody @Valid CompanyDto companyDto, BindingResult result) {

		// formal validation
		if (result.hasErrors()) {
			throw new FormalValidationException(result);
		}
		KjcCompanies actualCompany = kjcCompaniesDao.findById(companyDto.getId());
		adminCompaniesValidation.validationForEditCompany(companyDto, actualCompany);

		actualCompany.setCode(companyDto.getCode());
		actualCompany.setDescription(companyDto.getDescription());
		actualCompany.setName(companyDto.getName());
		actualCompany.setFlActive(companyDto.isFlActive());
		actualCompany.setPasswordTimeout(companyDto.getPasswordTimeout());
		kjcCompaniesDao.merge(actualCompany);

		return new ResponseEntity<Object>(
				new RestResponseDto(HttpStatus.OK.value(),
						ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_UPDATED_SUCCESSFULLY + ": " + companyDto.getCode()),
				HttpStatus.OK);
	}
	
	/**
//	 * This method updates defaultCompany
	 * @param name
	 * @param description
	 * @return
	 */
	@RequestMapping(value = "/defaultCompany", method = RequestMethod.PUT)
	public ResponseEntity<RestResponseDto> editDefaultCompany(@RequestParam String name, @RequestParam String description){
		KjcCompanies defaultCompany = kjcCompaniesDao.findDefaultCompanyWithCss();
		defaultCompany.setName(name);
		defaultCompany.setDescription(description);
		kjcCompaniesDao.attachDirty(defaultCompany);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_UPDATED_SUCCESSFULLY),	HttpStatus.OK);
	}


	/**
	 * This method updates a company
	 * 
	 * @param companyDto
	 *            specifies the company details
	 * @param result
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/company", method = RequestMethod.PUT)
	public ResponseEntity<Object> editCompany(@RequestBody @Valid CompanyDto companyDto, BindingResult result) {

		// formal validation
		if (result.hasErrors()) {
			throw new FormalValidationException(result);
		}
		KjcCompanies actualCompany = kjcCompaniesDao.findById(Utilities.getUserFromContext().getKjcCompanies().getId());
		adminCompaniesValidation.validationForEditCompany(companyDto, actualCompany);

		actualCompany.setDescription(companyDto.getDescription());
		actualCompany.setName(companyDto.getName());
		actualCompany.setPasswordTimeout(companyDto.getPasswordTimeout());
		kjcCompaniesDao.merge(actualCompany);

		return new ResponseEntity<Object>(
				new RestResponseDto(HttpStatus.OK.value(),
						ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_UPDATED_SUCCESSFULLY + ": " + companyDto.getCode()),
				HttpStatus.OK);
	}

	/**
	 * This method activates/deactivates a company
	 * 
	 * @param id
	 *            specifies the company id
	 * @param status
	 *            specifies the desired status
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/superAdmin/company/{id}/{status}", method = RequestMethod.PUT)
	public ResponseEntity<Object> changeCompanyStatus(@PathVariable int id, @PathVariable boolean status) {
		kjcCompaniesDao.changeCompanyStatus(id, status);
		if (AppConstants.GLOBAL_TRUE == status) {
			return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
					ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_ACTIVATED_SUCCESSFULLY), HttpStatus.OK);
		} else {
			return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
					ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_DEACTIVATED_SUCCESSFULLY), HttpStatus.OK);
		}
	}

	/**
	 * This method saves new default css style
	 * 
	 * @param cssData
	 *            specifies the css settings
	 * 
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/superAdmin/newDefaultCss", method = RequestMethod.POST)
	public ResponseEntity<Object> addNewDefaultCss(@RequestBody List<CompanyCssDto> cssData) {

		companiesService.addNewDefaultCss(cssData);

		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_CSS_ADDED_SUCCESSFULLY), HttpStatus.OK);
	}

	/**
	 * This method resets all css styles to the initial one for the default
	 * company also for all companies that use default css style
	 * 
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/superAdmin/resetToInitialCss", method = RequestMethod.PUT)
	public ResponseEntity<Object> resetToInitialCss() {

		companiesService.resetToInitialCss();

		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_CSS_RESET_SUCCESSFULLY), HttpStatus.OK);
	}

	/**
	 * This method gets company profile from context along side with css
	 * 
	 * @return ResponseEntity containing the list of all companies along with
	 *         CSS data and HTTP status
	 */
	@RequestMapping(value = "/company", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getCompany() {
		
		return new ResponseEntity<RestResponseDto>(
				new RestResponseDto(companiesService.getCompany(Utilities.getUserFromContext().getKjcCompanies().getId()), HttpStatus.OK.value()),
				HttpStatus.OK);
	}


	/**
	 * This method saves new css style
	 * 
	 * @param cssData
	 *            specifies the css settings
	 * 
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/company/newCompanyCss", method = RequestMethod.POST)
	public ResponseEntity<Object> addNewCompanyCssSuperAdmin(@RequestBody List<CompanyCssDto> cssData) {

		if(Utilities.getUserFromContext().getKjcCompanies().getCode().equals(AppConstants.DEFAULT_COMPANY_CODE)){
			return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(),
					ValidationErrorConstants.VALIDATION_BUSINESS_DEFAULT_COMPANY_UNABLE_TO_EDIT), HttpStatus.BAD_REQUEST);
		}else
			companiesService.addNewCompanyCss(Utilities.getUserFromContext().getKjcCompanies().getId(), cssData);

		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_CSS_ADDED_SUCCESSFULLY), HttpStatus.OK);
	}

	/**
	 * This method save new css style
	 * 
	 * @param companyId
	 *            - specifies the company id
	 * @param cssData
	 *            - specifies the css settings
	 * 
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/superAdmin/company/newCompanyCss/{companyId}", method = RequestMethod.POST)
	public ResponseEntity<Object> addNewCompanyCss(@RequestBody List<CompanyCssDto> cssData, @PathVariable int companyId) {

		companiesService.addNewCompanyCss(companyId, cssData);

		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_CSS_ADDED_SUCCESSFULLY), HttpStatus.OK);
	}

	/**
	 * This method resets all css styles for selected company to the previous
	 * one
	 * 
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/company/resetToPreviousCss", method = RequestMethod.PUT)
	public ResponseEntity<Object> resetToPreviousCss() {

		kjcCompanyCssDao.resetToPreviousCss(Utilities.getUserFromContext().getKjcCompanies().getId());

		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_CSS_RESET_SUCCESSFULLY), HttpStatus.OK);
	}

	/**
	 * This method resets all css styles for selected company to the previous
	 * one
	 * 
	 * @param companyId
	 *            - specifies the css settings
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/superAdmin/company/resetToPreviousCss/{companyId}", method = RequestMethod.PUT)
	public ResponseEntity<Object> resetCompanyToPreviousCss(@PathVariable int companyId) {

		kjcCompanyCssDao.resetToPreviousCss(companyId);

		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_CSS_RESET_SUCCESSFULLY), HttpStatus.OK);
	}

	/**
	 * This method resets all css styles for selected company to the default one
	 * 
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/company/resetToDefaultCss", method = RequestMethod.PUT)
	public ResponseEntity<Object> resetToDefaultCss() {

		companiesService.resetToDefaultCss(Utilities.getUserFromContext().getKjcCompanies().getId());

		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_CSS_RESET_SUCCESSFULLY), HttpStatus.OK);
	}

	/**
	 * This method resets all css styles for selected company to the default one
	 * 
	 * @param companyId
	 *            - specifies the css settings
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/superAdmin/company/resetToDefaultCss/{companyId}", method = RequestMethod.PUT)
	public ResponseEntity<Object> resetCompanyToDefaultCss(@PathVariable int companyId) {

		companiesService.resetToDefaultCss(companyId);

		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_CSS_RESET_SUCCESSFULLY), HttpStatus.OK);
	}
	
	/**
	 * This method uploads company logo in database
	 * @param companyLogo
	 * @param companyId
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/company/logo",  method = RequestMethod.POST)
	public ResponseEntity<Object> uploadCompanyLogo(@RequestPart MultipartFile companyLogo, @RequestPart String companyId){
		KjcCompanies kjcCompanies = kjcCompaniesDao.findById(Integer.parseInt(companyId));
		try {
			kjcCompanies.setCompanyLogo(companyLogo == null ? null : companyLogo.getBytes());
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		kjcCompaniesDao.attachDirty(kjcCompanies);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(), ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_COMPANY_LOGO), HttpStatus.OK);
	}

}
