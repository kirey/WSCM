package com.kirey.kjcore.api.dto;

import java.io.Serializable;
import java.sql.Timestamp;

public class NotificationDto implements Serializable {

	private static final long serialVersionUID = -3841348842195762215L;

	
	private String body;
	private String title;
	private String icon;
	private String sound;
	private Timestamp timeSent;
	
	public NotificationDto(){}
	
	public NotificationDto(String body, String title, String icon,String sound, Timestamp timeSent){
		this.body = body;
		this.title = title;
		this.icon = icon;
		this.sound = sound;
		this.timeSent = timeSent;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getSound() {
		return sound;
	}

	public void setSound(String sound) {
		this.sound = sound;
	}

	public Timestamp getTimeSent() {
		return timeSent;
	}

	public void setTimeSent(Timestamp timeSent) {
		this.timeSent = timeSent;
	}

}
