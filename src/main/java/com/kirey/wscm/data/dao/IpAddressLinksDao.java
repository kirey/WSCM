package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.IpAddress;
import com.kirey.wscm.data.entity.IpAddressLinks;
import com.kirey.wscm.data.entity.Links;

@Repository(value = "ipAddressLinksDao")
public class IpAddressLinksDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public IpAddressLinksDao() {
		log = LogFactory.getLog(IpAddressLinksDao.class);
		entityClass = IpAddressLinks.class;
	}

	public IpAddressLinks findByIpAddressLink(IpAddress ipAddress, Links link) {
		String hql = "from IpAddressLinks ipl where ipl.ipAddress.id = :ipAddrId and ipl.link.id = :linkId";
		IpAddressLinks ipAddressLinks = (IpAddressLinks) sessionFactory.getCurrentSession().createQuery(hql).setParameter("ipAddrId", ipAddress.getId()).setParameter("linkId", link.getId()).uniqueResult();
		return ipAddressLinks;
	}

}
