package com.kirey.kjcore.data.entity;

// Generated Nov 16, 2016 11:45:13 AM by Hibernate Tools 5.1.0.CR1

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
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kirey.kjcore.data.annotations.CreationUser;
import com.kirey.kjcore.data.annotations.UpdateUser;

/**
 * KjcInlineResourceTemplates generated by hbm2java
 */
@Entity
@Table(name = "KJC_INLINE_RESOURCE_TEMPLATES", uniqueConstraints = @UniqueConstraint(columnNames = {
		"KJC_EMAIL_TEMPLATE", "CD_RESOURCE" }))
public class KjcInlineResourceTemplates implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3791923168064530449L;
	private Integer id;
	private KjcEmailTemplates kjcEmailTemplates;
	private String cdResource;
	private String resourceName;
	private byte[] resourceFile;
	private String description;
	private Integer utInsert;
	private Date tsInsert;
	private Integer utUpdate;
	private Date tsUpdate;

	public KjcInlineResourceTemplates() {
	}

	public KjcInlineResourceTemplates(Integer id, KjcEmailTemplates kjcEmailTemplates, String cdResource,
			String resourceName, byte[] resourceFile, Integer utInsert, Date tsInsert, Integer utUpdate,
			Date tsUpdate) {
		this.id = id;
		this.kjcEmailTemplates = kjcEmailTemplates;
		this.cdResource = cdResource;
		this.resourceName = resourceName;
		this.resourceFile = resourceFile;
		this.utInsert = utInsert;
		this.tsInsert = tsInsert;
		this.utUpdate = utUpdate;
		this.tsUpdate = tsUpdate;
	}

	public KjcInlineResourceTemplates(Integer id, KjcEmailTemplates kjcEmailTemplates, String cdResource,
			String resourceName, byte[] resourceFile, String description, Integer utInsert, Date tsInsert,
			Integer utUpdate, Date tsUpdate) {
		this.id = id;
		this.kjcEmailTemplates = kjcEmailTemplates;
		this.cdResource = cdResource;
		this.resourceName = resourceName;
		this.resourceFile = resourceFile;
		this.description = description;
		this.utInsert = utInsert;
		this.tsInsert = tsInsert;
		this.utUpdate = utUpdate;
		this.tsUpdate = tsUpdate;
	}

	@Id
	@SequenceGenerator(name = "SEQ_KJC_INLINE_RESOURCE_TEMPL_GEN", sequenceName = "SEQ_KJC_INLINE_RESOURCE_TEMPL", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_KJC_INLINE_RESOURCE_TEMPL_GEN")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "KJC_EMAIL_TEMPLATE", nullable = false)
	public KjcEmailTemplates getKjcEmailTemplates() {
		return this.kjcEmailTemplates;
	}

	public void setKjcEmailTemplates(KjcEmailTemplates kjcEmailTemplates) {
		this.kjcEmailTemplates = kjcEmailTemplates;
	}

	@Column(name = "CD_RESOURCE", nullable = false, length = 100)
	public String getCdResource() {
		return this.cdResource;
	}

	public void setCdResource(String cdResource) {
		this.cdResource = cdResource;
	}

	@Column(name = "RESOURCE_NAME", nullable = false, length = 100)
	public String getResourceName() {
		return this.resourceName;
	}

	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}

	@Column(name = "RESOURCE_FILE", nullable = false)
	public byte[] getResourceFile() {
		return this.resourceFile;
	}

	public void setResourceFile(byte[] resourceFile) {
		this.resourceFile = resourceFile;
	}

	@Column(name = "DESCRIPTION", length = 1000)
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "UT_INSERT", updatable=false, nullable = false, precision = 10, scale = 0)
	@CreationUser
	public Integer getUtInsert() {
		return this.utInsert;
	}

	public void setUtInsert(Integer utInsert) {
		this.utInsert = utInsert;
	}

	@Column(name = "TS_INSERT", updatable=false, nullable = false)
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
