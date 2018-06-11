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

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "links_categories")
public class LinksCategories implements Serializable {

	private static final long serialVersionUID = 4579307772400776798L;
	
	private Integer id;
	@JsonManagedReference(value="linksCategories")
	private Links link;
	@JsonManagedReference(value="categoriesLinksCategories")
	private Categories categories;
	private Integer weight;
	
	@Id
	@SequenceGenerator(name = "links_categories_gen", sequenceName = "seq_links_categories", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "links_categories_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "link", nullable = true)
	public Links getLink() {
		return link;
	}
	public void setLink(Links link) {
		this.link = link;
	}
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "categories", nullable = true)
	public Categories getCategories() {
		return categories;
	}
	public void setCategories(Categories categories) {
		this.categories = categories;
	}
	
	@Column(name = "weight", nullable = true)
	public Integer getWeight() {
		return weight;
	}
	public void setWeight(Integer weight) {
		this.weight = weight;
	}
	
	

}
