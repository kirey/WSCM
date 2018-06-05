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

@Entity
@Table(name = "ip_address")
public class IpAddress implements Serializable{

	private static final long serialVersionUID = 6638674712695785734L;
	
	private Integer id;
	private String address;
	private WscmUserAccounts wscmUserAccounts;
	
	@Id
	@SequenceGenerator(name = "ipAddress_gen", sequenceName = "seq_ip_address", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ipAddress_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(name = "address", unique = false, nullable = false)
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wscm_user_accounts", nullable = false)
	public WscmUserAccounts getWscmUserAccounts() {
		return wscmUserAccounts;
	}
	public void setWscmUserAccounts(WscmUserAccounts wscmUserAccounts) {
		this.wscmUserAccounts = wscmUserAccounts;
	}
	
	
	

}