package com.kirey.wscm.data.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kirey.wscm.data.dao.CategoriesDao;
import com.kirey.wscm.data.dao.IpAddressDao;
import com.kirey.wscm.data.dao.IpAddressLinksDao;
import com.kirey.wscm.data.dao.LinksCategoriesDao;
import com.kirey.wscm.data.dao.UserLinksDao;
import com.kirey.wscm.data.dao.WscmUserAccountsDao;
import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.IpAddress;
import com.kirey.wscm.data.entity.IpAddressLinks;
import com.kirey.wscm.data.entity.Links;
import com.kirey.wscm.data.entity.LinksCategories;
import com.kirey.wscm.data.entity.UserLinks;
import com.kirey.wscm.data.entity.WscmUserAccounts;

/**
 * @author paunovicm
 *
 */

@Service
public class StatisticsService {
	
	@Autowired
	private WscmUserAccountsDao wscmUserAccountsDao;
	
	@Autowired
	private LinksCategoriesDao linksCategoriesDao;
	
	@Autowired
	private UserLinksDao userLinksDao;
	
	@Autowired
	private IpAddressDao ipAddressDao;
	
	@Autowired
	private IpAddressLinksDao ipAddressLinksDao;
	
	@Autowired
	private CategoriesDao categoriesDao;
	

	/**
	 *  Method for getting {@link List} of URL with number of request for each URL for given user 
	 * @param userId - of {@link WscmUserAccounts}
	 * @return 
	 */
	public Map<String, Object> linksStatisticsByUser(Integer userId) {
		Map<String, Object> response = new HashMap<>();
		WscmUserAccounts user = wscmUserAccountsDao.findById(userId);
		response.put("username", user.getUsername());
		response.put("firstName", user.getFirstName());
		response.put("lastName", user.getLastName());
		
		List<Map<String, Object>> listUrlWithNo = new ArrayList<>();
		
		List<UserLinks> listUserLinks = userLinksDao.findLinksByUser(user); 
		for (UserLinks userLinks : listUserLinks) {
			Map<String, Object> urlNo = new HashMap<>();
			Integer n = userLinks.getNoRequests();
			urlNo.put("url", userLinks.getLink().getUrl());
			urlNo.put("number", n);
			listUrlWithNo.add(urlNo);
		}
		response.put("links", listUrlWithNo);
		
		return response;
	}

	/**
	 * Method for getting {@link List} of URL with number of request for each URL for given ip address 
	 * @param address - ip address
	 * @return
	 */
	public Map<String, Object> linksStatisticsByIpAddress(String address) {
		Map<String, Object> response = new HashMap<>();
		IpAddress ipAddress = ipAddressDao.findByAddress(address);
		response.put("ipAddress", ipAddress.getAddress());
		
		List<Map<String, Object>> listLinksNo = new ArrayList<>();
		List<IpAddressLinks> listIpAddressLinks = ipAddressLinksDao.findByIpAddress(ipAddress);
		for (IpAddressLinks ipAddressLinks : listIpAddressLinks) {
			Map<String, Object> linksNo = new HashMap<>();
			linksNo.put("link", ipAddressLinks.getLink());
			linksNo.put("noOfRequests", ipAddressLinks.getNoRequests());
			
			listLinksNo.add(linksNo);
//			List<LinksCategories> linksCategories = linksCategoriesDao.findByLink(ipAddressLinks.getLink());
			
		}
		response.put("links", listLinksNo);
		return response;
	}

	/**
	 * Method for getting {@link List} of {@link Categories} to which is accessed by given user 
	 * @param id
	 * @return
	 */
	public Map<String, Object> categoryNoByUser(Integer id) {
		Map<String, Object> response = new HashMap<>();
		WscmUserAccounts user = wscmUserAccountsDao.findById(id);
		response.put("username", user.getUsername());
		response.put("name", user.getName());
		
		List<Map<String, Object>> listCatNo = new ArrayList<>();
		
		List<UserLinks> listUserLinks = userLinksDao.findLinksByUser(user);
		for (UserLinks userLinks : listUserLinks) {
			List<LinksCategories> linksCategories = linksCategoriesDao.findByLink(userLinks.getLink());
			for (LinksCategories linksCategory : linksCategories) {
				boolean flag = true;
				for (Map<String, Object> map : listCatNo) {
					if(map.get("categoryName").equals(linksCategory.getCategories().getCategoryName())) {
						Integer no = (Integer) map.get("noOfRequests");
						no = no + userLinks.getNoRequests();
						map.put("noOfRequests",  no);
						flag = false;
					}
				}		
				if(flag) {
					Map<String, Object> catNo = new HashMap<>();
					catNo.put("categoryName", linksCategory.getCategories().getCategoryName());
					catNo.put("categoryDescription", linksCategory.getCategories().getDescription());	
					catNo.put("noOfRequests", userLinks.getNoRequests());
					listCatNo.add(catNo);
				}
				
			}
		}
		response.put("categories", listCatNo);
		return response;
	}

	/**
	 * Method for getting {@link List} of {@link Categories} to which is accessed by given ip address
	 * @param address
	 * @return
	 */
	public Map<String, Object> categoryNoByIpAddress(String address) {
		Map<String, Object> response = new HashMap<>();
		IpAddress ipAddress = ipAddressDao.findByAddress(address);
		response.put("ipAddress", ipAddress.getAddress());
		
		List<Map<String, Object>> listCatNo = new ArrayList<>();
		
		List<IpAddressLinks> listIpAddressLinks = ipAddressLinksDao.findByIpAddress(ipAddress);
		for (IpAddressLinks addressLink : listIpAddressLinks) {
			List<LinksCategories> linksCategories = linksCategoriesDao.findByLink(addressLink.getLink());
			for (LinksCategories linksCategory : linksCategories) {
				boolean flag = true;
				for (Map<String, Object> map : listCatNo) {
					if(map.get("categoryName").equals(linksCategory.getCategories().getCategoryName())) {
						Integer no = (Integer) map.get("noOfRequests");
						no = no + addressLink.getNoRequests();
						map.put("noOfRequests",  no);
						flag = false;
					}
				}		
				if(flag) {
					Map<String, Object> catNo = new HashMap<>();
					catNo.put("categoryName", linksCategory.getCategories().getCategoryName());
					catNo.put("categoryDescription", linksCategory.getCategories().getDescription());	
					catNo.put("noOfRequests", addressLink.getNoRequests());
					listCatNo.add(catNo);
				}
				
			}
		}
		response.put("categories", listCatNo);
		return response;
	}

	/**
	 * Method for getting number of requests for each category 
	 * @return
	 */
	public List<HashMap<String, Object>> categoryNo() {
		List<HashMap<String, Object>> responseList = new ArrayList<>();
		List<Categories> listCategories = categoriesDao.findAll();
		for (Categories category : listCategories) {
//			Categories category = categoriesDao.findById(id);
			HashMap<String, Object> response = new HashMap<>();
			response.put("categoryName", category.getCategoryName());
			response.put("categoryDescription", category.getDescription());
			Integer no = 0;
			List<LinksCategories> listLinksCategories = linksCategoriesDao.findByCategory(category);
			for (LinksCategories linksCategory : listLinksCategories) {
				Links link = linksCategory.getLink();
				List<IpAddressLinks> listIpAddressLinks = ipAddressLinksDao.findByLink(link);
				for (IpAddressLinks ipAddressLinks : listIpAddressLinks) {
					no = no + ipAddressLinks.getNoRequests();
				}
			}
			response.put("noOfRequests", no);
			responseList.add(response);
		}
		return responseList;
	}

	/**
	 * Method for getting {@link List} of URL with number of requests by given category
	 * @param id - of {@link Categories}
	 * @return
	 */
	public Map<String, Object> categoryNoByCategory(Integer id) {
		Map<String, Object> response = new HashMap<>();
		Categories category = categoriesDao.findById(id);
		response.put("categoryName", category.getCategoryName());
		response.put("categoryDescription", category.getDescription());
		List<HashMap<String, Object>> linkNoList = new ArrayList<>();
		List<LinksCategories> listLinksCategories = linksCategoriesDao.findByCategory(category);
		for (LinksCategories linksCategory : listLinksCategories) {
			HashMap<String, Object> map = new HashMap<>();
			Integer no = 0;
			Links link = linksCategory.getLink();
			List<IpAddressLinks> listIpAddressLinks = ipAddressLinksDao.findByLink(link);
			for (IpAddressLinks ipAddressLinks : listIpAddressLinks) {
				no = no + ipAddressLinks.getNoRequests();
			}
			map.put("link", link);
			map.put("noOfRequests", no);
			linkNoList.add(map);
		}
		response.put("links", linkNoList);
		return response;
	}

}
