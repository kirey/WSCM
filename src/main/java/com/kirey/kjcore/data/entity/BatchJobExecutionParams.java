package com.kirey.kjcore.data.entity;

// Generated Apr 16, 2013 12:13:47 PM by Hibernate Tools 4.0.0

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * BatchJobParams generated by hbm2java
 */
@Entity
@Table(name = "BATCH_JOB_EXECUTION_PARAMS")
public class BatchJobExecutionParams implements java.io.Serializable {

	private BatchJobExecutionParamsId id;
	private BatchJobInstance batchJobInstance;

	public BatchJobExecutionParams() {
	}

	public BatchJobExecutionParams(BatchJobExecutionParamsId id, BatchJobInstance batchJobInstance) {
		this.id = id;
		this.batchJobInstance = batchJobInstance;
	}

	@EmbeddedId
	@AttributeOverrides({
			@AttributeOverride(name = "jobInstanceId", column = @Column(name = "job_instance_id", nullable = false)),
			@AttributeOverride(name = "typeCd", column = @Column(name = "type_cd", nullable = false, length = 6)),
			@AttributeOverride(name = "keyName", column = @Column(name = "key_name", nullable = false, length = 100)),
			@AttributeOverride(name = "stringVal", column = @Column(name = "string_val", length = 250)),
			@AttributeOverride(name = "dateVal", column = @Column(name = "date_val", length = 29)),
			@AttributeOverride(name = "longVal", column = @Column(name = "long_val")),
			@AttributeOverride(name = "doubleVal", column = @Column(name = "double_val", precision = 17, scale = 17)) })
	public BatchJobExecutionParamsId getId() {
		return this.id;
	}

	public void setId(BatchJobExecutionParamsId id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "job_instance_id", nullable = false, insertable = false, updatable = false)
	public BatchJobInstance getBatchJobInstance() {
		return this.batchJobInstance;
	}

	public void setBatchJobInstance(BatchJobInstance batchJobInstance) {
		this.batchJobInstance = batchJobInstance;
	}

}
