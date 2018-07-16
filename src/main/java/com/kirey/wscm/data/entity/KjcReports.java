package com.kirey.wscm.data.entity;
// Generated 18-Nov-2016 14:18:04 by Hibernate Tools 5.1.0.Beta1

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.fasterxml.jackson.annotation.JsonManagedReference;

/**
 * KjcReports generated by hbm2java
 */
@Entity
@Table(name = "KJC_REPORTS", uniqueConstraints = @UniqueConstraint(columnNames = "NAME"))
public class KjcReports implements java.io.Serializable {
	private static final long serialVersionUID = 1582471727854408625L;
	
	private Integer id;
	
	private String name;
	private String description;
	private String type;
	private Long avgExecTime;
	private Long numExecution;
	private boolean flEnabled;
	
	@JsonManagedReference(value = "report_blobs")
	private List<KjcReportBlobs> kjcReportBlobses = new ArrayList<KjcReportBlobs>(0);
	
	
	@JsonManagedReference(value = "report_parameters")
	private List<KjcReportParameters> kjcReportParameterses = new ArrayList<KjcReportParameters>(0);
	
	public KjcReports() {
	}


	@Id
	@SequenceGenerator(name = "report_gen", sequenceName = "SEQ_KJC_REPORTS", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "report_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}


	@Column(name = "NAME", unique = true, nullable = false, length = 100)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "DESCRIPTION")
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Column(name = "TYPE", nullable = false, length = 20)
	public String getType() {
		return this.type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(name = "AVG_EXEC_TIME", precision = 22, scale = 0)
	public Long getAvgExecTime() {
		return this.avgExecTime;
	}

	public void setAvgExecTime(Long avgExecTime) {
		this.avgExecTime = avgExecTime;
	}

	@Column(name = "NUM_EXECUTION", precision = 10, scale = 0)
	public Long getNumExecution() {
		return this.numExecution;
	}

	public void setNumExecution(Long numExecution) {
		this.numExecution = numExecution;
	}



	@OneToMany(mappedBy = "kjcReports")
	@LazyCollection(LazyCollectionOption.FALSE)
	@Cascade(value = CascadeType.ALL)
    @Fetch(FetchMode.SUBSELECT)
	public List<KjcReportBlobs> getKjcReportBlobses() {
		return this.kjcReportBlobses;
	}

	public void setKjcReportBlobses(List<KjcReportBlobs> kjcReportBlobses) {
		this.kjcReportBlobses = kjcReportBlobses;
	}

	
	@OneToMany(mappedBy = "kjcReports")
	@LazyCollection(LazyCollectionOption.FALSE)
	@Cascade(value = CascadeType.ALL)
	@Fetch(FetchMode.SUBSELECT)
	public List<KjcReportParameters> getKjcReportParameterses() {
		return this.kjcReportParameterses;
	}

	public void setKjcReportParameterses(List<KjcReportParameters> kjcReportParameterses) {
		this.kjcReportParameterses = kjcReportParameterses;
	}
	
	@Column(name = "FL_ENABLED", nullable = false, precision = 1, scale = 0)
	public boolean isFlEnabled() {
		return this.flEnabled;
	}

	public void setFlEnabled(boolean flEnabled) {
		this.flEnabled = flEnabled;
	}
	
}
