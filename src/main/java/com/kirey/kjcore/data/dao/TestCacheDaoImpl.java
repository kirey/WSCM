package com.kirey.kjcore.data.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.kjcore.data.entity.KjcErrorLogs;

/**DAO repository used for Cache testing
 * @author 
 *
 */
@Repository(value="testCacheDao")
public class TestCacheDaoImpl{

	@Autowired
	private SessionFactory sessionFactory;

	/**A method extracting all KjcErrorLogs from database and returning them as a list
	 * @return List<KjcErrorLogs> containing all logs from database
	 */
	@SuppressWarnings("unchecked")
	public List<KjcErrorLogs> getAllErrorLogs() {
		return (List<KjcErrorLogs>) this.sessionFactory.getCurrentSession().createCriteria(KjcErrorLogs.class).list();
	}

	
}
