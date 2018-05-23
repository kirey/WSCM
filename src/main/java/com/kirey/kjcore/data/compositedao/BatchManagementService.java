package com.kirey.kjcore.data.compositedao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.api.dto.BatchJobDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.data.dao.BatchJobExecutionDao;
import com.kirey.kjcore.data.dao.BatchJobInstanceDao;
import com.kirey.kjcore.data.dao.BatchStepExecutionDao;
import com.kirey.kjcore.data.dao.KjcBatchJobErrorsDao;
import com.kirey.kjcore.data.dao.KjcErrorLogsDao;
import com.kirey.kjcore.data.dao.KjcGenericsDao;
import com.kirey.kjcore.data.dao.KjcSchedulerTracesDao;
import com.kirey.kjcore.data.dao.KjcTaskParametersDao;
import com.kirey.kjcore.data.dao.KjcTaskSchedulersDao;
import com.kirey.kjcore.data.entity.BatchJobExecution;
import com.kirey.kjcore.data.entity.BatchJobInstance;
import com.kirey.kjcore.data.entity.BatchStepExecution;
import com.kirey.kjcore.data.entity.KjcBatchJobErrors;
import com.kirey.kjcore.data.entity.KjcErrorLogs;
import com.kirey.kjcore.data.entity.KjcGenerics;
import com.kirey.kjcore.data.entity.KjcSchedulerTraces;
import com.kirey.kjcore.data.entity.KjcTaskParameters;
import com.kirey.kjcore.data.entity.KjcTaskSchedulers;

/**
 * A service containing methods related to batch management.
 * 
 * @author
 *
 */
@Service
public class BatchManagementService {

	public static final String SPRING_QUALIFIER = "batchManagementService";

	@Autowired
	private KjcTaskSchedulersDao kjcTaskSchedulersDao;
	@Autowired
	private BatchJobInstanceDao batchJobInstanceDao;
	@Autowired
	private KjcErrorLogsDao kjcErrorLogsDao;
	@Autowired
	private KjcBatchJobErrorsDao kjcBatchJobErrorsDao;
	@Autowired
	private KjcTaskParametersDao kjcTaskParametersDao;
	@Autowired
	private KjcGenericsDao kjcGenericsDao;
	@Autowired
	private KjcSchedulerTracesDao kjcSchedulerTracesDao;
	@Autowired
	private BatchJobExecutionDao batchJobExecutionDao;
	@Autowired
	private BatchStepExecutionDao batchStepExecutionDao;

	/**
	 * This method returns a map which contains a list of schedulers and refresh
	 * time for scheduler management page.
	 * 
	 * @return Map<String, Object>
	 */
	public Map<String, Object> getAllSchedulers() {
		HashMap<String, Object> schedulersMap = new HashMap<String, Object>();

		List<KjcTaskSchedulers> kjcTaskSchedulersList = kjcTaskSchedulersDao.getAllSchedulers();
		schedulersMap.put("kjcTaskSchedulersList", kjcTaskSchedulersList);

		KjcGenerics kjcGenerics = kjcGenericsDao.findById(AppConstants.SCHEDULER_MANAGEMENT_PAGE_REFRESH_TIME_PARAM);
		if (kjcGenerics != null) {
			schedulersMap.put(AppConstants.ADMIN_PAGE_REFRESH_TIME, kjcGenerics.getValue());
		} else {
			schedulersMap.put(AppConstants.ADMIN_PAGE_REFRESH_TIME, AppConstants.NO_REFRESH_TIME);
		}

		return schedulersMap;
	}

	/**
	 * This method is used to save or update scheduler details and its
	 * parameters and also to revive a deleted scheduler.
	 * 
	 * @param kjcTaskSchedulers
	 *            - indicates the new task scheduler
	 * @param existingKjcTaskSchedulers
	 *            - indicates the existing task scheduler
	 */
	public void saveTaskScheduler(KjcTaskSchedulers kjcTaskSchedulers, KjcTaskSchedulers existingKjcTaskSchedulers) {

		if (kjcTaskSchedulers.getId() == null) {
			kjcTaskSchedulers.setLastExecutionStatus(AppConstants.JOB_INSERTED_STATUS);

			// when already exist the same scheduler inserted with the deleted
			// flag = true
			if (existingKjcTaskSchedulers != null) {
				kjcTaskSchedulers.setId(existingKjcTaskSchedulers.getId());
				kjcTaskSchedulers.setFlDeleted(false);
				// delete all old parameters
				kjcTaskParametersDao.deleteAllSchedulerParamers(existingKjcTaskSchedulers.getId());
			}
		}

		// if the cron expression is updated and the last execution status was
		// stopped -> change the status to allow the scheduler run again
		if (kjcTaskSchedulers.getLastExecutionStatus() != null
				&& kjcTaskSchedulers.getLastExecutionStatus().equals(AppConstants.JOB_STATUS_STOPPED)
				&& kjcTaskSchedulers.isCronModified()) {
			kjcTaskSchedulers.setLastExecutionStatus(AppConstants.JOB_INSERTED_STATUS);
		}

		kjcTaskSchedulers.setNumberOfParameters(Long.valueOf(kjcTaskSchedulers.getKjcTaskParameterses().size()));

		kjcTaskSchedulersDao.attachDirty(kjcTaskSchedulers);

	}

	/**
	 * 
	 * This method returns a map which contains a list of details about last
	 * execution for each job and refresh time for job management page.
	 * 
	 * @return Map<String, Object>
	 */
	public Map<String, Object> getLastExecutionDetails() {
		Map<String, Object> executionDetailsMap = new HashMap<String, Object>();

		List<Object[]> ojectList = kjcTaskSchedulersDao.findLastExecution();
		List<BatchJobDto> jobsList = new ArrayList<>();
		for (Object[] object : ojectList) {
			BatchJobDto jobsDto = new BatchJobDto();
			KjcTaskSchedulers kjcTaskSchedulers = (KjcTaskSchedulers) object[0];
			BatchJobExecution batchJobExecution = ((BatchJobInstance) object[1]).getBatchJobExecutions().get(0);

			jobsDto.setJobName(kjcTaskSchedulers.getJobName());
			jobsDto.setJobDescription(kjcTaskSchedulers.getJobDescription());
			jobsDto.setLastExecutionStatus(kjcTaskSchedulers.getLastExecutionStatus());
			jobsDto.setSchedulerName(kjcTaskSchedulers.getName());

			jobsDto.setStartTime(batchJobExecution.getStartTime());
			jobsDto.setEndTime(batchJobExecution.getEndTime());

			jobsList.add(jobsDto);
		}
		executionDetailsMap.put("jobsList", jobsList);

		KjcGenerics kjcGenerics = kjcGenericsDao.findById(AppConstants.JOBS_MANAGEMENT_PAGE_REFRESH_TIME_PARAM);
		if (kjcGenerics != null) {
			executionDetailsMap.put(AppConstants.ADMIN_PAGE_REFRESH_TIME, kjcGenerics.getValue());
		} else {
			executionDetailsMap.put(AppConstants.ADMIN_PAGE_REFRESH_TIME, AppConstants.NO_REFRESH_TIME);
		}

		return executionDetailsMap;
	}

	/**
	 * This method returns details about all the executions of a specific job.
	 * 
	 * @param jobName
	 *            - indicates the job name
	 * @param startDate
	 *            - indicates the start date from the desired interval
	 * @param endDate
	 *            - indicates the end date from the desired interval
	 * @return List<BatchJobDto> containing details about all the executions of
	 *         a specific job
	 */
	public List<BatchJobDto> getJobDetails(String jobName, String startDate, String endDate) {

		List<Object[]> objectList = batchJobInstanceDao.getJobDetails(jobName, startDate, endDate);
		List<BatchJobDto> batchJobDtoList = new ArrayList<>();
		for (Object[] object : objectList) {

			BatchJobInstance batchJobInstance = (BatchJobInstance) object[0];
			BatchJobExecution batchJobExecution = (BatchJobExecution) object[1];

			BatchJobDto batchJobDto = new BatchJobDto();
			batchJobDto.setJobInstanceId(batchJobInstance.getJobInstanceId());
			batchJobDto.setJobExecutionId(batchJobExecution.getJobExecutionId());
			batchJobDto.setCreateTime(batchJobExecution.getCreateTime());
			batchJobDto.setStartTime(batchJobExecution.getStartTime());
			batchJobDto.setEndTime(batchJobExecution.getEndTime());
			batchJobDto.setStatus(batchJobExecution.getStatus());
			batchJobDto.setExitCode(batchJobExecution.getExitCode());

			batchJobDtoList.add(batchJobDto);
		}

		return batchJobDtoList;
	}

	/**
	 * This method returns details about the reason that caused the job failure.
	 * 
	 * @param jobInstanceId
	 *            - specifies the job instance id from the BATCH_JOB_INSTANCE
	 *            table
	 * @return Map<String, Object> - containing all errors for selected job
	 */
	public Map<String, Object> getAllErrorDetails(Integer jobInstanceId) {
		Map<String, Object> allErrors = new HashMap<>();

		// get all runtime exceptions
		List<KjcErrorLogs> kjcErrorLogsList = kjcErrorLogsDao.findSpecificTraces(AppConstants.OFFLINE, jobInstanceId);
		allErrors.put("runtimeErrors", kjcErrorLogsList);

		// get validations exceptions
		List<KjcBatchJobErrors> kjcBatchJobErrorList = kjcBatchJobErrorsDao.getErrorDetails(jobInstanceId.longValue());
		allErrors.put("validationErrors", kjcBatchJobErrorList);
		return allErrors;
	}

	/**
	 * This method is used to delete parameter with id received from scheduler
	 * with name received from DB.
	 * 
	 * @param schedulerName
	 *            - indicates the scheduler name
	 * @param parameterId
	 *            - indicates the parameter id
	 */
	public void deleteSchedulerParameters(String schedulerName, Integer parameterId) {
		KjcTaskParameters kjcTaskParameters = kjcTaskParametersDao.findById(parameterId);
		kjcTaskParametersDao.delete(kjcTaskParameters);

		// update the number of parameters
		KjcTaskSchedulers kjcTaskSchedulers = kjcTaskSchedulersDao.findByName(schedulerName);
		kjcTaskSchedulers.setNumberOfParameters(Long.valueOf(kjcTaskSchedulers.getKjcTaskParameterses().size()));
		kjcTaskSchedulersDao.merge(kjcTaskSchedulers);
	}

	/**
	 * This method is used to delete a scheduler from database with name
	 * received.
	 * 
	 * @param schedulerName
	 *            - indicates the scheduler name
	 */
	public void deleteScheduler(String schedulerName) {
		// it's a logical delete
		KjcTaskSchedulers kjcTaskSchedulers = kjcTaskSchedulersDao.findByName(schedulerName);
		kjcTaskSchedulers.setFlDeleted(true);
		kjcTaskSchedulersDao.merge(kjcTaskSchedulers);
	}

	/**
	 * 
	 * This method updates the job status in CRASHED when the server is starting
	 * up and the job status was remained in STARTED.
	 * 
	 * @param kjcTaskSchedulers
	 *            - contains information about the job
	 * @param kjcSchedulerTraces
	 *            - contains the last trace for job
	 * @param isNewTrace
	 *            - indicates if we need to add a new scheduler trace trace with
	 *            status CRASHED or update the existing one. If we need to add
	 *            new trace that means that we don't need to update the last row
	 *            from BatchJobExecution and
	 * @return
	 */
	@Transactional
	public void updateJobStatusToCrashed(KjcTaskSchedulers kjcTaskSchedulers, KjcSchedulerTraces kjcSchedulerTraces,
			boolean isNewTrace) {

		kjcTaskSchedulersDao.merge(kjcTaskSchedulers);
		kjcSchedulerTracesDao.attachDirty(kjcSchedulerTraces);

		if (!isNewTrace) {
			BigDecimal lastJobExecutionId = batchJobExecutionDao.findLastJobExecutionId(kjcTaskSchedulers.getJobName());
			batchJobExecutionDao.updateStatus(lastJobExecutionId, AppConstants.JOB_STATUS_CRASHED);
			batchStepExecutionDao.updateLastStepStatus(lastJobExecutionId, AppConstants.JOB_STATUS_CRASHED);

		}
	}

	/**
	 * 
	 * This method updates the job status for scheduler and traces.
	 * 
	 * @param kjcTaskSchedulers
	 *            - contains information about the job
	 * @param kjcSchedulerTraces
	 *            - contains the last trace for job
	 * @return
	 */
	@Transactional
	public void updateSchedulerAndTraceStatus(KjcTaskSchedulers kjcTaskSchedulers,
			KjcSchedulerTraces kjcSchedulerTraces) {
		kjcTaskSchedulersDao.merge(kjcTaskSchedulers);
		kjcSchedulerTracesDao.merge(kjcSchedulerTraces);
	}

}
