package com.kirey.wscm.data.service;

public class DataSourceHolder {

	private String url;
	private String username;
	private String password;
	private String driver;
	
	private String databaseType;
	private String address;
	private String port;
	private String databaseName;
	private String schemaName;

	private static DataSourceHolder dataSourceHolder;

	private DataSourceHolder() {

	}

	private DataSourceHolder(String url, String username, String password, String driver) {
		super();
		this.url = url;
		this.username = username;
		this.password = password;
		this.driver = driver;
	}
	
	

	public DataSourceHolder(String username, String password, String driver, String databaseType, String address, String port, String databaseName, String schemaName) {
		super();
		this.username = username;
		this.password = password;
		this.driver = driver;
		this.databaseType = databaseType;
		this.address = address;
		this.port = port;
		this.databaseName = databaseName;
		this.schemaName = schemaName;
		if(databaseType.equals("oracle")) {
			this.url = "jdbc:" + databaseType + ":thin:@" + address + ":" + port + ":" + databaseName; //jdbc:oracle:thin:@myhost:1521:orcl
		}else {
			this.url = "jdbc:" + databaseType + "://" + address + ":" + port + "/" + databaseName; //jdbc:postgresql://srni-vs1:5432/postgres
		}
		

	}

	public static void connect(String username, String password, String driver, String databaseType, String address, String port, String databaseName, String schemaName) {

		dataSourceHolder = new DataSourceHolder(username, password, driver, databaseType, address, port, databaseName, schemaName);

	}
	
	public static void disconnect() {
		dataSourceHolder = new DataSourceHolder();
	}

	public static DataSourceHolder getDataSourceHolder() {
		return dataSourceHolder;
	}

	public String getUrl() {
		return url;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public String getDriver() {
		return driver;
	}

	public String getDatabaseType() {
		return databaseType;
	}

	public String getAddress() {
		return address;
	}


	public String getPort() {
		return port;
	}

	public String getDatabaseName() {
		return databaseName;
	}

	public String getSchemaName() {
		return schemaName;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	

	
}
