package com.kirey.kjcore.data.dao;

import static org.hibernate.criterion.Example.create;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.entity.BatchJobInstance;

/**
 * Dao object for domain model class BatchJobInstance.
 *
 */
@Repository(value = "batchJobInstanceDao")
public class BatchJobInstanceDao {

	private static final Log log = LogFactory.getLog(BatchJobInstanceDao.class);

	@Autowired
	private SessionFactory sessionFactory;

	/**
	 * A method used to save batch job instance into database.
	 * 
	 * @param transientInstance
	 *            - specifies the Batch Job Instance
	 * @throws RuntimeException
	 */
	public void persist(BatchJobInstance transientInstance) {
		log.debug("persisting BatchJobInstance instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	/**
	 * A method used to save new or update existing batch job instance in
	 * database.
	 * 
	 * @param instance
	 *            - specifies the Batch Job Instance
	 * @throws RuntimeException
	 */
	public void attachDirty(BatchJobInstance instance) {
		log.debug("attaching dirty BatchJobInstance instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/**
	 * A method used to lock batch job instance in database, meaning it can't be
	 * modified or read from multiple sources simultaneously.
	 * 
	 * @param instance
	 *            - specifies the Batch Job Instance
	 * @throws RuntimeException
	 */
	public void attachClean(BatchJobInstance instance) {
		log.debug("attaching clean BatchJobInstance instance");
		try {
			sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/**
	 * A method used to delete batch job instance from database.
	 * 
	 * @param persistentInstance
	 *            - specifies the Batch Job Instance
	 * @throws RuntimeException
	 */
	public void delete(BatchJobInstance persistentInstance) {
		log.debug("deleting BatchJobInstance instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	/**
	 * A method used to edit batch job instance in database.
	 * 
	 * @param detachedInstance
	 *            - specifies the Batch Job Instance
	 * @return BatchJobInstance edited instance
	 * @throws RuntimeException
	 */
	public BatchJobInstance merge(BatchJobInstance detachedInstance) {
		log.debug("merging BatchJobInstance instance");
		try {
			BatchJobInstance result = (BatchJobInstance) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	/**
	 * A method used for extracting batch job instance from database by id.
	 * 
	 * @param id
	 *            - specifies the Batch Job Instance id
	 * @return BatchJobInstance with received id
	 * @throws RuntimeException
	 */
	public BatchJobInstance findById(long id) {
		log.debug("getting BatchJobInstance instance with id: " + id);
		try {
			BatchJobInstance instance = (BatchJobInstance) sessionFactory.getCurrentSession()
					.get(BatchJobInstance.class, id);
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

	/**
	 * A method used for extracting all batch job instances with one example
	 * added.
	 * 
	 * @param instance
	 *            - specifies the Batch Job Instance
	 * @return List<BatchJobInstance> containing all batch job instances in
	 *         database with one added
	 * @throws RuntimeException
	 */
	@SuppressWarnings("unchecked")
	public List<BatchJobInstance> findByExample(BatchJobInstance instance) {
		log.debug("finding BatchJobInstance instance by example");
		try {
			List<BatchJobInstance> results = (List<BatchJobInstance>) sessionFactory.getCurrentSession()
					.createCriteria(BatchJobInstance.class).add(create(instance)).list();
			log.debug("find by example successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	/**
	 * A method used to get all job details related to a job with received name
	 * from date to date.
	 * 
	 * @param jobName
	 *            - indicates the job name
	 * @param startDate
	 *            - indicates the start date from the desired interval
	 * @param endDate
	 *            - indicates the end date from the desired interval
	 *            
	 * @return List<Object[]> containing all job details fitting the filters
	 * @throws RuntimeException
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Object[]> getJobDetails(String jobName, String startDate, String endDate) {
		Date endDateFormatted = new Date();
		Date startDateFormatted = new Date();
		Calendar c = Calendar.getInstance();

		SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
		try {
			startDateFormatted = format.parse(startDate);
			c.setTime(format.parse(startDate));
			c.set(Calendar.HOUR_OF_DAY, 0);
			c.set(Calendar.MINUTE, 0);
			c.set(Calendar.SECOND, 0);
			startDateFormatted = c.getTime();

			endDateFormatted = format.parse(endDate);
			c.setTime(format.parse(endDate));
			c.set(Calendar.HOUR_OF_DAY, 23);
			c.set(Calendar.MINUTE, 59);
			c.set(Calendar.SECOND, 0);
			endDateFormatted = c.getTime();
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
		String hql = "from BatchJobInstance as a left join a.batchJobExecutions as b left join fetch b.batchStepExecutions as c where a.jobName=:jobName and b.startTime between :startDate and :endDate order by b.startTime desc";
		return (List<Object[]>) sessionFactory.getCurrentSession().createQuery(hql).setParameter("jobName", jobName)
				.setParameter("startDate", startDateFormatted).setParameter("endDate", endDateFormatted).list();

	}

}
