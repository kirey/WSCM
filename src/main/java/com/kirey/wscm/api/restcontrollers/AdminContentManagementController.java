package com.kirey.wscm.api.restcontrollers;

import java.util.ArrayList;
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

import com.kirey.wscm.api.dto.CategoryWeight;
import com.kirey.wscm.api.dto.ContentDto;
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
	public ResponseEntity<RestResponseDto> addNewContent(@RequestBody ContentDto contentDto) {

		
		Content savedContent = (Content) contentDao.merge(contentDto.getContent());
		
		List<CategoryWeight> listCategoryWeight = contentDto.getListCategoryWeight();
		for (CategoryWeight categoryWeight : listCategoryWeight) {
			Categories category = categoriesDao.findById(categoryWeight.getCategoryId());
			
			ContentCategories contentCategories = new ContentCategories();
			contentCategories.setContent(savedContent);
			contentCategories.setCategories(category);
			contentCategories.setWeight(categoryWeight.getWeight());
			contentCategoriesDao.attachDirty(contentCategories);
		}
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("Successfully added new content", HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/milos/test", method = RequestMethod.GET)
	public ContentDto milosTest() {
		
		Content content = contentDao.findById(1);
		
		List<CategoryWeight> listCategoryWeight = new ArrayList<>();
		CategoryWeight catW1 = new CategoryWeight();
		catW1.setCategoryId(1);
		catW1.setWeight(4);
		listCategoryWeight.add(catW1);
		
		CategoryWeight catW2 = new CategoryWeight();
		catW2.setCategoryId(2);
		catW2.setWeight(6);
		listCategoryWeight.add(catW2);
		
		ContentDto contentDto = new ContentDto();
		contentDto.setContent(content);
		contentDto.setListCategoryWeight(listCategoryWeight);
		return contentDto;
	}
	
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> editContent(@RequestBody ContentDto contentDto) {

		Content savedContent = (Content) contentDao.merge(contentDto.getContent());
		
		List<CategoryWeight> listCategoryWeight = contentDto.getListCategoryWeight();
		for (CategoryWeight categoryWeight : listCategoryWeight) {
			Categories category = categoriesDao.findById(categoryWeight.getCategoryId());
			
			ContentCategories contentCategories = contentCategoriesDao.findByContentCategory(savedContent.getId(), categoryWeight.getCategoryId());
			if (contentCategories == null) {
				contentCategories = new ContentCategories();
				contentCategories.setContent(savedContent);
				contentCategories.setCategories(category);
				contentCategories.setWeight(categoryWeight.getWeight());
				contentCategoriesDao.attachDirty(contentCategories);
			}else {
				contentCategories.setContent(savedContent);
				contentCategories.setCategories(category);
				contentCategories.setWeight(categoryWeight.getWeight());
				contentCategoriesDao.merge(contentCategories);
			}
			
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
