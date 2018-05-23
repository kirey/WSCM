package com.kirey.kjcore.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.FetchMode;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Example;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.JoinType;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.entity.KjcBatchJobErrors;

/**
 * Dao object for domain model class KjcBatchJobErrors.
 */
@Repository(value = "kjcBatchJobErrorsDao")
public class KjcBatchJobErrorsDao extends KjcBaseDao {

	@Autowired
	private SessionFactory sessionFactory;

	public KjcBatchJobErrorsDao() {
		log = LogFactory.getLog(KjcBatchJobErrorsDao.class);
		entityClass = KjcBatchJobErrors.class;
	}

	/**
	 * A method used for extracting all errors for batch job by job id.
	 * 
	 * @param jobInstanceId
	 *            - specifies the job instance id from the BATCH_JOB_INSTANCE
	 *            table
	 * @return List<KjcBatchJobErrors> related to the job with received id
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<KjcBatchJobErrors> getErrorDetails(Long jobInstanceId) {
		String hql = "select distinct(errors) from KjcBatchJobErrors errors left join fetch errors.kjcBatchJobErrorParamses params where errors.batchJobId=:jobInstanceId";
		try {
			return (List<KjcBatchJobErrors>) sessionFactory.getCurrentSession().createQuery(hql)
					.setParameter("jobInstanceId", jobInstanceId).list();
		} catch (RuntimeException re) {
			throw re;
		}

	}

}
