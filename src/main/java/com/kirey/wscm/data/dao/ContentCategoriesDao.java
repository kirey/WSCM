package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.ContentCategories;


@Repository(value = "contentCategoriesDao")
public class ContentCategoriesDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public ContentCategoriesDao() {
		log = LogFactory.getLog(ContentCategoriesDao.class);
		entityClass = ContentCategories.class;
	}

	public ContentCategories findByContentCategory(Integer contentId, Integer categoryId) {
		String hql = "from ContentCategories cc where cc.categories.id = :categoryId and cc.content.id = :contentId";
		ContentCategories contentCategories = (ContentCategories) sessionFactory.getCurrentSession().createQuery(hql).setParameter("categoryId", categoryId).setParameter("contentId", contentId).uniqueResult();
		return contentCategories;
	}

}
