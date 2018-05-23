package com.kirey.kjcore.data.compositedao;

import java.util.List;

import org.springframework.batch.core.JobExecution;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.kirey.kjcore.common.constants.AppConstants;

import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.dao.KjcBatchJobErrorsDao;
import com.kirey.kjcore.data.dao.KjcErrorLogsDao;
import com.kirey.kjcore.data.dao.KjcErrorTracesDao;
import com.kirey.kjcore.data.entity.KjcBatchJobErrorParams;
import com.kirey.kjcore.data.entity.KjcBatchJobErrors;
import com.kirey.kjcore.data.entity.KjcErrorLogs;
import com.kirey.kjcore.data.entity.KjcErrorTraces;
import com.kirey.kjcore.data.entity.KjcUserAccounts;

/**
 * A service containing methods related to exception logging.
 * 
 * @author
 *
 */
@Service
public class ExceptionLoggerService {

	public static final String SPRING_QUALIFIER = "exceptionLoggerService";

	@Autowired
	private KjcErrorLogsDao kjcErrorLogsDao;

	@Autowired
	private KjcErrorTracesDao kjcErrorTracesDao;

	@Autowired
	private KjcBatchJobErrorsDao kjcBatchJobErrorsDao;

	/**
	 * This method sets data for kjcErrorTraces and kjcErrorLogs and saves
	 * exception in database.
	 * 
	 * @param ex
	 *            - specifies the exception thrown
	 * @param invokingUrl
	 *            - specifies the url from where was thrown the exception
	 */
	@Transactional
	public void saveException(Throwable ex, String invokingUrl) {

		KjcUserAccounts user = Utilities.getUserFromContext();

		KjcErrorLogs kjcErrorLogs = new KjcErrorLogs();
		kjcErrorLogs.setErrorName(ex.toString());
		kjcErrorLogs.setMessage(Utilities.getErrorMessage(ex));

		kjcErrorLogs.setProcessType(AppConstants.ONLINE);
		kjcErrorLogs.setProcessCategory(AppConstants.CATEGORY_CONTROLLER);

		if (user != null) {
			kjcErrorLogs.setUsername(user.getUsername());
		} else {
			kjcErrorLogs.setUsername(AppConstants.USER_NOT_LOGGED);
		}
		kjcErrorLogs.setInvokingUrl(invokingUrl);

		KjcErrorTraces kjcErrorTraces = new KjcErrorTraces();
		kjcErrorTraces.setTrace(Utilities.getErrorStackTrace(ex));

		kjcErrorTraces.setKjcErrorLogs(kjcErrorLogs);

		kjcErrorLogs.setThrownDate(new java.util.Date());

		kjcErrorLogsDao.attachDirty(kjcErrorLogs);

		kjcErrorTracesDao.attachDirty(kjcErrorTraces);

	}

	/**
	 * This method is used to save security exception.
	 * 
	 * @param ex
	 *            - specifies the exception thrown
	 * @param invokingUrl
	 *            - specifies the url from where was thrown the exception
	 */
	@Transactional
	public void saveSecurityException(Throwable ex, String invokingUrl) {

		KjcUserAccounts user = Utilities.getUserFromContext();

		KjcErrorLogs kjcErrorLogs = new KjcErrorLogs();
		kjcErrorLogs.setErrorName(ex.toString());
		kjcErrorLogs.setMessage(Utilities.getErrorMessage(ex));

		kjcErrorLogs.setProcessType(AppConstants.ONLINE);
		kjcErrorLogs.setProcessCategory(AppConstants.CATEGORY_SECURITY);

		if (user != null) {
			kjcErrorLogs.setUsername(user.getUsername());
		} else {
			kjcErrorLogs.setUsername(AppConstants.USER_NOT_LOGGED);
		}
		kjcErrorLogs.setInvokingUrl(invokingUrl);

		KjcErrorTraces kjcErrorTraces = new KjcErrorTraces();
		kjcErrorTraces.setTrace(Utilities.getErrorStackTrace(ex));

		kjcErrorTraces.setKjcErrorLogs(kjcErrorLogs);

		kjcErrorLogs.setThrownDate(new java.util.Date());

		kjcErrorLogsDao.attachDirty(kjcErrorLogs);

		kjcErrorTracesDao.attachDirty(kjcErrorTraces);

	}

	/**
	 * This method saves exception offline.
	 * 
	 * @param ex
	 *            - specifies the thrown exception
	 * @param user
	 *            - specifies the user name
	 * @param taskId
	 *            - additional information for the exception
	 * @param categoryName
	 *            - specifies the process category
	 * @param jobInstanceId
	 *            - specifies the job instance id
	 */
	@Transactional
	public void saveExceptionOffline(Throwable ex, String user, String taskId, String categoryName, Long jobInstanceId) {
		Integer batchJobInstanceId = null;
		if (jobInstanceId != null) {
			batchJobInstanceId = jobInstanceId.intValue();
		}
		KjcErrorLogs kjcErrorLogs = new KjcErrorLogs();
		kjcErrorLogs.setErrorName(ex.toString());
		kjcErrorLogs.setMessage(Utilities.getErrorMessage(ex));
		kjcErrorLogs.setTaskId(taskId);
		kjcErrorLogs.setProcessType(AppConstants.OFFLINE);
		kjcErrorLogs.setProcessCategory(categoryName);
		kjcErrorLogs.setBatchJobInstanceId(batchJobInstanceId);
		if (user != null) {
			kjcErrorLogs.setUsername(user);
		} else {
			kjcErrorLogs.setUsername(AppConstants.USER_NOT_LOGGED);
		}

		KjcErrorTraces kjcErrorTraces = new KjcErrorTraces();
		kjcErrorTraces.setTrace(Utilities.getErrorStackTrace(ex));

		kjcErrorTraces.setKjcErrorLogs(kjcErrorLogs);

		kjcErrorLogs.setThrownDate(new java.util.Date());

		kjcErrorLogsDao.attachDirty(kjcErrorLogs);

		kjcErrorTracesDao.attachDirty(kjcErrorTraces);
	}

	/**
	 * This method saves batch validation exception.
	 * 
	 * @param kjcBatchJobErrors
	 *            - contains the details about the exception thrown
	 * @param jobExecution
	 *            - contains details about job execution
	 */
	@Transactional
	public void saveBatchValidationException(KjcBatchJobErrors kjcBatchJobErrors, JobExecution jobExecution) {
		kjcBatchJobErrors.setBatchJobId(jobExecution.getJobId());
		kjcBatchJobErrors.setThrownDate(new java.util.Date());
		if (Utilities.getUserFromContext() != null) {
			kjcBatchJobErrors.setUsername(Utilities.getUserFromContext().getUsername());
		} else {
			kjcBatchJobErrors.setUsername(AppConstants.USER_NOT_LOGGED);
		}
		
		List<KjcBatchJobErrorParams> kjcBatchJobErrorParamses = kjcBatchJobErrors.getKjcBatchJobErrorParamses();

		if (kjcBatchJobErrorParamses != null && !kjcBatchJobErrorParamses.isEmpty()) {
			for (KjcBatchJobErrorParams parameter : kjcBatchJobErrorParamses) {

				if (parameter.getKjcBatchJobErrors() == null) {
					parameter.setKjcBatchJobErrors(kjcBatchJobErrors);
				}

			}
		}
		kjcBatchJobErrorsDao.attachDirty(kjcBatchJobErrors);
	}

	/**
	 * A method that saves batch job related exceptions to database offline.
	 * 
	 * @param jobExecution
	 *            - contains details about job execution
	 * @param taskId
	 *            - additional information for a specific batch validation
	 */
//	public void saveBatchJobExceptions(JobExecution jobExecution, String taskId) {
//		final List<Throwable> exceptions = jobExecution.getAllFailureExceptions();
//		for (final Throwable throwable : exceptions) {
//
//			if (throwable instanceof BatchValidationException) {
//
//				for (BatchValidationErrorDto validationErrorDto : ((BatchValidationException) throwable).getErrors()) {
//					saveBatchValidationException(validationErrorDto.getErrorCode(),
//							((BatchValidationException) throwable).getTaskId(), jobExecution,
//							validationErrorDto.getErrors());
//				}
//			} else {
//				saveExceptionOffline(throwable, Utilities.getUserFromContext().getUsername(), taskId,
//						jobExecution.getExecutionContext().get(AppConstants.JOB_CATEGORY).toString());
//			}
//		}
//
//	}

}
