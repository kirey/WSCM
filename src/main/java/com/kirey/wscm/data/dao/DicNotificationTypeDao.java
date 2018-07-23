package com.kirey.wscm.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.DicNotificationType;
import com.kirey.wscm.data.entity.Notifications;

@Repository(value = "dicNotificationTypeDao")
public class DicNotificationTypeDao extends KjcBaseDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	public DicNotificationTypeDao() {
		log = LogFactory.getLog(NotificationsDao.class);
		entityClass = Notifications.class;
	}
	
	public DicNotificationType findTypeByName(String typeName) {
		
		String hql = "from DicNotificationType notifType where notifType.typeName = :typeName";
		DicNotificationType dicNotificationType = (DicNotificationType) sessionFactory.getCurrentSession().createQuery(hql).setParameter("typeName", typeName).uniqueResult();
		return dicNotificationType;
	}
	
}
