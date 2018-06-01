package com.kirey.kjcore.data.dao;

import static org.hibernate.criterion.Example.create;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.kjcore.data.entity.BatchJobExecutionContext;

/**
 * Dao object for domain model class BatchJobExecutionContextDao
 *
 */
@Repository(value = "batchJobExecutionContextDao")
public class BatchJobExecutionContextDao {

	private static final Log log = LogFactory.getLog(BatchJobExecutionContextDao.class);

	@Autowired
	private SessionFactory sessionFactory;

	/**A method used for saving batch job execution context into database
	 * @param transientInstance
	 * @throws RuntimeException
	 */
	public void persist(BatchJobExecutionContext transientInstance) {
		log.debug("persisting BatchJobExecutionContext instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	/**A method used to save new or update existing batch job execution context in database
	 * @param instance
	 * @throws RuntimeException
	 */
	public void attachDirty(BatchJobExecutionContext instance) {
		log.debug("attaching dirty BatchJobExecutionContext instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/**A method used to lock batch job execution context in database, meaning it can't be  modified or read from multiple sources simultaneously
	 * @param instance
	 * @throws RuntimeException
	 */
	public void attachClean(BatchJobExecutionContext instance) {
		log.debug("attaching clean BatchJobExecutionContext instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/**A method used to delete batch job execution context from database
	 * @param persistentInstance
	 * @throws RuntimeException
	 */
	public void delete(BatchJobExecutionContext persistentInstance) {
		log.debug("deleting BatchJobExecutionContext instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}
	
	/**A method used to update batch job execution context in database
	 * @param detachedInstance
	 * @return BatchJobExecutionContext edited batch job execution context
	 * @throws RuntimeException
	 */
	public BatchJobExecutionContext merge(BatchJobExecutionContext detachedInstance) {
		log.debug("merging BatchJobExecutionContext instance");
		try {
			BatchJobExecutionContext result = (BatchJobExecutionContext) sessionFactory.getCurrentSession()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	/**A method used to extract batch job execution context from database by received id 
	 * @param id
	 * @return BatchJobExecutionContext with id received
	 * @throws RuntimeException
	 */
	public BatchJobExecutionContext findById(long id) {
		log.debug("getting BatchJobExecutionContext instance with id: " + id);
		try {
			BatchJobExecutionContext instance = (BatchJobExecutionContext) sessionFactory.getCurrentSession()
					.get(BatchJobExecutionContext.class, id);
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

	/**A method used for extracting all batch job execution contexts with one example added
	 * @param instance
	 * @return List<BatchJobExecutionContext> containing  all batch job execution contexts with one example added
	 * @throws RuntimeException
	 */
	@SuppressWarnings("unchecked")
	public List<BatchJobExecutionContext> findByExample(BatchJobExecutionContext instance) {
		log.debug("finding BatchJobExecutionContext instance by example");
		try {
			List<BatchJobExecutionContext> results = (List<BatchJobExecutionContext>) sessionFactory.getCurrentSession()
					.createCriteria(BatchJobExecutionContext.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
}