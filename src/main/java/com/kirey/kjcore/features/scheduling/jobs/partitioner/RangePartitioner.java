package com.kirey.kjcore.features.scheduling.jobs.partitioner;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.springframework.batch.core.partition.support.Partitioner;
import org.springframework.batch.item.ExecutionContext;

/**
 * RangePartitioner and Partitioner class used only as an example
 *
 */
public class RangePartitioner implements Partitioner {

	private static final Logger logger = Logger.getLogger(RangePartitioner.class.getName());

	/* (non-Javadoc)
	 * @see org.springframework.batch.core.partition.support.Partitioner#partition(int)
	 */
	@Override
	public Map<String, ExecutionContext> partition(int gridSize) {
		Map<String, ExecutionContext> result = new HashMap<String, ExecutionContext>();

		int range = 10;
		int fromId = 1;
		int toId = range;

		for (int i = 1; i <= gridSize; i++) {
			ExecutionContext value = new ExecutionContext();

			logger.log(Level.INFO, "Starting : Thread" + i);
			logger.log(Level.INFO, "fromId : " + fromId);
			logger.log(Level.INFO, "toId : " + toId);

			value.putInt("fromId", fromId);
			value.putInt("toId", toId);

			// give each thread a name, thread 1,2,3
			value.putString("name", "Thread" + i);

			result.put("partition" + i, value);

			fromId = toId + 1;
			toId += range;

		}

		return result;
	}

}
