package com.kirey.kjcore.features.exception.customexceptions;

/**Custom exception class used for ResourceNotFound handling
 * @author 
 *
 */
public class ResourceNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 773093788105159421L;

	public ResourceNotFoundException(String msg) {
		super(msg);
		
	}

}
