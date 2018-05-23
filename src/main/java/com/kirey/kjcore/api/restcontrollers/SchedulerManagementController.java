package com.kirey.kjcore.api.restcontrollers;

import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ResponseMessagesConstants;
import com.kirey.kjcore.data.compositedao.BatchManagementService;
import com.kirey.kjcore.data.dao.KjcSchedulerTracesDao;
import com.kirey.kjcore.data.dao.KjcTaskSchedulersDao;
import com.kirey.kjcore.data.entity.KjcTaskSchedulers;
import com.kirey.kjcore.features.exception.customexceptions.FormalValidationException;
import com.kirey.kjcore.features.scheduling.DynamicScheduler;
import com.kirey.kjcore.validations.BatchBusinessValidations;

/**
 * BatchManagementController is used for displaying scheduler executions
 * details, offer the possibility to insert / to delete or to modify scheduler
 * details and also to stop the next executions.
 * 
 * @author Alexandra Onofrei
 *
 */

@RestController
@RequestMapping(value = "/rest/schedulerManagement", produces = "application/json; charset=UTF-8")
public class SchedulerManagementController {

	@Autowired
	private BatchManagementService batchManagementService;
	@Autowired
	private KjcTaskSchedulersDao kjcTaskSchedulersDao;
	@Autowired
	private KjcSchedulerTracesDao kjcSchedulerTracesDao;
	@Autowired
	private BatchBusinessValidations batchBusinessValidations;
	@Autowired
	private ApplicationContext applicationContext;

	/**
	 * This method returns a list with all schedulers and details about them.
	 * 
	 * @return ResponseEntity containing a map with the list of the schedulers
	 *         and refresh time for scheduler management page along with HTTP
	 *         status
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getTaskSchedulersInformations() {

		Map<String, Object> schedulersInfoMap = batchManagementService.getAllSchedulers();

		return new ResponseEntity<RestResponseDto>(new RestResponseDto(schedulersInfoMap, HttpStatus.OK.value()),
				HttpStatus.OK);

	}

	/**
	 * This method is used to save or update a scheduler details or to revive a
	 * deleted scheduler.
	 * 
	 * @param kjcTaskSchedulers
	 *            - indicates the new task scheduler
	 * @param bindingResult
	 *            - object used for formal validation
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> saveScheduler(
			@RequestBody(required = true) @Valid KjcTaskSchedulers kjcTaskSchedulers, BindingResult bindingResult) {

		if (!kjcSchedulerTracesDao.isJobRunning(kjcTaskSchedulers.getName())) {

			if (bindingResult.hasErrors()) {

				throw new FormalValidationException(bindingResult);

			} else {
				KjcTaskSchedulers existingKjcTaskSchedulers = kjcTaskSchedulersDao
						.findByName(kjcTaskSchedulers.getName());
				batchBusinessValidations.doValidation(kjcTaskSchedulers, existingKjcTaskSchedulers);

				// save or update or resurrect an deleted scheduler
				batchManagementService.saveTaskScheduler(kjcTaskSchedulers, existingKjcTaskSchedulers);

				if (kjcTaskSchedulers.isCronModified()
						|| AppConstants.JOB_STATUS_CRASHED.equals(kjcTaskSchedulers.getLastExecutionStatus())) {
					// update cron expression and schedule the next execution
					DynamicScheduler dynamicScheduler = (DynamicScheduler) applicationContext
							.getBean(kjcTaskSchedulers.getTriggerName());
					dynamicScheduler.updateCronExpression(kjcTaskSchedulers);
				}

				return new ResponseEntity<RestResponseDto>(
						new RestResponseDto(HttpStatus.OK.value(),
								ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_SCHEDULER_SAVED_SUCCESSFULLY),
						HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<RestResponseDto>(
					new RestResponseDto(HttpStatus.BAD_REQUEST.value(),
							ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_CANT_SAVE_SCHEDULER_WHILE_RUNNING),
					HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * This method is used to stop the scheduler's next executions.
	 * 
	 * @param requestBodyParameters
	 *            - contains scheduler name
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/stopScheduler", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> cancelTaskScheduler(@RequestBody Map<String, String> requestBodyParameters) {

		if (!kjcSchedulerTracesDao.isJobRunning(requestBodyParameters.get(AppConstants.SCHEDULER_NAME))) {

			String beanTriggerId = kjcTaskSchedulersDao
					.findTriggerName(requestBodyParameters.get(AppConstants.SCHEDULER_NAME));
			DynamicScheduler dynamicScheduler = (DynamicScheduler) applicationContext.getBean(beanTriggerId);
			dynamicScheduler.cancelTaskExecution();

			return new ResponseEntity<RestResponseDto>(
					new RestResponseDto(HttpStatus.OK.value(),
							ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_SCHEDULER_SUCCESSFULLY_STOPPED),
					HttpStatus.OK);

		} else {

			return new ResponseEntity<RestResponseDto>(
					new RestResponseDto(HttpStatus.BAD_REQUEST.value(),
							ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_CANT_SAVE_SCHEDULER_WHILE_RUNNING),
					HttpStatus.BAD_REQUEST);
		}

	}

	/**
	 * This method is used to delete from DB the scheduler's parameters.
	 * 
	 * @param schedulerName
	 *            -indicates the scheduler that must be deleted
	 * @param parameterId
	 *            - indicates the parameter that must be deleted
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/deleteParameters/{schedulerName}/{parameterId}", method = RequestMethod.DELETE)
	public ResponseEntity<RestResponseDto> deleteParameter(@PathVariable String schedulerName,
			@PathVariable Integer parameterId) {

		if (!kjcSchedulerTracesDao.isJobRunning(schedulerName)) {

			batchManagementService.deleteSchedulerParameters(schedulerName, parameterId);

			return new ResponseEntity<RestResponseDto>(
					new RestResponseDto(HttpStatus.OK.value(),
							ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_PARAMS_DELETED_SUCCESSFULLY),
					HttpStatus.OK);
		} else {

			return new ResponseEntity<RestResponseDto>(
					new RestResponseDto(HttpStatus.BAD_REQUEST.value(),
							ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_CANT_SAVE_SCHEDULER_WHILE_RUNNING),
					HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * This method is used to delete from DB a scheduler.
	 * 
	 * @param schedulerName
	 *            - indicates the scheduler that must be deleted
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/deleteScheduler/{schedulerName}", method = RequestMethod.DELETE)
	public ResponseEntity<RestResponseDto> deleteScheduler(@PathVariable String schedulerName) {

		if (!kjcSchedulerTracesDao.isJobRunning(schedulerName)) {

			batchManagementService.deleteScheduler(schedulerName);

			return new ResponseEntity<RestResponseDto>(
					new RestResponseDto(HttpStatus.OK.value(),
							ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_SCHEDULER_DELETED_SUCCESSFULLY),
					HttpStatus.OK);
		} else {

			return new ResponseEntity<RestResponseDto>(
					new RestResponseDto(HttpStatus.BAD_REQUEST.value(),
							ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_CANT_SAVE_SCHEDULER_WHILE_RUNNING),
					HttpStatus.BAD_REQUEST);

		}
	}

}
