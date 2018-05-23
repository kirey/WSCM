package com.kirey.kjcore.features.internationalization;

import java.lang.reflect.Method;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.aop.ThrowsAdvice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.ResponseEntity;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.kirey.kjcore.common.util.PrintingToConsole;

/**
 * Interceptor that translates message using translation from DB
 * 
 * @author
 *
 */
@DependsOn("translation")
public class InterceptorTranslator implements ThrowsAdvice  {

	@Autowired
	private PrintingToConsole printer;
	
	@Autowired
	private Translation translation;

	@Autowired
	ObjectMapper objectMapper;

	/**Advice method. Goes around the join point and returns translation. Most of the time returns ResponseEntity
	 * 
	 * @param ProceedingJoinPoint pjp
	 * @return Object result 
	 * @throws Throwable
	 */
	public Object aroundMethod(ProceedingJoinPoint pjp) throws Throwable {  
		MethodSignature signature = (MethodSignature) pjp.getSignature();
		Method method =  signature.getMethod();
		
		printer.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": Translator Begin " + method.getName() + "()");
		Object result;
		String resultBody;
		ResponseEntity<Object> obj;
	   
	    result = pjp.proceed(); 
	    
	    if(result instanceof ResponseEntity)
		{	

	    	obj = (ResponseEntity<Object>) result;   	
	    	String responseString = objectMapper.writer().writeValueAsString(obj.getBody());    		    		
			resultBody = translation.translate(responseString);
			printer.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": Translator End " + method.getName() + "()");
		}
	    else{
	    	printer.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": Translator End " + method.getName() + "()");
	    	return result;
	    }
	
	    return  new ResponseEntity<Object>(resultBody, obj.getHeaders(), obj.getStatusCode());
	 	}
}
