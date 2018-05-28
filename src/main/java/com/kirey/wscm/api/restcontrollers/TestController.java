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

@RestController(value = "testController")
@RequestMapping(value = "/rest/content")
public class TestController {
	
	@Autowired
	private ContentDao contentDao;
	
	
	
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
	
	@RequestMapping(value = "/{page}/{position}", method = RequestMethod.GET)
	public Content getContentByPagePosition(@PathVariable String page, @PathVariable String position) {

		Content content = contentDao.getContentByPagePosition(page, position);
		
		return content;
	}

	@RequestMapping(value = "/upload", method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> upload(@RequestParam("file") MultipartFile file) {
		
		Content content = contentDao.findById(2);
		
		try {
			content.setCssFile(file.getBytes());
			contentDao.merge(content);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("Successfully uploaded!", HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/cssFile", method = RequestMethod.GET)
	public byte[] getCssFile() {

		Content content = contentDao.findById(1);
		
		return content.getCssFile();
	}
	
	
}
