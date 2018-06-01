package com.kirey.kjcore.data.entity;
// Generated 20-Oct-2016 11:22:32 by Hibernate Tools 4.3.1.Final

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kirey.kjcore.data.annotations.CreationUser;
import com.kirey.kjcore.data.annotations.UpdateUser;

/**
 * KjcReportBookingBlobs generated by hbm2java
 */
@Entity
@Table(name = "KJC_REPORT_BOOKING_BLOBS")
public class KjcReportBookingBlobs implements java.io.Serializable {

	private static final long serialVersionUID = 2686201375278120008L;

	private Integer kjcReportBooking;

	@JsonBackReference
	private KjcReportBookings kjcReportBookings;

	private byte[] fileBlob;
	private Integer utInsert;
	private Date tsInsert;
	private Integer utUpdate;
	private Date tsUpdate;

	public KjcReportBookingBlobs() {
	}

	public KjcReportBookingBlobs(KjcReportBookings kjcReportBookings, byte[] fileBlob, Integer utInsert, Date tsInsert,
			Integer utUpdate, Date tsUpdate) {
		this.kjcReportBookings = kjcReportBookings;
		this.fileBlob = fileBlob;
		this.utInsert = utInsert;
		this.tsInsert = tsInsert;
		this.utUpdate = utUpdate;
		this.tsUpdate = tsUpdate;
	}

	@GenericGenerator(name = "generator", strategy = "foreign", parameters = @Parameter(name = "property", value = "kjcReportBookings") )
	@Id
	@GeneratedValue(generator = "generator")
	@Column(name = "KJC_REPORT_BOOKING", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getKjcReportBooking() {
		return this.kjcReportBooking;
	}

	public void setKjcReportBooking(Integer kjcReportBooking) {
		this.kjcReportBooking = kjcReportBooking;
	}

	@OneToOne(fetch = FetchType.LAZY)
	@PrimaryKeyJoinColumn
	public KjcReportBookings getKjcReportBookings() {
		return this.kjcReportBookings;
	}

	public void setKjcReportBookings(KjcReportBookings kjcReportBookings) {
		this.kjcReportBookings = kjcReportBookings;
	}

	@JsonIgnore
	//@Lob // in case of use postgres database remove @Lob annotation
	@Column(name = "FILE_BLOB", nullable = false)
	public byte[] getFileBlob() {
		return this.fileBlob;
	}

	public void setFileBlob(byte[] fileBlob) {
		this.fileBlob = fileBlob;
	}

	@Column(name = "UT_INSERT", updatable=false, nullable = false, precision = 10, scale = 0)
	@CreationUser
	public Integer getUtInsert() {
		return this.utInsert;
	}

	@JsonProperty
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