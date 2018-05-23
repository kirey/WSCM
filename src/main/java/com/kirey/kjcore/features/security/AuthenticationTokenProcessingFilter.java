package com.kirey.kjcore.features.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.GenericFilterBean;

import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.data.dao.KjcUserAccountsDao;
import com.kirey.kjcore.data.entity.KjcUserAccounts;

/**
 * The class is used as a Spring security filter bean. It is inserted into the
 * Spring security chain of filters. Its method doFilter() is used to validate
 * the received AUTH-TOKEN. In case of positive validation, UserDetails are
 * inserted into the Spring security context.
 * 
 * @author Vladimir
 *
 */
public class AuthenticationTokenProcessingFilter extends GenericFilterBean {

	@Autowired
	private KjcUserAccountsDao kjcUserAccountsDao;

	/**
	 * Spring security filter method used to validate the X-AUTH-TOKEN
	 */
	/* (non-Javadoc)
	 * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest, javax.servlet.ServletResponse, javax.servlet.FilterChain)
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
		HttpServletRequest httpRequest = SecurityUtils.getAsHttpRequest(request);
		String authToken = SecurityUtils.extractAuthTokenFromRequest(httpRequest);
		String mobileToken = SecurityUtils.extractMobileAuthTokenFromRequest(httpRequest);
		KjcUserAccounts user;
		boolean validationResult = false;

		if (authToken != null && !authToken.trim().equals("")) {
			user = kjcUserAccountsDao.getUserByToken(authToken);
			if (user != null) {
				validationResult = SecurityUtils.validateToken(user, authToken) && user.isAccountNonExpired() && user.isAccountNonLocked() && user.isCredentialsNonExpired();
			}

			if (validationResult) {
				UserDetails userDetails = user;
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}
		else if(mobileToken != null && !mobileToken.trim().equals("") && httpRequest.getServletPath().startsWith(AppConstants.MOBILE_TOKEN_PERMITTED_PATH)){
			user = kjcUserAccountsDao.getUserByMobileToken(mobileToken);
			if (user != null) {
				validationResult = SecurityUtils.validateMobileToken(user, mobileToken) && user.isAccountNonExpired() && user.isAccountNonLocked() && user.isCredentialsNonExpired();
			}
			if (validationResult) {
				UserDetails userDetails = user;
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpRequest));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}
		
		try {
			chain.doFilter(request, response);
		} catch (IOException | ServletException e) {
			throw new RuntimeException(e);
		}
	}



}