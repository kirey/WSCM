package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.Links;
import com.kirey.wscm.data.entity.UserLinks;
import com.kirey.wscm.data.entity.WscmUserAccounts;

@Repository(value = "userLinksDao")
public class UserLinksDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public UserLinksDao() {
		log = LogFactory.getLog(UserLinksDao.class);
		entityClass = UserLinks.class;
	}

	public UserLinks findByUserLink(WscmUserAccounts user, Links link) {
		String hql = "from UserLinks ul where ul.userAccount.id = :userId and ul.link.id = :linkId";
		UserLinks userLinks = (UserLinks) sessionFactory.getCurrentSession().createQuery(hql).setParameter("userId", user.getId()).setParameter("linkId", link.getId()).uniqueResult();
		return userLinks;
	}

}
