package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.NotificationsSent;

/**
 * @author paunovicm
 *
 */

@Repository(value = "notificationsSentDao")
public class NotificationsSentDao extends KjcBaseDao{
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public NotificationsSentDao() {
		log = LogFactory.getLog(NotificationsSentDao.class);
		entityClass = NotificationsSent.class;
	}

}
