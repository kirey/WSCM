package com.kirey.kjcore.features.scheduling.jobs.processor;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.springframework.batch.item.ItemProcessor;

import com.kirey.kjcore.api.dto.BatchJobDto;

/**
 * MultithreadExampleProcessor is only an example of a processor used for the
 * runnable task which use Partitioning work
 * 
 * @author Alexandra Onofrei
 *
 */

public class PartitioningExampleProcessor implements ItemProcessor<BatchJobDto, BatchJobDto> {

	private static final Logger logger = Logger.getLogger(PartitioningExampleProcessor.class.getName());

	private String threadName;

	/* (non-Javadoc)
	 * @see org.springframework.batch.item.ItemProcessor#process(java.lang.Object)
	 */
	@Override
	public BatchJobDto process(BatchJobDto item){

		logger.log(Level.INFO, threadName + " processing : " + item.getJobInstanceId() + " : " + item.getJobName());

		/*
		 * if(item.getJobInstanceId()==1 || item.getJobInstanceId()==12 ){
		 * Integer aa=null; System.out.println(aa.toString()); }
		 */
		return item;
	}

	public String getThreadName() {
		return threadName;
	}

	public void setThreadName(String threadName) {
		this.threadName = threadName;
	}

}