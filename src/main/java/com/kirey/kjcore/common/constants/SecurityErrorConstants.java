package com.kirey.kjcore.common.constants;

/**
 * Class containing string constants used for security related messages shown to user
 * Constants are divided by type
 */
public class SecurityErrorConstants {

	/**
	 * 
	 * ************************************************************SECURITY ERROR MESSAGES*******************************************************
	 * 
	 */
		
	/**
	 *SECURITY ERRORS 
	 */
	
    public static final String ERROR_SECURITY_UNAUTORIZED = "Unauthorised request!";
    public static final String ERROR_SECURITY_FORBIDDEN = "Forbidden request! User with this role is not allowed to access the resource!";
    public static final String ERROR_SECURITY_NOTFOUND = "Resource not found!"; 
    public static final String ERROR_SECURITY_BAD_CREDENTIALS = "njamb.error.security.badCredentials.bljab";
	public static final String ERROR_SECURITY_EDIT_DETAILS_BAD_CREDENTIALS = "njamb.error.security.editDetailsBadCredentials.bljab"; 
	public static final String ERROR_SECURITY_EDIT_DETAILS_USER_DISABLED = "njamb.error.security.userDisabled.bljab";
	public static final String ERROR_SECURITY_USER_NOT_FOUND = "User not found: ";
	public static final String ERROR_SECURITY_GENERAL = "General security Error!";
	public static final String ERROR_SECURITY_AUTHENTICATION = "Authentication Error!";
	public static final String HTTP_REQUEST_EXPECTED = "HTTP request was expected!";
	
	/**
	 *SECURITY ERROR CODES 
	 */
	
	public static final String ERROR_CODE_SECURITY_EDIT_DETAILS_BAD_CREDENTIALS = "Err.Sec.3.2";

	protected SecurityErrorConstants() {
		super();
	}
	
	
}
