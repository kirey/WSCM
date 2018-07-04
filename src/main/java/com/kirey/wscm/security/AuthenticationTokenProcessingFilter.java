package com.kirey.wscm.security;

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

import com.kirey.wscm.data.dao.WscmUserAccountsDao;
import com.kirey.wscm.data.entity.WscmUserAccounts;

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
	private WscmUserAccountsDao wscmUserAccountsDao;

	/**
	 * Spring security filter method used to validate the X-AUTH-TOKEN
	 */
	/* (non-Javadoc)
	 * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest, javax.servlet.ServletResponse, javax.servlet.FilterChain)
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
		HttpServletRequest httpRequest = SecurityUtils.getAsHttpRequest(request);
		WscmUserAccounts user = SecurityUtils.getUserFromContext();
		System.out.println("***********FILTER*********************");
		try {
			chain.doFilter(request, response);
		} catch (IOException | ServletException e) {
			throw new RuntimeException(e);
		}
	}



}