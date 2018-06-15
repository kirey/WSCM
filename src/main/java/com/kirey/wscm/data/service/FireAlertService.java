package com.kirey.wscm.data.service;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import com.kirey.wscm.api.dto.AlertDataToSend;
import com.kirey.wscm.api.dto.AlertDto;
import com.kirey.wscm.api.dto.DataDto;
import com.kirey.wscm.api.dto.NotificationDto;
import com.kirey.wscm.common.constants.AppConstants;

public class FireAlertService {
	
public void sendAlertToUser(AlertDataToSend alertDataToSend){
		
		String serverKey = AppConstants.FIREBASE_SERVERKEY;
		String url =  AppConstants.FIREBASE_SEND_ALERT_URL;
		
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.setContentType(MediaType.APPLICATION_JSON);
		requestHeaders.add("Authorization", serverKey);

		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
				
		DateFormat df1 = new SimpleDateFormat(AppConstants.DATE_AND_HOURS_FORMAT);
		
		AlertDto alertDto = new AlertDto();
		alertDto.setTo(alertDataToSend.getFbToken());
		alertDto.setNotification(new NotificationDto(alertDataToSend.getMessageBody(), alertDataToSend.getMessageTitle(), alertDataToSend.getNotificationIconName(), "default", new Timestamp(new Date().getTime())));
		alertDto.setData(new DataDto(alertDataToSend.getMessageText(), alertDataToSend.getTargetTimeStampString(),alertDataToSend.getCompanyName()+", "+alertDataToSend.getLocationName(), alertDataToSend.getLocationFullAddress()));
		
		//SEND EMAIL TO USER
		/*Map<String, Object> templateModel = new HashMap<>();
		StringWriter outputWriter = new StringWriter();
		outputWriter.write(alertDataToSend.getMessageText());


		templateModel.put("body", outputWriter);
		templateModel.put("username", alertDataToSend.getUsername());
		templateModel.put("alert_name", alertDataToSend.getNameAlert());
		templateModel.put("location",  alertDataToSend.getCompanyLocationCityName());
		templateModel.put("address", alertDataToSend.getLocation());*/
		
		
		//SEND ALERT TO USER
		HttpEntity<?> requestEntity = new HttpEntity<Object>(alertDto,requestHeaders);		
	    ResponseEntity response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Object.class);

		if (response.getStatusCode() == HttpStatus.OK)
		{
			List<Object> res = (List<Object>) ((HashMap) response.getBody()).get("results");
			if(((HashMap) (res.get(0))).get("message_id") != null)
			{
				String messageId = ((HashMap) (res.get(0))).get("message_id").toString();
				//NotificationsSent = new NotificationsSent();s
			}
		}
		
	}	

}
