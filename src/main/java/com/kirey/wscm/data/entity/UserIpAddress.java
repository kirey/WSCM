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
@Table(name = "user_ip_address")
public class UserIpAddress implements Serializable{

	private static final long serialVersionUID = -8597033906921078802L;
	
	private Integer id;
	@JsonManagedReference(value = "wscmUserIpAddress")
	private WscmUserAccounts userAccount;
	@JsonManagedReference(value="ipAddressUserIpAddresses")
	private IpAddress ipAddress;
	private Integer noRequests;
	
	@Id
	@SequenceGenerator(name = "user_ip_address_gen", sequenceName = "seq_user_ip_address", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_ip_address_gen")
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
	@JoinColumn(name = "ip_address", nullable = true)
	public IpAddress getIpAddress() {
		return ipAddress;
	}
	public void setIpAddress(IpAddress ipAddress) {
		this.ipAddress = ipAddress;
	}
	
	@Column(name = "no_requests")
	public Integer getNoRequests() {
		return noRequests;
	}
	public void setNoRequests(Integer noRequests) {
		this.noRequests = noRequests;
	}
	
	

	
}
