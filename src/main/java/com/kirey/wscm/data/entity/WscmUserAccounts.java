package com.kirey.wscm.data.entity;

import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
	private String email;
	private String role;
	private String socketSessionId;
	
//	@JsonBackReference(value = "wscmUserIpAddress")
//	private List<UserIpAddress> userIpAddress = new ArrayList<>();
//	
//	@JsonBackReference(value = "wscmUserCategorieses")
//	private List<UserCategories> userCategorieses = new ArrayList<>();
//	
//	@JsonBackReference(value = "wscmUserLinkses")
//	private List<UserLinks> userLinkses = new ArrayList<>();
//	
//	@JsonBackReference(value= "userNotificationsSent")
//	private List<NotificationsSent> notificationsSent = new ArrayList<>();
	
	@Transient
    private List<WscmRoles> wscmRoles;
	
	@Transient
	private String sessionId;
	
	
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
	
	@Column(name = "email", unique = false, nullable = true)
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	@Column(name = "role", unique = false, nullable = false)
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	
	@Column(name = "socket_session_id", unique = false, nullable = true)
	public String getSocketSessionId() {
		return socketSessionId;
	}
	public void setSocketSessionId(String socketSessionId) {
		this.socketSessionId = socketSessionId;
	}
	//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "userAccount")
//	public List<UserIpAddress> getUserIpAddress() {
//		return userIpAddress;
//	}
//	public void setUserIpAddress(List<UserIpAddress> userIpAddress) {
//		this.userIpAddress = userIpAddress;
//	}
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "userAccount")
//	public List<UserCategories> getUserCategorieses() {
//		return userCategorieses;
//	}
//	public void setUserCategorieses(List<UserCategories> userCategorieses) {
//		this.userCategorieses = userCategorieses;
//	}
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "userAccount")
//	public List<UserLinks> getUserLinkses() {
//		return userLinkses;
//	}
//	public void setUserLinkses(List<UserLinks> userLinkses) {
//		this.userLinkses = userLinkses;
//	}
//	
//	
//	@OneToMany(fetch = FetchType.LAZY, mappedBy = "userAccount")
//	public List<NotificationsSent> getNotificationsSent() {
//		return notificationsSent;
//	}
//	public void setNotificationsSent(List<NotificationsSent> notificationsSent) {
//		this.notificationsSent = notificationsSent;
//	}
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
	
	@Transient
	public String getSessionId() {
		return sessionId;
	}
	@Transient
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
	
	
	

}
