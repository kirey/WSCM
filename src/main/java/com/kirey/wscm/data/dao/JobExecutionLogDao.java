package com.kirey.wscm.data.dao;

import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.wscm.data.entity.JobExecutionLog;


@Repository(value = "jobExecutionLogDao")
public class JobExecutionLogDao extends KjcBaseDao {

	public JobExecutionLogDao() {
		log = LogFactory.getLog(JobExecutionLog.class);
		entityClass = JobExecutionLog.class;
	}

	@Autowired
	private SessionFactory sessionFactory;

	@Transactional
	public List<JobExecutionLog> getLogsByJobId(int idJob) {

		String hql = "from JobExecutionLog sel where sel.job.id = :idJob";

		@SuppressWarnings("unchecked")
		List<JobExecutionLog> lista = sessionFactory.getCurrentSession().createQuery(hql)
				.setParameter("idJob", idJob).list();
		return lista;
	}

	@Transactional
	public JobExecutionLog getLatestLogByJob(String jobName) {

		String hql = "from JobExecutionLog s " + " where s.startTimestamp in ( "
				+ "    select max(b.startTimestamp) " + "    from JobExecutionLog b "
				+ "    where b.jobName= :jobName" + ")";

		return (JobExecutionLog) sessionFactory.getCurrentSession().createQuery(hql)
				.setParameter("jobName", jobName).uniqueResult();
	}

	public JobExecutionLog getLogByName(String nameJob) {

		CriteriaBuilder builder = sessionFactory.getCurrentSession().getCriteriaBuilder();
		CriteriaQuery<JobExecutionLog> query = builder.createQuery(JobExecutionLog.class);

		Root<JobExecutionLog> root = query.from(JobExecutionLog.class);
		query.select(root).where(builder.equal(root.get("jobName"), nameJob));
		JobExecutionLog log = sessionFactory.getCurrentSession().createQuery(query).getSingleResult();

		return log;
	}

}
