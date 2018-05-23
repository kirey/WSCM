package com.kirey.kjcore.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.entity.KjcEmailConfigs;

/**
 * Dao object for domain model class KjcEmailConfigs.
 */
@Repository(value = "kjcEmailConfigsDao")
public class KjcEmailConfigsDao extends KjcBaseDao{
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public KjcEmailConfigsDao() {
		log = LogFactory.getLog(KjcEmailConfigsDao.class);
		entityClass=KjcEmailConfigs.class;
	}

	/**A method used to save new email configuration into database
	 * @param transientInstance
	 * @throws RuntimeException
	 */
	@CacheEvict(value = "emailConfigsCache", allEntries = true)
	@Transactional
	public void persist(KjcEmailConfigs transientInstance) {
		log.debug("persisting KjcEmailConfigs instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	/**A method used to save or update email configuration in database
	 * @param instance
	 * @throws RuntimeException
	 */
	@CacheEvict(value = "emailConfigsCache", allEntries = true)
	@Transactional
	public void attachDirty(KjcEmailConfigs instance) {
		log.debug("attaching dirty KjcEmailConfigs instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}


	/**A method used to delete email configuration from database
	 * @param persistentInstance
	 * @throws RuntimeException
	 */
	@CacheEvict(value = "emailConfigsCache", allEntries = true)
	@Transactional
	public void delete(KjcEmailConfigs persistentInstance) {
		log.debug("deleting KjcEmailConfigs instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	/**A method used to update email configuration in database
	 * @param detachedInstance
	 * @return KjcEmailConfigs representing edited email configuration
	 * @throws RuntimeException
	 */
	@CacheEvict(value = "emailConfigsCache", allEntries = true)
	@Transactional
	public KjcEmailConfigs merge(KjcEmailConfigs detachedInstance) {
		log.debug("merging KjcEmailConfigs instance");
		try {
			KjcEmailConfigs result = (KjcEmailConfigs) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}


	
	/**A method used to find configuration by name
	 * @param emailConfigsName
	 * @return KjcEmailConfigs with received name
	 */
	@Transactional
	public KjcEmailConfigs findByConfigName(String emailConfigsName) {
		KjcEmailConfigs emailConfigs = (KjcEmailConfigs) this.sessionFactory.getCurrentSession()
				.createCriteria(KjcEmailConfigs.class).add(Restrictions.eq("name", emailConfigsName)).uniqueResult();

		return emailConfigs;
	}
}
