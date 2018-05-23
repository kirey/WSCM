package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Repository;

import com.kirey.kjcore.data.dao.KjcBaseDao;
import com.kirey.wscm.data.entity.UserAccounts;

/**
 * Dao object for domain model class UserAccounts.
 */

@Repository(value = "userAccounts")
public class UserAccountsDao extends KjcBaseDao {

	/**
	 * Default constructor.
	 */
	public UserAccountsDao() {
		log = LogFactory.getLog(UserAccountsDao.class);
		entityClass = UserAccounts.class;
	}
}
