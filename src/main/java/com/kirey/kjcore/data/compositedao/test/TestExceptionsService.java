package com.kirey.kjcore.data.compositedao.test;

import org.springframework.stereotype.Service;

/**
 * This class is used to purposefully generate NullPointerException used for testing purposes.
 */
@Service(value="testExceptionsService")
public class TestExceptionsService {

	/**
	 * A method  that generates NullPointerException
	 */
	public void testCauseException() {
		String s = null;
		s.getBytes();
	}
	
}
