package com.kirey.kjcore.features.scheduling.jobs.listeners;

import org.springframework.batch.core.ItemProcessListener;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.annotation.BeforeStep;

/**
 * MultihreadItemProcessListener it's called before a step and for the
 * processing of an item. Saves errors in JobExecution.
 * 
 * @author Alexandra Onofrei
 *
 */

@SuppressWarnings("rawtypes")
public class MultihreadItemProcessListener implements ItemProcessListener {

	private JobExecution jobExecution;

	/**Before step method that sets JobExecution as received StepExecution
	 * @param stepExecution
	 */
	@BeforeStep
	public void beforeStep(StepExecution stepExecution) {
		jobExecution = stepExecution.getJobExecution();
	}

	/* (non-Javadoc)
	 * @see org.springframework.batch.core.ItemProcessListener#beforeProcess(java.lang.Object)
	 */
	@Override
	public void beforeProcess(Object item) {
		// TODO Auto-generated method stub

	}

	/* (non-Javadoc)
	 * @see org.springframework.batch.core.ItemProcessListener#afterProcess(java.lang.Object, java.lang.Object)
	 */
	@Override
	public void afterProcess(Object item, Object result) {
		// TODO Auto-generated method stub

	}

	/* (non-Javadoc)
	 * @see org.springframework.batch.core.ItemProcessListener#onProcessError(java.lang.Object, java.lang.Exception)
	 */
	@Override
	public void onProcessError(Object item, Exception e) {
		jobExecution.addFailureException(e);
	}

}
