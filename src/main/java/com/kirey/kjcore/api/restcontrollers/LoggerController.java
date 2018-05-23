package com.kirey.kjcore.api.restcontrollers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kirey.kjcore.api.dto.ComboBoxDto;
import com.kirey.kjcore.api.dto.FilterCriteriaDto;
import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.data.dao.KjcErrorLogsDao;
import com.kirey.kjcore.data.dao.KjcErrorTracesDao;
import com.kirey.kjcore.data.entity.KjcErrorLogs;
import com.kirey.kjcore.data.entity.KjcErrorTraces;

/**
 * Rest controller created for error log administration
 *
 */
@RestController
@RequestMapping(value = "/rest/errors", produces = "application/json; charset=UTF-8")
public class LoggerController {
	
	@Autowired
	KjcErrorLogsDao kjcErrorLogsDao;
	
	@Autowired
	KjcErrorTracesDao kjcErrorTracesDao;
	
	@Autowired
	ObjectMapper objectMapper;
	 	
	/**
	 * This method returns stack trace for specific error log (parameter id is id of errorLog)
	 * @param id
	 * @return Response Entity containing trace with received id and HTTP status
	 */
	@RequestMapping(value = "/traces/{id}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getTrace(@PathVariable(value = "id") int id) {		
		
		KjcErrorTraces trace= kjcErrorTracesDao.findById(id);				
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(trace, HttpStatus.OK.value()), HttpStatus.OK);	
	}
	
	/**
	 * This method returns list of populate filters
	 * @return Response Entity containing list of filters and HTTP status
	 */
	@RequestMapping(value = "/populateFilters", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> populateFilters() {		
		//
		List<FilterCriteriaDto> logsFiltersList = new ArrayList<FilterCriteriaDto>();
		
		//find distinct errorNames
		List<String> errorNameList = kjcErrorLogsDao.findDistinctErrorNames();
		
		List<ComboBoxDto> errorNameFilterList = new ArrayList<ComboBoxDto>();
		//create seelection objects for errorNames
		for (String errorLog : errorNameList) {
			ComboBoxDto selectBox = new ComboBoxDto();
			selectBox.setKey(null);
			selectBox.setName(errorLog);
			errorNameFilterList.add(selectBox);
		}
		//Errorname - combobox
		FilterCriteriaDto errorNameFilter = new FilterCriteriaDto();
		errorNameFilter.setFilterName(AppConstants.SELECT_ERRROR_NAME);
		errorNameFilter.setSelectBoxList(errorNameFilterList);
		

		//distinct usernames
		List<String> usernameList =  kjcErrorLogsDao.findDistinctUsers();
		List<ComboBoxDto> userFilterList = new ArrayList<ComboBoxDto>();

		
		for (String username : usernameList) {
			ComboBoxDto selectBox = new ComboBoxDto();
			selectBox.setKey(null);
			selectBox.setName(username);
			userFilterList.add(selectBox);
		}
		
		//Username - combobox
		FilterCriteriaDto userFilter = new FilterCriteriaDto();
		userFilter.setFilterName(AppConstants.SELECT_USER_NAME);
		userFilter.setSelectBoxList(userFilterList);
		
		//Date from - combox
		FilterCriteriaDto dateFromFilter = new FilterCriteriaDto();
		dateFromFilter.setFilterName(AppConstants.SELECT_FROM_TROWN_DATE);
		
		//Date to - combox
		FilterCriteriaDto dateToFilter = new FilterCriteriaDto();
		dateToFilter.setFilterName(AppConstants.SELECT_TO_TROWN_DATE);
		
		//Process type - combox
		List<ComboBoxDto> procesTypeFilterList = new ArrayList<ComboBoxDto>();
		ComboBoxDto onlineTypeBox = new ComboBoxDto();
		onlineTypeBox.setKey(null);
		onlineTypeBox.setName(AppConstants.ONLINE);
		procesTypeFilterList.add(onlineTypeBox);
		ComboBoxDto offlineTypeBox = new ComboBoxDto();
		offlineTypeBox.setKey(null);
		offlineTypeBox.setName(AppConstants.OFFLINE);
		procesTypeFilterList.add(offlineTypeBox);
		
		FilterCriteriaDto procesTypeFilter = new FilterCriteriaDto();
		procesTypeFilter.setFilterName(AppConstants.SELECT_PROCESS_TYPE);
		procesTypeFilter.setSelectBoxList(procesTypeFilterList);
		
		logsFiltersList.add(errorNameFilter);
		logsFiltersList.add(userFilter);
		logsFiltersList.add(dateFromFilter);
		logsFiltersList.add(dateToFilter);
		logsFiltersList.add(procesTypeFilter);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(logsFiltersList, HttpStatus.OK.value()), HttpStatus.OK);	
	}
	
	/**
	 *  This method returns list of error logs
	 * @param filterMap
	 * @return Response Entity containing list of filtered error logs and HTTP status
	 */
	@RequestMapping(value = "/logs", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getLogs(@RequestParam(required = true) Map<String, String> filterMap) {
		List<FilterCriteriaDto> listSelection;
		try {
			listSelection = objectMapper.readValue(filterMap.get("filterMap"), new TypeReference<List<FilterCriteriaDto>>(){});
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		
		List<KjcErrorLogs> errorLogs = kjcErrorLogsDao.findAllFiltered(listSelection);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(errorLogs, HttpStatus.OK.value()), HttpStatus.OK);	
	}
}
