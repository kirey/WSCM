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
@Table(name = "content_categories")
public class ContentCategories implements Serializable {

	private static final long serialVersionUID = -8659944682511011666L;
	
	private Integer id;
	@JsonBackReference(value="contentCategoriesCon")
	private Content content;
//	@JsonManagedReference(value="categoriesContentCategorieses")
	private Categories categories;
	private Integer weight;
	
	@Id
	@SequenceGenerator(name = "content_categories_gen", sequenceName = "seq_content_categories", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "content_categories_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "content", nullable = true)
	public Content getContent() {
		return content;
	}
	public void setContent(Content content) {
		this.content = content;
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
