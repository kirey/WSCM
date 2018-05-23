package com.kirey.kjcore.data.dao;

import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import com.kirey.kjcore.data.entity.KjcClassCompiled;

/**
 * Dao object for domain model class KjcClassCompiled.
 */
@Repository(value="kjcClassCompiledDao")
public class KjcClassCompiledDao extends KjcBaseDao{

	public KjcClassCompiledDao() {
		log = LogFactory.getLog(KjcClassCompiledDao.class);
		entityClass=KjcClassCompiled.class;
	}

}
