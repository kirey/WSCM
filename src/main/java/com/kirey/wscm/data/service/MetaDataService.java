package com.kirey.wscm.data.service;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Service;

/**
 * 
 * @author paunovicm
 *
 */
@Service
public class MetaDataService {
	
	public DataSource constructDataSource(String url, String driver, String username, String pass) {
      	DriverManagerDataSource bds = new DriverManagerDataSource();
		bds.setDriverClassName(driver);
		bds.setUrl(url);
		bds.setUsername(username);
		bds.setPassword(pass);
      try {
    	  java.sql.ResultSet rs =  bds.getConnection().createStatement().executeQuery("select t.table_name from information_schema.tables t where t.table_schema = 'sch_kjgri'");
    	  while(rs.next()) {
    		  String name = rs.getString("table_name");
    		  System.out.println(name);
    	  }
    	  
      } catch (Exception ex) {
         System.out.println(ex);
      }
      return bds;
   }
	
	public List<String> getListOfTables(DataSourceHolder dataSourceHolder) {
		 List<String> tableNames = new ArrayList<>();
      	DriverManagerDataSource bds = new DriverManagerDataSource();
		bds.setDriverClassName(dataSourceHolder.getDriver());
		bds.setUrl(dataSourceHolder.getUrl());
		bds.setUsername(dataSourceHolder.getUsername());
		bds.setPassword(dataSourceHolder.getPassword());
      try {
    	  ResultSet rs = null;
    	  if(dataSourceHolder.getDatabaseType().equals("postgresql")) {
    		  rs =  bds.getConnection().createStatement().executeQuery("select t.table_name from information_schema.tables t where t.table_schema = '" + dataSourceHolder.getSchemaName() + "'");  
    	  }else if(dataSourceHolder.getDatabaseType().equals("oracle")) {
    		  rs =  bds.getConnection().createStatement().executeQuery("select *--t.TABLE_NAME from all_tables t where t.owner = '" + dataSourceHolder.getSchemaName() + "'");
    	  }else if(dataSourceHolder.getDatabaseType().equals("mysql")) {
    		  rs =  bds.getConnection().createStatement().executeQuery("SELECT table_name FROM information_schema.tables t where t.table_schema = '" + dataSourceHolder.getSchemaName() + "'");
    	  }else {
    		  return null;
    	  }
    	  
    	  while(rs.next()) {
    		  String tableName = rs.getString("table_name");
    		  tableNames.add(tableName);
    	  }
    	  
      } catch (Exception ex) {
         System.out.println(ex);
      }
      return tableNames;
   }

	public List<String> getListOfColumns(DataSourceHolder dataSourceHolder, String tableName) {
		List<String> columnNames = new ArrayList<>();
		DriverManagerDataSource bds = new DriverManagerDataSource();
		bds.setDriverClassName(dataSourceHolder.getDriver());
		bds.setUrl(dataSourceHolder.getUrl());
		bds.setUsername(dataSourceHolder.getUsername());
		bds.setPassword(dataSourceHolder.getPassword());
		try {
	    	  ResultSet rs = null;
	    	  if(dataSourceHolder.getDatabaseType().equals("postgresql")) {
	    		  rs =  bds.getConnection().createStatement().executeQuery("select t.column_name from information_schema.columns t where t.table_schema = '" + dataSourceHolder.getSchemaName() + "' and t.table_name = '" + tableName + "'");  
	    	  }else if(dataSourceHolder.getDatabaseType().equals("oracle")) {
	    		  rs =  bds.getConnection().createStatement().executeQuery("select c.column_name from all_TAB_COLS c where c.owner = '" + dataSourceHolder.getSchemaName() + "' and c.table_name = '" + tableName + "'");
	    	  }else if(dataSourceHolder.getDatabaseType().equals("mysql")) {
	    		  rs =  bds.getConnection().createStatement().executeQuery("SELECT t.column_name FROM information_schema.columns t where t.table_schema = '" + dataSourceHolder.getSchemaName() + "' and t.table_name = '" + tableName + "'");
	    	  }else {
	    		  return null;
	    	  }
	    	  
	    	  while(rs.next()) {
	    		  String columnName = rs.getString("column_name");
	    		  columnNames.add(columnName);
	    	  }
		} catch (Exception ex) {
			System.out.println(ex);
		}
		return columnNames;
	}

	public ResultSet getData(DataSourceHolder dataSourceHolder, String querry) {
		ResultSet rs = null;
		DriverManagerDataSource bds = new DriverManagerDataSource();
		bds.setDriverClassName(dataSourceHolder.getDriver());
		bds.setUrl(dataSourceHolder.getUrl());
		bds.setUsername(dataSourceHolder.getUsername());
		bds.setPassword(dataSourceHolder.getPassword());
		try {
			rs = bds.getConnection().createStatement().executeQuery(querry);
			
		} catch (Exception ex) {
			System.out.println(ex);
		}
		
		return rs;
	}

}
