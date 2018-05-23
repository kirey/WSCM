package com.kirey.kjcore.api.dto;

import java.io.Serializable;
import java.util.Date;

/**
 * @author nicutac
 *
 *         Class used for jobs page
 */
public class BatchJobDto implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1246628215417845474L;
	private String schedulerName;
	private String jobName;
	private String jobDescription;
	private long jobExecutionId;
	private long jobInstanceId;
	private Date startTime;
	private Date endTime;
	private String status;
	private String lastExecutionStatus;
	private Date createTime;
	private String exitCode;
	private Date lastExecutionTime;
	private Date nextExecutionTime;

	public BatchJobDto() {
		super();

	}

	public String getSchedulerName() {
		return schedulerName;
	}

	public void setSchedulerName(String schedulerName) {
		this.schedulerName = schedulerName;
	}

	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	public String getJobDescription() {
		return jobDescription;
	}

	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}

	public long getJobExecutionId() {
		return jobExecutionId;
	}

	public void setJobExecutionId(long jobExecutionId) {
		this.jobExecutionId = jobExecutionId;
	}

	public long getJobInstanceId() {
		return jobInstanceId;
	}

	public void setJobInstanceId(long jobInstanceId) {
		this.jobInstanceId = jobInstanceId;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getLastExecutionStatus() {
		return lastExecutionStatus;
	}

	public void setLastExecutionStatus(String lastExecutionStatus) {
		this.lastExecutionStatus = lastExecutionStatus;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}


	public String getExitCode() {
		return exitCode;
	}

	public void setExitCode(String exitCode) {
		this.exitCode = exitCode;
	}

	public Date getLastExecutionTime() {
		return lastExecutionTime;
	}

	public void setLastExecutionTime(Date lastExecutionTime) {
		this.lastExecutionTime = lastExecutionTime;
	}

	public Date getNextExecutionTime() {
		return nextExecutionTime;
	}

	public void setNextExecutionTime(Date nextExecutionTime) {
		this.nextExecutionTime = nextExecutionTime;
	}

}
