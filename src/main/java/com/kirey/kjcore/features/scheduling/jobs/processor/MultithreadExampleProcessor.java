package com.kirey.kjcore.features.scheduling.jobs.processor;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.springframework.batch.item.ItemProcessor;

import com.kirey.kjcore.data.entity.KjcBatchJobErrors;
import com.kirey.kjcore.data.entity.KjcSchedulerTraces;
import com.kirey.kjcore.features.exception.customexceptions.BatchValidationException;

/**
 * MultithreadExampleProcessor is only an example of a processor used for the
 * runnable task which use MultiThread steps.
 * 
 * @author Alexandra Onofrei
 *
 */
public class MultithreadExampleProcessor implements ItemProcessor<KjcSchedulerTraces, KjcSchedulerTraces> {

	private static final Logger logger = Logger.getLogger(MultithreadExampleProcessor.class.getName());

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.springframework.batch.item.ItemProcessor#process(java.lang.Object)
	 */
	@Override
	public KjcSchedulerTraces process(KjcSchedulerTraces item) {

		logger.log(Level.INFO,
				"!!!! Begin MultithreadExampleProcessor : --------------- Thread # " + Thread.currentThread().getName()
						+ " " + Thread.currentThread().getId() + " " + Thread.currentThread().getState()
						+ " START TASK");

		// List<Throwable> exceptions = new ArrayList<Throwable>();
		List<KjcBatchJobErrors> errors = new ArrayList<>();

		// if (item.getId() == 9 || item.getId() == 15 || item.getId() == 25) {
		/*
		 * for(int i=0;i<1000000;i++){ //System.out.println(i); }
		 */
		/*
		 * logger.log(Level.INFO, "KO - Thread # " +
		 * Thread.currentThread().getName() + " " +
		 * Thread.currentThread().getId() + " TEST_ID: " + item.getId());
		 */
		// Integer aa = null;
		// System.out.println(aa.toString());
		// System.out.println("KO");

		/* } else { */
		// System.out.println("OK");
		/*
		 * logger.log(Level.INFO, "OK - Thread # " +
		 * Thread.currentThread().getName() + " " +
		 * Thread.currentThread().getId() + " TEST_ID: " + item.getId()); }
		 */

		if (!errors.isEmpty())
			throw new BatchValidationException(errors);

		return item;

	}

}
