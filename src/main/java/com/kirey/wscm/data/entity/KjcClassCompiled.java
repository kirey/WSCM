package com.kirey.wscm.data.entity;
// Generated Oct 27, 2016 4:40:00 PM by Hibernate Tools 5.2.0.Beta1

import javax.persistence.Column;
import javax.persistence.Entity;
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

/**
 * KjcClassCompiled generated by hbm2java
 */
@Entity
@Table(name = "KJC_CLASS_COMPILED")
public class KjcClassCompiled implements java.io.Serializable {

	private static final long serialVersionUID = -174405961345747115L;
	private Integer kjcClass;
	@JsonBackReference(value = "Classes_Compiled")
	private KjcClasses kjcClasses;
	private byte[] compiledCode;

	public KjcClassCompiled() {
	}

	public KjcClassCompiled(KjcClasses kjcClasses, byte[] compiledCode) {
		this.kjcClasses = kjcClasses;
		this.compiledCode = compiledCode;
	}

	@Id
	@GenericGenerator(name = "generator", strategy = "foreign", parameters = @Parameter(name = "property", value = "kjcClasses") )
	@GeneratedValue(generator = "generator")
	@Column(name = "KJC_CLASS", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getKjcClass() {
		return this.kjcClass;
	}

	public void setKjcClass(Integer kjcClass) {
		this.kjcClass = kjcClass;
	}

	@OneToOne
	@PrimaryKeyJoinColumn
	public KjcClasses getKjcClasses() {
		return this.kjcClasses;
	}

	public void setKjcClasses(KjcClasses kjcClasses) {
		this.kjcClasses = kjcClasses;
	}

	@JsonIgnore
	//@Lob // in case of use postgres database remove @Lob annotation
	@Column(name = "COMPILED_CODE", nullable = false)
	public byte[] getCompiledCode() {
		return this.compiledCode;
	}

	public void setCompiledCode(byte[] compiledCode) {
		this.compiledCode = compiledCode;
	}

}
