package com.kirey.wscm.api.restcontrollers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.wscm.api.dto.RestResponseDto;
import com.kirey.wscm.common.util.Utilities;
import com.kirey.wscm.data.dao.IpAddressDao;
import com.kirey.wscm.data.dao.LinksDao;
import com.kirey.wscm.data.entity.IpAddress;
import com.kirey.wscm.data.entity.Links;
import com.kirey.wscm.data.entity.WscmUserAccounts;
import com.kirey.wscm.data.service.ContentService;
import com.kirey.wscm.security.SecurityUtils;

/**
 * @author paunovicm
 *
 */

@RestController(value = "contentManagementController")
@RequestMapping(value = "/rest")
public class ContentManagementController {
	
	@Autowired
	private LinksDao linksDao;
	
	@Autowired
	private IpAddressDao ipAddressDao;
	

	
	@Autowired
	private ContentService contentService;
	
	/**
	 * Method for saving links, ip addresses and for creating relations between User, Links and IpAddress  
	 * @param url 
	 * @param request
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/link/intercept", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> saveLink(@RequestParam String url, HttpServletRequest request) {
		Links linkByUrl = linksDao.findByUrl(url);
		if(linkByUrl != null) {
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "URL already exists"), HttpStatus.BAD_REQUEST);
		}
		List<Links> linksFromDb = linksDao.findAll();
		boolean flag = false;
		for (Links linkFromDb : linksFromDb) {
			String foundUrl = Utilities.searchUrl(url, linkFromDb.getUrl());
			if(foundUrl != null) {
				if(foundUrl.equals(url)) {
					return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "URL already exists"), HttpStatus.BAD_REQUEST);
				}
			}else {
				flag = true;
			}
		}
		
		if (flag) {
			linkByUrl = new Links();
			linkByUrl.setUrl(url);
			linksDao.attachDirty(linkByUrl);
			
		}

		String address = request.getRemoteAddr();
		IpAddress ipAddress = ipAddressDao.findByAddress(address);
		if(ipAddress == null) {
			ipAddress = new IpAddress();
			ipAddress.setAddress(address);
			ipAddressDao.attachDirty(ipAddress);
		}

		WscmUserAccounts user = SecurityUtils.getUserFromContext();
		
		contentService.createOrUpdateRelations(linkByUrl, ipAddress, user);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), "successfully saved link and updated relations"), HttpStatus.OK);
	}

}
