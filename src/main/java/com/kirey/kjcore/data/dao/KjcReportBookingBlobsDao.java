package com.kirey.kjcore.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.entity.KjcReportBookingBlobs;

/**
 * Dao object for domain model class KjcReportBookingBlobs.
 */
@Repository(value = "kjcReportBookingBlobsDao")
public class KjcReportBookingBlobsDao extends KjcBaseDao{

	public KjcReportBookingBlobsDao() {
		log = LogFactory.getLog(KjcReportBookingBlobsDao.class);
		entityClass=KjcReportBookingBlobs.class;
	}
	

}
