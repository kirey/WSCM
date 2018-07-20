package com.kirey.wscm.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.Links;
import com.kirey.wscm.data.entity.UserLinks;
import com.kirey.wscm.data.entity.WscmUserAccounts;

/**
 * @author paunovicm
 *
 */

@Repository(value = "userLinksDao")
public class UserLinksDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public UserLinksDao() {
		log = LogFactory.getLog(UserLinksDao.class);
		entityClass = UserLinks.class;
	}

	/**
	 * Method for getting {@link UserLinks} by {@link WscmUserAccounts} and {@link Links}
	 * @param user
	 * @param link
	 * @return {@link UserLinks}
	 */
	public UserLinks findByUserLink(WscmUserAccounts user, Links link) {
		String hql = "from UserLinks ul where ul.userAccount.id = :userId and ul.link.id = :linkId";
		UserLinks userLinks = (UserLinks) sessionFactory.getCurrentSession().createQuery(hql).setParameter("userId", user.getId()).setParameter("linkId", link.getId()).uniqueResult();
		return userLinks;
	}

	/**
	 * Method for getting {@link List} of {@link UserLinks} by {@link WscmUserAccounts}
	 * @param user
	 * @return {@link List}<{@link UserLinks}>
	 */
	public List<UserLinks> findLinksByUser(WscmUserAccounts user) {
		String hql = "from UserLinks ul where ul.userAccount.id = :userId";
		List<UserLinks> listUserLinks = sessionFactory.getCurrentSession().createQuery(hql).setParameter("userId", user.getId()).list();
		return listUserLinks;
	}

}
