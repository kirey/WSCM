package com.kirey.kjcore.data.dao;

import static org.hibernate.criterion.Example.create;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.entity.BatchJobExecution;

/**
 * Dao object for domain model class BatchJobExecution
 *
 */
@Repository(value = "batchJobExecutionDao")
public class BatchJobExecutionDao {

	private static final Log log = LogFactory.getLog(BatchJobExecutionDao.class);

	@Autowired
	private SessionFactory sessionFactory;
	
	/**A method used to save batch job execution into database
	 * @param transientInstance
	 * @throws RuntimeException
	 */
	public void persist(BatchJobExecution transientInstance) {
		log.debug("persisting BatchJobExecution instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	/**A method used to save new or update existing batch job execution in database
	 * @param instance
	 * @throws RuntimeException
	 */
	public void attachDirty(BatchJobExecution instance) {
		log.debug("attaching dirty BatchJobExecution instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/**A method used to lock batch job execution in database, meaning it can't be  modified or read from multiple sources simultaneously
	 * @param instance
	 * @throws RuntimeException
	 */
	public void attachClean(BatchJobExecution instance) {
		log.debug("attaching clean BatchJobExecution instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}
	
	/**A method used to delete batch job execution from database
	 * @param persistentInstance
	 * @throws RuntimeException
	 */
	public void delete(BatchJobExecution persistentInstance) {
		log.debug("deleting BatchJobExecution instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}
	
	/**A method used to edit batch job execution in database
	 * @param detachedInstance
	 * @return BatchJobExecution edited instance
	 * @throws RuntimeException
	 */
	public BatchJobExecution merge(BatchJobExecution detachedInstance) {
		log.debug("merging BatchJobExecution instance");
		try {
			BatchJobExecution result = (BatchJobExecution) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}
	
	/**A method used to extract batch job execution instance from database by id
	 * @param id
	 * @return BatchJobExecution with id received
	 * @throws RuntimeException
	 */
	public BatchJobExecution findById(long id) {
		log.debug("getting BatchJobExecution instance with id: " + id);
		try {
			BatchJobExecution instance = (BatchJobExecution) sessionFactory.getCurrentSession()
					.get(BatchJobExecution.class, id);
			if (instance == null) {
				log.debug("get successful, no instance found");
			} else {
				log.debug("get successful, instance found");
			}
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	/**A method used for extracting all batch job executions with one example added
	 * @param instance
	 * @return List<BatchJobExecution> containing  all batch job executions with one example added
	 * @throws RuntimeException
	 */
	@SuppressWarnings("unchecked")
	public List<BatchJobExecution> findByExample(BatchJobExecution instance) {
		log.debug("finding BatchJobExecution instance by example");
		try {
			List<BatchJobExecution> results = (List<BatchJobExecution>) sessionFactory.getCurrentSession()
					.createCriteria(BatchJobExecution.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	/**A method used for extracting all batch job executions from  database
	 * @return List<BatchJobExecution> containing  all batch job executions from database
	 * @throws RuntimeException
	 */
	@SuppressWarnings("unchecked")
	public List<BatchJobExecution> findAll() {
		log.debug("finding all BatchJobExecution");
		try {
			String hql = "select distinct (batchJobExe) from BatchJobExecution as batchJobExe";
			List<BatchJobExecution> results = (List<BatchJobExecution>) sessionFactory.getCurrentSession()
					.createQuery(hql).list();
			return results;
		} catch (RuntimeException re) {
			log.error("finding all BatchJobExecution failed", re);
			throw re;
		}
	}

	/**
	 * A method used for extracting the latest batch job executions from
	 * database
	 * 
	 * @param schedulerName
	 *            - desired scheduler
	 * @return BatchJobExecution containing the batch job executions from
	 *         database
	 * @throws RuntimeException
	 */
	@Transactional
	public BigDecimal findLastJobExecutionId(String jobName) {
		log.debug("finding all BatchJobExecution");
		try {
			String sql = "select batchJobExe.job_execution_id from batch_job_execution batchJobExe where "
					+ "batchJobExe.job_instance_id = (select max(jobExe.job_instance_id) from batch_job_instance jobExe where "
					+ "jobExe.job_name=:jobName)";
			BigDecimal result = (BigDecimal) sessionFactory.getCurrentSession()
					.createSQLQuery(sql).setParameter("jobName", jobName).uniqueResult();
			return result;
		} catch (RuntimeException re) {
			log.error("finding all BatchJobExecution failed", re);
			throw re;
		}
	}

	/**
	 * A method used to update the job status
	 * 
	 * @param lastJobExecutionId
	 *            - the batch job executions 
	 * @param jobStatus
	 *            - specifies the desired status
	 * @return
	 */
	@Transactional
	public void updateStatus(BigDecimal lastJobExecutionId, String jobStatus) {
		try {
			String hql = "update BatchJobExecution batchJobExe set batchJobExe.status =:jobStatus, batchJobExe.lastUpdated = :lastUpdated where "
					+ "batchJobExe.jobExecutionId = :id";
			sessionFactory.getCurrentSession().createQuery(hql).setParameter("jobStatus", jobStatus)
					.setParameter("lastUpdated", new Date()).setParameter("id", lastJobExecutionId.longValue())
					.executeUpdate();
		} catch (RuntimeException re) {
			throw re;
		}
	}

}
