package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.IpAddress;

@Repository(value = "ipAddressDao")
public class IpAddressDao extends KjcBaseDao {

	@Autowired
	private SessionFactory sessionFactory;
	
	public IpAddressDao() {
		log = LogFactory.getLog(IpAddressDao.class);
		entityClass = IpAddress.class;
	}
}
