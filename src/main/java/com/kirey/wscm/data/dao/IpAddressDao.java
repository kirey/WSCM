package com.kirey.wscm.data.dao;

import java.util.List;

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

	
	public List<IpAddress> findByUser(int userId) {
		String hql = "select uip.ipAddress from UserIpAddress uip where uip.userAccount.id = :userId";
		List<IpAddress> listIp = sessionFactory.getCurrentSession().createQuery(hql).setParameter("userId", userId).list();
		return listIp;
	}


	public IpAddress findByAddress(String address) {
		String hql = "from IpAddress ip where ip.address = :address";
		IpAddress ipAddress = (IpAddress) sessionFactory.getCurrentSession().createQuery(hql).setParameter("address", address).uniqueResult();
		return ipAddress;
	}
}
