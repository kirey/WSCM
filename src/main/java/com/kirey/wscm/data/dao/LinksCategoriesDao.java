package com.kirey.wscm.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.Links;
import com.kirey.wscm.data.entity.LinksCategories;

/**
 * @author paunovicm
 *
 */

@Repository(value = "linksCategoriesDao")
public class LinksCategoriesDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public LinksCategoriesDao() {
		log = LogFactory.getLog(LinksCategoriesDao.class);
		entityClass = LinksCategories.class;
	}

	public List<LinksCategories> findByLink(Links link) {
		String hql = "from LinksCategories lc where lc.link.id = :linkId";
		List<LinksCategories> linksCategories = sessionFactory.getCurrentSession().createQuery(hql).setParameter("linkId", link.getId()).list();
		return linksCategories;
	}

	public List<LinksCategories> findByCategory(Categories category) {
		String hql = "from LinksCategories lc where lc.categories.id = :categoryId";
		List<LinksCategories> linksCategories = sessionFactory.getCurrentSession().createQuery(hql).setParameter("categoryId", category.getId()).list();
		return linksCategories;
	}

}
