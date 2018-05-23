package com.kirey.kjcore.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.entity.KjcTaskParameters;
import com.kirey.kjcore.data.entity.KjcTaskSchedulers;

/**
 * Dao object for domain model class KjcTaskParameters.
 */

@Repository(value = "kjcTaskParametersDao")
public class KjcTaskParametersDao extends KjcBaseDao{
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public KjcTaskParametersDao() {
		log = LogFactory.getLog(KjcTaskParametersDao.class);
		entityClass=KjcTaskParameters.class;
	}

	/**A method used to find task parameters by scheduler
	 * @param kjcTaskSchedulers
	 * @return List<KjcTaskParameters> containing all the parameters related to received scheduler
	 */
	@Transactional
	@SuppressWarnings("unchecked")
	public List<KjcTaskParameters> findByScheduler(KjcTaskSchedulers kjcTaskSchedulers) {

		log.debug("finding KjcTaskParameters instance by scheduler");
		try {
			List<KjcTaskParameters> results = (List<KjcTaskParameters>) sessionFactory.getCurrentSession()
					.createCriteria(KjcTaskParameters.class)
					.add(Restrictions.eq("kjcTaskSchedulers", kjcTaskSchedulers)).list();
			log.debug("find by scheduler successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by scheduler failed", re);
			throw re;
		}
	}

	/**A method used to delete all parameters related to received scheduler
	 * @param schedulerId
	 */
	@Transactional
	public void deleteAllSchedulerParamers(Integer schedulerId) {

		log.debug("deleting KjcTaskParameters instance");
		try {
			String hql = "delete from KjcTaskParameters where kjcTaskSchedulers.id = :schedulerId";
			sessionFactory.getCurrentSession().createQuery(hql).setParameter("schedulerId", schedulerId)
					.executeUpdate();
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}
}
