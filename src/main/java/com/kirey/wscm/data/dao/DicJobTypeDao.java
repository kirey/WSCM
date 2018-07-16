package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.DicJobType;

/**
 * @author paunovicm
 *
 */


@Repository(value = "dicJobTypeDao")
public class DicJobTypeDao extends KjcBaseDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	public DicJobTypeDao() {
		log = LogFactory.getLog(DicJobTypeDao.class);
		entityClass = DicJobType.class;
	}
}
