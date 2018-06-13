package com.kirey.wscm.api.restcontrollers;

import java.util.List;

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
import com.kirey.wscm.data.dao.CategoriesDao;
import com.kirey.wscm.data.dao.ContentCategoriesDao;
import com.kirey.wscm.data.dao.ContentDao;
import com.kirey.wscm.data.dao.LinksCategoriesDao;
import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.Content;
import com.kirey.wscm.data.entity.ContentCategories;

@RestController(value = "adminContentManagementController")
@RequestMapping(value = "/rest/admin/content")
public class AdminContentManagementController {
	
	@Autowired
	private ContentDao contentDao;
	
	@Autowired
	private LinksCategoriesDao linksCategoriesDao;
	
	@Autowired
	private CategoriesDao categoriesDao;
	
	@Autowired
	private ContentCategoriesDao contentCategoriesDao;
	
	@RequestMapping(value = "/categories", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllCategories() {
		List<Categories> list = categoriesDao.findAll();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(list, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> addNewContent(@RequestParam Integer categoryId, @RequestParam Integer weight, @RequestBody Content content) {

		Content savedContent = (Content) contentDao.merge(content);
		Categories category = categoriesDao.findById(categoryId);
		
		ContentCategories contentCategories = new ContentCategories();
		contentCategories.setContent(savedContent);
		contentCategories.setCategories(category);
		contentCategories.setWeight(weight);
		contentCategoriesDao.attachDirty(contentCategories);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("Successfully added new content", HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> editContent(@RequestParam Integer categoryId, @RequestParam Integer weight, @RequestBody Content content) {

		Content savedContent = (Content) contentDao.merge(content);
		Categories category = categoriesDao.findById(categoryId);

		ContentCategories contentCategories = contentCategoriesDao.findByContentCategory(savedContent.getId(), categoryId);
		if (contentCategories != null) {
			contentCategories.setContent(savedContent);
			contentCategories.setCategories(category);
			contentCategories.setWeight(weight);
			contentCategoriesDao.merge(contentCategories);
		} else {
			contentCategories = new ContentCategories();
			contentCategories.setContent(savedContent);
			contentCategories.setCategories(category);
			contentCategories.setWeight(weight);
			contentCategoriesDao.attachDirty(contentCategories);
		}

		return new ResponseEntity<RestResponseDto>(
				new RestResponseDto("Successfully edited content", HttpStatus.OK.value()), HttpStatus.OK);
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

}
