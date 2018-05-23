package com.kirey.kjcore.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.entity.KjcPackages;

/**
 * Dao object for domain model class KjcPackages.
 */
@Repository(value="kjcPackagesDao")
public class KjcPackagesDao extends KjcBaseDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	public KjcPackagesDao() {
		log = LogFactory.getLog(KjcPackagesDao.class);
		entityClass=KjcPackages.class;
	}
	
	/**A method used to find package from database by name
	 * @param name
	 * @return KjcPackages
	 * @throws RuntimeException
	 */
	@Transactional(readOnly=true)
	public KjcPackages findByName(String name) {
		log.debug("getting KjcPackages instance with name: " + name);
		try {
			KjcPackages instance = (KjcPackages) sessionFactory.getCurrentSession().createCriteria(KjcPackages.class).add(Restrictions.eq("name", name)).uniqueResult();
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
}
