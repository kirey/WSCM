package com.kirey.wscm.data.entity;
// Generated Oct 27, 2016 4:40:00 PM by Hibernate Tools 5.2.0.Beta1

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * KjcClasses generated by hbm2java
 */
@Entity
@Table(name = "KJC_CLASSES", uniqueConstraints = @UniqueConstraint(columnNames = { "NAME", "KJC_PACKAGE" }) )
public class KjcClasses implements java.io.Serializable {

	private static final long serialVersionUID = 3701526003520756662L;

	private Integer id;
	private KjcClasses kjcClasses;
	private KjcClassCategories kjcClassCategories;
	private KjcPackages kjcPackages;
	private String name;
	private String description;
	private boolean flEnabled;
	private List<KjcClasses> kjcClasseses = new ArrayList<KjcClasses>();
	private KjcClassCompiled kjcClassCompiled;
	
	private Jobs job;
	
	public KjcClasses() {
	}

	@Id
	@SequenceGenerator(name = "classes_gen", sequenceName = "SEQ_KJC_CLASSES", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "classes_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "PARENT_KJC_CLASS")
	public KjcClasses getKjcClasses() {
		return this.kjcClasses;
	}

	public void setKjcClasses(KjcClasses kjcClasses) {
		this.kjcClasses = kjcClasses;
	}

	@ManyToOne
	@JoinColumn(name = "KJC_CLASS_CATEGORY", nullable = false)
	public KjcClassCategories getKjcClassCategories() {
		return this.kjcClassCategories;
	}

	public void setKjcClassCategories(KjcClassCategories kjcClassCategories) {
		this.kjcClassCategories = kjcClassCategories;
	}

	@ManyToOne
//	@Cascade(CascadeType.PERSIST)
	@Cascade({CascadeType.SAVE_UPDATE, CascadeType.PERSIST})
	@JoinColumn(name = "KJC_PACKAGE", nullable = false)
	public KjcPackages getKjcPackages() {
		return this.kjcPackages;
	}

	public void setKjcPackages(KjcPackages kjcPackages) {
		this.kjcPackages = kjcPackages;
	}

	@Column(name = "NAME", nullable = false, length = 50)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "DESCRIPTION", nullable = true, length = 1000)
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "FL_ENABLED", nullable = false, precision = 1, scale = 0)
	public boolean isFlEnabled() {
		return this.flEnabled;
	}

	public void setFlEnabled(boolean flEnabled) {
		this.flEnabled = flEnabled;
	}

	

	@JsonIgnore
	@OneToMany(mappedBy = "kjcClasses")
	@LazyCollection(LazyCollectionOption.FALSE)
	@Fetch(FetchMode.SUBSELECT)
	public List<KjcClasses> getKjcClasseses() {
		return this.kjcClasseses;
	}

	public void setKjcClasseses(List<KjcClasses> kjcClasseses) {
		this.kjcClasseses = kjcClasseses;
	}

	@JsonManagedReference(value = "Classes_Compiled")
	@Cascade({ CascadeType.ALL })
	@OneToOne(mappedBy = "kjcClasses")
	public KjcClassCompiled getKjcClassCompiled() {
		return this.kjcClassCompiled;
	}

	public void setKjcClassCompiled(KjcClassCompiled kjcClassCompiled) {
		this.kjcClassCompiled = kjcClassCompiled;
	}

	@JsonBackReference(value = "Classes_Jobs")
	@OneToOne(mappedBy = "kjcClasses")
	public Jobs getJob() {
		return job;
	}

	public void setJob(Jobs job) {
		this.job = job;
	}

	
	
}
