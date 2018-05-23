package com.kirey.kjcore.validations;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.InlineResourcesDto;
import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.data.dao.KjcEmailConfigsDao;
import com.kirey.kjcore.data.dao.KjcEmailTemplatesDao;
import com.kirey.kjcore.data.entity.KjcEmailConfigs;
import com.kirey.kjcore.data.entity.KjcEmailTemplates;
import com.kirey.kjcore.features.exception.customexceptions.BusinessValidationException;

/**A component used to handle email administration validation
 * @author 
 *
 */
@Component
public class AdminEmailsValidation extends BaseValidation {

	@Autowired
	private KjcEmailConfigsDao kjcEmailConfigsDao;
	
	@Autowired
	private KjcEmailTemplatesDao kjcEmailTemplatesDao;

	/**
	 * This method validates if:
	 * <p>
	 * - the email configuration already exists
	 * <p>
	 * - the email configuration name contains white spaces
	 * <p>
	 * - the email has correct format
	 * @param kjcEmailConfigs
	 * @throws BusinessValidationException
	 *             if one of these fails
	 */
	public void validationForSaveEmailConfigs(KjcEmailConfigs kjcEmailConfigs) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		// check if email configuration already exists
		if (kjcEmailConfigsDao.findByConfigName(kjcEmailConfigs.getName()) != null) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_CONFIG_ALREADY_EXISTS_IN_DB));
		}

		// check if email has correct format
		Boolean flag = false;
		if (kjcEmailConfigs.getEmailAddress() != null) {
			Pattern p = Pattern.compile(
					"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
			Matcher m = p.matcher(kjcEmailConfigs.getEmailAddress());
			flag = m.find();
		}

		// check if email configuration name contains white spaces
		if (kjcEmailConfigs.getName().indexOf(' ') >= 0) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_CONFIG_NAME_FORMAT_BAD));
		}

		if (!flag) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_CONFIG_EMAIL_FORMAT_BAD));
		}

		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**
	 * This method validates if:
	 * <p>
	 * - the email configuration already exists
	 * <p>
	 * - the email configuration name contains white spaces
	 * <p>
	 * - the email has correct format
	 * @param kjcEmailConfigs
	 * @throws BusinessValidationException
	 *             if one of these fails
	 */
	public void validationForEditEmailConfigs(KjcEmailConfigs kjcEmailConfigs) {

		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		KjcEmailConfigs oldConfig = kjcEmailConfigsDao.findById(kjcEmailConfigs.getId());
		// check if email configuration already exists
		if (!oldConfig.getName().equals(kjcEmailConfigs.getName())) {
			if (kjcEmailConfigsDao.findByConfigName(kjcEmailConfigs.getName()) != null) {
				validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
						ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_CONFIG_ALREADY_EXISTS_IN_DB));
			}
		}
		// check if email has correct format
		Boolean flag = false;
		if (kjcEmailConfigs.getEmailAddress() != null) {
			Pattern p = Pattern.compile(
					"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
			Matcher m = p.matcher(kjcEmailConfigs.getEmailAddress());
			flag = m.find();
		}

		// check if email configuration name contains white spaces
		if (kjcEmailConfigs.getName().indexOf(' ') >= 0) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_CONFIG_NAME_FORMAT_BAD));
		}

		if (!flag) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_CONFIG_EMAIL_FORMAT_BAD));
		}

		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**
	 * This method validates if:
	 * <p>
	 * - the template already exists
	 * <p>
	 * - the template name contains white spaces
	 * <p>
	 * - the cid resource are duplicated
	 * @param kjcEmailTemplates
	 * @param inlineResources
	 * @throws BusinessValidationException
	 *             if one of these fails
	 */
	public void validationForSaveEmailTemplate(KjcEmailTemplates kjcEmailTemplates,
			InlineResourcesDto[] inlineResources) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		// check if template already exists
		if (kjcEmailTemplatesDao.findByTemplateName(kjcEmailTemplates.getName()) != null) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_TEMPLATE_ALREADY_EXISTS_IN_DB));
		}

		// check if template name contains white spaces
		if (kjcEmailTemplates.getName().indexOf(' ') >= 0) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_TEMPLATE_NAME_FORMAT_BAD));
		}

		// check if the cid resource are duplicated
		Set<String> cidResource = new HashSet<>();
		for (int i = 0; i < inlineResources.length; i++)
			cidResource.add(inlineResources[i].getCdResource());

		if (inlineResources.length != cidResource.size()) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_TEMPLATE_CID_DUPLICATED));
		}

		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**
	 * This method validates if:
	 * <p>
	 * - the template already exists
	 * <p>
	 * - the template name contains white spaces
	 * <p>
	 * - the cid resource are duplicated
	 * 
	 * @param kjcEmailTemplates
	 * @param inlineResources
	 * @throws BusinessValidationException
	 *          if one of these fails
	 */
	public void validationForEditEmailTemplate(KjcEmailTemplates kjcEmailTemplates,
			InlineResourcesDto[] inlineResources) {

		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		KjcEmailTemplates oldTemplate = kjcEmailTemplatesDao.findById(kjcEmailTemplates.getId());
		// check if template already exists
		if (!oldTemplate.getName().equals(kjcEmailTemplates.getName())) {
			if (kjcEmailTemplatesDao.findByTemplateName(kjcEmailTemplates.getName()) != null) {
				validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
						ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_TEMPLATE_ALREADY_EXISTS_IN_DB));
			}
		}

		// check if template name contains white spaces
		if (kjcEmailTemplates.getName().indexOf(' ') >= 0) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_TEMPLATE_NAME_FORMAT_BAD));
		}

		// check if the cid resource are duplicated
		Set<String> cidResource = new HashSet<>();
		for (int i = 0; i < inlineResources.length; i++)
			cidResource.add(inlineResources[i].getCdResource());
		// check if cid its dublicate
		if (inlineResources.length != cidResource.size()) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_EMAIL_TEMPLATE_CID_DUPLICATED));
		}
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
}
