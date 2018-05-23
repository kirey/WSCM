package com.kirey.kjcore.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.data.entity.KjcGenerics;

/**
 * Dao object for domain model class KjcGenerics.
 */
@Repository(value = "kjcGenericsDao")
public class KjcGenericsDao extends KjcBaseDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	public KjcGenericsDao() {
		log = LogFactory.getLog(KjcGenericsDao.class);
		entityClass=KjcGenerics.class;
	}
	
	/**A method used to extract generic by id from database
	 * @param id
	 * @return KjcGenerics 
	 * @throws RuntimeException
	 */
	@Transactional
	public KjcGenerics findById(String id) {
		log.debug("getting KjcGenerics instance with id: " + id);
		try {
			KjcGenerics instance = sessionFactory.getCurrentSession().get(KjcGenerics.class, id);
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

	/**A method used to get all generics in received category from database
	 * @param category
	 * @return List<KjcGenerics> that are related to category with received name
	 * @throws RuntimeException
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<KjcGenerics> findByCategory(String category) {
		log.debug("finding KjcGenerics instance by category");

		try {
			List<KjcGenerics> results = (List<KjcGenerics>) sessionFactory.getCurrentSession()
					.createCriteria(KjcGenerics.class).add(Restrictions.like("key", category + ".", MatchMode.START))
					.list();

			log.debug("finding KjcGenerics instance by category successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by category failed", re);
			throw re;
		}
	}

	/**A method used to find all generics that belong to subcategory
	 * @param category
	 * @param subcategory
	 * @return List<KjcGenerics> that are related to subcategory with received name
	 * @throws RuntimeException
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<KjcGenerics> findBySubcategory(String category, String subcategory) {
		log.debug("finding KjcGenerics instance by category");

		try {
			List<KjcGenerics> results = (List<KjcGenerics>) sessionFactory.getCurrentSession()
					.createCriteria(KjcGenerics.class)
					.add(Restrictions.like("key", category + "." + subcategory, MatchMode.START)).list();

			log.debug("finding KjcGenerics instance by category successful, result size: " + results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by category failed", re);
			throw re;
		}
	}

	/**A method used to delete generics by key
	 * @param key
	 */
	@Transactional
	public void deleteByKey(String key) {
		KjcGenerics kjcGenerics = (KjcGenerics) sessionFactory.getCurrentSession().createCriteria(KjcGenerics.class)
				.add(Restrictions.eq("key", key)).uniqueResult();
		sessionFactory.getCurrentSession().delete(kjcGenerics);
	}
	
	@Transactional
	public KjcGenerics findByKey(String key){
		return (KjcGenerics) sessionFactory.getCurrentSession().createCriteria(KjcGenerics.class).add(Restrictions.eqOrIsNull("key", key)).uniqueResult();
	}

	/**A method used for deleting generics by category
	 * @param category
	 * @throws RuntimeException
	 */
	@Transactional
	 public void deleteByCategory(String category) {
		  log.debug("deleting KjcGenerics instance by category");
		  try {
		   StringBuilder hqlSB = new StringBuilder();
		   hqlSB.setLength(0);
		   hqlSB.append("delete from KjcGenerics where key like '");
		   hqlSB.append(category);
		   hqlSB.append(".%'");
		   sessionFactory.getCurrentSession().createQuery(hqlSB.toString()).executeUpdate();
		   log.debug("delete successful");
		  } catch (RuntimeException re) {
		   log.error("delete failed", re);
		   throw re;
		  }
	}

	/**
	 * This method is used for getting list of frontend generics
	 * @return List<KjcGenerics> of generics
	 */
	@Transactional
	public List<KjcGenerics> findFrontendGenerics() {
		  StringBuilder hqlSB = new StringBuilder();
		  hqlSB.setLength(0);
		  hqlSB.append("from KjcGenerics g where g.key like '");
		  hqlSB.append(AppConstants.GENERICS_CATEGORY_FRONTEND);
		  hqlSB.append(".");
		  hqlSB.append(AppConstants.GENERICS_SUBCATEGORY1_FRONTEND);
		  hqlSB.append("%'");
		  hqlSB.append(" or ");
		  hqlSB.append("g.key like ");
		  hqlSB.append("'");
		  hqlSB.append(AppConstants.GENERICS_CATEGORY_FRONTEND);
		  hqlSB.append(".");
		  hqlSB.append(AppConstants.GENERICS_SUBCATEGORY2_FRONTEND);
		  hqlSB.append("%'");
		  Query query = this.sessionFactory.getCurrentSession().createQuery(hqlSB.toString());
		  return query.list();

	}
}
