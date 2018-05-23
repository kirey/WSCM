package com.kirey.kjcore.data.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import javax.persistence.Version;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * BatchJobExecution generated by hbm2java
 */
@Entity
@Table(name = "batch_job_execution")
public class BatchJobExecution implements java.io.Serializable {

	private static final long serialVersionUID = -5554445968300573709L;

	private long jobExecutionId;
	private Long version;
	private BatchJobInstance batchJobInstance;
	private Date createTime;
	private Date startTime;
	private Date endTime;
	private String status;
	private String exitCode;
	private String exitMessage;
	private Date lastUpdated;
	private String jobConfigurationLocation;
	private BatchJobExecutionContext batchJobExecutionContext;
	private List<BatchStepExecution> batchStepExecutions = new ArrayList<BatchStepExecution>(0);

	// Transient
	private long commitCountSum;
	private long readCountSum;
	private long writeCountSum;
	private long rollBackSum;

	public BatchJobExecution() {
	}

	public BatchJobExecution(long jobExecutionId, BatchJobInstance batchJobInstance, Date createTime) {
		this.jobExecutionId = jobExecutionId;
		this.batchJobInstance = batchJobInstance;
		this.createTime = createTime;
	}

	public BatchJobExecution(long jobExecutionId, BatchJobInstance batchJobInstance, Date createTime, Date startTime,
			Date endTime, String status, String exitCode, String exitMessage, Date lastUpdated,
			BatchJobExecutionContext batchJobExecutionContext, List<BatchStepExecution> batchStepExecutions) {
		this.jobExecutionId = jobExecutionId;
		this.batchJobInstance = batchJobInstance;
		this.createTime = createTime;
		this.startTime = startTime;
		this.endTime = endTime;
		this.status = status;
		this.exitCode = exitCode;
		this.exitMessage = exitMessage;
		this.lastUpdated = lastUpdated;
		this.batchJobExecutionContext = batchJobExecutionContext;
		this.batchStepExecutions = batchStepExecutions;
	}

	@Id
	@Column(name = "job_execution_id", unique = true, nullable = false)
	public long getJobExecutionId() {
		return this.jobExecutionId;
	}

	public void setJobExecutionId(long jobExecutionId) {
		this.jobExecutionId = jobExecutionId;
	}

	@Version
	@Column(name = "version")
	public Long getVersion() {
		return this.version;
	}

	public void setVersion(Long version) {
		this.version = version;
	}

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "job_instance_id", nullable = false)
	public BatchJobInstance getBatchJobInstance() {
		return this.batchJobInstance;
	}

	public void setBatchJobInstance(BatchJobInstance batchJobInstance) {
		this.batchJobInstance = batchJobInstance;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_time", nullable = false, length = 29)
	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "start_time", length = 29)
	public Date getStartTime() {
		return this.startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "end_time", length = 29)
	public Date getEndTime() {
		return this.endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	@Column(name = "status", length = 10)
	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "exit_code", length = 100)
	public String getExitCode() {
		return this.exitCode;
	}

	public void setExitCode(String exitCode) {
		this.exitCode = exitCode;
	}

	@Column(name = "exit_message", length = 2500)
	public String getExitMessage() {
		return this.exitMessage;
	}

	public void setExitMessage(String exitMessage) {
		this.exitMessage = exitMessage;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "last_updated", length = 29)
	public Date getLastUpdated() {
		return this.lastUpdated;
	}

	public void setLastUpdated(Date lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY, mappedBy = "batchJobExecution")
	public BatchJobExecutionContext getBatchJobExecutionContext() {
		return this.batchJobExecutionContext;
	}

	public void setBatchJobExecutionContext(BatchJobExecutionContext batchJobExecutionContext) {
		this.batchJobExecutionContext = batchJobExecutionContext;
	}

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "batchJobExecution")
	public List<BatchStepExecution> getBatchStepExecutions() {
		return this.batchStepExecutions;
	}

	public void setBatchStepExecutions(List<BatchStepExecution> batchStepExecutions) {
		this.batchStepExecutions = batchStepExecutions;
	}

	@Column(name = "JOB_CONFIGURATION_LOCATION", length = 2500)
	public String getJobConfigurationLocation() {
		return jobConfigurationLocation;
	}

	public void setJobConfigurationLocation(String jobConfigurationLocation) {
		this.jobConfigurationLocation = jobConfigurationLocation;
	}

	@Transient
	public long getCommitCountSum() {
		return commitCountSum;
	}

	@Transient
	public void setCommitCountSum(long commitCountSum) {
		this.commitCountSum = commitCountSum;
	}

	@Transient
	public long getReadCountSum() {
		return readCountSum;
	}

	public void setReadCountSum(long readCountSum) {
		this.readCountSum = readCountSum;
	}

	@Transient
	public long getWriteCountSum() {
		return writeCountSum;
	}

	public void setWriteCountSum(long writeCountSum) {
		this.writeCountSum = writeCountSum;
	}

	@Transient
	public long getRollBackSum() {
		return rollBackSum;
	}

	@Transient
	public void setRollBackSum(long rollBackSum) {
		this.rollBackSum = rollBackSum;
	}
}
