package com.kirey.kjcore.validations;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;

/**Class used as base validation handler for HTTP request
 * @author 
 *
 */
public class BaseValidation {

	@Autowired
	private HttpServletRequest request;

	/**
	 * This method returns the name of the frontend page used for mapping the
	 * failing info to the proper page field.
	 * 
	 * @return pageId or null in case that the page is not identified.
	 */
	protected String getPageId() {

		try {
			return request.getParameter("pageId");
		} catch (Exception e) {
			// When the pageId does not exist, the method must return null
			return null;
		}
	}

}
