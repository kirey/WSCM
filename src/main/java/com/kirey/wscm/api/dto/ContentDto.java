package com.kirey.wscm.api.dto;

import java.util.ArrayList;
import java.util.List;

import com.kirey.wscm.data.entity.Content;

public class ContentDto {
	
	private Content content;
	private List<CategoryWeight> listCategoryWeight = new ArrayList<>();
	
	
	public Content getContent() {
		return content;
	}
	public void setContent(Content content) {
		this.content = content;
	}
	public List<CategoryWeight> getListCategoryWeight() {
		return listCategoryWeight;
	}
	public void setListCategoryWeight(List<CategoryWeight> listCategoryWeight) {
		this.listCategoryWeight = listCategoryWeight;
	}
	
	

}
