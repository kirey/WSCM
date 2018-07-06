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
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * KjcPackages generated by hbm2java
 */
@Entity
@Table(name = "KJC_PACKAGES", uniqueConstraints = @UniqueConstraint(columnNames = "NAME") )
public class KjcPackages implements java.io.Serializable {

	private static final long serialVersionUID = -2789514194655574538L;
	private Integer id;
	private String name;
	private List<KjcClasses> kjcClasseses = new ArrayList<KjcClasses>(0);

	@Id
	@SequenceGenerator(name = "pack_gen", sequenceName = "SEQ_KJC_PACKAGES", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pack_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "NAME", unique = true, nullable = false)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	

	@JsonIgnore
	@OneToMany(mappedBy = "kjcPackages")
	@LazyCollection(LazyCollectionOption.FALSE)
	@Fetch(FetchMode.SUBSELECT)
	public List<KjcClasses> getKjcClasseses() {
		return this.kjcClasseses;
	}
	
	@JsonProperty
	public void setKjcClasseses(List<KjcClasses> kjcClasseses) {
		this.kjcClasseses = kjcClasseses;
	}

}