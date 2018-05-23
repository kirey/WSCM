package com.kirey.kjcore.data.entity;
// Generated Oct 24, 2016 4:59:14 PM by Hibernate Tools 5.1.0.CR1

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.data.annotations.CreationUser;
import com.kirey.kjcore.data.annotations.UpdateUser;

/**
 * KjcTaskSchedulers generated by hbm2java
 */
@Entity
@Table(name = "KJC_TASK_SCHEDULERS", uniqueConstraints = { @UniqueConstraint(columnNames = "TRIGGER_NAME"),
		@UniqueConstraint(columnNames = "NAME") })
public class KjcTaskSchedulers implements java.io.Serializable {

	private static final long serialVersionUID = -8439385229287228141L;

	private Integer id;
	@Size(min=1, max=50, message=ValidationErrorConstants.VALIDATION_FORMAL_SCHEDULER_NAME)
	private String name;
	private String cronExpression;
	private Integer utInsert;
	private Date tsInsert;
	private Integer utUpdate;
	private Date tsUpdate;
	private Date lastExecutionTime;
	private Date nextExecutionTime;
	@Size(min=1, max=50, message=ValidationErrorConstants.VALIDATION_FORMAL_TRIGGER_NAME)
	private String triggerName;
	@Size(min=1, max=100, message=ValidationErrorConstants.VALIDATION_FORMAL_JOB_NAME)
	private String jobName;
	@Size(min=1, max=1000, message=ValidationErrorConstants.VALIDATION_FORMAL_JOB_DESCRIPTION)
	private String jobDescription;
	private Long numberOfParameters;
	private String lastExecutionStatus;
	private boolean flDeleted;
	
	
	@JsonManagedReference(value = "parameters")
	private List<KjcTaskParameters> kjcTaskParameterses = new ArrayList<KjcTaskParameters>(0);
	private List<KjcSchedulerTraces> kjcSchedulerTraceses = new ArrayList<KjcSchedulerTraces>(0);

	//Transient 
	private boolean cronModified;
	
	private BatchJobInstance batchJobInstance;
	
	public KjcTaskSchedulers() {
	}

	public KjcTaskSchedulers(Integer id, String name, Integer utInsert, Date tsInsert, Integer utUpdate, Date tsUpdate,
			String triggerName) {
		this.id = id;
		this.name = name;
		this.utInsert = utInsert;
		this.tsInsert = tsInsert;
		this.utUpdate = utUpdate;
		this.tsUpdate = tsUpdate;
		this.triggerName = triggerName;
	}

	public KjcTaskSchedulers(Integer id, String name, String cronExpression, Integer utInsert, Date tsInsert,
			Integer utUpdate, Date tsUpdate, Date lastExecutionTime, Date nextExecutionTime, String triggerName,
			String jobName, String jobDescription, Long numberOfParameters, List<KjcTaskParameters> kjcTaskParameterses,
			List<KjcSchedulerTraces> kjcSchedulerTraceses) {
		this.id = id;
		this.name = name;
		this.cronExpression = cronExpression;
		this.utInsert = utInsert;
		this.tsInsert = tsInsert;
		this.utUpdate = utUpdate;
		this.tsUpdate = tsUpdate;
		this.lastExecutionTime = lastExecutionTime;
		this.nextExecutionTime = nextExecutionTime;
		this.triggerName = triggerName;
		this.jobName = jobName;
		this.jobDescription = jobDescription;
		this.numberOfParameters = numberOfParameters;
		this.kjcTaskParameterses = kjcTaskParameterses;
		this.kjcSchedulerTraceses = kjcSchedulerTraceses;
	}

	@Id
	@SequenceGenerator(name = "SEQ_KJC_TASK_SCHEDULERS_GEN", sequenceName = "SEQ_KJC_TASK_SCHEDULERS", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_KJC_TASK_SCHEDULERS_GEN")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "NAME", unique = true, nullable = false, length = 50)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "CRON_EXPRESSION", nullable = true)
	public String getCronExpression() {
		return this.cronExpression;
	}

	public void setCronExpression(String cronExpression) {
		this.cronExpression = cronExpression;
	}

	@Column(name = "UT_INSERT", nullable = false, precision = 10, scale = 0)
	@CreationUser
	public Integer getUtInsert() {
		return this.utInsert;
	}

	public void setUtInsert(Integer utInsert) {
		this.utInsert = utInsert;
	}

	@Column(name = "TS_INSERT", nullable = false)
	@org.hibernate.annotations.CreationTimestamp
	public Date getTsInsert() {
		return this.tsInsert;
	}

	public void setTsInsert(Date tsInsert) {
		this.tsInsert = tsInsert;
	}

	@Column(name = "UT_UPDATE", nullable = false, precision = 10, scale = 0)
	@UpdateUser
	public Integer getUtUpdate() {
		return this.utUpdate;
	}

	public void setUtUpdate(Integer utUpdate) {
		this.utUpdate = utUpdate;
	}

	@Column(name = "TS_UPDATE", nullable = false)
	@org.hibernate.annotations.UpdateTimestamp
	public Date getTsUpdate() {
		return this.tsUpdate;
	}

	public void setTsUpdate(Date tsUpdate) {
		this.tsUpdate = tsUpdate;
	}

	@Column(name = "LAST_EXECUTION_TIME", length = 7)
	public Date getLastExecutionTime() {
		return this.lastExecutionTime;
	}

	public void setLastExecutionTime(Date lastExecutionTime) {
		this.lastExecutionTime = lastExecutionTime;
	}

	@Column(name = "NEXT_EXECUTION_TIME", length = 7)
	public Date getNextExecutionTime() {
		return this.nextExecutionTime;
	}

	public void setNextExecutionTime(Date nextExecutionTime) {
		this.nextExecutionTime = nextExecutionTime;
	}

	@Column(name = "TRIGGER_NAME", unique = true, nullable = false, length = 50)
	public String getTriggerName() {
		return this.triggerName;
	}

	public void setTriggerName(String triggerName) {
		this.triggerName = triggerName;
	}
	
	@Column(name = "JOB_NAME", nullable = false, length = 100)
	public String getJobName() {
		return this.jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	@Column(name = "JOB_DESCRIPTION", nullable = false, length = 1000)
	public String getJobDescription() {
		return this.jobDescription;
	}

	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}

	@Column(name = "NUMBER_OF_PARAMETERS", precision = 2, scale = 0)
	public Long getNumberOfParameters() {
		return this.numberOfParameters;
	}

	public void setNumberOfParameters(Long numberOfParameters) {
		this.numberOfParameters = numberOfParameters;
	}
	
	@OneToMany(mappedBy = "kjcTaskSchedulers")
	@LazyCollection(LazyCollectionOption.FALSE)
	@Cascade(value = CascadeType.ALL)
	public List<KjcTaskParameters> getKjcTaskParameterses() {
		return this.kjcTaskParameterses;
	}

	public void setKjcTaskParameterses(List<KjcTaskParameters> kjcTaskParameterses) {
		this.kjcTaskParameterses = kjcTaskParameterses;
	}

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "kjcTaskSchedulers")
	public List<KjcSchedulerTraces> getKjcSchedulerTraceses() {
		return this.kjcSchedulerTraceses;
	}

	public void setKjcSchedulerTraceses(List<KjcSchedulerTraces> kjcSchedulerTraceses) {
		this.kjcSchedulerTraceses = kjcSchedulerTraceses;
	}

	@Column(name = "LAST_EXECUTION_STATUS", length = 50)
	public String getLastExecutionStatus() {
		return lastExecutionStatus;
	}

	public void setLastExecutionStatus(String lastExecutionStatus) {
		this.lastExecutionStatus = lastExecutionStatus;
	}
	
	@Column(name = "FL_DELETED", nullable = false, precision = 1, scale = 0)
	public boolean isFlDeleted() {
		return this.flDeleted;
	}

	public void setFlDeleted(boolean flDeleted) {
		this.flDeleted = flDeleted;
	}

	@Transient
	public BatchJobInstance getBatchJobInstance() {
		return batchJobInstance;
	}

	@Transient
	public void setBatchJobInstance(BatchJobInstance batchJobInstance) {
		this.batchJobInstance = batchJobInstance;
	}

	@Transient
	public boolean isCronModified() {
		return cronModified;
	}

	@Transient
	public void setCronModified(boolean cronModified) {
		this.cronModified = cronModified;
	}
	
	
	
	
}
