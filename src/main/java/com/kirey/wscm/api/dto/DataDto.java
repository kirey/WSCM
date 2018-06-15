package com.kirey.wscm.api.dto;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Class used to keep data for notification payload part
 * @author kitanoskan
 *
 */
public class DataDto implements Serializable{

	private static final long serialVersionUID = 127468923662596680L;
	
	private Integer id;
	private String messageText;
	private String targetTimestamp;
	private String location;
	private String address;
	

	public DataDto(){}
	
	public DataDto(String msg,  String targetTimestamp, String location, String address){
		this.messageText = msg;
		this.location = location;
		this.address = address;
		this.setTargetTimestamp(targetTimestamp);
	}
	
	public String getMessageText() {
		return messageText;
	}

	public void setMessageText(String messageText) {
		this.messageText = messageText;
	}

	public String getTargetTimestamp() {
		return targetTimestamp;
	}

	public void setTargetTimestamp(String targetTimestamp) {
		this.targetTimestamp = targetTimestamp;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
}
