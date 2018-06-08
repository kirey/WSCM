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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "ip_address")
public class IpAddress implements Serializable{

	private static final long serialVersionUID = 6638674712695785734L;
	
	private Integer id;
	private String address;
	
	private List<UserIpAddress> userIpAddresses = new ArrayList<>();
	private List<IpAddressCategories> ipAddressCategorieses = new ArrayList<>();
	
	
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
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "ipAddress")
	public List<UserIpAddress> getUserIpAddresses() {
		return userIpAddresses;
	}
	public void setUserIpAddresses(List<UserIpAddress> userIpAddresses) {
		this.userIpAddresses = userIpAddresses;
	}
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "ipAddress")
	public List<IpAddressCategories> getIpAddressCategorieses() {
		return ipAddressCategorieses;
	}
	public void setIpAddressCategorieses(List<IpAddressCategories> ipAddressCategorieses) {
		this.ipAddressCategorieses = ipAddressCategorieses;
	}
}
