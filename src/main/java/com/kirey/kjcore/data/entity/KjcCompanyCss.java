package com.kirey.kjcore.data.entity;

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

import com.kirey.kjcore.data.annotations.CreationUser;
import com.kirey.kjcore.data.annotations.UpdateUser;

/**
 * KjcCompanyCss generated by hbm2java
 */
@Entity
@Table(name = "KJC_COMPANY_CSS")
public class KjcCompanyCss implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3742197304158374076L;
	private Integer id;
	private KjcCompanies kjcCompanies;
	private String cssData;
	private Integer utInsert;
	private Date tsInsert;
	private Integer utUpdate;
	private Date tsUpdate;

	public KjcCompanyCss() {
	}

	public KjcCompanyCss(Integer id, KjcCompanies kjcCompanies, Integer utInsert, Date tsInsert, Integer utUpdate,
			Date tsUpdate, String cssData) {
		this.id = id;
		this.kjcCompanies = kjcCompanies;
		this.cssData = cssData;
		this.utInsert = utInsert;
		this.tsInsert = tsInsert;
		this.utUpdate = utUpdate;
		this.tsUpdate = tsUpdate;
	}

	@Id
	@SequenceGenerator(name = "idCompany_css_gen", sequenceName = "SEQ_KJC_COMPANY_CSS", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "idCompany_css_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "KJC_COMPANY", nullable = false)
	public KjcCompanies getKjcCompanies() {
		return this.kjcCompanies;
	}

	public void setKjcCompanies(KjcCompanies kjcCompanies) {
		this.kjcCompanies = kjcCompanies;
	}

	@Column(name = "CSS_DATA", length = 300)
	public String getCssData() {
		return this.cssData;
	}

	public void setCssData(String cssData) {
		this.cssData = cssData;
	}

	@Column(name = "UT_INSERT", nullable = false, updatable = false, precision = 10, scale = 0)
	@CreationUser
	public Integer getUtInsert() {
		return this.utInsert;
	}

	public void setUtInsert(Integer utInsert) {
		this.utInsert = utInsert;
	}

	@Column(name = "TS_INSERT", nullable = false, updatable = false)
	@org.hibernate.annotations.CreationTimestamp
	public Date getTsInsert() {
		return this.tsInsert;
	}

	public void setTsInsert(Date tsInsert) {
		this.tsInsert = tsInsert;
	}

	@Column(name = "UT_UPDATE", nullable = false, precision = 10, scale = 0)
	@UpdateUser
	public Integer getUtUpdate() {
		return this.utUpdate;
	}

	public void setUtUpdate(Integer utUpdate) {
		this.utUpdate = utUpdate;
	}

	@Column(name = "TS_UPDATE", nullable = false)
	@org.hibernate.annotations.UpdateTimestamp
	public Date getTsUpdate() {
		return this.tsUpdate;
	}

	public void setTsUpdate(Date tsUpdate) {
		this.tsUpdate = tsUpdate;
	}

}
