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
@Table(name = "user_links")
public class UserLinks implements Serializable {

	private static final long serialVersionUID = 2417078553998693629L;
	
	private Integer id;
//	@JsonManagedReference(value = "wscmUserLinkses")
	private WscmUserAccounts userAccount;
//	@JsonManagedReference(value="linksUserLinks")
	private Links link;
	private Integer noRequests;
	private Date tsInsert;

	
	@Id
	@SequenceGenerator(name = "user_links_gen", sequenceName = "seq_user_links", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_links_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wscm_user_accounts", nullable = true)
	public WscmUserAccounts getUserAccount() {
		return userAccount;
	}
	public void setUserAccount(WscmUserAccounts userAccount) {
		this.userAccount = userAccount;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "links", nullable = true)
	public Links getLink() {
		return link;
	}
	public void setLink(Links link) {
		this.link = link;
	}

	@Column(name = "no_requests")
	public Integer getNoRequests() {
		return noRequests;
	}
	public void setNoRequests(Integer noRequests) {
		this.noRequests = noRequests;
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
