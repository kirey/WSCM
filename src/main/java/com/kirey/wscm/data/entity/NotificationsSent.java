package com.kirey.wscm.data.entity;

import java.io.Serializable;
import java.util.Date;

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
@Table(name = "notifications_sent")
public class NotificationsSent implements Serializable {

	private static final long serialVersionUID = 6377011504621903145L;
	
	private Integer id;
//	@JsonManagedReference(value="notificationsSent")
	private Notifications notification;
//	@JsonManagedReference(value= "userNotificationsSent")
	private WscmUserAccounts userAccount;
	private Date tsInsert;
	
	@Id
	@SequenceGenerator(name = "notifications_sent_gen", sequenceName = "seq_notifications_sent", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "notifications_sent_gen")
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
	@JoinColumn(name = "wscm_user_accounts", nullable = true)
	public WscmUserAccounts getUserAccount() {
		return userAccount;
	}
	public void setUserAccount(WscmUserAccounts userAccount) {
		this.userAccount = userAccount;
	}
	
	
	@Column(name = "ts_insert", nullable = false, length = 29)
	@org.hibernate.annotations.CreationTimestamp
	public Date getTsInsert() {
		return this.tsInsert;
	}
	public void setTsInsert(Date tsInsert) {
		this.tsInsert = tsInsert;
	}
	
	
	

}
