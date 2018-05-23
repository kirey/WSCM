package com.kirey.kjcore.data.dao;

import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import com.kirey.kjcore.data.entity.KjcBatchJobErrorParams;

/**
 * Dao object for domain model class KjcBatchJobErrorParams.
 */
@Repository(value = "kjcBatchJobErrorParamsDao")
public class KjcBatchJobErrorParamsDao extends KjcBaseDao{

	public KjcBatchJobErrorParamsDao() {
		log = LogFactory.getLog(KjcBatchJobErrorParamsDao.class);
		entityClass=KjcBatchJobErrorParams.class;
	}

}
