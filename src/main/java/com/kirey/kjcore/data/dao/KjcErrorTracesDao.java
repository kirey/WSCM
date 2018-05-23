package com.kirey.kjcore.data.dao;

import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import com.kirey.kjcore.data.entity.KjcErrorTraces;

/**
 * Dao object for domain model class KjcErrorTraces.
 */
@Repository(value = "kjcErrorTracesDao")
public class KjcErrorTracesDao extends KjcBaseDao{

	public KjcErrorTracesDao() {
		log = LogFactory.getLog(KjcErrorTracesDao.class);
		entityClass=KjcErrorTraces.class;
	}
}
