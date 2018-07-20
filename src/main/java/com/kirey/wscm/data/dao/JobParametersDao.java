package com.kirey.wscm.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.JobParameters;
import com.kirey.wscm.data.entity.Jobs;

/**
 * @author paunovicm
 *
 */

@Repository(value = "jobParametersDao")
public class JobParametersDao extends KjcBaseDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	public JobParametersDao() {
		log = LogFactory.getLog(JobParametersDao.class);
		entityClass = JobParameters.class;
	}

	/**
	 * Method for finding {@link List} {@link JobParameters} by job id
	 * @param jobId - of {@link Jobs}
	 * @return {@link List}<{@link JobParameters}>
	 */
	public List<JobParameters> findByJob(Integer jobId) {
		String hql = "from JobParameters jp where jp.job.id = :jobId";
		List<JobParameters> listJobParameters = sessionFactory.getCurrentSession().createQuery(hql).setParameter("jobId", jobId).list();
		return listJobParameters;
	}

	/**
	 * Method used for getting {@link JobParameters} by name and job id
	 * @param paramName
	 * @param job
	 * @return {@link JobParameters}
	 */
	public JobParameters findByNameAndJob(String paramName, Jobs job) {
		String hql = "from JobParameters jp where jp.job.id = :jobId and jp.name = :paramName";
		JobParameters param = (JobParameters) sessionFactory.getCurrentSession().createQuery(hql).setParameter("paramName", paramName).setParameter("jobId", job.getId()).uniqueResult();
		return param;
	}
}
