package com.kirey.kjcore.data.dao;

import static org.hibernate.criterion.Example.create;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.kjcore.data.entity.BatchStepExecutionContext;


/**
 * 
 *Dao object for domain model class BatchStepExecutionContext
 *
 */
@Repository(value = "batchStepExecutionContextDao")
public class BatchStepExecutionContextDao {

	private static final Log log = LogFactory.getLog(BatchStepExecutionContextDao.class);

	@Autowired
	private SessionFactory sessionFactory;
	
	/**A method used for saving batch step execution context into database
	 * @param transientInstance
	 * @throws RuntimeException
	 */
	public void persist(BatchStepExecutionContext transientInstance) {
		log.debug("persisting BatchStepExecutionContext instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	/**A method used to save new or update existing batch step execution context in database
	 * @param instance
	 * @throws RuntimeException
	 */
	public void attachDirty(BatchStepExecutionContext instance) {
		log.debug("attaching dirty BatchStepExecutionContext instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/**A method used to lock batch step execution context in database, meaning it can't be  modified or read from multiple sources simultaneously
	 * @param instance
	 * @throws RuntimeException
	 */
	public void attachClean(BatchStepExecutionContext instance) {
		log.debug("attaching clean BatchStepExecutionContext instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/**A method used to delete batch step execution context from database
	 * @param persistentInstance
	 * @throws RuntimeException
	 */
	public void delete(BatchStepExecutionContext persistentInstance) {
		log.debug("deleting BatchStepExecutionContext instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	/**A method used to update batch step execution context in database
	 * @param detachedInstance
	 * @return BatchStepExecutionContext edited batch step execution context
	 * @throws RuntimeException
	 */
	public BatchStepExecutionContext merge(BatchStepExecutionContext detachedInstance) {
		log.debug("merging BatchStepExecutionContext instance");
		try {
			BatchStepExecutionContext result = (BatchStepExecutionContext) sessionFactory.getCurrentSession()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	/**A method used to extract batch step execution context from database with received id
	 * @param id
	 * @return BatchStepExecutionContext with id received
	 * @throws RuntimeException
	 */
	public BatchStepExecutionContext findById(long id) {
		log.debug("getting BatchStepExecutionContext instance with id: " + id);
		try {
			BatchStepExecutionContext instance = (BatchStepExecutionContext) sessionFactory.getCurrentSession()
					.get(BatchStepExecutionContext.class, id);
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

	/**A method used for extracting all batch step execution contexts with one example added
	 * @param instance
	 * @return List<BatchStepExecutionContext> containing  all batch step execution contexts with one example added
	 * @throws RuntimeException
	 */
	@SuppressWarnings("unchecked")
	public List<BatchStepExecutionContext> findByExample(BatchStepExecutionContext instance) {
		log.debug("finding BatchStepExecutionContext instance by example");
		try {
			List<BatchStepExecutionContext> results = (List<BatchStepExecutionContext>) sessionFactory
					.getCurrentSession().createCriteria(BatchStepExecutionContext.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
}
