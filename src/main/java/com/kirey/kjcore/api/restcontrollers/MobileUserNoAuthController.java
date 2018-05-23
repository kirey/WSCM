package com.kirey.kjcore.api.restcontrollers;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.api.dto.TokenTransfer;
import com.kirey.kjcore.api.dto.UserLogin;
import com.kirey.kjcore.common.constants.SecurityErrorConstants;
import com.kirey.kjcore.data.dao.KjcUserAccountsDao;
import com.kirey.kjcore.data.entity.KjcUserAccounts;
import com.kirey.kjcore.features.exception.customexceptions.SecurityUnauthorizedException;
import com.kirey.kjcore.features.security.SecurityUtils;
import com.kirey.wscm.common.constants.AppConstants;

/**
 * Rest controller for requests that are accessible without logging in
 * @author kitanoskan
 *
 */
@RestController
@RequestMapping(value = "/rest/usersMobile/noAuth", produces = "application/json; charset=UTF-8")
public class MobileUserNoAuthController {
	
	@Autowired
	@Qualifier("authenticationManager")
	private AuthenticationManager authManager;

	@Autowired
	private KjcUserAccountsDao kjcUserAccountsDao;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST, consumes = {
			MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<RestResponseDto> authenticateMobile( @RequestBody UserLogin login, HttpServletRequest request) {
		
		Authentication authentication = null;
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				login.getUsername(), login.getPassword());

		try {
			authentication = this.authManager.authenticate(authenticationToken);
		} catch (DisabledException e) {
			throw new SecurityUnauthorizedException(null, SecurityErrorConstants.ERROR_SECURITY_UNAUTORIZED);
		} catch (CredentialsExpiredException e) {
			throw new SecurityUnauthorizedException(null, SecurityErrorConstants.ERROR_SECURITY_UNAUTORIZED);
		} catch (BadCredentialsException e) {
			throw new SecurityUnauthorizedException(null, SecurityErrorConstants.ERROR_SECURITY_BAD_CREDENTIALS);
		} catch (AuthenticationException e) {
			throw new SecurityUnauthorizedException(null, SecurityErrorConstants.ERROR_SECURITY_AUTHENTICATION);
		} 

		SecurityContextHolder.getContext().setAuthentication(authentication);
		KjcUserAccounts user = (KjcUserAccounts) authentication.getPrincipal();
				

		if (user.getMobileFirstLogin() == null)
			user.setMobileFirstLogin(new Date());
		user.setMobileLastLogin(new Date());

		if (user.getMobileLogCounter() != null)
			user.setMobileLogCounter(user.getMobileLogCounter() + 1);
		else
			user.setMobileLogCounter(1);

		
		String oldMobileToken = user.getMobileToken();
		String mobileToken = AppConstants.MOBILE_TOKEN_PREFIX +SecurityUtils.createToken(user);
		user.setMobileToken(mobileToken);
		user.setMobileTokenTimestamp(System.currentTimeMillis());
		
		String firebaseToken = request.getHeader("fbToken");
		if(firebaseToken !=null)
			user.setFirebaseToken(firebaseToken);

		kjcUserAccountsDao.saveMobileToken(user, oldMobileToken);
		TokenTransfer tokenTransfer = new TokenTransfer(mobileToken);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(tokenTransfer, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	
}
