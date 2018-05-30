package com.kirey.kjcore.api.restcontrollers;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.api.dto.TokenTransfer;
import com.kirey.kjcore.api.dto.UserLogin;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ResponseMessagesConstants;
import com.kirey.kjcore.common.constants.SecurityErrorConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.compositedao.CompaniesService;
import com.kirey.kjcore.data.dao.KjcApplicationRolesDao;
import com.kirey.kjcore.data.dao.KjcCompaniesDao;
import com.kirey.kjcore.data.dao.KjcGenericsDao;
import com.kirey.kjcore.data.dao.KjcResourceBundleDao;
import com.kirey.kjcore.data.dao.KjcUserAccountsDao;
import com.kirey.kjcore.data.entity.KjcApplicationRoles;
import com.kirey.kjcore.data.entity.KjcCompanies;
import com.kirey.kjcore.data.entity.KjcGenerics;
import com.kirey.kjcore.data.entity.KjcUserAccounts;
import com.kirey.kjcore.features.email.MailService;
import com.kirey.kjcore.features.exception.customexceptions.SecurityUnauthorizedException;
import com.kirey.kjcore.features.security.Captcha;
import com.kirey.kjcore.features.security.CaptchaCache;
import com.kirey.kjcore.features.security.SecurityUtils;
import com.kirey.kjcore.validations.RegistrationValidation;

/**Rest controller for pages that are accessible without logging in
 * @author 
 *
 */
@RestController
@RequestMapping(value = "/rest/users/noAuth", produces = "application/json; charset=UTF-8")
public class UserProfileNoAuthController {

	@Autowired
	@Qualifier("authenticationManager")
	private AuthenticationManager authManager;

	@Autowired
	private KjcUserAccountsDao kjcUserAccountsDao;

	@Autowired
	private KjcApplicationRolesDao kjcApplicationRolesDao;

	@Autowired
	private KjcResourceBundleDao kjcResourceBundleDao;
	
	@Autowired
	private CompaniesService companiesService;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
	private KjcCompaniesDao kjcCompaniesDao;

	@Autowired
	private RegistrationValidation registrationValidation;
	
	@Autowired
	private KjcGenericsDao kjcGenericsDao;

	private static final String KJC_USER_ACCOUNTS = "kjcUserAccounts"; 



	/**
	 * Performs the authentication of the user and generation of the Auth token.
	 * When generating the auth token, this method can use either Database
	 * approach in which case token is stored in User_Accounts table and
	 * retreived during each authentication. Having in mind that frequent
	 * authentication requires frequent access to database, Spring cache is used
	 * to speed up the process. In case the SecurityCache is applied, then
	 * token, along with User object, is kept in the SecurityCache class.
	 * 
	 * @param login
	 *            of type UserLogin contains the username and password of the
	 *            user.
	 * @return Authentication token is sent to the client as object of type
	 *         TokenTransfer
	 */
	@RequestMapping(value = "/authenticate", method = RequestMethod.POST, consumes = {
			MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<RestResponseDto> authenticate(@RequestParam(required = false) String code, @RequestParam(required = false) String hashCode, @RequestBody UserLogin login, HttpServletRequest request) {
		KjcGenerics kjcGenerics = kjcGenericsDao.findByKey(AppConstants.GENERICS_CAPTCHA_LOGIN_ENABLED);
		if(kjcGenerics==null || Boolean.parseBoolean(kjcGenerics.getValue())){
			registrationValidation.validationCaptcha(code, hashCode);
		}
		Authentication authentication = null;
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				login.getUsername(), login.getPassword());

		try {
			authentication = this.authManager.authenticate(authenticationToken);
		} catch (DisabledException e) {
			throw new SecurityUnauthorizedException(null, SecurityErrorConstants.ERROR_SECURITY_UNAUTORIZED);
		} catch (CredentialsExpiredException e) {
			throw new SecurityUnauthorizedException(null, SecurityErrorConstants.ERROR_SECURITY_UNAUTORIZED);
		} catch (BadCredentialsException e) {
			throw new SecurityUnauthorizedException(null, SecurityErrorConstants.ERROR_SECURITY_BAD_CREDENTIALS);
		} catch (AuthenticationException e) {
			throw new SecurityUnauthorizedException(null, SecurityErrorConstants.ERROR_SECURITY_AUTHENTICATION);
		} 

		SecurityContextHolder.getContext().setAuthentication(authentication);
		KjcUserAccounts user = (KjcUserAccounts) authentication.getPrincipal();
				

		if (user.getFirstLogin() == null)
			user.setFirstLogin(new Date());
		user.setLastLogin(new Date());

		if (user.getLogCounter() != null)
			user.setLogCounter(user.getLogCounter() + 1);
		else
			user.setLogCounter(1);

		
		String oldToken = user.getToken();
		String token = SecurityUtils.createToken(user);
		user.setToken(token);
		user.setTokenTimestamp(System.currentTimeMillis());
		
		String firebaseToken = request.getHeader("fbToken");
		if(firebaseToken !=null)
			user.setFirebaseToken(firebaseToken);

		kjcUserAccountsDao.saveToken(user, oldToken);
		TokenTransfer tokenTransfer = new TokenTransfer(token);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(tokenTransfer, HttpStatus.OK.value()), HttpStatus.OK);
	}
	

	
	
	
	/**
	 * This method allows user to register new account
	 * @param code contains captcha code for validation
	 * @param hashCode contains captcha code which is hashed with sha256
	 * @param kjcUserAccounts contains username, password, e-mail and default language
	 * @return Response Entity containing  response message and HTTP status
	 */
	@RequestMapping(value = "/signup", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> signUp(@RequestParam String code, @RequestParam String hashCode,
			@RequestBody KjcUserAccounts kjcUserAccounts, HttpServletRequest req) {

		registrationValidation.validationForSignUp(kjcUserAccounts);
		registrationValidation.validationCaptcha(code, hashCode);
		KjcApplicationRoles kjcApplicationRoleses = kjcApplicationRolesDao.findByName(AppConstants.ROLE_USER);
		List<KjcApplicationRoles> listKjcApplicationRoles = new ArrayList<>();
		listKjcApplicationRoles.add(kjcApplicationRoleses);
		kjcUserAccounts.setKjcApplicationRoleses(listKjcApplicationRoles);
		kjcUserAccounts.setEnabled(false);
		kjcUserAccounts.setKjcCompanies(kjcCompaniesDao.findDefaultCompanyWithCss());
		kjcUserAccountsDao.saveNewUserEncryptPassword(kjcUserAccounts);
		
		//send confirmation email
		Map<String, Object> map = kjcUserAccountsDao.saveMailHash(kjcUserAccounts.getEmail());
		
		int requestUrlLength = req.getRequestURL().length();
		int requestUriLength = req.getRequestURI().length();
		StringBuilder result = new StringBuilder(req.getRequestURL().replace(requestUrlLength - requestUriLength, requestUrlLength, req.getContextPath()));


		// specific data for each email
		Map<String, Object> templateModel = new HashMap<>();
		templateModel.put("baseUrl", result);
		templateModel.put(KJC_USER_ACCOUNTS, map.get(KJC_USER_ACCOUNTS));
		mailService.sendDefaultEmail("kjc_email_configs", "registration_confirmation_template", kjcUserAccounts.getEmail(), templateModel, null);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(),
				kjcUserAccounts.getUsername() + ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_USER_SUCCESSFULLY_ADED + " " + kjcUserAccounts.getEmail()),
				HttpStatus.OK);
	}
	
	/**
	 * This method is used for confirmation email and enables user account
	 * @param mailHash
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/confirmationRegistration", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> confirmationRegistration(@RequestParam String mailHash) {
		registrationValidation.validationForConfirmationRegistration(mailHash);
		kjcUserAccountsDao.activateUser(mailHash);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_USER_SUCCESSFULLY_ADED), HttpStatus.OK);
	}
	

	/**
	 * This method sends generated captcha code through image
	 * 
	 * @return Response Entity containing map with captcha code as key and
	 *         hashCode (captcha code which is hashed with sha256) as value and HTTP status
	 */
	@RequestMapping(value = "/captchacode", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getCaptchaCode(HttpServletRequest request) {
		HashMap<String, String> map = new HashMap<>();
		String ipAddress = request.getRemoteAddr();
		KjcGenerics kjcGenerics = kjcGenericsDao.findByKey(AppConstants.GENERICS_CAPTCHA_POOL_SIZE_KEY);
		if (CaptchaCache.getNumberOfItemsInCacheByIp(ipAddress) >= Integer.parseInt(kjcGenerics.getValue())) {
			CaptchaCache.removeOldestCaptchaFromCache(ipAddress);
		}
		Captcha captcha = CaptchaCache.createCaptcha(ipAddress);
		byte[] encoded = Base64.getEncoder().encode(captcha.getImage());
		String captchaCode = new String(encoded);
		map.put("imageBase64", captchaCode);
		map.put("hashedCode", captcha.getHashCode());

		return new ResponseEntity<RestResponseDto>(new RestResponseDto(map, HttpStatus.OK.value()), HttpStatus.OK);
	}
	

	/**
	 * This method returns all available languages that are in use
	 * @return ResponseEntity containing list of available languages and HTTP status code
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/availableLanguages", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllavailableLanguages() {
		HashMap<String, String> listAllLanguages = (HashMap<String, String>) Utilities.getAvailableLocales();
		List<String> listLanguages = kjcResourceBundleDao.getDistinctLanguages();
		HashMap<String, String> listAvailableLanguages = new HashMap<>();
		for (String lagnuage : listLanguages) {
			Iterator it = listAllLanguages.entrySet().iterator();
			while (it.hasNext()) {
				Map.Entry pair = (Map.Entry) it.next();
				if (lagnuage.equals(pair.getKey())) {
					listAvailableLanguages.put((String) pair.getKey(), (String) pair.getValue());
				}
			}
		}
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listAvailableLanguages, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * This method is used for getting details of user who forgot his password
	 * @param mailHash 
	 * @return {@link Map} collection that contains user details
	 */
	@RequestMapping(value = "/userInfo", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getDetails(@RequestParam String mailHash){
		registrationValidation.validationForUserInfo(mailHash);
		KjcUserAccounts kjcUserAccounts = kjcUserAccountsDao.findByMailHash(mailHash);

		HashMap<String, String> map = new HashMap<>();
		map.put("username", kjcUserAccounts.getUsername());
		map.put("email", kjcUserAccounts.getEmail());
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(map, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * This method is used for changing password
	 * @param map {@link Map} collection that contains code and hashCode for captcha and mailHashSecret for authorising user
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/password", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> changePassword(@RequestBody HashMap<String, String> map){
		registrationValidation.validationCaptcha(map.get("code"), map.get("hashCode"));
		registrationValidation.validationForSaveNewPassword(map.get("mailHashSecret"));
		kjcUserAccountsDao.saveNewPassword(map);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_PASSCODE_SUCCESSFULLY_CHANGED), HttpStatus.OK);
	}
	
	/**
	 * Test method sends mail to user. In mail body there are secret code and link 
	 * @param email
	 * @param req
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/forgotPassword", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> sendEmailForPasswordChange(@RequestParam String email, HttpServletRequest req) {

		registrationValidation.validationForSaveMailHash(email);
		Map<String, Object> map = kjcUserAccountsDao.saveMailHash(email);
		int requestUrlLength = req.getRequestURL().length();
		int requestUriLength = req.getRequestURI().length();
		StringBuilder result = new StringBuilder(req.getRequestURL().replace(requestUrlLength - requestUriLength, requestUrlLength, req.getContextPath()));
		KjcUserAccounts kjcUserAccounts = (KjcUserAccounts) map.get(KJC_USER_ACCOUNTS);

		// specific data for each email
		Map<String, Object> templateModel = new HashMap<>();
		templateModel.put("baseUrl", result);
		templateModel.put(KJC_USER_ACCOUNTS, kjcUserAccounts);

		mailService.sendDefaultEmail("kjc_email_configs", "forgot_password_template", kjcUserAccounts.getEmail(), templateModel,
				null);

		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_USER_SUCCESSFULLY_MAIL_SENT), HttpStatus.OK);
	}
	
	/**
	 * This method is used for retrieving css file associated to selected
	 * company.
	 * @param companyCode indicate the selected company
	 * @return the css file
	 */
	@RequestMapping(value = "/company/{companyId}", method = RequestMethod.GET,  produces = "text/css")
	public byte[] getCompanyCss(@PathVariable(value = "companyId") Integer companyId) {

		return companiesService.loadCssStyle(companyId);
	}
	
	/**
	 * This method is used for getting frontend generics
	 * @return {@link Map} of generic
	 */
	@RequestMapping(value = "/frontendGenerics", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getFrontendGenerics(){

		List<KjcGenerics> listaqGenerik = kjcGenericsDao.findFrontendGenerics();
		HashMap<String, Object> map = new HashMap<>();
		for (KjcGenerics kjcGenerics : listaqGenerik) {
			if("Boolean".equals(kjcGenerics.getKeyType())){
				map.put(kjcGenerics.getKey().split("\\.")[2], "true".equals(kjcGenerics.getValue()) ? true : false);
			}else if("Integer".equals(kjcGenerics.getKeyType())){
				map.put(kjcGenerics.getKey().split("\\.")[2], Integer.parseInt(kjcGenerics.getValue()));
			}else{
				map.put(kjcGenerics.getKey().split("\\.")[2], kjcGenerics.getValue());
			}
		}
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(map, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * This method is used for getting company logo
	 * @param id contains id of company
	 * @return byte array of company logo
	 */
	@RequestMapping(value = "/logoImage/{id}", method = RequestMethod.GET, produces = "image/jpeg")
	public byte[] getCompanyLogoImage(@PathVariable Integer id) {
		KjcCompanies kjcCompany = kjcCompaniesDao.findById(id);
		byte[] companyLogo = kjcCompany.getCompanyLogo();
		if(companyLogo == null){
			companyLogo = kjcCompaniesDao.findDefaultCompanyWithCss().getCompanyLogo();
		}
		return companyLogo;
	}
	
	/**
	 * This method is used for getting file from database by generic key
	 * @param key
	 * @return byte array of file
	 */
	@RequestMapping(value = "/file", method = RequestMethod.GET)
	public byte[] getFileByGenerics(@RequestParam String key) {
		KjcGenerics kjcGenerics = kjcGenericsDao.findByKey(key);
		return kjcGenerics == null ? null : kjcGenerics.getFileBlob();
		
	}
	
	/**
	 * This method is used for getting default logo image 
	 * @return default logo as byte array
	 */
	@RequestMapping(value = "/defaultLogo", method = RequestMethod.GET)
	public byte[] getDefaultLogo() {
		KjcCompanies kjcCompanies = kjcCompaniesDao.findDefaultCompanyWithCss();
		byte[] companyLogo = kjcCompanies.getCompanyLogo();
		return companyLogo;
		
	}
	
}