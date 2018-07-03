package com.kirey.wscm.data.service;

import java.lang.reflect.Method;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.aop.ThrowsAdvice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.common.util.Utilities;
import com.kirey.wscm.data.dao.EventDao;
import com.kirey.wscm.data.entity.Event;
import com.kirey.wscm.data.entity.Jobs;

public class WebRequestInterceptor implements ThrowsAdvice {

	@Autowired
	private HttpServletRequest httpServletRequest;

	@Autowired
	private EventDao eventDao;

	@Autowired
	private JobService jobService;

	/**
	 * This method is used to intercept method before execution(print message Begin
	 * to console), after method execution if everything is ok (print message End to
	 * console)
	 * 
	 * @param pjp
	 * @return Object value containing result of executing ProceedingJoinPoint
	 *         proceed() method
	 * @throws Throwable
	 */
	public Object aroundMethod(ProceedingJoinPoint pjp) throws Throwable {
		MethodSignature signature = (MethodSignature) pjp.getSignature();
		Method method = signature.getMethod();
		String url = httpServletRequest.getRequestURI().toString() + "?" + httpServletRequest.getQueryString();
		if (url.startsWith(AppConstants.URL_LINK_CONTROLLER)) {
			Object[] ob = pjp.getArgs();
			url = (String) ob[0];
		}
		
		List<Event> listEventByType = eventDao.findByType(AppConstants.EVENT_TYPE_WEB_REQUEST);
		for (Event eventByType : listEventByType) {
			String urlForSearch = Utilities.searchUrl(url, eventByType.getDefinition());
			List<Event> listEvent = eventDao.findByTypeAndDefinition(AppConstants.EVENT_TYPE_WEB_REQUEST, urlForSearch);
			for (Event event : listEvent) {
				Jobs job = event.getJobs();
				if (event.getStatus().equals(AppConstants.SCHEDULER_STATUS_ACTIVE)) {
					 jobService.startJobImmediately(job);
					System.out.println("***************************JOB STARTED********************************");
				}

			}
		}
		
		

		Object value;
		value = pjp.proceed();

		return value;

	}

}
