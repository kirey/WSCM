package com.kirey.wscm.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.JobCategories;
import com.kirey.wscm.data.entity.Jobs;

/**
 * @author paunovicm
 *
 */

@Repository(value = "jobCategoriesDao")
public class JobCategoriesDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public JobCategoriesDao() {
		log = LogFactory.getLog(JobCategoriesDao.class);
		entityClass = JobCategories.class;
	}

	/**
	 * Method for getting {@link List} of {@link Categories} by {@link Jobs}
	 * @param job
	 * @return {@link List}<{@link Categories}>
	 */
	public List<Categories> findByJob(Jobs job) {
		String hql = "select jc.category from JobCategories jc where jc.job.id = :jobId";
		List<Categories> listCategories = sessionFactory.getCurrentSession().createQuery(hql).setParameter("jobId", job.getId()).list();
		return listCategories;
	}

}
