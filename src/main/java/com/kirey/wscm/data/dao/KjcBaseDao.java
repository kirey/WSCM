package com.kirey.wscm.data.dao;

import static org.hibernate.criterion.Example.create;

import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;



/**
 * Dao object for any model class. It is used for inheritance of necessary DAO methods
 *
 */
@Transactional
public class KjcBaseDao {

	protected static Log log = LogFactory.getLog(KjcBaseDao.class);
	protected Class<?> entityClass;

	@Autowired
	private SessionFactory sessionFactory;

	/**A method is used to save an object into database
	 * @param transientInstance
	 */
	public void persist(Object transientInstance) {
		sessionFactory.getCurrentSession().persist(transientInstance);
	}

	/**A method is used for saving or updating object in database depending on objects existance in database
	 * @param instance
	 */
	public void attachDirty(Object instance) {
		sessionFactory.getCurrentSession().saveOrUpdate(instance);
	}

	/***A method used to lock object in database, meaning it can't be  modified or read from multiple sources simultaneously
	 * @param instance
	 */
	public void attachClean(Object instance) {
		sessionFactory.getCurrentSession().lock(instance, LockMode.NONE);
	}

	/**A method used to delete object from database
	 * @param persistentInstance
	 */
	public void delete(Object persistentInstance) {
		sessionFactory.getCurrentSession().delete(persistentInstance);
	}

	/**A method used to delete object with certain id from database
	 * @param id
	 */
	public void delete(int id) {
		sessionFactory.getCurrentSession().delete(findById(id));
	}

	/**A method used for updating existing object from database
	 * @param detachedInstance
	 * @return Object updated
	 */
	public <T> Object merge(T detachedInstance) {
		T result = (T) sessionFactory.getCurrentSession().merge(detachedInstance);
		return result;
	}

	/**A method used for extracting object with certain id from database
	 * @param id
	 * @return Object with id received as parameter
	 */
	@Transactional(readOnly = true)
	public <T> T findById(int id) {
		T instance = (T) sessionFactory.getCurrentSession().get(entityClass, id);
		return instance;
	}


	/**A method used or extracting all objects from database
	 * @return List<Object> containing all objects from database
	 */
	@Transactional(readOnly = true)
	public <T> List<T> findAll() {
		CriteriaBuilder builder = sessionFactory.getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<T> query = (CriteriaQuery<T>) builder.createQuery(entityClass);
		Root<T> root = (Root<T>) query.from(entityClass);
		query.select(root);
		Query<T> q = sessionFactory.getCurrentSession().createQuery(query);
//		List<T> results = sessionFactory.getCurrentSession().createCriteria(entityClass).list();
		List<T> results = q.getResultList();
		return results;
	}
}
