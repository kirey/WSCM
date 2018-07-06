package com.kirey.wscm.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.IpAddress;
import com.kirey.wscm.data.entity.IpAddressLinks;
import com.kirey.wscm.data.entity.Links;

/**
 * @author paunovicm
 *
 */

@Repository(value = "ipAddressLinksDao")
public class IpAddressLinksDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public IpAddressLinksDao() {
		log = LogFactory.getLog(IpAddressLinksDao.class);
		entityClass = IpAddressLinks.class;
	}
	
	/**
	 * Method for getting {@link IpAddressLinks} by {@link IpAddress} and {@link Links}
	 * @param ipAddress
	 * @param link
	 * @return {@link IpAddressLinks}
	 */
	public IpAddressLinks findByIpAddressLink(IpAddress ipAddress, Links link) {
		String hql = "from IpAddressLinks ipl where ipl.ipAddress.id = :ipAddrId and ipl.link.id = :linkId";
		IpAddressLinks ipAddressLinks = (IpAddressLinks) sessionFactory.getCurrentSession().createQuery(hql).setParameter("ipAddrId", ipAddress.getId()).setParameter("linkId", link.getId()).uniqueResult();
		return ipAddressLinks;
	}

	public List<IpAddressLinks> findByIpAddress(IpAddress ipAddress) {
		String hql = "from IpAddressLinks ipl where ipl.ipAddress.id = :ipAddrId";
		List<IpAddressLinks> list = sessionFactory.getCurrentSession().createQuery(hql).setParameter("ipAddrId", ipAddress.getId()).list();
		return list;
	}

	public List<IpAddressLinks> findByLink(Links link) {
		String hql = "from IpAddressLinks ipl where ipl.link.id = :linkId";
		List<IpAddressLinks> list = sessionFactory.getCurrentSession().createQuery(hql).setParameter("linkId", link.getId()).list();
		return list;
	}

}
