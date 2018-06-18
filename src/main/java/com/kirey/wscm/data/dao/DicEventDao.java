package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.DicEvent;

/**
 * @author paunovicm
 *
 */

@Repository(value = "dicEventDao")
public class DicEventDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public DicEventDao() {
		log = LogFactory.getLog(DicEventDao.class);
		entityClass = DicEvent.class;
	}

}
