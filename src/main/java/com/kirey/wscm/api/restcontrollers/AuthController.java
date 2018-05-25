package com.kirey.wscm.api.restcontrollers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.wscm.api.dto.UserAccount;


/**
 * @author paunovicm
 *
 */

@RestController
@RequestMapping("/")
public class AuthController {
	

	@Autowired
	private AuthenticationManager authenticationManager;
	
	/**
	 * Method used for authenticate user
	 * @param userAccount
	 * @return
	 */
	@RequestMapping(value = "/authentication", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> createUser(@RequestBody UserAccount userAccount) {
		
		Authentication authentication = null;
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				userAccount.getUsername(), userAccount.getPassword());

		authentication = this.authenticationManager.authenticate(authenticationToken);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		
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
}
