package com.kirey.wscm.api.restcontrollers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.wscm.api.dto.RestResponseDto;
import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.common.util.Utilities;
import com.kirey.wscm.data.dao.IpAddressLinksDao;
import com.kirey.wscm.data.dao.LinksCategoriesDao;
import com.kirey.wscm.data.dao.LinksDao;
import com.kirey.wscm.data.dao.UserLinksDao;
import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.IpAddress;
import com.kirey.wscm.data.entity.IpAddressCategories;
import com.kirey.wscm.data.entity.IpAddressLinks;
import com.kirey.wscm.data.entity.Links;
import com.kirey.wscm.data.entity.LinksCategories;
import com.kirey.wscm.data.entity.UserLinks;
import com.kirey.wscm.data.entity.WscmUserAccounts;

/**
 * @author paunovicm
 *
 */

@RestController(value = "urlController")
@RequestMapping(value = "/rest/link")
public class UrlController {

	@Autowired
	private LinksDao linksDao;
	
	@Autowired
	private LinksCategoriesDao linksCategoriesDao;
	
	@Autowired
	private UserLinksDao userLinksDao;
	
	@Autowired
	private IpAddressLinksDao ipAddressLinksDao;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllLinks() {
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(linksDao.findAll(), AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getLinkById(@PathVariable Integer id) {
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(linksDao.findById(id), AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> addNewLink(@RequestBody Links link) {
		Links linkByUrl = linksDao.findByUrl(link.getUrl());
		if(linkByUrl != null) {
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "URL already exists"), HttpStatus.BAD_REQUEST);
		}
		
		List<Links> linksFromDb = linksDao.findAll();
		List<String> listMatched = new ArrayList<>();
		List<LinksCategories> linksCategories = new ArrayList<>();
		List<IpAddressLinks> ipAddressLinks = new ArrayList<>();
		List<UserLinks> userLinks = new ArrayList<>();
		boolean flag = false;
		for (Links linkFromDb : linksFromDb) {
			String url = Utilities.searchUrl(link.getUrl(), linkFromDb.getUrl());
			if(url != null) {
				if(url.equals(link.getUrl())) {
					return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "URL already exists"), HttpStatus.BAD_REQUEST);
				}else {
					listMatched.add(url);
					linksCategories.addAll(linkFromDb.getLinksCategorieses());
					ipAddressLinks.addAll(linkFromDb.getIpAddressLinkses());
					userLinks.addAll(linkFromDb.getUserLinkses());
				}
			}else {
				flag = true;
			}
			
		}
		if(flag || listMatched.size() == linksFromDb.size()) {
			linksDao.attachDirty(link);
			//find list of LinksCategories with max weight and by distinct category
			List<LinksCategories> filteredListCategories = Utilities.getDistinctCategoryMaxWeight(linksCategories);
			for (LinksCategories linksCategory : linksCategories) {
				//if there is LinksCategory in filtered list then insert in DB if not delete from DB 
				boolean exist = filteredListCategories.stream().anyMatch(e->e.getId().equals(linksCategory.getId()));
				if(!exist) {
					linksCategoriesDao.delete(linksCategory);
				}else {
					linksCategory.setLink(link);
					linksCategoriesDao.attachDirty(linksCategory);	
				}
				
			}
			for (UserLinks userLink : userLinks) {
				userLink.setLink(link);
				userLink.setNoRequests(0);
				userLinksDao.attachDirty(userLink);
			}
			for (IpAddressLinks ipAddressLink : ipAddressLinks) {
				ipAddressLink.setLink(link);
				ipAddressLink.setNoRequests(0);
				ipAddressLinksDao.attachDirty(ipAddressLink);
			}
		}
		if(!listMatched.isEmpty()) {
			for (String matchedURL : listMatched) {
				linksDao.delete(linksDao.findByUrl(matchedURL));
			}
		}
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), "successfully saved link and updated relations"), HttpStatus.OK);
	}

	
	
}
