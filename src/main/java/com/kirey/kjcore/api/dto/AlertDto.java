package com.kirey.kjcore.api.dto;

import java.io.Serializable;

public class AlertDto implements Serializable{

	private static final long serialVersionUID = -1897933191359149999L;

	private Integer messageId;
	private String to;
	private NotificationDto notification;
	private DataDto data;
	
	public AlertDto(){}
	
	public AlertDto(Integer msgId, String to, NotificationDto notif, DataDto data){
		this.setMessageId(msgId);
		this.to = to;
		this.notification = notif;
		this.data = data;			
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}

	public NotificationDto getNotification() {
		return notification;
	}

	public void setNotification(NotificationDto notification) {
		this.notification = notification;
	}

	public DataDto getData() {
		return data;
	}

	public void setData(DataDto data) {
		this.data = data;
	}

	public Integer getMessageId() {
		return messageId;
	}

	public void setMessageId(Integer messageId) {
		this.messageId = messageId;
	}
	
	
}
