package com.kirey.kjcore.data.dao;

import java.util.Date;

import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.data.entity.KjcSchedulerTraces;
import com.kirey.kjcore.data.entity.KjcTaskSchedulers;
import com.kirey.kjcore.data.entity.KjcUserAccounts;

/**
* Dao object for domain model class KjcSchedulerTraces.
*/


@Repository(value = "kjcSchedulerTracesDao")
public class KjcSchedulerTracesDao extends KjcBaseDao{
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public KjcSchedulerTracesDao() {
		log = LogFactory.getLog(KjcSchedulerTracesDao.class);
		entityClass=KjcSchedulerTraces.class;
	}

	/**A method used to determine if job is running using scheduler name
	 * @param schedulerName
	 * @return boolean
	 */
	@Transactional
	public boolean isJobRunning(String schedulerName) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(KjcSchedulerTraces.class)
				.createAlias("kjcTaskSchedulers", "kjcTaskSchedulers")
				.add(Restrictions.eq("kjcTaskSchedulers.name", schedulerName)).add(Restrictions.eq("status", AppConstants.JOB_STATUS_STARTED));
		return ((Number) criteria.setProjection(Projections.rowCount()).uniqueResult()).intValue() > 0 ? true : false;
	}
	

	/**A method used to find scheduler traces for running job related to received scheduler
	 * @param kjcTaskSchedulers
	 * @return KjcSchedulerTraces related to running job for scheduler received
	 */
	@Transactional
	public KjcSchedulerTraces findRunningJob(KjcTaskSchedulers kjcTaskSchedulers) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(KjcSchedulerTraces.class)
				.add(Restrictions.eq("kjcTaskSchedulers", kjcTaskSchedulers)).add(Restrictions.eq("status", AppConstants.JOB_STATUS_STARTED));

		return (KjcSchedulerTraces) criteria.uniqueResult();
	}

	/**A method used to find job status determined during last execution
	 * @param kjcTaskSchedulers
	 * @return String status
	 */
	@Transactional
	public String findLastJobExecutionStatus(KjcTaskSchedulers kjcTaskSchedulers) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(KjcSchedulerTraces.class)
				.add(Restrictions.eq("kjcTaskSchedulers", kjcTaskSchedulers)).addOrder(Order.desc("id"))
				.setMaxResults(1).setProjection(Projections.property("status"));

		return (String) criteria.uniqueResult();
	}
	
	/**A method used to find the last trace determined during last execution
	 * @param kjcTaskSchedulers
	 * @return String status
	 */
	@Transactional
	public KjcSchedulerTraces findLastJobTrace(KjcTaskSchedulers kjcTaskSchedulers) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(KjcSchedulerTraces.class)
				.add(Restrictions.eq("kjcTaskSchedulers", kjcTaskSchedulers)).addOrder(Order.desc("id"))
				.setMaxResults(1);

		return (KjcSchedulerTraces) criteria.uniqueResult();
	}
	
	/**
	 * A method used to update the job status
	 * 
	 * @param kjcUserAccounts
	 *            - contains the user that make the update
	 * @param kjcSchedulerTraces
	 *            - specifies the last job trace
	 * @param jobStatus
	 *            - specifies the desired status
	 * @return
	 */
	@Transactional
	public void updateStatus(KjcUserAccounts kjcUserAccounts, KjcSchedulerTraces kjcSchedulerTraces, String jobStatus) {
		try {
			String hql = "update KjcSchedulerTraces scTraces set scTraces.status =:jobStatus, scTraces.utUpdate = :utUpdate, scTraces.tsUpdate = :tsUpdate where "
					+ "scTraces.id = :id";
			sessionFactory.getCurrentSession().createQuery(hql).setParameter("jobStatus", jobStatus)
					.setParameter("utUpdate", kjcUserAccounts.getId()).setParameter("tsUpdate", new Date())
					.setParameter("id", kjcSchedulerTraces.getId()).executeUpdate();
		} catch (RuntimeException re) {
			throw re;
		}
	}
}
