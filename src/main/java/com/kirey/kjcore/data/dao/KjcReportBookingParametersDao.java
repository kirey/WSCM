package com.kirey.kjcore.data.dao;

import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import com.kirey.kjcore.data.entity.KjcReportBookingParameters;

/**
 * Dao object for domain model class KjcReportBookingParameters.
 */
@Repository(value = "kjcReportBookingParametersDao")
public class KjcReportBookingParametersDao extends KjcBaseDao{

	public KjcReportBookingParametersDao() {
		log = LogFactory.getLog(KjcReportBookingParametersDao.class);
		entityClass=KjcReportBookingParameters.class;
	}
}
