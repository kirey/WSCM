package com.kirey.wscm.api.restcontrollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.data.entity.KjcEmailConfigs;
import com.kirey.wscm.data.dao.ContentDao;
import com.kirey.wscm.data.entity.Content;

@RestController(value = "testController")
@RequestMapping(value = "/rest/content")
public class TestController {
	
	@Autowired
	private ContentDao contentDao;
	
	@RequestMapping(value = "/basic/{page}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getBasicTemplate(@PathVariable String page) {

		Content basicTemplate = contentDao.getBasicTemplate(page);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(basicTemplate, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/basic/html/{page}", method = RequestMethod.GET)
	public String getHtmlForBasicTemplate(@PathVariable String page) {

		String basicHtml = contentDao.getHtmlForBasicTemplate(page);
		
		return basicHtml;
	}
	
	@RequestMapping(value = "/basic/css/{page}", method = RequestMethod.GET)
	public String getCssForBasicTemplate(@PathVariable String page) {

		String css = contentDao.getCssForBasicTemplate(page);
		
		return css;
	}
	
	@RequestMapping(value = "/basic/html/{page}/{position}", method = RequestMethod.GET)
	public String getHtmlForPosition(@PathVariable String page, @PathVariable String position) {

		String html = contentDao.getHtmlForPosition(page, position);
		
		return html;
	}
	
	@RequestMapping(value = "/basic/css/{page}/{position}", method = RequestMethod.GET)
	public String getCssForPosition(@PathVariable String page, @PathVariable String position) {

		String css = contentDao.getCssForPosition(page, position);
		
		return css;
	}

}
