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
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "content")
public class Content implements Serializable{
private static final long serialVersionUID = -8690896830405732886L;
	
	private Integer id;
	private String page;
	private String position;
	private String language;
	private String html;
	private String css;
	private String script;
	
	@JsonBackReference(value="contentCategories")
	private List<ContentCategories> contentCategorieses = new ArrayList<>();
	
	@Transient
	private String connected;
	
	@Id
	@SequenceGenerator(name = "content_gen", sequenceName = "seq_content", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "content_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(name = "page", unique = false, nullable = true)
	public String getPage() {
		return page;
	}
	public void setPage(String page) {
		this.page = page;
	}
	
	@Column(name = "position", unique = false, nullable = true)
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	
	@Column(name = "language", unique = false, nullable = true)
	public String getLanguage() {
		return language;
	}
	public void setLanguage(String language) {
		this.language = language;
	}
	
	@Column(name = "html", unique = false, nullable = true, length = 10000)
	public String getHtml() {
		return html;
	}
	public void setHtml(String html) {
		this.html = html;
	}
	
	@Column(name = "css", unique = false, nullable = true, length = 10000)
	public String getCss() {
		return css;
	}
	public void setCss(String css) {
		this.css = css;
	}
	
	
	@Column(name = "script", unique = false, nullable = true, length = 10000)
	public String getScript() {
		return script;
	}
	public void setScript(String script) {
		this.script = script;
	}
	@Transient
	public String getConnected() {
		return connected;
	}
	public void setConnected(String connected) {
		this.connected = connected;
	}
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "content")
	public List<ContentCategories> getContentCategorieses() {
		return contentCategorieses;
	}
	public void setContentCategorieses(List<ContentCategories> contentCategorieses) {
		this.contentCategorieses = contentCategorieses;
	}
	
	

}
