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

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "job_categories")
public class JobCategories implements Serializable {
	
	private static final long serialVersionUID = 1769255577315761666L;
	
	
	private Integer id;
	@JsonBackReference
	private Jobs job;
	private Categories category;
	private Integer weight;
	
	@Id
	@SequenceGenerator(name = "job_categories_gen", sequenceName = "seq_job_categories", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "job_categories_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "job", nullable = true)
	public Jobs getJob() {
		return job;
	}
	public void setJob(Jobs job) {
		this.job = job;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "category", nullable = true)
	public Categories getCategory() {
		return category;
	}
	public void setCategory(Categories category) {
		this.category = category;
	}
	
	@Column(name = "weight", nullable = true)
	public Integer getWeight() {
		return weight;
	}
	public void setWeight(Integer weight) {
		this.weight = weight;
	}
	
	

}
