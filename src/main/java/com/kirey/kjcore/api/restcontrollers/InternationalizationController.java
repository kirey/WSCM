package com.kirey.kjcore.api.restcontrollers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.ResponseMessagesConstants;
import com.kirey.kjcore.common.constants.SecurityErrorConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.dao.KjcUserAccountsDao;
import com.kirey.kjcore.data.entity.KjcUserAccounts;
import com.kirey.kjcore.features.internationalization.Translation;

import net.sf.ehcache.CacheManager;

/**Rest controller used for internationalization
 * @author 
 *
 */
@DependsOn("translation")
@RestController
@RequestMapping(value = "/rest/translation", produces = "application/json; charset=UTF-8")
public class InternationalizationController {
	
	@Autowired
	private KjcUserAccountsDao kjcUserAccountsDao;
	
	@Autowired
	private Translation translation;
	
	@Autowired
	CacheManager cacheManager;

	/**
	 * This method is used for get static translations for specific module (page)
	 * @param moduleName
	 * @return ResponseEntity containing map with translation and HTTP status
	 */
	@RequestMapping(value = "/fe/{moduleName}", method = RequestMethod.GET)
	public ResponseEntity<Map<String, String>> getFrontEndTranslation
										(@PathVariable(value = "moduleName") String moduleName) {
		
		Map<String, String> map = translation.findFrontEndTranslation(moduleName);
		return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);
	}
	
	/**
	 * This method is used for change user's default language 
	 * @param langCode
	 * @return ResponseEntity containing response message and HTTP status
	 */
	@RequestMapping(value = "/languages/{langCode}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> changeUserDefaultLanguage(
			@PathVariable(value = "langCode") String langCode) {

		KjcUserAccounts kjcUserAccounts = Utilities.getUserFromContext();
		kjcUserAccounts.setDefaultLanguage(langCode);
		kjcUserAccountsDao.changeDefaultLanguage(kjcUserAccounts);

		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(),ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_LANGUAGE_CHANGED_SUCCESSFULLY), HttpStatus.OK);
	}
	
	/**
	 * This method returns translation for pages which does not require authentication
	 * @param moduleName 
	 * @return ResponseEntity containing response message and HTTP status
	 */
	@RequestMapping(value = "/fe/noAuth/{moduleName}", method = RequestMethod.GET)
	public ResponseEntity<Object> getTranslations(@PathVariable String moduleName){	
		if("login".equals(moduleName) || "registration".equals(moduleName) || "passwordChange".equals(moduleName) || "activateUser".equals(moduleName)){
			Map<String, String> map = translation.findFrontEndTranslation(moduleName);
			return new ResponseEntity<Object>(map, HttpStatus.OK);
		}else
			return new ResponseEntity<Object>(new RestResponseDto(HttpStatus.UNAUTHORIZED.value(), SecurityErrorConstants.ERROR_SECURITY_UNAUTORIZED), HttpStatus.UNAUTHORIZED);
	}
	
}