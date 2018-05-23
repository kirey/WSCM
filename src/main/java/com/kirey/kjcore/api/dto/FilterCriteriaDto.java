package com.kirey.kjcore.api.dto;

import java.io.Serializable;
import java.util.List;

/**
 * Custom DTO used for filters by criteria
 */
public class FilterCriteriaDto implements Serializable {

	private static final long serialVersionUID = -4435102783914718573L;

	private String filterName;
	private List<ComboBoxDto> selectBoxList;

	public String getFilterName() {
		return filterName;
	}

	public void setFilterName(String filterName) {
		this.filterName = filterName;
	}

	public List<ComboBoxDto> getSelectBoxList() {
		return selectBoxList;
	}

	public void setSelectBoxList(List<ComboBoxDto> selectBoxList) {
		this.selectBoxList = selectBoxList;
	}
}
