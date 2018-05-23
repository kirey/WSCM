package com.kirey.kjcore.features.scheduling.jobs.tasklet;

import java.util.ArrayList;
import java.util.List;

import org.springframework.batch.core.ExitStatus;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ErrorConstants;
import com.kirey.kjcore.common.util.PrintingToConsole;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.compositedao.ExceptionLoggerService;
import com.kirey.kjcore.data.entity.KjcBatchJobErrors;
import com.kirey.kjcore.features.exception.customexceptions.BatchValidationException;

/**
 * 
 * @author nicutac
 *         <p>
 *         Class that can be used when we have a specific process to be
 *         implemented. The main process steps are :
 *         <ul>
 *         <li>get and prepare the list of item that we want to be processed
 *         <li>process the item one by one
 *         <li>in case the item process is failed it is provided
 *         {@link #updateItemFailedExecutionStatus()
 *         updateItemFailedExecutionStatus} method where it can be made
 *         additional logic
 *         </ul>
 * @param <T>
 *            - specifies the type of item that it will be processed
 */
@Component
public abstract class ParentNonTransactionalSingleThreadTasklet<T> implements Tasklet, InitializingBean {

	@Autowired
	private PrintingToConsole printingToConsole;
	@Autowired
	private ExceptionLoggerService exceptionLoggerService;

	/**
	 * A method used to retrieve and prepare a list of items. The method call is
	 * surrounded by try-catch clause, so the exceptions are treated by parent
	 * class.
	 * 
	 * @return List<T> that contains the list of item to be processed.
	 */
	public abstract List<T> prepareExecutionItemList();

	/**
	 * A method used to process an item.The method is called for each item
	 * retrieved from {@link #prepareExecutionItemList()
	 * prepareExecutionItemList} method.The method is surrounded by try-catch,
	 * so the exceptions are treated by parent class.
	 * 
	 * @param item
	 *            - specifies the item to be processed
	 */
	public abstract void processExecutionListItem(T item);

	/**
	 * A method used to update the item status or other to make add additional
	 * logic when the {@link #processExecutionListItem()
	 * processExecutionListItem} fails. The method is surrounded by try-catch,
	 * so the exceptions are treated by parent class.
	 * 
	 * @param item
	 *            - specifies the item where the exception was thrown
	 * @return the item id used in KJC_ERROR_LOGS and KJC_BATCH_JOB_ERRORS
	 *         tables in order to know which item was failed.
	 */
	public abstract String updateItemFailedExecutionStatus(T item);

	@Override
	public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) {
		StepExecution stepExecution = chunkContext.getStepContext().getStepExecution();
		boolean addItemOnErrorFlag = false;
		/*---------------------------------BEGIN prepareExecutionItemList ------------------------*/
		List<T> items = new ArrayList<>();
		try {
			items = prepareExecutionItemList();
		} catch (Exception e) {
			throw e;
		}

		/*--------------------------------- END prepareExecutionItemList ------------------------*/
		/*---------------------------------BEGIN processExecutionListItem ------------------------*/
		if (items != null && !items.isEmpty()) {
			for (T item : items) {
				try {
					processExecutionListItem(item);

				} catch (Exception e) {
					if (!addItemOnErrorFlag) {
						stepExecution.getJobExecution().getExecutionContext().put(AppConstants.JOB_ITEM_EXCEPTION,
								AppConstants.GLOBAL_TRUE);
						stepExecution.setExitStatus(new ExitStatus(AppConstants.JOB_EXIT_STATUS_COMPLETED_WITH_ERRORS,
								ErrorConstants.JOB_EXIT_STATUS_COMPLETED_WITH_ERRORS_MESSAGE));
						addItemOnErrorFlag = true;
					}
					saveExceptions(item, e, stepExecution);
				}
			}
		}
		/*---------------------------------END processExecutionListItem ------------------------*/
		return RepeatStatus.FINISHED;
	}

	@Override
	public void afterPropertiesSet() throws Exception {

	}

	/**
	 * A method that saves the exception in database and updates the item
	 * status.It is used different try-catch because for each save operation use
	 * separately transaction and if one of them fails we want the others to be
	 * executed.
	 * 
	 * @param item
	 *            - specifies the item in order to know on which report was
	 *            thrown the exception
	 * @param e
	 *            - specifies the thrown exception
	 * @param stepExecution
	 *            - specifies the step execution context
	 */
	private void saveExceptions(T item, Exception e, StepExecution stepExecution) {
		// print in console the runtime exception
		printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_IN + e.getStackTrace()[0].getClassName()
				+ ":" + e.getStackTrace()[0].getMethodName(), e);
		String taskId = null;
		try {
			// additional logic when the process item was failed.
			taskId = updateItemFailedExecutionStatus(item);
		} catch (Exception ex) {
			// exception while writing in db
			printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_SAVING_LOG, ex);
			// save the runtime exception
			saveRuntimeException(ex, taskId, stepExecution);
		}
		if (e instanceof BatchValidationException) {
			// save the batch validation exception
			saveBatchValidationException(e, taskId, stepExecution);
		} else {
			// save the runtime exception
			saveRuntimeException(e, taskId, stepExecution);
		}
	}

	/**
	 * A method that saves the batch validation exception in database. If the
	 * save operation fails we print the thrown exception in console and try to
	 * write the exception in database.
	 * 
	 * @param taskId
	 *            - specifies the item id in order to know on which item was
	 *            thrown the exception
	 * @param e
	 *            - specifies the thrown batch validation exception
	 * @param stepExecution
	 *            - specifies the step execution context
	 */
	private void saveBatchValidationException(Exception e, String taskId, StepExecution stepExecution) {

		for (KjcBatchJobErrors kjcBatchJobErrors : ((BatchValidationException) e).getErrors()) {
			try {
				exceptionLoggerService.saveBatchValidationException(kjcBatchJobErrors, stepExecution.getJobExecution());
			} catch (Exception ex) {
				// exception while writing in db
				printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_SAVING_LOG, ex);
				saveRuntimeException(ex, taskId, stepExecution);
			}
		}

	}

	/**
	 * A method that saves the runtime exception in database. If the save
	 * operation fails we print the exception in console
	 * 
	 * @param taskId
	 *            - specifies the item id in order to know on which item was
	 *            thrown the exception
	 * @param e
	 *            - specifies the thrown runtime exception
	 * @param stepExecution
	 *            - specifies the step execution context
	 */
	private void saveRuntimeException(Exception e, String taskId, StepExecution stepExecution) {
		try {
			exceptionLoggerService.saveExceptionOffline(e,
					Utilities.getUserFromContext() == null ? null : Utilities.getUserFromContext().getUsername(),
					taskId,
					stepExecution.getJobExecution().getExecutionContext().get(AppConstants.JOB_CATEGORY).toString(),
					stepExecution.getJobExecution().getId());
		} catch (Exception ex) {
			// exception while writing in db
			printingToConsole.printMessage(this.getClass(), ErrorConstants.ERROR_SAVING_LOG, ex);
		}
	}
}
