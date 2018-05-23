package com.kirey.kjcore.data.compositedao.test;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.dao.TestCacheDaoImpl;
import com.kirey.kjcore.data.entity.KjcErrorLogs;

/**
 * A service containing methods for testing cache
 */
@Service
public class TestCacheService {

	public static final String SPRING_QUALIFIER = "testCacheHome";
	@Autowired
	TestCacheDaoImpl testCacheDao;

	/**A method that extracts all error logs from database
	 * @return List<KjcErrorLogs> containing all error logs
	 */
	@Cacheable(value = "testCache")
	@Transactional
	public List<KjcErrorLogs> getAllErrorLogs() {
		List<KjcErrorLogs> logs = testCacheDao.getAllErrorLogs();
		return logs;
	}

	@CacheEvict(value = "testCache", allEntries = true)
	@Transactional
	public void cacheEvict() {
		
	}

}
