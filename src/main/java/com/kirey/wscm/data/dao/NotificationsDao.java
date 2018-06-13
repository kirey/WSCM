package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.Notifications;

@Repository(value = "notificationsDao")
public class NotificationsDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public NotificationsDao() {
		log = LogFactory.getLog(NotificationsDao.class);
		entityClass = Notifications.class;
	}

	
	public String findTemplateByName(String notificationName) {
		String hql = "from Notifications notif where notif.name = :notifName";
		Notifications notification = (Notifications) sessionFactory.getCurrentSession().createQuery(hql).setParameter("notifName", notificationName).uniqueResult();
		String notificationTemplate = notification.getNotificationTemplate(); 
		return notificationTemplate;
	}

}
