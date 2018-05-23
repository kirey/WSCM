package com.kirey.kjcore.api.restcontrollers;

import java.io.IOException;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kirey.kjcore.api.dto.InlineResourcesDto;
import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.ResponseMessagesConstants;
import com.kirey.kjcore.data.compositedao.EmailingService;
import com.kirey.kjcore.data.dao.KjcEmailConfigsDao;
import com.kirey.kjcore.data.dao.KjcEmailTemplatesDao;
import com.kirey.kjcore.data.entity.KjcEmailConfigs;
import com.kirey.kjcore.data.entity.KjcEmailTemplates;
import com.kirey.kjcore.features.exception.customexceptions.FormalValidationException;
import com.kirey.kjcore.validations.AdminEmailsValidation;

/**Rest controller used for emailing administration
 * @author nicutac
 *
 */
@RestController
@RequestMapping(value = "/rest/adminEmails", produces = "application/json; charset=UTF-8")
public class AdminEmailsController {

	@Autowired
	private EmailingService emailingService;

	@Autowired
	private KjcEmailConfigsDao kjcEmailConfigsDao;

	@Autowired
	private KjcEmailTemplatesDao kjcEmailTemplatesDao;

	@Autowired
	private AdminEmailsValidation adminEmailsValidation;

	/**
	 * This method gets list of email configurations
	 * @return Response Entity containing all email configurations and HTTP status
	 */
	@RequestMapping(value = "/getAllEmailsConfigs", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllEmailsConfigs() {

		List<KjcEmailConfigs> listOfEmailsConfigs = kjcEmailConfigsDao.findAll();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listOfEmailsConfigs, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method saves new email configuration
	 * @param emailConfigs
	 * @param result
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/saveEmailConfigs", method = RequestMethod.POST, consumes = {
			MediaType.APPLICATION_JSON_VALUE }, headers = "Accept=application/json")
	public ResponseEntity<Object> saveEmailConfigs(@RequestBody @Valid KjcEmailConfigs emailConfigs,
			BindingResult result) {

		// formal validation
		if (result.hasErrors()) {
			throw new FormalValidationException(result);
		}
		adminEmailsValidation.validationForSaveEmailConfigs(emailConfigs);

		emailingService.saveEmailConfigs(emailConfigs);

		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants. RESPONSE_CONFIRMATION_MESSAGE_EMAIL_CONFIGS_ADDED_SUCCESSFULLY + ": " + emailConfigs.getName()),
				HttpStatus.OK);
	}

	/**
	 * This method updates email configuration
	 * @param emailConfigs
	 * @param result
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/updateEmailConfigs", method = RequestMethod.PUT, consumes = {
			MediaType.APPLICATION_JSON_VALUE }, headers = "Accept=application/json")
	public ResponseEntity<Object> updateEmailConfigs(@RequestBody @Valid KjcEmailConfigs emailConfigs,
			BindingResult result)  {

		// formal validation
		if (result.hasErrors()) {
			throw new FormalValidationException(result);
		}
		adminEmailsValidation.validationForEditEmailConfigs(emailConfigs);

		emailingService.updateEmailConfigs(emailConfigs);

		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_EMAIL_CONFIGS_UPDATED_SUCCESSFULLY + ": " + emailConfigs.getName()),
				HttpStatus.OK);
	}

	/**
	 * This method deletes email configuration
	 * @param id
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/deleteEmailConfigs/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteEmailConfigs(@PathVariable int id) {
		emailingService.deleteEmailConfig(id);
		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_EMAIL_CONFIGS_DELETED_SUCCESSFULLY), HttpStatus.OK);
	}

	/**
	 * This method gets list of email templates
	 * @return Response Entity containing list of all email templates and HTTP status
	 */
	@RequestMapping(value = "/getAllEmailsTemplates", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllEmailTemplates() {

		List<KjcEmailTemplates> listOfEmailTemplates = kjcEmailTemplatesDao.findAllTemplatesWithResources();

		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listOfEmailTemplates, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method saves new email template
	 * @param templateFile
	 * @param inlineResources
	 * @param template
	 * @param result
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/saveEmailTemplate", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Object> saveEmailTemplate(
			@RequestPart(required = false, name = "templateFile") MultipartFile templateFile,
			@RequestPart(required = false, name = "inlineResource") InlineResourcesDto[] inlineResources,
			@RequestPart(required = true, name = "template") @Valid KjcEmailTemplates template, BindingResult result)
	{

		// formal validation
		if (result.hasErrors()) {
			throw new FormalValidationException(result);
		}
		adminEmailsValidation.validationForSaveEmailTemplate(template, inlineResources);
		try {
			emailingService.saveEmailTemplates(template, templateFile, inlineResources);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		return new ResponseEntity<Object>(
				new RestResponseDto(HttpStatus.OK.value(),
						ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_EMAIL_TEMPLATE_ADDED_SUCCESSFULLY + ": " + template.getName()),
				HttpStatus.OK);
	}

	/**
	 * This method updates email template
	 * @param template
	 * @param templateFile
	 * @param inlineResources
	 * @param arrDeletedResources
	 * @param result
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/updateEmailTemplate", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Object> updateEmailTemplate(@RequestPart(name = "template") @Valid KjcEmailTemplates template,
			@RequestPart(required = false, name = "templateFile") MultipartFile templateFile,
			@RequestPart(required = false, name = "inlineResource") InlineResourcesDto[] inlineResources,
			@RequestPart(required = false, name = "arrDeletedResources") Integer[] arrDeletedResources,
			BindingResult result) {

		// formal validation
		if (result.hasErrors()) {
			throw new FormalValidationException(result);
		}
		adminEmailsValidation.validationForEditEmailTemplate(template, inlineResources);
		try {
			emailingService.updateEmailTemplates(template, templateFile, inlineResources, arrDeletedResources);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_EMAIL_TEMPLATE_UPDATED_SUCCESSFULLY + ": " + template.getName()),
				HttpStatus.OK);
	}

	/**
	 * This method deletes email template
	 * @param id
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/deleteEmailTemplate/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteEmailTemplate(@PathVariable int id) {

		emailingService.deleteTemplate(id);

		return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_EMAIL_TEMPLATE_DELETED_SUCCESSFULLY), HttpStatus.OK);
	}

}
