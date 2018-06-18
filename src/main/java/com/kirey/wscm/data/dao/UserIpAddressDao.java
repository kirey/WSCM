package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.IpAddress;
import com.kirey.wscm.data.entity.UserIpAddress;
import com.kirey.wscm.data.entity.WscmUserAccounts;

/**
 * @author paunovicm
 *
 */

@Repository(value = "userIpAddressDao")
public class UserIpAddressDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public UserIpAddressDao() {
		log = LogFactory.getLog(UserIpAddressDao.class);
		entityClass = UserIpAddress.class;
	}
	
	/**
	 * Method for getting {@link UserIpAddress} by {@link WscmUserAccounts} and {@link IpAddress}
	 * @param user
	 * @param ipAddress
	 * @return {@link UserIpAddress}
	 */
	public UserIpAddress findByUserAddress(WscmUserAccounts user, IpAddress ipAddress) {
		String hql = "from UserIpAddress uip where uip.userAccount.id = :userId and uip.ipAddress.id = :ipAddrId";
		UserIpAddress userIpAddress = (UserIpAddress) sessionFactory.getCurrentSession().createQuery(hql).setParameter("userId", user != null ? user.getId() : null).setParameter("ipAddrId", ipAddress.getId()).uniqueResult();
		return userIpAddress;
	}

}
