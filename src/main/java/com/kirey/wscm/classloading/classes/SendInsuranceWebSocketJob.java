package com.kirey.wscm.classloading.classes;

import org.quartz.DisallowConcurrentExecution;
import org.quartz.InterruptableJob;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.UnableToInterruptJobException;

import com.kirey.wscm.classloading.classes.interfaces.BaseObject;

/**
 * 
 * @author paunovicm
 *
 */

@DisallowConcurrentExecution
public class SendInsuranceWebSocketJob implements InterruptableJob, BaseObject {
	


	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		System.out.println("*******************executed job");
	}

	@Override
	public void interrupt() throws UnableToInterruptJobException {
		System.out.println("*********************interrupted job");
	}
	
	

}
