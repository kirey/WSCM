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
@Table(name = "ip_address_links")
public class IpAddressLinks implements Serializable {

	private static final long serialVersionUID = -8068666752381211189L;
	
	private Integer id;
//	@JsonManagedReference(value="ipAddressLinks")
	private IpAddress ipAddress;
//	@JsonManagedReference(value="linksIpAddressLinkses")
	private Links link;
	private Integer noRequests;
	private Date tsInsert;
	
	@Id
	@SequenceGenerator(name = "ip_address_links_gen", sequenceName = "seq_ip_address_links", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ip_address_links_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ip_address", nullable = true)
	public IpAddress getIpAddress() {
		return ipAddress;
	}
	public void setIpAddress(IpAddress ipAddress) {
		this.ipAddress = ipAddress;
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
		return tsInsert;
	}
	public void setTsInsert(Date tsInsert) {
		this.tsInsert = tsInsert;
	}
	
	
	
	

}
