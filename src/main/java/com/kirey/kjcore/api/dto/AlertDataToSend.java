package com.kirey.kjcore.api.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;

public class AlertDataToSend implements Serializable{

	 /**
	 * 
	 */
	private static final long serialVersionUID = -2488918337530563755L;
	private BigDecimal kjcCompanyId;
	private BigDecimal clientCompanyLocationId;
	private BigDecimal kjcUserAccountId;
	private String email;
	private String fbToken;
	private BigDecimal riskSubtype;
	private BigDecimal forecastIndexValue;
	private String riskSubtypeName;
	private BigDecimal alertId;
	private String nameAlert;
	private String messageTitle;
	private String messageBody;
	private String messageText;
	private String notificationIconName;
	private String username;
	private Timestamp targetDate;
	private String targetTimeStampString;
	private String locationFullAddress;
	//private String companyLocationCityName;
	private String companyName;
	private String locationName;
	 
	public AlertDataToSend(){}
	
	public AlertDataToSend(BigDecimal kjcCompanyId, BigDecimal clientCompanyLocationId, BigDecimal kjcUserAccountId, String email,
			String fbToken, BigDecimal riskSubtype, BigDecimal forecastIndexValue, String riskSubtypeName, BigDecimal alertId,
			String nameAlert, String messageTitle, String messageBody, String messageText, String notificationIconName, String username, Timestamp targetDate, 
			String targetTimeStampString, String locationFullAddress, String companyName, String locationName){
		
		this.kjcCompanyId = kjcCompanyId;
		this.clientCompanyLocationId = clientCompanyLocationId;
		this.kjcUserAccountId = kjcUserAccountId;
		this.email = email;
		this.fbToken = fbToken;
		this.riskSubtype = riskSubtype;
		this.forecastIndexValue  = forecastIndexValue;
		this.riskSubtypeName = riskSubtypeName;
		this.alertId = alertId;
		this.nameAlert = nameAlert;
		this.messageTitle = messageTitle;
		this.messageBody = messageBody;
		this.messageText = messageText;
		this.notificationIconName = notificationIconName;
		this.username = username;
		this.targetDate = targetDate;
		this.setTargetTimeStampString(targetTimeStampString);
		this.locationFullAddress = locationFullAddress;
		this.companyName = companyName;
		this.locationName = locationName;
	}

	public BigDecimal getKjcCompanyId() {
		return kjcCompanyId;
	}

	public void setKjcCompanyId(BigDecimal kjcCompanyId) {
		this.kjcCompanyId = kjcCompanyId;
	}

	public BigDecimal getClientCompanyLocationId() {
		return clientCompanyLocationId;
	}

	public void setClientCompanyLocationId(BigDecimal clientCompanyLocationId) {
		this.clientCompanyLocationId = clientCompanyLocationId;
	}

	public BigDecimal getKjcUserAccountId() {
		return kjcUserAccountId;
	}

	public void setKjcUserAccountId(BigDecimal kjcUserAccountId) {
		this.kjcUserAccountId = kjcUserAccountId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFbToken() {
		return fbToken;
	}

	public void setFbToken(String fbToken) {
		this.fbToken = fbToken;
	}

	public BigDecimal getRiskSubtype() {
		return riskSubtype;
	}

	public void setRiskSubtype(BigDecimal riskSubtype) {
		this.riskSubtype = riskSubtype;
	}

	public String getRiskSubtypeName() {
		return riskSubtypeName;
	}

	public void setRiskSubtypeName(String riskSubtypeName) {
		this.riskSubtypeName = riskSubtypeName;
	}

	public BigDecimal getAlertId() {
		return alertId;
	}

	public void setAlertId(BigDecimal alertId) {
		this.alertId = alertId;
	}

	public String getNameAlert() {
		return nameAlert;
	}

	public void setNameAlert(String nameAlert) {
		this.nameAlert = nameAlert;
	}

	public String getMessageTitle() {
		return messageTitle;
	}

	public void setMessageTitle(String messageTitle) {
		this.messageTitle = messageTitle;
	}

	public String getMessageBody() {
		return messageBody;
	}

	public void setMessageBody(String messageBody) {
		this.messageBody = messageBody;
	}

	public String getMessageText() {
		return messageText;
	}

	public void setMessageText(String messageText) {
		this.messageText = messageText;
	}

	public String getNotificationIconName() {
		return notificationIconName;
	}

	public void setNotificationIconName(String notificationIconName) {
		this.notificationIconName = notificationIconName;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public BigDecimal getForecastIndexValue() {
		return forecastIndexValue;
	}

	public void setForecastIndexValue(BigDecimal alertForecastId) {
		this.forecastIndexValue = alertForecastId;
	}

	public Timestamp getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(Timestamp targetDate) {
		this.targetDate = targetDate;
	}

	public String getTargetTimeStampString() {
		return targetTimeStampString;
	}

	public void setTargetTimeStampString(String targetTimeStampString) {
		this.targetTimeStampString = targetTimeStampString;
	}

	public String getLocationFullAddress() {
		return locationFullAddress;
	}

	public void setLocationFullAddress(String locationFullAddress) {
		this.locationFullAddress = locationFullAddress;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getLocationName() {
		return locationName;
	}

	public void setLocationName(String locationName) {
		this.locationName = locationName;
	}

}
