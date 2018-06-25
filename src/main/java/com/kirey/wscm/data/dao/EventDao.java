package com.kirey.wscm.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.Event;

/**
 * @author paunovicm
 *
 */

@Repository(value = "eventDao")
public class EventDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public EventDao() {
		log = LogFactory.getLog(EventDao.class);
		entityClass = Event.class;
	}

	/**
	 * Method for getting {@link List} of {@link Event} by event type
	 * @param eventType
	 * @return {@link List}<{@link Event}>
	 */
	public List<Event> findByType(String eventType) {
		String hql = "from Event ev where ev.eventType = :eventType";
		List<Event> listEvents = sessionFactory.getCurrentSession().createQuery(hql).setParameter("eventType", eventType).list();
		return listEvents;
	}

	public List<Event> findByTypeAndDefinition(String eventType, String definition) {
		String hql = "from Event ev where ev.eventType = :eventType and ev.definition = :definition";
		List<Event> listEvents = sessionFactory.getCurrentSession().createQuery(hql).setParameter("eventType", eventType).setParameter("definition", definition).list();
		return listEvents;
	}

}
