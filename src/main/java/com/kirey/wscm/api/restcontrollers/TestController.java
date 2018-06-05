package com.kirey.wscm.api.restcontrollers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kirey.wscm.api.dto.RestResponseDto;
import com.kirey.wscm.api.dto.UserAccount;
import com.kirey.wscm.data.dao.ContentDao;
import com.kirey.wscm.data.entity.Content;
import com.kirey.wscm.data.service.TemplateEngine;

@RestController(value = "testController")
@RequestMapping(value = "/rest/content")
public class TestController {
	

	@Autowired
	private ContentDao contentDao;
	
	
	@Autowired
	private TemplateEngine templateEngine;
	
	
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
	public Content getByPagePositionLang(@PathVariable String page, @PathVariable String position, @PathVariable String lang) {

		Content content = contentDao.findByPagePositionLang(page, position, lang);
		String connected = content.getCss() + "\n" + content.getHtml();
		content.setConnected(connected);
		return content;
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

		/*
		Content content = contentDao.findByPagePositionLang(page, position, lang);

		List<KjcPackages> packages = kjcPackagesDao.findAll();

		List<List<?>> listContents = new ArrayList<>();
		listContents.add(packages);

		KjcCompanies kjcCompany = kjcCompaniesDao.findDefaultCompanyWithCss();

		List<Object> contents = new ArrayList<>();
		contents.add(kjcCompany);
		
		String encoded = Base64.getEncoder().encodeToString(kjcCompany.getCompanyLogo());
		contents.add("\"data:image/jpg;base64, " + encoded + "\"");

		Map<String, Object> root = templateEngine.buildContentAsMap(listContents, contents);

		String htmlWithCssAndScript = templateEngine.getProcesedHTMLwithCSSandScript(content.getHtml(), content.getCss(), content.getScript(), root);
		*/
		return null;//htmlWithCssAndScript;
	}

	
	
}
