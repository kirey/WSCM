package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.Links;

/**
 * @author paunovicm
 *
 */

@Repository(value = "linksDao")
public class LinksDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public LinksDao() {
		log = LogFactory.getLog(LinksDao.class);
		entityClass = Links.class;
	}

	/**
	 * Method for getting {@link Links} by url
	 * @param url
	 * @return {@link Links}
	 */
	public Links findByUrl(String url) {
		String hql = "from Links l where l.url = :url";
		Links link = (Links) sessionFactory.getCurrentSession().createQuery(hql).setParameter("url", url).uniqueResult();
		return link;
	}

}
