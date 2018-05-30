package com.kirey.kjcore.data.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.LogFactory;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.common.constants.SecurityErrorConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.entity.KjcApplicationRoles;
import com.kirey.kjcore.data.entity.KjcUrlRoutes;
import com.kirey.kjcore.data.entity.KjcUserAccounts;
import com.kirey.kjcore.data.entity.UserAccounts;
import com.kirey.kjcore.features.exception.customexceptions.SecurityUnauthorizedException;
import com.kirey.kjcore.features.security.SecurityUtils;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;

/**
 * Dao object for domain model class KjcUserAccounts.
 */
@Repository(value = "kjcUserAccountsDao")
public class KjcUserAccountsDao extends KjcBaseDao implements UserDetailsService {

	@Autowired
	private CacheManager cacheManager;
	@Autowired
	private SessionFactory sessionFactory;
	@Autowired
	protected BCryptPasswordEncoder passwordEncoder;
	@Autowired
	private UserAccountsDao userAccountDao;
	
	
	@Autowired
	@Qualifier("authenticationManager")
	private AuthenticationManager authManager;
	
	private static final String USERNAME = "username"; 
	private static final String MAIL_HASH_SECRET = "mailHashSecret";
	
	
	public KjcUserAccountsDao() {
		log = LogFactory.getLog(KjcUserAccountsDao.class);
		entityClass=KjcUserAccounts.class;
	}
	
	/* (non-Javadoc)
	 * @see org.springframework.security.core.userdetails.UserDetailsService#loadUserByUsername(java.lang.String)
	 */
	@Override
	@Transactional(readOnly = true)
	public UserDetails loadUserByUsername(String username) {
		KjcUserAccounts user = (KjcUserAccounts) sessionFactory.getCurrentSession()
				.createCriteria(KjcUserAccounts.class).add(Restrictions.eq(USERNAME, username)).uniqueResult();
		if (null == user)
			throw new UsernameNotFoundException(SecurityErrorConstants.ERROR_SECURITY_USER_NOT_FOUND + username);
		
		return user;
	}
	

	/**A method used to extract user from database using username
	 * @param username
	 * @return KjcUserAccounts with received username
	 */
	@Transactional(readOnly = true)
	public KjcUserAccounts findByUsername(String username) {
		return (KjcUserAccounts) sessionFactory.getCurrentSession()
				.createCriteria(KjcUserAccounts.class).add(Restrictions.eq(USERNAME, username)).uniqueResult();
	}
	

	/**A method used to extract fake user instance from database using username
	 * @param username
	 * @return KjcUserAccounts with received username
	 */
	@Transactional(readOnly = true)
	public KjcUserAccounts getFakeUserByUsername(String username) {
		return (KjcUserAccounts) sessionFactory.getCurrentSession()
				.createCriteria(KjcUserAccounts.class).add(Restrictions.like(USERNAME, username, MatchMode.START))
				.uniqueResult();
	}
	

	/**A method used to extract user from database using user token
	 * @param token
	 * @return KjcUserAccounts with received token
	 */
	@Cacheable(cacheNames = "security")
	@Transactional(readOnly = true)
	public KjcUserAccounts getUserByToken(String token) {
		return (KjcUserAccounts) sessionFactory.getCurrentSession().createCriteria(KjcUserAccounts.class)
				.add(Restrictions.eq("token", token)).uniqueResult();
	}
	
	/**A method used to extract user from database using user mobileToken
	 * @param token
	 * @return KjcUserAccounts with received mobileToken
	 */
//	@Cacheable(cacheNames = "securityMobile")
	@Transactional(readOnly = true)
	public KjcUserAccounts getUserByMobileToken(String mobileToken) {
		return (KjcUserAccounts) sessionFactory.getCurrentSession().createCriteria(KjcUserAccounts.class)
				.add(Restrictions.eq("mobileToken", mobileToken)).uniqueResult();
	}
	

	/**A method that returns number of all users in database
	 * @return long number of users
	 */
	@Transactional(readOnly = true)
	public Long countUsers() {
		return ((Long) sessionFactory.getCurrentSession().createCriteria(KjcUserAccounts.class)
				.setProjection(Projections.rowCount()).uniqueResult()).longValue();
	}

	/**
	 * This method is used for editing user account
	 * @param instance
	 * @param oldToken
	 */
	@Transactional
	public void editUser(KjcUserAccounts instance, String oldToken) {
		KjcUserAccounts existingUser = this.findById(instance.getId());
		existingUser.setUsername(instance.getUsername());
		existingUser.setFirstName(instance.getFirstName());
		existingUser.setLastName(instance.getLastName());
		existingUser.setSecurityNumber(instance.getSecurityNumber());
		existingUser.setEmail(instance.getEmail());
		existingUser.setDefaultLanguage(instance.getDefaultLanguage());
		existingUser.setAccountExpiryDate(instance.getAccountExpiryDate());
		existingUser.setTokenTimestamp(instance.getTokenTimestamp());
		existingUser.setEnabled(instance.isEnabled());
		existingUser.setKjcApplicationRoleses(instance.getKjcApplicationRoleses());
		existingUser.setKjcCompanies(instance.getKjcCompanies());
		existingUser.setTimeout(instance.getTimeout());
		existingUser.setToken(null);
		this.saveToken(existingUser, oldToken);
		if(instance.getPassword() != null){
			existingUser.setPassword(instance.getPassword());
			this.changePassword(existingUser);
		}
//		userAccountDao.merge(instance.getUserAccounts());
	}

	/**A method used to save new token to a user account to database
	 * @param instance
	 * @param oldToken
	 */
	@Transactional
	public void saveToken(KjcUserAccounts instance, String oldToken) {
		Cache cache = cacheManager.getCache("security");
		cache.remove(oldToken);
		Element element = new Element(instance.getToken(), instance);
		cache.put(element);
		this.merge(instance);	
	}
	
	/**A method used to save new token to a user account to database
	 * @param instance
	 * @param oldToken
	 */
	@Transactional
	public void saveMobileToken(KjcUserAccounts instance, String oldToken) {
		Cache cache = cacheManager.getCache("securityMobile");
		cache.remove(oldToken);
		Element element = new Element(instance.getToken(), instance);
		cache.put(element);
		this.merge(instance);	
	}


	/**A method that changes user token and logs out user automaticaly
	 * @param user
	 */
	@Transactional
	@CacheEvict(cacheNames = "security", key = "#user.token")
	public void logoutUser(KjcUserAccounts user) {
			KjcUserAccounts userInSession = this.findById(user.getId());
			userInSession.setToken(null);
	}
	
	/**A method that changes user token and logs out user automaticaly
	 * @param user
	 */
	@Transactional
//	@CacheEvict(cacheNames = "securityMobile", key = "#user.mobileToken")
	public void logoutMobileUser(KjcUserAccounts user) {
			KjcUserAccounts userInSession = this.findById(user.getId());
			userInSession.setMobileToken(null);
			userInSession.setFirebaseToken(null);
	}
	

	/**A method that finds routes related to received user from database
	 * @param user
	 * @return List<KjcUrlRoutes> containing all routes allowed to the account's role
	 */
	@Transactional (readOnly = true)
	public List<KjcUrlRoutes> findRoutesByUser(KjcUserAccounts user) {
		List<KjcApplicationRoles> userRoles = user.getKjcApplicationRoleses();
		List<KjcUrlRoutes> userRouts = new ArrayList<>();
		for (KjcApplicationRoles userRole : userRoles) {
			for (int i = 0; i < userRole.getKjcUrlRouteses().size(); i++) {
				if (!userRouts.contains(userRole.getKjcUrlRouteses().get(i)))
					userRouts.add(userRole.getKjcUrlRouteses().get(i));
			}
		}
		return userRouts;
	}


	/**A method used to change default language to a user
	 * @param detachedInstance
	 */
	@CacheEvict(cacheNames = "security", key = "#detachedInstance.token")
	@Transactional
	public void changeDefaultLanguage(KjcUserAccounts detachedInstance) {
		KjcUserAccounts userInSession = this.findById(detachedInstance.getId());
		userInSession.setDefaultLanguage(detachedInstance.getDefaultLanguage());
	}
	
	/**A method used to change password to user
	 * @param detachedInstance
	 */
	@Transactional
	public void changePassword(KjcUserAccounts detachedInstance){
		KjcUserAccounts userInSession = this.findById(detachedInstance.getId());
		String unEcryptedPassword = detachedInstance.getPassword();
		String encryptedPassord = passwordEncoder.encode(unEcryptedPassword);
		userInSession.setPassword(encryptedPassord);
		userInSession.setPasswordTimestamp(new Date().getTime());
	}	
		
	/**A method used to change user password when user is changing password, so it doesn't log out automatically
	 * This method updates both database and cache
	 * @param oldNewPass
	 */
	@Transactional
	public void changePasswordByUser(Map<String, String> oldNewPass){
		KjcUserAccounts contextUser = Utilities.getUserFromContext();
		KjcUserAccounts kjcUserAccountsForEdit = this.findById(contextUser.getId());
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
				contextUser.getUsername(), oldNewPass.get("oldPassword"));
		
		try {
			authManager.authenticate(authenticationToken);
		} catch (AuthenticationException e) {
			throw new SecurityUnauthorizedException(
					SecurityErrorConstants.ERROR_CODE_SECURITY_EDIT_DETAILS_BAD_CREDENTIALS,
					SecurityErrorConstants.ERROR_SECURITY_EDIT_DETAILS_BAD_CREDENTIALS);
		}
		
		String unEcryptedPassword = oldNewPass.get("newPassword");
		String encryptedPassord = passwordEncoder.encode(unEcryptedPassword);
		kjcUserAccountsForEdit.setPassword(encryptedPassord);
		kjcUserAccountsForEdit.setPasswordTimestamp(new Date().getTime());
		
		Cache cache = cacheManager.getCache("security");
		cache.remove(kjcUserAccountsForEdit.getToken());
	}

	/**A method used to extract user from database using email
	 * @param email
	 * @return KjcUserAccounts with received email
	 */
	@Transactional(readOnly = true)
	public KjcUserAccounts findByEmail(String email) {
		return (KjcUserAccounts) sessionFactory.getCurrentSession().createCriteria(KjcUserAccounts.class).add(Restrictions.eq("email", email)).uniqueResult();
	}

	/**A method used to extract user from database by mail hash secret
	 * @param mailHashSecret
	 * @return KjcUserAccounts with received mail hash secret
	 */
	@Transactional(readOnly = true)
	public KjcUserAccounts findBySecretHash(String mailHashSecret) {
		return (KjcUserAccounts) sessionFactory.getCurrentSession().createCriteria(KjcUserAccounts.class).add(Restrictions.eq(MAIL_HASH_SECRET, mailHashSecret)).uniqueResult();
	}

	/**A method used to extract user from database using mail hash
	 * @param mailHash
	 * @return KjcUserAccounts with received mail hash
	 */
	@Transactional(readOnly = true)
	public KjcUserAccounts findByMailHash(String mailHash) {
		return (KjcUserAccounts) sessionFactory.getCurrentSession().createCriteria(KjcUserAccounts.class).add(Restrictions.eq("mailHash", mailHash)).uniqueResult();
	}

	/**A method used to extract all emails from database
	 * @return List<String> containing all user emails in database
	 */
	@Transactional(readOnly = true)
	public List<String> findAllEmails() {
		return sessionFactory.getCurrentSession().createCriteria(KjcUserAccounts.class).setProjection(Projections.property("email")).list();
	}
	
	/**A method used to save a new password. This method encrypts input password and saves it to a user account in database
	 * @param kjcUserAccounts
	 */
	@Transactional
	public void saveNewUserEncryptPassword(KjcUserAccounts kjcUserAccounts) {		
		kjcUserAccounts.setPasswordTimestamp(new Date().getTime());
		String unEcryptedPassword = kjcUserAccounts.getPassword();
		String encryptedPassord = passwordEncoder.encode(unEcryptedPassword);
		kjcUserAccounts.setPassword(encryptedPassord);
		this.attachDirty(kjcUserAccounts);
		this.saveUserAccount(kjcUserAccounts);
	}
	
	/**
	 * Method is used to save UserAccount
	 * @param kjcUserAccount is an object which is in oneToOne relationship with UserAccount
	 */
	@Transactional
	public void saveUserAccount(KjcUserAccounts kjcUserAccount){
		UserAccounts userAccount = new UserAccounts();
		userAccount.setKjcUserAccounts(kjcUserAccount);
		
		userAccountDao.attachDirty(userAccount);
	}
	
	/**A method used to save mail hash to user using email
	 * @param email
	 * @return Map<String, Object> containing mailhash, mailhash secret and user
	 */
	@Transactional
	public Map<String, Object> saveMailHash(String email) {
		HashMap<String, Object> map = new HashMap<>();
		KjcUserAccounts kjcUserAccounts = findByEmail(email);
		String mailHash = SecurityUtils.createToken(kjcUserAccounts);
		kjcUserAccounts.setMailHash(mailHash);
		kjcUserAccounts.setMailHashTimestamp(new Date().getTime());
		String mailHashSecret = SecurityUtils.createMailHashSecret(kjcUserAccounts);
		kjcUserAccounts.setMailHashSecret(mailHashSecret);
		map.put("mailHash", mailHash);
		map.put(MAIL_HASH_SECRET, mailHashSecret);
		map.put("kjcUserAccounts", kjcUserAccounts);
		return map;
	}

	/**A method used to save new password to user
	 * @param map
	 */
	@Transactional
	public void saveNewPassword(Map<String, String> map) {
		KjcUserAccounts kjcUserAccounts = findBySecretHash(map.get(MAIL_HASH_SECRET));
		String unEcryptedPassword = map.get("password");
		String encryptedPassord = passwordEncoder.encode(unEcryptedPassword);
        kjcUserAccounts.setMailHashSecret(null);
		kjcUserAccounts.setPassword(encryptedPassord);
		kjcUserAccounts.setPasswordTimestamp(new Date().getTime());		
	}

	/**A method used to change user status to enabled
	 * @param mailHash
	 */
	@Transactional
	public void activateUser(String mailHash) {
		KjcUserAccounts kjcUserAccounts = findByMailHash(mailHash);
		kjcUserAccounts.setEnabled(true);
	}
	
	/**A method used to find all user accounts with certain filter. Filters could be company id, role or username. 
	 * If all of the above are inserted, it will find user that has that username only if he belongs to the company forwarded 
	 * and has a role forwarded. If just one of the params are filled in, it will querry by that param
	 * @param company
	 * @param role
	 * @param username
	 * @return List<KjcUserAccounts> containing users who fit the filters
	 */
	@Transactional
	public List<KjcUserAccounts> findFiltered(Integer companyId, String role, String username) {
		StringBuilder hqlSB = new StringBuilder();
		hqlSB.setLength(0);
		hqlSB.append("select ua from KjcUserAccounts ua ");
		if(!"".equals(role)){
			if(hqlSB.toString().endsWith("KjcUserAccounts ua ")){
				hqlSB.append("where ua.id in ");
			}else
				hqlSB.append(" and ua.id in ");
			hqlSB.append("(select uar.id from KjcApplicationRoles ar join ar.kjcUserAccountses uar where ar.name = '");
			hqlSB.append(role);
			hqlSB.append("')");
		}
		if(companyId != null){
			if(hqlSB.toString().endsWith("KjcUserAccounts ua ")){
				hqlSB.append("where ");
			}else
				hqlSB.append(" and ");
			hqlSB.append("ua.kjcCompanies = ");
			hqlSB.append(companyId);
		}
		if(!"".equals(username)){
			if(hqlSB.toString().endsWith("KjcUserAccounts ua ")){
				hqlSB.append("where upper(ua.username) like '");
			}else
				hqlSB.append(" and upper(ua.username) like '");
			hqlSB.append(username.toUpperCase());
			hqlSB.append("%'");
		}
		Query query = this.sessionFactory.getCurrentSession().createQuery(hqlSB.toString());
		List<KjcUserAccounts> listKjcUserAccounts = query.list();
		
		return listKjcUserAccounts;
	}
	
	/**
	 * A method used to find all user accounts that belongs to a company without the fake ones.
	 * 
	 * @param companyId
	 *            - specifies the company id
	 * @return List<KjcUserAccounts> containing users with username, first name
	 *         and last name populated
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<KjcUserAccounts> findAllUsersNamesWithoutFakeByCompanyId(Integer companyId) {
		try {
			return (List<KjcUserAccounts>) sessionFactory.getCurrentSession().createCriteria(KjcUserAccounts.class)
					.setProjection(Projections.projectionList().add(Projections.property("id"), "id")
							.add(Projections.property("username"), "username")
							.add(Projections.property("firstName"), "firstName")
							.add(Projections.property("lastName"), "lastName"))
					.add(Restrictions.eq("kjcCompanies.id", companyId))
					.add(Restrictions.not(Restrictions.like("username", "fakeUser", MatchMode.START)))
					.setResultTransformer(Transformers.aliasToBean(KjcUserAccounts.class)).list();

		} catch (RuntimeException re) {
			throw re;
		}
	}
	
	/**
	 * A method used for test sending alert job
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<KjcUserAccounts> findTopTenUsers(){
		
		List<KjcUserAccounts> results = sessionFactory.getCurrentSession().createCriteria(KjcUserAccounts.class).setMaxResults(50).list();
		return results;
	}

}
