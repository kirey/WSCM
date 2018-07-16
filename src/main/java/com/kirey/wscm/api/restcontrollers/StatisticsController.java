package com.kirey.wscm.api.restcontrollers;

import java.util.HashMap;
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

import com.kirey.wscm.api.dto.RestResponseDto;
import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.WscmUserAccounts;
import com.kirey.wscm.data.service.StatisticsService;

/**
 * @author paunovicm
 *
 */

@RestController(value = "statisticsController")
@RequestMapping(value = "/rest/statistics")
public class StatisticsController {
	
	@Autowired
	private StatisticsService statisticsService;
	
	
	/**
	 * Method for getting {@link List} of URL with number of request for each URL for given user 
	 * @param id - of {@link WscmUserAccounts}
	 * @return ResponseEntity containing the HashMap with user details and list of URL 
	 */
	@RequestMapping(value = "/link/user/{id}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> linksStatisticsByUser(@PathVariable Integer id) {
		
		Map<String, Object> response = statisticsService.linksStatisticsByUser(id);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(response, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * Method for getting {@link List} of URL with number of request for each URL for given ip address 
	 * @param address - ip address
	 * @return ResponseEntity containing the HashMap with list of URL 
	 */
	@RequestMapping(value = "/link/ip", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> linksStatisticsByIpAddress(@RequestParam String address) {
		
		Map<String, Object> response = statisticsService.linksStatisticsByIpAddress(address);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(response, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * Method for getting {@link List} of {@link Categories} to which is accessed by given user 
	 * @param id
	 * @return ResponseEntity containing the HashMap with user details and list of categories with number of request
	 */
	@RequestMapping(value = "/categoryNo/user/{id}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> categoryNoByUser(@PathVariable Integer id) {
		
		Map<String, Object> response = statisticsService.categoryNoByUser(id);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(response, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * Method for getting {@link List} of {@link Categories} to which is accessed by given ip address
	 * @param address
	 * @return ResponseEntity containing the HashMap with list of categories with number of request
	 */
	@RequestMapping(value = "/categoryNo/ip", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> categoryNoIpAddress(@RequestParam String address) {

		Map<String, Object> response = statisticsService.categoryNoByIpAddress(address);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(response, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * Method for getting number of requests for each category 
	 * @return ResponseEntity containing the List of HashMap with list of categories with number of request
	 */
	@RequestMapping(value = "/categoryNo", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> categoryNo() {	
		
		List<HashMap<String, Object>> responseList = statisticsService.categoryNo();
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(responseList, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * Method for getting {@link List} of URL with number of requests by given category
	 * @param id - of {@link Categories}
	 * @return ResponseEntity containing the HashMap with category details and list of URL with number of request
	 */
	@RequestMapping(value = "/categoryNo/{id}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> categoryNoByCategory(@PathVariable Integer id) {
		
		Map<String, Object> response = statisticsService.categoryNoByCategory(id);
	
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(response, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	
}
