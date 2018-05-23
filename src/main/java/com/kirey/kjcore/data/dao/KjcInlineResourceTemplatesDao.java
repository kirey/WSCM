package com.kirey.kjcore.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.entity.KjcInlineResourceTemplates;

/**
 * Dao object for domain model class KjcInlineResourceTemplates.
 */

@Repository(value = "kjcInlineResourceTemplatesDao")
public class KjcInlineResourceTemplatesDao extends KjcBaseDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	public KjcInlineResourceTemplatesDao() {
		log = LogFactory.getLog(KjcInlineResourceTemplatesDao.class);
		entityClass=KjcInlineResourceTemplates.class;
	}
	

	/**A method used for deleting inline resource template by it's id from database
	 * @param id
	 * @throws RuntimeException
	 */
	@Transactional
	public void deleteById(Integer id) {
		log.debug("deleting KjcInlineResourceTemplates instance");
		try {
			String hql = "delete from KjcInlineResourceTemplates where id = :id";
			sessionFactory.getCurrentSession().createQuery(hql).setParameter("id", id).executeUpdate();
			// sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}
}
