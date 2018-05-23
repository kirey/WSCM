package com.kirey.kjcore.features.exception;

import java.lang.reflect.Method;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.aop.ThrowsAdvice;
import org.springframework.beans.factory.annotation.Autowired;

import com.kirey.kjcore.common.util.PrintingToConsole;

/**Interceptor for logging messages.
 * @author 
 *
 */
public class InterceptorLogging implements ThrowsAdvice { 
	
	@Autowired
	private PrintingToConsole printer;
	
	/**
	 * This method is used to intercept method before execution(print message Begin to console), 
	 * after method execution if everything is ok (print message End to console)
	 * @param pjp
	 * @return Object value containing result of executing ProceedingJoinPoint proceed() method
	 * @throws Throwable
	 */
	public Object aroundMethod(ProceedingJoinPoint pjp) throws Throwable {  
		MethodSignature signature = (MethodSignature) pjp.getSignature();
		Method method =  signature.getMethod();
		
		printer.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": Begin " + method.getName() + "()");
		Object value;
	    value = pjp.proceed(); 
	    printer.printMessage(pjp.getClass(), pjp.getSignature().getDeclaringTypeName() +": End " + method.getName() + "()");
		   	 
	   return value;
	} 	
}
