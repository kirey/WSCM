package com.kirey.wscm.api.restcontrollers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.kirey.wscm.api.dto.RestResponseDto;
import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.data.dao.ContentDao;
import com.kirey.wscm.data.dao.IpAddressDao;
import com.kirey.wscm.data.dao.WscmUserAccountsDao;
import com.kirey.wscm.data.entity.Content;
import com.kirey.wscm.data.entity.IpAddress;
import com.kirey.wscm.data.entity.WscmUserAccounts;
import com.kirey.wscm.data.service.TemplateEngine;

@RestController(value = "testController")
@RequestMapping(value = "/rest/content")
public class TestController {
	

	@Autowired
	private ContentDao contentDao;
	
	
	@Autowired
	private TemplateEngine templateEngine;
	
	@Autowired
	private IpAddressDao IpAddressDao;
	
	@Autowired
	private WscmUserAccountsDao wscmUserAccountsDao;
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test() {

		System.out.println("test");
		
		return "test";
	}
	
	@RequestMapping(value = "/testSecurity", method = RequestMethod.GET)
	public String testSecurity() {

		System.out.println("testSecurity");
		
		return "testSercurituy";
	}
	
	@RequestMapping(value = "/testRole", method = RequestMethod.GET)
	public String testRole() {

		System.out.println("testRole");
		
		return "testRole";
	}
	
	
	@RequestMapping(value = "/html/{page}/{position}", method = RequestMethod.GET)
	public String getHtmlForPosition(@PathVariable String page, @PathVariable String position) {

		String html = contentDao.getHtmlForPosition(page, position);
		
		return html;
	}
	
	@RequestMapping(value = "/css/{page}/{position}", method = RequestMethod.GET)
	public String getCssForPosition(@PathVariable String page, @PathVariable String position) {

		String css = contentDao.getCssForPosition(page, position);
		
		return css;
	}
	
	
	/*-----------------------------------------------------------------*/
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public List<Content> getAll() {

		List<Content> listContent = contentDao.findAll();
		
		return listContent;
	}
	
	@RequestMapping(value = "/{page}/{lang}", method = RequestMethod.GET)
	public List<Content> getByPageLang(@PathVariable String page, @PathVariable String lang) {

		List<Content> listContent = contentDao.findByPageLang(page, lang);
		for (Content content : listContent) {
			String connected = content.getCss() + "\n" + content.getHtml();
			content.setConnected(connected);
		}
		return listContent;
	}
	
	@RequestMapping(value = "/{page}/{position}/{lang}", method = RequestMethod.GET)
	public String getByPagePositionLang(@PathVariable String page, @PathVariable String position, @PathVariable String lang) {

		Content content = contentDao.findByPagePositionLang(page, position, lang);
		StringBuilder sb = new StringBuilder();
		if(content.getCss() != null) {
			sb.append(AppConstants.STYLE_OPEN_TAG);
			sb.append(content.getCss());
			sb.append(AppConstants.STYLE_CLOSE_TAG);
		}
		sb.append(content.getHtml());
		if(content.getScript() != null) {
			sb.append(AppConstants.SCRIPT_OPEN_TAG);
			sb.append(content.getScript());
			sb.append(AppConstants.SCRIPT_CLOSE_TAG);
		}
		content.setConnected(sb.toString());
		return content.getConnected();
	}
	@RequestMapping(value = "/html/{page}/{position}/{lang}", method = RequestMethod.GET)
	public String getHtmlCssByPagePositionLang(@PathVariable String page, @PathVariable String position, @PathVariable String lang) {

		Content content = contentDao.findByPagePositionLang(page, position, lang);
		StringBuilder sb = new StringBuilder();
		if(content.getCss() != null) {
			sb.append(AppConstants.STYLE_OPEN_TAG);
			sb.append(content.getCss());
			sb.append(AppConstants.STYLE_CLOSE_TAG);
		}
		sb.append(content.getHtml());
		
		content.setConnected(sb.toString());
		return content.getConnected();
	}
	
	@RequestMapping(value = "/script/{page}/{position}/{lang}", method = RequestMethod.GET)
	public String getScriptByPagePositionLang(@PathVariable String page, @PathVariable String position, @PathVariable String lang) {

		Content content = contentDao.findByPagePositionLang(page, position, lang);
		StringBuilder sb = new StringBuilder();
//		sb.append(AppConstants.SCRIPT_OPEN_TAG);
		sb.append(content.getScript());
//		sb.append(AppConstants.SCRIPT_CLOSE_TAG);
		
		content.setConnected(sb.toString());
		return content.getConnected();
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> addNewContent(@RequestBody Content content) {

		contentDao.attachDirty(content);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("Successfully added new content", HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> editContent(@RequestBody Content content) {

		contentDao.merge(content);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("Successfully edited content", HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<RestResponseDto> deleteContent(@PathVariable Integer id){
		Content content = contentDao.findById(id);
		contentDao.delete(content);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("Successfully deleted content", HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/test/{page}/{position}/{lang}", method = RequestMethod.GET)
	public String getByPagePositionLangDynamicContent(@PathVariable String page, @PathVariable String position, @PathVariable String lang) {

		
		Content content = contentDao.findByPagePositionLang(page, position, lang);

		List<IpAddress> listAddresses = IpAddressDao.findAll();

		List<List<?>> listContents = new ArrayList<>();
		listContents.add(listAddresses);

		WscmUserAccounts user = wscmUserAccountsDao.findById(1);
		HashMap<String, String>	map = new HashMap<>();
		map.put("hash", "1234marina3212");
		List<Object> contents = new ArrayList<>();
		contents.add(user);
		contents.add(map);
		
		

		Map<String, Object> root = templateEngine.buildContentAsMap(listContents, contents);

		String htmlWithCssAndScript = templateEngine.getProcesedHTMLwithCSSandScript(content.getHtml(), content.getCss(), content.getScript(), root);
		
		return htmlWithCssAndScript;
	}

	
	
}
