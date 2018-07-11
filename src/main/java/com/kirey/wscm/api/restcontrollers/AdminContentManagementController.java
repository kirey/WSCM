package com.kirey.wscm.api.restcontrollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.wscm.api.dto.RestResponseDto;
import com.kirey.wscm.data.dao.CategoriesDao;
import com.kirey.wscm.data.dao.ContentCategoriesDao;
import com.kirey.wscm.data.dao.ContentDao;
import com.kirey.wscm.data.dao.LinksCategoriesDao;
import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.Content;
import com.kirey.wscm.data.entity.ContentCategories;

/**
 * @author paunovicm
 *
 */

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
	
	@RequestMapping(value = "/pages", method = RequestMethod.GET)
	public List<String> getAllPages() {

		List<String> listPages = contentDao.getAllDistinctPages();
		
		return listPages;
	}
	
	/**
	 * Method used for getting list of all Categories
	 * @return ResponseEntity containing the list of all Categories
	 */
	@RequestMapping(value = "/categories", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllCategories() {
		List<Categories> list = categoriesDao.findAll();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(list, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * Method for adding new Content in DB and also adding relation between Content and Categories (ContentCategories)
	 * @param content
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> addNewContent(@RequestBody Content content) {

		if(content.getContentCategorieses() == null || content.getContentCategorieses().isEmpty()) {
			Categories defaultCategory = categoriesDao.findDefaultCategory();
			ContentCategories contentCateogory = new ContentCategories();
			contentCateogory.setCategories(defaultCategory);
			contentCateogory.setContent(content);
			contentCateogory.setWeight(10);
		}
		
		
		Content savedContent = (Content) contentDao.merge(content);
		
		List<ContentCategories> contentCategorieses = content.getContentCategorieses();
		for (ContentCategories contentCategory : contentCategorieses) {
				contentCategory.setContent(savedContent);
				contentCategoriesDao.attachDirty(contentCategory);
			
		}
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("Successfully added new content", HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * Method for editing Content in DB and also add/edit relation between Content and Categories (ContentCategories)
	 * @param content
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> editContent(@RequestBody Content content) {

		if(content.getContentCategorieses() == null || content.getContentCategorieses().isEmpty()) {
			Categories defaultCategory = categoriesDao.findDefaultCategory();
			ContentCategories contentCateogory = new ContentCategories();
			contentCateogory.setCategories(defaultCategory);
			contentCateogory.setContent(content);
			contentCateogory.setWeight(10);
		}
		
		Content savedContent = (Content) contentDao.merge(content);
		
		List<ContentCategories> contentCategoriesFromDb = contentCategoriesDao.findByContent(savedContent.getId());
		
		List<ContentCategories> contentCategorieses = content.getContentCategorieses();
		
		for (ContentCategories contentCategoryDb : contentCategoriesFromDb) {
			boolean exist = false;
			for (ContentCategories contentCategory : contentCategorieses) {
				if(contentCategoryDb.getCategories().getId().equals(contentCategory.getCategories().getId())) {
					exist = true;
				}
			}
			if(!exist) {
				contentCategoriesDao.delete(contentCategoryDb);
			}
		}
		
		for (ContentCategories contentCategory : contentCategorieses) {
			ContentCategories contentCategories = contentCategoriesDao.findByContentCategory(savedContent.getId(), contentCategory.getCategories().getId());
			if (contentCategories == null) {
				contentCategories = new ContentCategories();
				contentCategories.setContent(savedContent);
				contentCategories.setCategories(contentCategory.getCategories());
				contentCategories.setWeight(contentCategory.getWeight());
				contentCategoriesDao.attachDirty(contentCategories);
			}else {
				contentCategories.setContent(savedContent);
				contentCategories.setCategories(contentCategory.getCategories());
				contentCategories.setWeight(contentCategory.getWeight());
				contentCategoriesDao.merge(contentCategories);
			}
		}
	
		return new ResponseEntity<RestResponseDto>(
				new RestResponseDto("Successfully edited content", HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * Method for deleting {@link Content}
	 * @param id
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<RestResponseDto> deleteContent(@PathVariable Integer id) {

		Content content = contentDao.findById(id);
		List<ContentCategories> listCategories = contentCategoriesDao.findByContent(id);
		for (ContentCategories contentCategories : listCategories) {
			contentCategoriesDao.delete(contentCategories);
		}
		contentDao.delete(content);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("Successfully deleted content", HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * Method for getting list of Content by page and language
	 * @param page
	 * @param lang
	 * @return ResponseEntity containing the list of Content
	 */
	@RequestMapping(value = "/{page}/{lang}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getByPageLang(@PathVariable String page, @PathVariable String lang) {

		List<Content> listContent = contentDao.findByPageLang(page, lang);
		for (Content content : listContent) {
			String connected = content.getCss() + "\n" + content.getHtml();
			content.setConnected(connected);
		}
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listContent, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	
	/**
	 * Method for getting list of Content by page
	 * @param page
	 * @return ResponseEntity containing the list of Content
	 */
	@RequestMapping(value = "/{page}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getByPageLang(@PathVariable String page) {

		List<Content> listContent = contentDao.findByPageAndInitCategories(page);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listContent, HttpStatus.OK.value()), HttpStatus.OK);
	}

}
