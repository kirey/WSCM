package com.kirey.wscm.data.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.Hibernate;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.WscmRoles;
import com.kirey.wscm.data.entity.WscmUserAccounts;

@Repository(value = "wscmUserAccountsDao")
@Scope("singleton")
public class WscmUserAccountsDao extends KjcBaseDao implements UserDetailsService{
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public WscmUserAccountsDao() {
		log = LogFactory.getLog(WscmUserAccountsDao.class);
		entityClass = WscmUserAccounts.class;
	}
	
	

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		String hql = "from WscmUserAccounts ua where ua.username = :username";
		WscmUserAccounts user = (WscmUserAccounts) sessionFactory.getCurrentSession().createQuery(hql).setParameter("username", username).uniqueResult();
		
	    if(user == null) {
	    	throw new UsernameNotFoundException("User with username: " + username + "not found!");
	    }else {
	    	WscmRoles role = new WscmRoles(user.getRole());
	    	List<WscmRoles> listRoles = new ArrayList<>();
	    	listRoles.add(role);
	    	user.setWscmRoles(listRoles);
	    }
		return user;
	}



	public WscmUserAccounts findByEmail(String email) {
		String hql = "from WscmUserAccounts ua where ua.email = :email";
		WscmUserAccounts user = (WscmUserAccounts) sessionFactory.getCurrentSession().createQuery(hql).setParameter("email", email).uniqueResult();
		return user;
	}



	public List<WscmUserAccounts> findUsersByCategory(String categoryName) {
		String hql = "select uc.userAccount from UserCategories uc where uc.categories.categoryName = :name";
		List<WscmUserAccounts> users = sessionFactory.getCurrentSession().createQuery(hql).setParameter("name", categoryName).list();
		return users;
	}

}
