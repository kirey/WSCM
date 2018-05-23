package com.kirey.kjcore.validations;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.data.dao.KjcTaskSchedulersDao;
import com.kirey.kjcore.data.dao.KjcUserAccountsDao;
import com.kirey.kjcore.data.entity.KjcTaskParameters;
import com.kirey.kjcore.data.entity.KjcTaskSchedulers;
import com.kirey.kjcore.data.entity.KjcUserAccounts;
import com.kirey.kjcore.features.exception.customexceptions.BusinessValidationException;

/**
 * This service is used to handle batch business validation.
 * 
 * @author
 *
 */
@Service(value = "batchBusinessValidations")
public class BatchBusinessValidations extends BaseValidation {

	@Autowired
	private KjcTaskSchedulersDao kjcTaskSchedulersDao;
	@Autowired
	private KjcUserAccountsDao kjcUserAccountsDao;
	@Autowired
	private ApplicationContext applicationContext;

	/**
	 * This method validates if fake user doesn't exist, scheduler already
	 * exists, job name doesn't exist, trigger doesn't exist or parameter exists
	 * in database. It also validates in case that job or trigger is used by
	 * another task
	 * 
	 * @param kjcTaskSchedulers
	 * @param existingKjcTaskSchedulers
	 * @throws BusinessValidationException
	 */
	public void doValidation(KjcTaskSchedulers kjcTaskSchedulers, KjcTaskSchedulers existingKjcTaskSchedulers) {

		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();

		// check if fake user for this job category exist
		String jobCategory = kjcTaskSchedulers.getJobName().split(AppConstants.UNDERLINE)[0];
		KjcUserAccounts kjcUserAccounts = kjcUserAccountsDao
				.getFakeUserByUsername(AppConstants.FAKE_USERNAME + AppConstants.UNDERLINE + jobCategory);
		if (kjcUserAccounts == null) {
			validationErrorDtos.add(new ValidationErrorDto(getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_FAKE_USER_DOESNT_EXIST));
		}

		// check schedulerName
		if (kjcTaskSchedulers.getId() == null && existingKjcTaskSchedulers != null
				&& !existingKjcTaskSchedulers.isFlDeleted()) {
			validationErrorDtos.add(new ValidationErrorDto(getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_SCHEDULER_ALREADY_EXIST));
		}

		// check jobName
		if (!applicationContext.containsBeanDefinition(kjcTaskSchedulers.getJobName())) {
			validationErrorDtos.add(new ValidationErrorDto(getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_JOB_NAME_DOESNT_EXIST));
		}
		// check if the same job it is used for another scheduler
		if (kjcTaskSchedulersDao.isJobUsedByAnotherTask(kjcTaskSchedulers.getJobName(), kjcTaskSchedulers.getName())) {
			validationErrorDtos.add(
					new ValidationErrorDto(getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_JOB_ALREADY_USED));

		}

		// check triggerName
		if (!applicationContext.containsBeanDefinition(kjcTaskSchedulers.getTriggerName())) {
			validationErrorDtos.add(new ValidationErrorDto(getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_TRIGGER_NAME_DOESNT_EXIST));

		}
		// check if the same trigger it is used for another scheduler
		if (kjcTaskSchedulersDao.isTriggerUsedByAnotherTask(kjcTaskSchedulers.getTriggerName(),
				kjcTaskSchedulers.getName())) {
			validationErrorDtos.add(new ValidationErrorDto(getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_TRIGGER_ALREADY_USED));
		}

		// check if the same parameter exist already
		if (!kjcTaskSchedulers.getKjcTaskParameterses().isEmpty()) {
			List<String> parameterNameList = new ArrayList<String>();
			for (KjcTaskParameters kjcTaskParameters : kjcTaskSchedulers.getKjcTaskParameterses()) {
				if (parameterNameList.contains(kjcTaskParameters.getName())) {
					validationErrorDtos.add(new ValidationErrorDto(getPageId(),
							ValidationErrorConstants.VALIDATION_BUSINESS_PARAMETER_ALREADY_EXIST));
				} else {
					parameterNameList.add(kjcTaskParameters.getName());
				}
			}
		}

		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
}
