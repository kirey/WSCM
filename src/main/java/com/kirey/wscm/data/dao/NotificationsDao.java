package com.kirey.wscm.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.DicNotificationType;
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

	
	/**
	 * Method for getting {@link Notifications} by {@link Categories}, {@link DicNotificationType} and max weight
	 * @param category
	 * @param type - type name from {@link DicNotificationType}
	 * @return {@link Notifications}
	 */
	public Notifications findNotificationsByCategoryWeightType(Categories category, String type, Integer weight) {
		String hql;
		Notifications notification;
		if(weight != null) {
			hql = "select nc.notification from NotificationCategories nc where nc.categories.id = :categoryId and nc.notification.dicNotificationType.typeName = :type and nc.weight > :weight";
			notification = (Notifications) sessionFactory.getCurrentSession().createQuery(hql).setParameter("type", type).setParameter("weight", weight).setParameter("categoryId", category.getId()).uniqueResult();
		}else {
			hql = "select nc.notification from NotificationCategories nc where nc.categories.id = :categoryId and nc.notification.dicNotificationType.typeName = :type and nc.weight in (select max(ncc.weight) from NotificationCategories ncc)";
			notification = (Notifications) sessionFactory.getCurrentSession().createQuery(hql).setParameter("type", type).setParameter("categoryId", category.getId()).uniqueResult();
		}
		
		return notification;
	}

}
