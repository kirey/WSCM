package com.kirey.kjcore.api.restcontrollers;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.batch.core.launch.JobOperator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.kjcore.api.dto.BatchJobDto;
import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ResponseMessagesConstants;
import com.kirey.kjcore.data.compositedao.BatchManagementService;
import com.kirey.kjcore.data.dao.KjcSchedulerTracesDao;
import com.kirey.kjcore.data.entity.BatchJobInstance;
import com.kirey.kjcore.features.scheduling.jobs.launcher.BatchJobLauncher;

/**
 * JobManagementController is used for displaying jobs and offer the possibility
 * to start or to stop a job without scheduler interaction
 * 
 * @author Alexandra Onofrei
 *
 */

@RestController
@RequestMapping(value = "/rest/jobs", produces = "application/json; charset=UTF-8")
public class JobManagementController {

	@Autowired
	private BatchManagementService batchManagementService;
	@Autowired
	private KjcSchedulerTracesDao kjcSchedulerTracesDao;
	@Autowired
	private JobOperator jobOperator;
	@Autowired
	private BatchJobLauncher batchJobLauncher;

	/**
	 * This method returns a map which contains a list with the last execution
	 * details for each job and refresh time for jobs management page.
	 * 
	 * @return ResponseEntity containing a map with the list of last execution
	 *         details of all the job and refresh time for jobs management page
	 *         along with HTTP status
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getTaskSchedulersInformations() {
		Map<String, Object> kjcTaskSchedulersList = batchManagementService.getLastExecutionDetails();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(kjcTaskSchedulersList, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method is used to stop a spring batch job execution. This method is
	 * deprecated because stopping a job while running can cause a lot of
	 * problems
	 * 
	 * @param requestBodyParameters
	 *            - contains job name
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@Deprecated
	@RequestMapping(value = "/stopJob", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> cancelJob(@RequestBody Map<String, String> requestBodyParameters) {
		try {
			Set<Long> executions = jobOperator.getRunningExecutions(requestBodyParameters.get(AppConstants.JOB_NAME));
			if (executions.iterator().hasNext()) {
				jobOperator.stop(executions.iterator().next());
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_JOB_SUCCESSFULLY_STOPPED), HttpStatus.OK);
	}

	/**
	 * This method is used to start a spring batch job directly without using.
	 * the scheduler
	 * 
	 * @param requestBodyParameters
	 *            - contains scheduler name
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/startJob", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> startJob(@RequestBody Map<String, String> requestBodyParameters) {

		if (!kjcSchedulerTracesDao.isJobRunning(requestBodyParameters.get(AppConstants.SCHEDULER_NAME))) {

			batchJobLauncher.executeManually(requestBodyParameters.get(AppConstants.SCHEDULER_NAME));

			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(),
					ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_JOB_SUCCESSFULLY_STARTED), HttpStatus.OK);

		} else {
			return new ResponseEntity<RestResponseDto>(
					new RestResponseDto(HttpStatus.BAD_REQUEST.value(),
							ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_JOB_CANT_BE_STARTED_WHILE_SCHEDULER_RUNNING),
					HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * 
	 * This method returns a list of all the executions for a specific job.
	 * 
	 * @param jobName
	 *            - indicates the job name
	 * @param startDate
	 *            - indicates the start date from the desired interval
	 * @param endDate
	 *            - indicates the end date from the desired interval
	 * @return ResponseEntity containing the list of execution details for a
	 *         specific job along with HTTP status
	 */
	@RequestMapping(value = "/history", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getJobExecutionHistory(@RequestParam(required = true) String jobName,
			@RequestParam(required = true) String startDate, @RequestParam(required = true) String endDate) {
		List<BatchJobDto> batchJobDtoList = batchManagementService.getJobDetails(jobName, startDate, endDate);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(batchJobDtoList, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method returns the details of a job failure.
	 * 
	 * @param jobInstanceId
	 *            - specifies the job instance
	 * @return ResponseEntity containing the details of job failure along with
	 *         HTTP status
	 */
	@RequestMapping(value = "/failureDetail", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getExecutionErrorDetail(@RequestParam(required = true) String jobInstanceId) {

		Map<String,Object> allErrors = batchManagementService.getAllErrorDetails(Integer.parseInt(jobInstanceId));
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(allErrors, HttpStatus.OK.value()), HttpStatus.OK);
	}
}
