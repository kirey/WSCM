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
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.kirey.wscm.api.dto.AlertDataToSend;
import com.kirey.wscm.api.dto.AlertDto;
import com.kirey.wscm.api.dto.DataDto;
import com.kirey.wscm.api.dto.NotificationDto;
import com.kirey.wscm.common.constants.AppConstants;

@Service
public class FireAlertService {
	
public void sendAlertToUser(AlertDataToSend alertDataToSend){
		
		//String serverKey = AppConstants.FIREBASE_SERVERKEY;
		//String url =  AppConstants.FIREBASE_SEND_ALERT_URL;
		String url = "https://fcm.googleapis.com/fcm/send";
		String serverKey = "key=AAAAtKCMvfY:APA91bEK9RCNEuMnRYTi9KrBcuFaGoHeaA_aEZnaMrWDHbaBTKtZFApNvdHkx9OJPdmfbuUpsSzkJmb-Rp7mspI1lu5VtJ4Sy4LOisY1UD3iW9Hyd1BR98Ap_yIawRZUvQTPX4WVoGtZN0awvHrEA9VekWE1-rIAug";//AppConstants.FIREBASE_SERVERKEY;
						
		
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.setContentType(MediaType.APPLICATION_JSON);
		requestHeaders.add("Authorization", serverKey);

		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
				
		DateFormat df1 = new SimpleDateFormat(AppConstants.DATE_AND_HOURS_FORMAT);
		
		AlertDto alertDto = new AlertDto();
		alertDto.setTo(alertDataToSend.getFbToken());
		alertDto.setNotification(new NotificationDto(alertDataToSend.getMessageBody(), alertDataToSend.getMessageTitle(), alertDataToSend.getNotificationIconName(), "default", new Timestamp(new Date().getTime())));
		alertDto.setData(new DataDto(alertDataToSend.getMessageText()));
		
				
		//SEND ALERT TO USER
		HttpEntity<?> requestEntity = new HttpEntity<Object>(alertDto,requestHeaders);		
	    ResponseEntity response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Object.class);

		if (response.getStatusCode() == HttpStatus.OK)
		{
			List<Object> res = (List<Object>) ((HashMap) response.getBody()).get("results");
			if(((HashMap) (res.get(0))).get("message_id") != null)
			{
				String messageId = ((HashMap) (res.get(0))).get("message_id").toString();
				//NotificationsSent = new NotificationsSent();
				// to do update notification with message id got from firebase response
			}
		}
		
	}	

}
