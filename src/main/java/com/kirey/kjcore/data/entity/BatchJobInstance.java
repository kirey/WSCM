package com.kirey.kjcore.data.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.persistence.Version;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * BatchJobInstance generated by hbm2java
 */
@Entity
@Table(name = "batch_job_instance", uniqueConstraints = @UniqueConstraint(columnNames = { "job_name", "job_key" }))
public class BatchJobInstance implements java.io.Serializable {

	private long jobInstanceId;
	private Long version;
	private String jobName;
	private String jobKey;
	private List<BatchJobExecutionParams> batchJobParamses = new ArrayList<BatchJobExecutionParams>(0);
	private List<BatchJobExecution> batchJobExecutions = new ArrayList<BatchJobExecution>(0);

	public BatchJobInstance() {
	}

	public BatchJobInstance(long jobInstanceId, String jobName, String jobKey) {
		this.jobInstanceId = jobInstanceId;
		this.jobName = jobName;
		this.jobKey = jobKey;
	}

	public BatchJobInstance(long jobInstanceId, String jobName, String jobKey,
			List<BatchJobExecutionParams> batchJobParamses, List<BatchJobExecution> batchJobExecutions) {
		this.jobInstanceId = jobInstanceId;
		this.jobName = jobName;
		this.jobKey = jobKey;
		this.batchJobParamses = batchJobParamses;
		this.batchJobExecutions = batchJobExecutions;
	}

	@Id
	@Column(name = "job_instance_id", unique = true, nullable = false)
	public long getJobInstanceId() {
		return this.jobInstanceId;
	}

	public void setJobInstanceId(long jobInstanceId) {
		this.jobInstanceId = jobInstanceId;
	}

	@Version
	@Column(name = "version")
	public Long getVersion() {
		return this.version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}

	@Column(name = "job_name", nullable = false, length = 100)
	public String getJobName() {
		return this.jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	@Column(name = "job_key", nullable = false, length = 32)
	public String getJobKey() {
		return this.jobKey;
	}

	public void setJobKey(String jobKey) {
		this.jobKey = jobKey;
	}

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "batchJobInstance")
	public List<BatchJobExecutionParams> getBatchJobParamses() {
		return this.batchJobParamses;
	}

	public void setBatchJobParamses(List<BatchJobExecutionParams> batchJobParamses) {
		this.batchJobParamses = batchJobParamses;
	}

	@OneToMany(mappedBy = "batchJobInstance")
	@LazyCollection(LazyCollectionOption.FALSE)
	public List<BatchJobExecution> getBatchJobExecutions() {
		return this.batchJobExecutions;
	}

	public void setBatchJobExecutions(List<BatchJobExecution> batchJobExecutions) {
		this.batchJobExecutions = batchJobExecutions;
	}

}