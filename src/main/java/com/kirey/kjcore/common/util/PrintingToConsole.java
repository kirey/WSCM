package com.kirey.kjcore.common.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.TaskExecutor;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 *Class containing methods used for logging into console
 *
 */
@Component(value = "printer")
public class PrintingToConsole {

	@Autowired
	private TaskExecutor loggerTaskExecutor;
	
	/**
	 * Setter method initialized by Spring Framework.
	 */
	public void setLoggerTaskExecutor(TaskExecutor loggerTaskExecutor) {
		this.loggerTaskExecutor = loggerTaskExecutor;
	}
	
	/**Method that prints message to console
	 * @param targetClass
	 * @param message
	 */
	public  void printMessage(Class<?> targetClass, String message) {
		printMessage(targetClass, message, null);
	}
	
	/**Method that prints lof to console
	 * @param targetClass
	 * @param message
	 * @param ex
	 */
	public  void printMessage(Class<?> targetClass, String message, Throwable ex) {
		Log logger = LogFactory.getLog(targetClass);
		String username = null;
		try {
			SecurityContext securityContext = SecurityContextHolder.getContext();
			username = securityContext.getAuthentication().getName();
		} catch (Exception e) {
			username = null;
		}
		loggerTaskExecutor.execute(new LoggerTask(logger, message, username, ex));
	}
	
	/**
	 * Internal class logger task that serves as logger
	 *
	 */
	private  class LoggerTask implements Runnable {

		private String message = null;
		private Log logger = null;
		private Throwable ex = null;

		/**A method that prints logger message for exception
		 * @param logger
		 * @param message
		 * @param username
		 * @param ex
		 */
		public LoggerTask(Log logger, String message, String username, Throwable ex) {
			this.logger = logger;
			if (username!=null) {
				this.message = message;
			} else {
				this.message = message + " - User: " + username;
			}
			this.ex = ex;
		}

		/* (non-Javadoc)
		 * @see java.lang.Runnable#run()
		 */
		@Override
		public void run() {
			if (this.ex != null) {
				this.logger.error(this.message, this.ex);
			} else {
				if (this.logger.isInfoEnabled()) {
					this.logger.info(this.message);
				}
			}
		}
	}

}
