package com.kirey.wscm.data.entity;

import java.io.Serializable;
import java.util.ArrayList;
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

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "categories")
public class Categories implements Serializable{

	private static final long serialVersionUID = 3353039777025031784L;
	
	private Integer id;
	private String categoryName;
	private String description;
	
//	@JsonBackReference(value="categoriesUserCategories")
//	private List<UserCategories> userCategorieses = new ArrayList<>();
//	
//	@JsonBackReference(value="categoriesIpAddressCategorieses")
//	private List<IpAddressCategories> ipAddressCategorieses = new ArrayList<>();
//	
//	@JsonBackReference(value="categoriesContentCategorieses")
//	private List<ContentCategories> contentCategorieses = new ArrayList<>();
//	
//	@JsonBackReference(value="categoriesLinksCategories")
//	private List<LinksCategories> linksCategorieses = new ArrayList<>();
//	
//	@JsonBackReference(value="categoriesNotificationCatiegorieses")
//	private List<NotificationCategories> notificationCatiegorieses = new ArrayList<>();
	
	@Id
	@SequenceGenerator(name = "categories_gen", sequenceName = "seq_categories", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "categories_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(name = "category_name", unique = false, nullable = true)
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	
	@Column(name = "description", unique = false, nullable = true)
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "categories")
//	public List<UserCategories> getUserCategorieses() {
//		return userCategorieses;
//	}
//	public void setUserCategorieses(List<UserCategories> userCategorieses) {
//		this.userCategorieses = userCategorieses;
//	}
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "categories")
//	public List<IpAddressCategories> getIpAddressCategorieses() {
//		return ipAddressCategorieses;
//	}
//	public void setIpAddressCategorieses(List<IpAddressCategories> ipAddressCategorieses) {
//		this.ipAddressCategorieses = ipAddressCategorieses;
//	}
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "categories")
//	public List<ContentCategories> getContentCategorieses() {
//		return contentCategorieses;
//	}
//	public void setContentCategorieses(List<ContentCategories> contentCategorieses) {
//		this.contentCategorieses = contentCategorieses;
//	}
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "categories")
//	public List<LinksCategories> getLinksCategorieses() {
//		return linksCategorieses;
//	}
//	public void setLinksCategorieses(List<LinksCategories> linksCategorieses) {
//		this.linksCategorieses = linksCategorieses;
//	}
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "categories")
//	public List<NotificationCategories> getNotificationCatiegorieses() {
//		return notificationCatiegorieses;
//	}
//	public void setNotificationCatiegorieses(List<NotificationCategories> notificationCatiegorieses) {
//		this.notificationCatiegorieses = notificationCatiegorieses;
//	}
	
	
	
	
}
