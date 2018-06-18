package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.Notifications;

/**
 * @author paunovicm
 *
 */

@Repository(value = "notificationsDao")
public class NotificationsDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public NotificationsDao() {
		log = LogFactory.getLog(NotificationsDao.class);
		entityClass = Notifications.class;
	}

	/**
	 * Method for getting {@link Notifications} by notification name
	 * @param notificationName
	 * @return {@link Notifications}
	 */
	public Notifications findNotificationByName(String notificationName) {
		String hql = "from Notifications notif where notif.name = :notifName";
		Notifications notification = (Notifications) sessionFactory.getCurrentSession().createQuery(hql).setParameter("notifName", notificationName).uniqueResult();
		return notification;
	}

}
