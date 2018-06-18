package com.kirey.wscm.api.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.kirey.wscm.api.dto.RestResponseDto;
import com.kirey.wscm.api.dto.UserAccount;
import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.data.dao.WscmUserAccountsDao;
import com.kirey.wscm.data.entity.WscmUserAccounts;


/**
 * @author paunovicm
 *
 */

@RestController
@RequestMapping("/")
public class AuthController {
	

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private WscmUserAccountsDao wscmUserAccountsDao;
	
	/**
	 * Method used for authenticate user
	 * @param userAccount
	 * @return
	 */
	@RequestMapping(value = "/authentication", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> createUser(@RequestBody UserAccount userAccount, @CookieValue("JSESSIONID") String cookie) {
		
		Authentication authentication = null;
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				userAccount.getUsername(), userAccount.getPassword());

		authentication = this.authenticationManager.authenticate(authenticationToken);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		WscmUserAccounts wscmUser = (WscmUserAccounts) authentication.getPrincipal();
		
		wscmUser.setSessionId(cookie);

		return new ResponseEntity<Object>(null, HttpStatus.OK);
	}
	
	/**
	 * Method used when logout is success
	 * @return
	 */
	@RequestMapping(value = "/success/logout", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> logout() {
		
		return new ResponseEntity<Object>(null, HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/subscribeToTopic/{fbToken}/{topic}", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> subscribeToTopic(@PathVariable String fbToken, @PathVariable String topic) {
		
		String serverKey = AppConstants.FIREBASE_SERVERKEY;
		
		//String url = "https://iid.googleapis.com/iid/v1/"+fbToken+"/rel/topics/"+topic;
		String urlPart1 =  AppConstants.FIREBASE_SUBSCRIBE_PART1_URL;
		String urlPart2 =  AppConstants.FIREBASE_SUBSCRIBE_PART1_URL;
		
		String url = urlPart1 + fbToken + urlPart2 + topic;
				
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.setContentType(MediaType.APPLICATION_JSON);
		requestHeaders.add("Authorization", serverKey);

		HttpEntity<?> requestEntity = new HttpEntity<Object>(requestHeaders);
		RestTemplate restTemplate = new RestTemplate();
		restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());
		
		ResponseEntity response = null;
		
		response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Object.class);

		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), "SUBSCRIBED"), HttpStatus.OK);
	}
}
