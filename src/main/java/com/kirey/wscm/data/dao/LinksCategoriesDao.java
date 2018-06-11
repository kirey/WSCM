package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.LinksCategories;

@Repository(value = "linksCategoriesDao")
public class LinksCategoriesDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public LinksCategoriesDao() {
		log = LogFactory.getLog(LinksCategoriesDao.class);
		entityClass = LinksCategories.class;
	}

}
