package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.JobParameters;

/**
 * @author paunovicm
 *
 */

@Repository(value = "jobParametersDao")
public class JobParametersDao extends KjcBaseDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	public JobParametersDao() {
		log = LogFactory.getLog(JobParametersDao.class);
		entityClass = JobParameters.class;
	}
}
