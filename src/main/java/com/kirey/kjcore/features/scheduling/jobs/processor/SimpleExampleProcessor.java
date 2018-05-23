package com.kirey.kjcore.features.scheduling.jobs.processor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.batch.item.ItemProcessor;

import com.kirey.kjcore.common.constants.ErrorConstants;
import com.kirey.kjcore.data.entity.KjcBatchJobErrorParams;
import com.kirey.kjcore.data.entity.KjcBatchJobErrors;
import com.kirey.kjcore.data.entity.KjcEmailConfigs;
import com.kirey.kjcore.features.exception.customexceptions.BatchValidationException;



/**
 * MultithreadExampleProcessor is only an example of a processor used for a
 * runnable task.
 * 
 * @author Alexandra Onofrei
 *
 */
public class SimpleExampleProcessor implements ItemProcessor<KjcEmailConfigs, KjcEmailConfigs> {

	/* (non-Javadoc)
	 * @see org.springframework.batch.item.ItemProcessor#process(java.lang.Object)
	 */
	@Override
	public KjcEmailConfigs process(KjcEmailConfigs item) {


		/**
		 * example of using batch validation
		 */
		List<KjcBatchJobErrors> errors =  new ArrayList<>();

//		KjcBatchJobErrors batchValidErr = new KjcBatchJobErrors();
//		batchValidErr.setErrorCode("UC_0011");
//		batchValidErr.setErrorMessage(ErrorConstants.ERROR_VALIDATION_BEGINING_STANDARD_MESSAGE + "UC_0011"
//				+ ErrorConstants.ERROR_VALIDATION_ENDING_STANDARD_MESSAGE);		
//		batchValidErr.setTaskId(item.getId().toString());

//		KjcBatchJobErrorParams paramError = new KjcBatchJobErrorParams();
//		paramError.setKjcBatchJobErrors(batchValidErr);
//		paramError.setParameterName("paramName");
//		paramError.setParameterValue("value");
//		
//		batchValidErr.setKjcBatchJobErrorParamses(new ArrayList<>(Arrays.asList(paramError)));
//		errors.add(batchValidErr);
		if(!errors.isEmpty())
			throw new BatchValidationException(errors);
		
		return item;
	}

}

