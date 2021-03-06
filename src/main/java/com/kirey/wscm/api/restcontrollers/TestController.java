package com.kirey.wscm.api.restcontrollers;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.ContentSecurityPolicyConfig;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.WebSocketSession;

import com.kirey.wscm.api.dto.RestResponseDto;
import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.data.dao.CategoriesDao;
import com.kirey.wscm.data.dao.ContentCategoriesDao;
import com.kirey.wscm.data.dao.ContentDao;
import com.kirey.wscm.data.dao.IpAddressDao;
import com.kirey.wscm.data.dao.NotificationsDao;
import com.kirey.wscm.data.dao.WscmUserAccountsDao;
import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.Content;
import com.kirey.wscm.data.entity.IpAddress;
import com.kirey.wscm.data.entity.Notifications;
import com.kirey.wscm.data.entity.WscmUserAccounts;
import com.kirey.wscm.data.service.ContentService;
import com.kirey.wscm.data.service.TemplateEngine;
import com.kirey.wscm.email.MailService;
import com.kirey.wscm.security.SecurityUtils;
import com.kirey.wscm.websocket.WebSocketHandler;

/**
 * @author paunovicm
 *
 */

@RestController(value = "testController")
@RequestMapping(value = "/rest/content")
public class TestController {
	

	@Autowired
	private ContentDao contentDao;
	
	
	@Autowired
	private TemplateEngine templateEngine;
	
	@Autowired
	private IpAddressDao ipAddressDao;
	
	@Autowired
	private CategoriesDao categoriesDao;
	
	@Autowired
	private WscmUserAccountsDao wscmUserAccountsDao;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
    private WebSocketHandler webSocketHandler;
	
	@Autowired
	private NotificationsDao notificationsDao;
	
	@Autowired
	private ContentService contentService;
	
	@Autowired
	private ContentCategoriesDao contentCategoriesDao;
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test(@RequestParam String name) {
		System.out.println(name);
		List<IpAddress> listIp = ipAddressDao.findByUser(1);
		String ipAddress = "192.168.60.21";
		List<Categories> listCategories = categoriesDao.findCategoriesByIp(ipAddress); 
		List<Content> listContents = contentDao.findContentByCategory(1);
		
		WscmUserAccounts user = SecurityUtils.getUserFromContext();

		System.out.println("test");
		
		return "test";
	}
	
	@RequestMapping(value = "/testSecurity", method = RequestMethod.GET)
	public String testSecurity() {

		System.out.println("testSecurity");
		
		return "testSercurituy";
	}
	
	@RequestMapping(value = "/testEmail", method = RequestMethod.GET)
	public String testRole(@RequestParam String type) {

		System.out.println(type);
		
		return type;
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
	
	@RequestMapping(value = "/pages", method = RequestMethod.GET)
	public List<String> getAllPages() {

		List<String> listPages = contentDao.getAllDistinctPages();
		
		return listPages;
	}
	
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
	
	@RequestMapping(value = "/{page}", method = RequestMethod.GET)
	public List<Content> getByPageLang(@PathVariable String page) {

		List<Content> listContent = contentDao.findByPage(page);
		
		return listContent;
	}
	
	@RequestMapping(value = "/{page}/{position}/{lang}", method = RequestMethod.GET)
	public String getByPagePositionLang(@PathVariable String page, @PathVariable String position, @PathVariable String lang) {
		
		WscmUserAccounts user = SecurityUtils.getUserFromContext();
		Content content = new Content();
		if(user != null) {
			content = contentService.getContentByUserPagePositionLang(user, page, position, lang);
		}else {
			content = contentCategoriesDao.findContentByUniversalMaxWeightPagePositionLang(page, position, lang);
		}
		
		if(content != null) {
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
		} else {
			return null;
		}
		
	}
	
	/*
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
	}*/
	
	/*
	@RequestMapping(value = "/script/{page}/{position}/{lang}", method = RequestMethod.GET)
	public String getScriptByPagePositionLang(@PathVariable String page, @PathVariable String position, @PathVariable String lang) {

		Content content = contentDao.findByPagePositionLang(page, position, lang);
		StringBuilder sb = new StringBuilder();
//		sb.append(AppConstants.SCRIPT_OPEN_TAG);
		sb.append(content.getScript());
//		sb.append(AppConstants.SCRIPT_CLOSE_TAG);
		
		content.setConnected(sb.toString());
		return content.getConnected();
	}*/
	
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
	
	/*
	@RequestMapping(value = "/test/{page}/{position}/{lang}", method = RequestMethod.GET)
	public String getByPagePositionLangDynamicContent(@PathVariable String page, @PathVariable String position, @PathVariable String lang) {

		
		Content content = contentDao.findByPagePositionLang(page, position, lang);

		List<IpAddress> listAddresses = ipAddressDao.findAll();

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
*/
	@RequestMapping(value = "/email", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> sendEmail() throws Exception {
		List<IpAddress> listAddresses = ipAddressDao.findAll();
		WscmUserAccounts user = wscmUserAccountsDao.findById(1);
		Map<String, Object> templateModel = new HashMap<>();
		templateModel.put("korisnik", "milos");
		templateModel.put("ipAddress", listAddresses.get(0));
		templateModel.put("user", user);
		
		File file = new File("c:\\image009.jpg");
		InputStream is = new FileInputStream(file);
		byte[] b = IOUtils.toByteArray(is);
		
		Map<String, byte[]> attachmentFiles = new HashMap<>();
		attachmentFiles.put("attachment.jpg", b);
		
		mailService.sendDefaultEmail("test", "m.paunovic@dyntechdoo.com", "test", templateModel, attachmentFiles);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("Mail sent!", HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/socket", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> socketTest() throws Exception {
		
		
		Notifications notification = notificationsDao.findNotificationByName("testSocket");
		String templateString = notification.getNotificationTemplate(); 
		Map<String, Object> templateModel = new HashMap<>();
		List<IpAddress> listAddresses = ipAddressDao.findAll();
		WscmUserAccounts user = wscmUserAccountsDao.findById(1);
		File file = new File("c:\\image009.jpg");
		InputStream is = new FileInputStream(file);
		byte[] b = IOUtils.toByteArray(is);
		byte[] encoded = Base64.getEncoder().encode(b);
		templateModel.put("korisnik", "milos");
		templateModel.put("ipAddress", listAddresses.get(0));
		templateModel.put("user", user);
		templateModel.put("slika", new String(encoded));
		String notificationContent = templateEngine.processTemplateContent(templateModel, templateString);
		
		
		
		
		
		List<WscmUserAccounts> usersByCategory = wscmUserAccountsDao.findUsersByCategory("insurance");
		
		for(WebSocketSession activeSession : webSocketHandler.getAllSessions()) {
			for (WscmUserAccounts wscmUserAccounts : usersByCategory) {
				if(activeSession.getId().equals(wscmUserAccounts.getSocketSessionId())) {
					boolean exist = webSocketHandler.getFilteredSessions().stream().anyMatch(e -> e.getId().equals(activeSession.getId()));
					if(!exist) {
						webSocketHandler.getFilteredSessions().add(activeSession);	
					}
				}
			}
		}
		
		webSocketHandler.sendNotificationToFilteredUsers(notificationContent);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("Mail sent!", HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/notifications", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllNotifications() {
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(notificationsDao.findAll(), HttpStatus.OK.value()), HttpStatus.OK);
		
	}
}
