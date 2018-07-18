package com.kirey.wscm.api.restcontrollers;

import java.sql.ResultSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.wscm.api.dto.RestResponseDto;
import com.kirey.wscm.data.service.DataSourceHolder;
import com.kirey.wscm.data.service.MetaDataService;

/**
 * @author paunovicm
 *
 */

@RestController(value = "dataSourceController")
@RequestMapping(value = "/rest/dataSource")
public class DataSourceController {
	
	@Autowired
	private MetaDataService metaDataService;

	@RequestMapping(value = "/connect", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> connect(@RequestParam String username, @RequestParam String password, @RequestParam String driver, @RequestParam String databaseType, @RequestParam String address, @RequestParam String port, @RequestParam String databaseName, @RequestParam String schemaName) {
		
		DataSourceHolder.connect(username, password, driver, databaseType, address, port, databaseName, schemaName);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("connected", HttpStatus.OK.value()), HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/disconnect", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> disconnect() {
		
		DataSourceHolder.disconnect();
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("connected", HttpStatus.OK.value()), HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/allTables", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> allTables() {
		
		List<String> tableNames = metaDataService.getListOfTables(DataSourceHolder.getDataSourceHolder());
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(tableNames, HttpStatus.OK.value()), HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/allColumns", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> allColumns(@RequestParam String tableName) {
		
		List<String> tableNames = metaDataService.getListOfColumns(DataSourceHolder.getDataSourceHolder(), tableName);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(tableNames, HttpStatus.OK.value()), HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/data", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getData(@RequestParam String querry) {
		
		ResultSet rs = metaDataService.getData(DataSourceHolder.getDataSourceHolder(), querry);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(rs, HttpStatus.OK.value()), HttpStatus.OK);
		
	}

}
