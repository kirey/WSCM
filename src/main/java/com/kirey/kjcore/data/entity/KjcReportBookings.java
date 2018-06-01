package com.kirey.kjcore.data.entity;
// Generated 20-Oct-2016 11:22:32 by Hibernate Tools 4.3.1.Final

import java.util.ArrayList;
import java.util.Date;
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
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.kirey.kjcore.data.annotations.CreationUser;
import com.kirey.kjcore.data.annotations.UpdateUser;

/**
 * KjcReportBookings generated by hbm2java
 */
@Entity
@Table(name = "KJC_REPORT_BOOKINGS")
public class KjcReportBookings implements java.io.Serializable {

	private static final long serialVersionUID = 754731834686159418L;

	private Integer id;

	/* @JsonManagedReference(value = "report_bookingses") */
	private KjcReports kjcReports;

	private Date bookedDate;
	private String format;
	private String status;
	private Integer utInsert;
	private Date tsInsert;
	private Integer utUpdate;
	private Date tsUpdate;

	@JsonManagedReference
	private KjcReportBookingBlobs kjcReportBookingBlobs;

	@JsonManagedReference(value = "booking_parameters")
	private List<KjcReportBookingParameters> kjcReportBookingParameterses = new ArrayList<KjcReportBookingParameters>(
			0);

	public KjcReportBookings() {
	}

	public KjcReportBookings(Integer id, KjcReports kjcReports, Date bookedDate, String status, Integer utInsert,
			Date tsInsert, Integer utUpdate, Date tsUpdate) {
		this.id = id;
		this.kjcReports = kjcReports;
		this.bookedDate = bookedDate;
		this.status = status;
		this.utInsert = utInsert;
		this.tsInsert = tsInsert;
		this.utUpdate = utUpdate;
		this.tsUpdate = tsUpdate;
	}

	public KjcReportBookings(Integer id, KjcReports kjcReports, Date bookedDate, String format, String status,
			Integer utInsert, Date tsInsert, Integer utUpdate, Date tsUpdate,
			KjcReportBookingBlobs kjcReportBookingBlobs,
			List<KjcReportBookingParameters> kjcReportBookingParameterses) {
		this.id = id;
		this.kjcReports = kjcReports;
		this.bookedDate = bookedDate;
		this.format = format;
		this.status = status;
		this.utInsert = utInsert;
		this.tsInsert = tsInsert;
		this.utUpdate = utUpdate;
		this.tsUpdate = tsUpdate;
		this.kjcReportBookingBlobs = kjcReportBookingBlobs;
		this.kjcReportBookingParameterses = kjcReportBookingParameterses;
	}

	@Id
	@SequenceGenerator(name = "reportbooking_gen", sequenceName = "SEQ_KJC_REPORT_BOOKINGS", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reportbooking_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "KJC_REPORT", nullable = false)
	public KjcReports getKjcReports() {
		return this.kjcReports;
	}

	public void setKjcReports(KjcReports kjcReports) {
		this.kjcReports = kjcReports;
	}

	@Column(name = "BOOKED_DATE", nullable = false, length = 7)
	public Date getBookedDate() {
		return bookedDate;
	}

	public void setBookedDate(Date bookedDate) {
		this.bookedDate = bookedDate;
	}

	@Column(name = "FORMAT", length = 50)
	public String getFormat() {
		return this.format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	@Column(name = "STATUS", nullable = false, length = 30)
	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	@OneToOne(fetch = FetchType.LAZY, mappedBy = "kjcReportBookings")
	@Fetch(FetchMode.JOIN)
	public KjcReportBookingBlobs getKjcReportBookingBlobs() {
		return this.kjcReportBookingBlobs;
	}

	public void setKjcReportBookingBlobs(KjcReportBookingBlobs kjcReportBookingBlobs) {
		this.kjcReportBookingBlobs = kjcReportBookingBlobs;
	}

	@OneToMany(mappedBy = "kjcReportBookings")
	@LazyCollection(LazyCollectionOption.FALSE)
	@Cascade(value = CascadeType.ALL)
	@Fetch(FetchMode.SUBSELECT)
	public List<KjcReportBookingParameters> getKjcReportBookingParameterses() {
		return this.kjcReportBookingParameterses;
	}

	public void setKjcReportBookingParameterses(List<KjcReportBookingParameters> kjcReportBookingParameterses) {
		this.kjcReportBookingParameterses = kjcReportBookingParameterses;
	}

}