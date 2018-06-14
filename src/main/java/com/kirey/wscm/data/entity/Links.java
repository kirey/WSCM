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
@Table(name = "links")
public class Links implements Serializable {

	private static final long serialVersionUID = 4499838765790490585L;
	
	private Integer id;
	private String url;
	
//	@JsonBackReference(value="linksUserLinks")
//	private List<UserLinks> userLinkses = new ArrayList<>();
//	@JsonBackReference(value="linksIpAddressLinkses")
//	private List<IpAddressLinks> ipAddressLinkses = new ArrayList<>();
//	@JsonBackReference(value="linksCategories")
//	private List<LinksCategories> linksCategorieses = new ArrayList<>();
	
	@Id
	@SequenceGenerator(name = "links_gen", sequenceName = "seq_links", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "links_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(name = "url", unique = false, nullable = false)
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "link")
//	public List<UserLinks> getUserLinkses() {
//		return userLinkses;
//	}
//	public void setUserLinkses(List<UserLinks> userLinkses) {
//		this.userLinkses = userLinkses;
//	}
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "link")
//	public List<IpAddressLinks> getIpAddressLinkses() {
//		return ipAddressLinkses;
//	}
//	public void setIpAddressLinkses(List<IpAddressLinks> ipAddressLinkses) {
//		this.ipAddressLinkses = ipAddressLinkses;
//	}
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "link")
//	public List<LinksCategories> getLinksCategorieses() {
//		return linksCategorieses;
//	}
//	public void setLinksCategorieses(List<LinksCategories> linksCategorieses) {
//		this.linksCategorieses = linksCategorieses;
//	}

	
	
	
	

}
