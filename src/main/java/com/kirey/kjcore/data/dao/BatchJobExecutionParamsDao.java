package com.kirey.kjcore.data.dao;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.kjcore.data.entity.BatchJobExecutionParams;

/**
 * Dao object for domain model class BatchJobExecutionParams
 *
 */
@Repository(value = "batchJobExecutionParamsDao")
public class BatchJobExecutionParamsDao {

	private static final Log log = LogFactory.getLog(BatchJobExecutionParamsDao.class);

	@Autowired
	private SessionFactory sessionFactory;
	
	/**A method used to save batch job execution params into database
	 * @param transientInstance
	 * @throws RuntimeException
	 */
	public void persist(BatchJobExecutionParams transientInstance) {
		log.debug("persisting BatchJobExecutionParams instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	/**A method used to save new or update existing batch job execution param in database
	 * @param instance
	 * @throws RuntimeException
	 */
	public void attachDirty(BatchJobExecutionParams instance) {
		log.debug("attaching dirty BatchJobExecutionParams instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/**A method used to lock batch job execution param in database, meaning it can't be  modified or read from multiple sources simultaneously
	 * @param instance
	 * @throws RuntimeException
	 */
	public void attachClean(BatchJobExecutionParams instance) {
		log.debug("attaching clean BatchJobExecutionParams instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/**A method used to delete batch job execution param from database
	 * @param persistentInstance
	 * @throws RuntimeException
	 */
	public void delete(BatchJobExecutionParams persistentInstance) {
		log.debug("deleting BatchJobExecutionParams instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	/**A method used to edit batch job execution param in database
	 * @param detachedInstance
	 * @return BatchJobExecutionParams edited instance
	 * @throws RuntimeException
	 */
	public BatchJobExecutionParams merge(BatchJobExecutionParams detachedInstance) {
		log.debug("merging BatchJobExecutionParams instance");
		try {
			BatchJobExecutionParams result = (BatchJobExecutionParams) sessionFactory.getCurrentSession()
					.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

}
