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
@Table(name = "notification_categories")
public class NotificationCategories implements Serializable{

	private static final long serialVersionUID = -1875012379857995340L;
	
	private Integer id;
	@JsonManagedReference(value="notificationCategorieses")
	private Notifications notification;
	@JsonManagedReference(value="categoriesNotificationCatiegorieses")
	private Categories categories;
	private Integer weight;
	
	@Id
	@SequenceGenerator(name = "notification_categories_gen", sequenceName = "seq_notification_categories", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notification_categories_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "notifications", nullable = true)
	public Notifications getNotification() {
		return notification;
	}
	public void setNotification(Notifications notification) {
		this.notification = notification;
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
