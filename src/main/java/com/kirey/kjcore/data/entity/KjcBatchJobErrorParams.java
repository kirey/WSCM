package com.kirey.kjcore.data.entity;
// Generated Nov 3, 2016 2:10:13 PM by Hibernate Tools 4.3.5.Final

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

import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * KjcBatchJobErrorParams generated by hbm2java.
 */
@Entity
@Table(name = "KJC_BATCH_JOB_ERROR_PARAMS")
public class KjcBatchJobErrorParams implements java.io.Serializable {

	private static final long serialVersionUID = 6123793556403677901L;

	private Integer id;
	@JsonBackReference(value = "batchErrorParams")
	private KjcBatchJobErrors kjcBatchJobErrors;
	private String parameterName;
	private String parameterValue;

	public KjcBatchJobErrorParams() {
	}

	public KjcBatchJobErrorParams(Integer id, KjcBatchJobErrors kjcBatchJobErrors, String parameterName,
			String parameterValue) {
		this.id = id;
		this.kjcBatchJobErrors = kjcBatchJobErrors;
		this.parameterName = parameterName;
		this.parameterValue = parameterValue;
	}

	@Id
	@SequenceGenerator(name = "err_batch_params_gen", sequenceName = "SEQ_KJC_BATCH_JOB_ERROR_PARAMS", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "err_batch_params_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "BATCH_JOB_ERROR", nullable = false)
	public KjcBatchJobErrors getKjcBatchJobErrors() {
		return this.kjcBatchJobErrors;
	}

	public void setKjcBatchJobErrors(KjcBatchJobErrors kjcBatchJobErrors) {
		this.kjcBatchJobErrors = kjcBatchJobErrors;
	}

	@Column(name = "PARAMETER_NAME", nullable = false, length = 50)
	public String getParameterName() {
		return this.parameterName;
	}

	public void setParameterName(String parameterName) {
		this.parameterName = parameterName;
	}

	@Column(name = "PARAMETER_VALUE", nullable = false, length = 1000)
	public String getParameterValue() {
		return this.parameterValue;
	}

	public void setParameterValue(String parameterValue) {
		this.parameterValue = parameterValue;
	}
}
