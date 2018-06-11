package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.NotificationCategories;

@Repository(value = "notificationCategoriesDao")
public class NotificationCategoriesDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public NotificationCategoriesDao() {
		log = LogFactory.getLog(NotificationCategoriesDao.class);
		entityClass = NotificationCategories.class;
	}

}
