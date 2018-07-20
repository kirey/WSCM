package com.kirey.wscm.data.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.Jobs;

/**
 * @author paunovicm
 *
 */


@Repository(value = "jobsDao")
public class JobsDao extends KjcBaseDao {
	
	public JobsDao() {
		log = LogFactory.getLog(JobsDao.class);
		entityClass=Jobs.class;
	}
	
	@Autowired
	private SessionFactory sessionFactory;

	
	/**
	 * Method for getting {@link Jobs} by job name
	 * @param jobName
	 * @return {@link Jobs}
	 */
	@Transactional
	public Jobs findByJobName(String jobName) {
		
		return (Jobs) sessionFactory.getCurrentSession().createQuery("from Jobs s where s.jobName= :jobName")
				.setParameter("jobName", jobName).uniqueResult();
		
	}

	/**
	 * Method for getting {@link List} of {@link Jobs} that have class loading flag set to true
	 * @return {@link List}<{@link Jobs}>
	 */
	public List<Jobs> findAllClassLoading() {
		String hql = "from Jobs j where j.classLoading = true";
		List<Jobs> classLoadingJobs = sessionFactory.getCurrentSession().createQuery(hql).list();
		return classLoadingJobs;
	}

}
