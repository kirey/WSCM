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
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "notifications")
public class Notifications implements Serializable {

	private static final long serialVersionUID = 692766633137113003L;
	
	private Integer id;
	private String name;
	private String notificationTemplate;
	private DicNotificationType dicNotificationType;
	
	@JsonBackReference(value = "jobsNotifications")
	private List<Jobs> listJobses = new ArrayList<>();
	
//	@JsonBackReference(value="notificationCategorieses")
//	private List<NotificationCategories> notificationCategorieses = new ArrayList<>();
//	
//	@JsonBackReference(value="notificationsSent")
//	private List<NotificationsSent> notificationsSent = new ArrayList<>();
	
	@Id
	@SequenceGenerator(name = "notifications_gen", sequenceName = "seq_notifications", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notifications_gen")
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
	
	@Column(name = "notification_template", unique = false, nullable = false, length = 10000)
	public String getNotificationTemplate() {
		return notificationTemplate;
	}
	public void setNotificationTemplate(String notificationTemplate) {
		this.notificationTemplate = notificationTemplate;
	}
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "notifications_jobs", joinColumns = {
			@JoinColumn(name = "notification", nullable = false, updatable = false) }, inverseJoinColumns = {
					@JoinColumn(name = "job", nullable = false, updatable = false) })
	@Fetch(FetchMode.SUBSELECT)
	public List<Jobs> getListJobses() {
		return listJobses;
	}
	public void setListJobses(List<Jobs> listJobses) {
		this.listJobses = listJobses;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "dic_notification_type", nullable = true)
	public DicNotificationType getDicNotificationType() {
		return dicNotificationType;
	}
	public void setDicNotificationType(DicNotificationType dicNotificationType) {
		this.dicNotificationType = dicNotificationType;
	}
	
	
	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "notification")
//	public List<NotificationCategories> getNotificationCategorieses() {
//		return notificationCategorieses;
//	}
//	public void setNotificationCategorieses(List<NotificationCategories> notificationCategorieses) {
//		this.notificationCategorieses = notificationCategorieses;
//	}
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "notification")
//	public List<NotificationsSent> getNotificationsSent() {
//		return notificationsSent;
//	}
//	public void setNotificationsSent(List<NotificationsSent> notificationsSent) {
//		this.notificationsSent = notificationsSent;
//	}
	
	
	
}
