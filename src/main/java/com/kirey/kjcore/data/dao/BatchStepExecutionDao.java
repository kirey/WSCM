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

import com.kirey.kjcore.data.entity.BatchStepExecution;

/**
 *Dao object for domain model class BatchStepExecution
 *
 */
@Repository(value = "batchStepExecutionDao")
public class BatchStepExecutionDao {

	private static final Log log = LogFactory.getLog(BatchStepExecutionDao.class);

	@Autowired
	private SessionFactory sessionFactory;
	
	/**A method used to save batch step execution into database
	 * @param transientInstance
	 * @throws RuntimeException
	 */
	public void persist(BatchStepExecution transientInstance) {
		log.debug("persisting BatchStepExecution instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	/**A method used to save new or update existing batch step execution in database
	 * @param instance
	 * @throws RuntimeException
	 */
	public void attachDirty(BatchStepExecution instance) {
		log.debug("attaching dirty BatchStepExecution instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/**A method used to lock batch step execution in database, meaning it can't be  modified or read from multiple sources simultaneously
	 * @param instance
	 * @throws RuntimeException
	 */
	public void attachClean(BatchStepExecution instance) {
		log.debug("attaching clean BatchStepExecution instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}
	
	/**A method used to delete batch step execution from database
	 * @param persistentInstance
	 * @throws RuntimeException
	 */
	public void delete(BatchStepExecution persistentInstance) {
		log.debug("deleting BatchStepExecution instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	/**A method used to edit batch step execution in database
	 * @param detachedInstance
	 * @return BatchStepExecution edited instance
	 * @throws RuntimeException
	 */
	public BatchStepExecution merge(BatchStepExecution detachedInstance) {
		log.debug("merging BatchStepExecution instance");
		try {
			BatchStepExecution result = (BatchStepExecution) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	/**A method used for extracting batch step execution from database by id 
	 * @param id
	 * @return BatchStepExecution with received id
	 * @throws RuntimeException
	 */
	public BatchStepExecution findById(long id) {
		log.debug("getting BatchStepExecution instance with id: " + id);
		try {
			BatchStepExecution instance = (BatchStepExecution) sessionFactory.getCurrentSession()
					.get(BatchStepExecution.class, id);
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

	/**A method used for extracting all batch step executions with one example added
	 * @param instance
	 * @return List<BatchStepExecution> containing all batch step executions in database with one added
	 * @throws RuntimeException
	 */
	@SuppressWarnings("unchecked")
	public List<BatchStepExecution> findByExample(BatchStepExecution instance) {
		log.debug("finding BatchStepExecution instance by example");
		try {
			List<BatchStepExecution> results = (List<BatchStepExecution>) sessionFactory.getCurrentSession()
					.createCriteria(BatchStepExecution.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	/**A method used to extract all batch step executions from database
	 * @return List<BatchStepExecution> containing all batch step executions from database
	 * @throws RuntimeException
	 */
	@SuppressWarnings("unchecked")
	public List<BatchStepExecution> findAll() {
		log.debug("finding all BatchStepExecution");
		try {
			String hql = "select jobSteps from BatchStepExecution as jobSteps";

			List<BatchStepExecution> results = (List<BatchStepExecution>) sessionFactory.getCurrentSession()
					.createQuery(hql).list();
			return results;
		} catch (RuntimeException re) {
			log.error("finding all BatchStepExecution failed", re);
			throw re;
		}
	}

	/**A method used to find all batch step executions related to a job received as a parameter
	 * @param idBatchJob
	 * @return List<BatchStepExecution> containing all batch step executions related to batch with received id
	 * @throws RuntimeException
	 */
	@SuppressWarnings("unchecked")
	public List<BatchStepExecution> findAllOfJob(Long idBatchJob) {
		log.debug("finding all BatchStepExecution");
		try {
			String hql = "select jobSteps from BatchStepExecution as jobSteps where batchJobExecution.jobExecutionId=:idBatchJob order by jobSteps.startTime";

			List<BatchStepExecution> results = (List<BatchStepExecution>) sessionFactory.getCurrentSession()
					.createQuery(hql).setParameter("idBatchJob", idBatchJob).list();
			return results;
		} catch (RuntimeException re) {
			log.error("finding all BatchStepExecution failed", re);
			throw re;
		}
	}

	/**
	 * A method used to update the last step status execution. Is using sql
	 * query because we don't have relationship between BatchStepExecution and
	 * BatchJobExecution
	 * 
	 * @param lastJobExecutionId
	 *            - the batch job executions
	 * @param newStatus
	 *            - specifies the desired status
	 * @return
	 */
	@Transactional
	public void updateLastStepStatus(BigDecimal lastJobExecutionId, String newStatus) {
		try {
			String sql = "update batch_step_execution set status =:newStatus, last_updated =:last_updated where "
					+ "job_execution_id =:jobId and step_execution_id =(select max(st.step_execution_id) from batch_step_execution st where "
					+ "st.job_execution_id =:jobId)";
			sessionFactory.getCurrentSession().createSQLQuery(sql).setParameter("newStatus", newStatus)
					.setParameter("last_updated", new Date()).setParameter("jobId", lastJobExecutionId).executeUpdate();
		} catch (RuntimeException re) {
			throw re;
		}
	}

}
