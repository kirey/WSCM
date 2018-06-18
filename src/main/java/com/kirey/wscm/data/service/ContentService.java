package com.kirey.wscm.data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kirey.wscm.data.dao.IpAddressLinksDao;
import com.kirey.wscm.data.dao.UserIpAddressDao;
import com.kirey.wscm.data.dao.UserLinksDao;
import com.kirey.wscm.data.entity.IpAddress;
import com.kirey.wscm.data.entity.IpAddressLinks;
import com.kirey.wscm.data.entity.Links;
import com.kirey.wscm.data.entity.UserIpAddress;
import com.kirey.wscm.data.entity.UserLinks;
import com.kirey.wscm.data.entity.WscmUserAccounts;

/**
 * @author paunovicm
 *
 */

@Service
public class ContentService {
	
	@Autowired
	private UserIpAddressDao userIpAddressDao;
	
	@Autowired
	private UserLinksDao userLinksDao;
	
	@Autowired
	private IpAddressLinksDao ipAddressLinksDao;

	/**
	 * Method for creating or updating relations between:
	 * <p> - {@link WscmUserAccounts} and {@link IpAddress} (entity: {@link UserIpAddress}) 
	 * <p> - {@link WscmUserAccounts} and {@link Links} (entity: {@link UserLinks})
	 * <p> - {@link IpAddress} and {@link Links} (entity: {@link IpAddressLinks})
	 * @param link
	 * @param ipAddress
	 * @param user
	 */
	public void createOrUpdateRelations(Links link, IpAddress ipAddress, WscmUserAccounts user) {
		if(user != null) {
			UserIpAddress userIpAddress = userIpAddressDao.findByUserAddress(user, ipAddress); 
			if(userIpAddress != null) {
				userIpAddress.setNoRequests(userIpAddress.getNoRequests() + 1);
				userIpAddressDao.merge(userIpAddress);
			}else {
				userIpAddress = new UserIpAddress();
				userIpAddress.setIpAddress(ipAddress);
				userIpAddress.setUserAccount(user);
				userIpAddress.setNoRequests(1);
				userIpAddressDao.attachDirty(userIpAddress);
			}
			
			UserLinks userLinks = userLinksDao.findByUserLink(user, link);
			if(userLinks != null) {
				userLinks.setNoRequests(userLinks.getNoRequests() + 1);
				userLinksDao.merge(userLinks);
			}else {
				userLinks = new UserLinks();
				userLinks.setLink(link);
				userLinks.setUserAccount(user);
				userLinks.setNoRequests(1);
				userLinksDao.attachDirty(userLinks);
			}
		}
		
		IpAddressLinks ipAddressLinks = ipAddressLinksDao.findByIpAddressLink(ipAddress, link); 
		if(ipAddressLinks != null) {
			ipAddressLinks.setNoRequests(ipAddressLinks.getNoRequests() + 1);
			ipAddressLinksDao.merge(ipAddressLinks);
		}else {
			ipAddressLinks = new IpAddressLinks();
			ipAddressLinks.setIpAddress(ipAddress);
			ipAddressLinks.setLink(link);
			ipAddressLinks.setNoRequests(1);
			ipAddressLinksDao.attachDirty(ipAddressLinks);
		}
		
	}

	
}
