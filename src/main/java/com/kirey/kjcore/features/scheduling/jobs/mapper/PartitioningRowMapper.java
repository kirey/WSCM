package com.kirey.kjcore.features.scheduling.jobs.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.kirey.kjcore.api.dto.BatchJobDto;



/**
 * PartitioningRowMapper is only an example of Mapper used for job partitioning
 * example
 *
 */

public class PartitioningRowMapper implements RowMapper<BatchJobDto> {

	/* (non-Javadoc)
	 * @see org.springframework.jdbc.core.RowMapper#mapRow(java.sql.ResultSet, int)
	 */
	@Override
	public BatchJobDto mapRow(ResultSet rs, int rowNum) throws SQLException {

		BatchJobDto batchJobInstance = new BatchJobDto();

		batchJobInstance.setJobInstanceId(rs.getInt("job_instance_id"));
		batchJobInstance.setJobName(rs.getString("job_name"));

		return batchJobInstance;
	}

}