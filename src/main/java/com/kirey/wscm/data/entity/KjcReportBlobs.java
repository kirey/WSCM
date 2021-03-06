package com.kirey.wscm.data.entity;
// Generated 18-Nov-2016 22:37:51 by Hibernate Tools 5.1.0.Beta1

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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * KjcReportBlobs generated by hbm2java
 */
@Entity
@Table(name = "KJC_REPORT_BLOBS", uniqueConstraints = { @UniqueConstraint(columnNames = { "KJC_REPORT", "ORDER_BLOB" }) })
public class KjcReportBlobs implements java.io.Serializable {
	private static final long serialVersionUID = -2624740946372625838L;
	
	private Integer id;
	@JsonBackReference(value = "report_blobs")
	private KjcReports kjcReports;
	@JsonIgnore
	private byte[] fileBlob;
	private Integer orderBlob;
	private String subreportParameterKey;

	public KjcReportBlobs() {
	}

	public KjcReportBlobs(Integer id, KjcReports kjcReports, byte[] fileBlob, Integer orderBlob,
			String subreportParameterKey) {
		this.id = id;
		this.kjcReports = kjcReports;
		this.fileBlob = fileBlob;
		this.orderBlob = orderBlob;
		this.subreportParameterKey = subreportParameterKey;
	}

	@Id
	@SequenceGenerator(name = "report_blog_gen", sequenceName = "SEQ_KJC_REPORT_BLOBS", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "report_blog_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "KJC_REPORT", unique = true, nullable = false)
	public KjcReports getKjcReports() {
		return this.kjcReports;
	}

	public void setKjcReports(KjcReports kjcReports) {
		this.kjcReports = kjcReports;
	}
	
	//@Lob // in case of use postgres database remove @Lob annotation
	@Column(name = "FILE_BLOB", nullable = false)
	public byte[] getFileBlob() {
		return this.fileBlob;
	}

	public void setFileBlob(byte[] fileBlob) {
		this.fileBlob = fileBlob;
	}

	@Column(name = "ORDER_BLOB", nullable = false, precision = 10, scale = 0)
	public Integer getOrderBlob() {
		return this.orderBlob;
	}

	public void setOrderBlob(Integer orderBlob) {
		this.orderBlob = orderBlob;
	}
	
	@Column(name = "SUBREPORT_PARAMETER_KEY", length = 50)
	public String getSubreportParameterKey() {
		return this.subreportParameterKey;
	}

	public void setSubreportParameterKey(String subreportParameterKey) {
		this.subreportParameterKey = subreportParameterKey;
	}

}
