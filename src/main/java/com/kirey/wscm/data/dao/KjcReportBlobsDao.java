package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.wscm.data.entity.KjcReportBlobs;
import com.kirey.wscm.data.entity.KjcReports;

/**
 * Dao object for domain model class KjcReportBlobs.
 * 
 * @author paunovicm
 */
@Repository(value = "kjcReportBlobsDao")
public class KjcReportBlobsDao extends KjcBaseDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	public KjcReportBlobsDao() {
		log = LogFactory.getLog(KjcReportBlobsDao.class);
		entityClass=KjcReportBlobs.class;
	}
	
	/**A method used to get File related to report by report id
	 * @param reportId
	 * @return KjcReportBlobs containing file data
	 */
	@Transactional
	public KjcReportBlobs getBlobFileByReportId(Integer reportId) {
		KjcReports rep = (KjcReports) sessionFactory.getCurrentSession().createCriteria(KjcReports.class)
				.add(Restrictions.eq("id", reportId)).uniqueResult();
		return (KjcReportBlobs) sessionFactory.getCurrentSession().createCriteria(KjcReportBlobs.class)
				.add(Restrictions.eq("report", rep)).uniqueResult();
	}
}
