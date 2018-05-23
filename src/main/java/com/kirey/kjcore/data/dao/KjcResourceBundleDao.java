package com.kirey.kjcore.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.entity.KjcResourceBundle;

/**
 * Dao object for domain model class KjcResourceBundle.
 */
@Repository(value = "kjcResourceBundleDao")
public class KjcResourceBundleDao extends KjcBaseDao{
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public KjcResourceBundleDao() {
		log = LogFactory.getLog(KjcResourceBundleDao.class);
		entityClass=KjcResourceBundle.class;
	}

	/**A method used to find language for existing generic name
	 * @param rb
	 * @return KjcResourceBundle that has generic name received
	 */
	@Transactional
	public KjcResourceBundle findByGenericNameLanguage(KjcResourceBundle rb) {
		return (KjcResourceBundle) sessionFactory.getCurrentSession().createCriteria(KjcResourceBundle.class)
				.add(Restrictions.eq("kjcDictionary", rb.getKjcDictionary()))
				.add(Restrictions.eq("language", rb.getLanguage())).uniqueResult();
	}

	/**A method used to extract all distinct languages in database
	 * @return List<String> containing all distinct languages from database
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<String> getDistinctLanguages() {
		List<String> results = sessionFactory.getCurrentSession().createCriteria(KjcResourceBundle.class)
				.setProjection(Projections.distinct(Projections.property("language"))).list();
		return results;
	}
}
