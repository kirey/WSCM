package com.kirey.wscm.api.restcontrollers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.wscm.api.dto.RestResponseDto;
import com.kirey.wscm.data.dao.CategoriesDao;
import com.kirey.wscm.data.dao.IpAddressDao;
import com.kirey.wscm.data.dao.IpAddressLinksDao;
import com.kirey.wscm.data.dao.LinksCategoriesDao;
import com.kirey.wscm.data.dao.LinksDao;
import com.kirey.wscm.data.dao.UserLinksDao;
import com.kirey.wscm.data.dao.WscmUserAccountsDao;
import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.Content;
import com.kirey.wscm.data.entity.IpAddress;
import com.kirey.wscm.data.entity.IpAddressLinks;
import com.kirey.wscm.data.entity.Links;
import com.kirey.wscm.data.entity.LinksCategories;
import com.kirey.wscm.data.entity.UserLinks;
import com.kirey.wscm.data.entity.WscmUserAccounts;
import com.kirey.wscm.security.SecurityUtils;

/**
 * @author paunovicm
 *
 */

@RestController(value = "statisticsController")
@RequestMapping(value = "/rest/statistics")
public class StatisticsController {
	
	@Autowired
	private WscmUserAccountsDao wscmUserAccountsDao;

	@Autowired
	private LinksDao linksDao;
	
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
	 * Method for getting {@link List} of URL with number of request for each URL for given user 
	 * @param id - of {@link WscmUserAccounts}
	 * @return ResponseEntity containing the HashMap with user details and list of URL 
	 */
	@RequestMapping(value = "/link/user/{id}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> linksStatisticsByUser(@PathVariable Integer id) {
		Map<String, Object> response = new HashMap<>();
		
		WscmUserAccounts user = wscmUserAccountsDao.findById(id);
		response.put("username", user.getUsername());
		response.put("name", user.getName());
		
		List<Map<String, Object>> listUrlWithNo = new ArrayList<>();
		
		List<UserLinks> listUserLinks = userLinksDao.findLinksByUser(user); 
		for (UserLinks userLinks : listUserLinks) {
			Map<String, Object> urlNo = new HashMap<>();
			
			
			urlNo.put("link", userLinks.getLink());
			urlNo.put("noOfRequests", userLinks.getNoRequests());
//			List<LinksCategories> linksCategories = linksCategoriesDao.findByLink(userLinks.getLink());

			
			listUrlWithNo.add(urlNo);
		}
		response.put("links", listUrlWithNo);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(response, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * Method for getting {@link List} of URL with number of request for each URL for given ip address 
	 * @param address - ip address
	 * @return ResponseEntity containing the HashMap with list of URL 
	 */
	@RequestMapping(value = "/link/ip", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> linksStatisticsByUser(@RequestParam String address) {
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
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(response, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * Method for getting {@link List} of {@link Categories} to which is accessed by given user 
	 * @param id
	 * @return ResponseEntity containing the HashMap with user details and list of categories with number of request
	 */
	@RequestMapping(value = "/categoryNo/user/{id}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> categoryNoByUser(@PathVariable Integer id) {
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
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(response, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * Method for getting {@link List} of {@link Categories} to which is accessed by given ip address
	 * @param address
	 * @return ResponseEntity containing the HashMap with list of categories with number of request
	 */
	@RequestMapping(value = "/categoryNo/ip", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> categoryNoIpAddress(@RequestParam String address) {

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
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(response, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * Method for getting number of requests for each category 
	 * @return ResponseEntity containing the List of HashMap with list of categories with number of request
	 */
	@RequestMapping(value = "/categoryNo", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> categoryNo() {
//		Map<String, Object> responseMap = new HashMap<>();
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
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(responseList, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * Method for getting {@link List} of URL with number of requests by given category
	 * @param id - of {@link Categories}
	 * @return ResponseEntity containing the HashMap with category details and list of URL with number of request
	 */
	@RequestMapping(value = "/categoryNo/{id}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> categoryNoByCategory(@PathVariable Integer id) {
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
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(response, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
}
