package com.kirey.wscm.data.entity;

import java.util.ArrayList;
import java.util.Collection;
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

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "wscm_user_accounts")
public class WscmUserAccounts implements UserDetails{
	
	static final long serialVersionUID = 3646720144516297075L;
	
	private Integer id;
	private String username;
	private String password;
	private String role;
	
	private List<UserIpAddress> userIpAddress = new ArrayList<>();
	
	@Transient
    private List<WscmRoles> wscmRoles;
	
	
	@Id
	@SequenceGenerator(name = "wscmUserAccounts_gen", sequenceName = "seq_wscm_user_accounts", allocationSize = 1, initialValue = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "wscmUserAccounts_gen")
	@Column(name = "ID", unique = true, nullable = false, precision = 10, scale = 0)
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(name = "username", unique = true, nullable = false)
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	@Column(name = "password", unique = false, nullable = false)
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	@Column(name = "role", unique = false, nullable = false)
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "userAccount")
	public List<UserIpAddress> getUserIpAddress() {
		return userIpAddress;
	}
	public void setUserIpAddress(List<UserIpAddress> userIpAddress) {
		this.userIpAddress = userIpAddress;
	}
	@Transient
	public List<WscmRoles> getWscmRoles() {
		return wscmRoles;
	}
	public void setWscmRoles(List<WscmRoles> wscmRoles) {
		this.wscmRoles = wscmRoles;
	}
	
	@Override
	@Transient
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.wscmRoles;
	}
	
	@Override
	@Transient
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	@Transient
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	@Transient
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	@Transient
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
	
	

}
