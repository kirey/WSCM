package com.kirey.wscm.data.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "dic_event")
public class DicEvent implements Serializable {

	private static final long serialVersionUID = -7737237512641595663L;
	
	private Integer id;
	private String name;
	private String description;
	private String eventType;
	private String definition;
	private Jobs jobs;
	
	@Id
	@SequenceGenerator(name = "dic_event_gen", sequenceName = "seq_dic_event", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "dic_event_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(name = "name", unique = false, nullable = false)
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name = "description", unique = false, nullable = false)
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	@Column(name = "event_type", unique = false, nullable = false)
	public String getEventType() {
		return eventType;
	}
	public void setEventType(String eventType) {
		this.eventType = eventType;
	}
	
	@Column(name = "definition", unique = false, nullable = false)
	public String getDefinition() {
		return definition;
	}
	public void setDefinition(String definition) {
		this.definition = definition;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "jobs", nullable = true)
	public Jobs getJobs() {
		return jobs;
	}
	public void setJobs(Jobs jobs) {
		this.jobs = jobs;
	}
	
	

}
