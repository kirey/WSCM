package com.kirey.wscm.data.entity;

import java.util.List;

import java.io.Serializable;
import java.util.ArrayList;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "jobs")
public class Jobs implements Serializable {

	
	private static final long serialVersionUID = 1703338942103035773L;

	private int id;

	private String jobName;

	private String cronExpression;

	private String status;

	@JsonBackReference
	private List<JobExecutionLog> jobExecutionLogs = new ArrayList<>();
	
	private List<Categories> listCategorieses = new ArrayList<>();
	private List<Notifications> listNotificationses = new ArrayList<>();

	@Id
	@SequenceGenerator(name = "seq_jobs_gen", sequenceName = "seq_jobs", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_jobs_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Column(name = "job_name", nullable = false)
	public String getJobName() {
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}

	@Column(name = "cron_expression", nullable = true)
	public String getCronExpression() {
		return cronExpression;
	}

	public void setCronExpression(String cronExpression) {
		this.cronExpression = cronExpression;
	}

	@OneToMany(mappedBy = "job",cascade = CascadeType.ALL)
	@LazyCollection(LazyCollectionOption.FALSE)
	@Fetch(FetchMode.SUBSELECT)
	public List<JobExecutionLog> getJobExecutionLogs() {
		return jobExecutionLogs;
	}

	public void setJobExecutionLogs(List<JobExecutionLog> jobExecutionLogs) {
		this.jobExecutionLogs = jobExecutionLogs;
	}
	
	@Column(name = "status")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "categories_jobs", joinColumns = {
			@JoinColumn(name = "job", nullable = false, updatable = false) }, inverseJoinColumns = {
					@JoinColumn(name = "category", nullable = false, updatable = false) })
	@Fetch(FetchMode.SUBSELECT)
	public List<Categories> getListCategorieses() {
		return listCategorieses;
	}

	public void setListCategorieses(List<Categories> listCategorieses) {
		this.listCategorieses = listCategorieses;
	}

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "notifications_jobs", joinColumns = {
			@JoinColumn(name = "job", nullable = false, updatable = false) }, inverseJoinColumns = {
					@JoinColumn(name = "notification", nullable = false, updatable = false) })
	@Fetch(FetchMode.SUBSELECT)
	public List<Notifications> getListNotificationses() {
		return listNotificationses;
	}

	public void setListNotificationses(List<Notifications> listNotificationses) {
		this.listNotificationses = listNotificationses;
	}
	
	

}
