package com.kirey.kjcore.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.entity.KjcDictionary;

/**
 * Dao object for domain model class KjcDictionary.
 */
@Repository(value = "kjcDictionaryDao")
@Transactional
public class KjcDictionaryDao extends KjcBaseDao{
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public KjcDictionaryDao() {
		log = LogFactory.getLog(KjcDictionaryDao.class);
		entityClass=KjcDictionary.class;
	}

	/**A method used to delete generic name from database by deleting dictionary and translations related to that generic name
	 * @param genericName
	 */
	@Transactional
	public void deleteByGenericName(String genericName) {
		KjcDictionary kjcDictionary = (KjcDictionary) sessionFactory.getCurrentSession()
				.createCriteria(KjcDictionary.class).add(Restrictions.eq("genericName", genericName)).uniqueResult();
		sessionFactory.getCurrentSession().delete(kjcDictionary);
	}

}
