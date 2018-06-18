package com.kirey.wscm.data.entity;

import java.io.Serializable;

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

@Entity
@Table(name = "user_categories")
public class UserCategories implements Serializable{

	private static final long serialVersionUID = -8422809548816237743L;
	
	private Integer id;
//	@JsonManagedReference(value = "wscmUserCategorieses")
	private WscmUserAccounts userAccount;
//	@JsonManagedReference(value="categoriesUserCategories")
	private Categories categories;
	private Integer weight;
	
	@Id
	@SequenceGenerator(name = "user_categories_gen", sequenceName = "seq_user_categories", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_categories_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "wscm_user_accounts", nullable = true)
	public WscmUserAccounts getUserAccount() {
		return userAccount;
	}
	public void setUserAccount(WscmUserAccounts userAccount) {
		this.userAccount = userAccount;
	}
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "categories", nullable = true)
	public Categories getCategories() {
		return categories;
	}
	public void setCategories(Categories categories) {
		this.categories = categories;
	}
	
	@Column(name = "weight", nullable = true)
	public Integer getWeight() {
		return weight;
	}
	public void setWeight(Integer weight) {
		this.weight = weight;
	}
	
	
	
	

}
