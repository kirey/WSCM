package com.kirey.kjcore.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.entity.KjcTaskSchedulers;

/**
 * Dao object for domain model class KjcTaskSchedulers.
 */

@Repository(value = "kjcTaskSchedulersDao")
public class KjcTaskSchedulersDao extends KjcBaseDao {

	@Autowired
	private SessionFactory sessionFactory;

	public KjcTaskSchedulersDao() {
		log = LogFactory.getLog(KjcTaskSchedulersDao.class);
		entityClass = KjcTaskSchedulers.class;
	}

	/**
	 * A method used to extract scheduler from database by name.
	 * 
	 * @param schedulerName
	 * @return KjcTaskSchedulers with received name
	 */
	@Transactional
	public KjcTaskSchedulers findByName(String schedulerName) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(KjcTaskSchedulers.class)
				.add(Restrictions.eq("name", schedulerName));

		return (KjcTaskSchedulers) criteria.uniqueResult();
	}

	/**
	 * . A method used to find trigger name by scheduler name
	 * 
	 * @param schedulerName
	 *            - indicates the scheduler name
	 * @return String trigger name
	 */
	@Transactional
	public String findTriggerName(String schedulerName) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(KjcTaskSchedulers.class)
				.add(Restrictions.eq("name", schedulerName)).setProjection(Projections.property("triggerName"));

		return (String) criteria.uniqueResult();
	}

	/**
	 * A method used to extract job name by scheduler name.
	 * 
	 * @param schedulerName
	 *            - indicates the scheduler name
	 * @return String job name
	 */
	@Transactional
	public String findJobName(String schedulerName) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(KjcTaskSchedulers.class)
				.add(Restrictions.eq("name", schedulerName)).setProjection(Projections.property("jobName"));

		return (String) criteria.uniqueResult();
	}

	/**
	 * A method used to extract all NON DELETED schedulers from database.
	 * 
	 * @return List<KjcTaskSchedulers> containing all schedulers with flDeleted
	 *         flag= false
	 */
	@SuppressWarnings("unchecked")
	@Transactional(readOnly = true)
	public List<KjcTaskSchedulers> getAllSchedulers() {
		String hql = "from KjcTaskSchedulers where flDeleted!=true";
		return (List<KjcTaskSchedulers>) sessionFactory.getCurrentSession().createQuery(hql).list();
	}

	/**
	 * A method used to get scheduler by job name.
	 * 
	 * @param jobName
	 * @return KjcTaskSchedulers with job name received
	 */
	@Transactional
	public KjcTaskSchedulers findByJobName(String jobName) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(KjcTaskSchedulers.class)
				.add(Restrictions.eq("jobName", jobName));

		return (KjcTaskSchedulers) criteria.uniqueResult();
	}

	/**
	 * This method is used to check if job with name is used by another task.
	 * 
	 * @param jobName
	 *            - indicates the job name
	 * @param schedulerName
	 *            - indicates the scheduler name
	 * 
	 * @return boolean
	 */
	@Transactional
	public boolean isJobUsedByAnotherTask(String jobName, String schedulerName) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(KjcTaskSchedulers.class)
				.add(Restrictions.eq("jobName", jobName)).add(Restrictions.ne("name", schedulerName));

		return criteria.uniqueResult() != null ? true : false;
	}

	/**
	 * A method used to check if trigger with received name is used by another
	 * task.
	 * 
	 * @param triggerName
	 *            - indicates the trigger name
	 * @param schedulerName
	 *            - indicates the scheduler name
	 * @return boolean
	 */
	@Transactional
	public boolean isTriggerUsedByAnotherTask(String triggerName, String schedulerName) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(KjcTaskSchedulers.class)
				.add(Restrictions.eq("triggerName", triggerName)).add(Restrictions.ne("name", schedulerName));

		return criteria.uniqueResult() != null ? true : false;
	}

	/**
	 * A method used to find last execution for tasks.
	 * 
	 * @return List<Object[]> containing last executions for jobs
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Object[]> findLastExecution() {
		String hql = "select s, a from BatchJobInstance a join a.batchJobExecutions b, KjcTaskSchedulers s where s.jobName=a.jobName and s.flDeleted!=true and b.jobExecutionId = "
				+ "(select max(b2.jobExecutionId) from BatchJobInstance a2 join a2.batchJobExecutions b2 where a2.jobName=a.jobName)";
		return (List<Object[]>) sessionFactory.getCurrentSession().createQuery(hql).list();
	}
}
