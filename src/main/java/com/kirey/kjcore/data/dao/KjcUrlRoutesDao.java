package com.kirey.kjcore.data.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.entity.KjcApplicationRoles;
import com.kirey.kjcore.data.entity.KjcUrlRoutes;
import com.kirey.kjcore.data.entity.KjcUserAccounts;

/**
 * Dao object for domain model class KjcUrlRoutes.
 */
@Repository(value = "kjcUrlRoutesDao")
public class KjcUrlRoutesDao extends KjcBaseDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	public KjcUrlRoutesDao() {
		log = LogFactory.getLog(KjcUrlRoutesDao.class);
		entityClass=KjcUrlRoutes.class;
	}

	/**A method used for extracting all routes related to user received
	 * @param user
	 * @return List<KjcUrlRoutes> containing routes related to user received
	 */
	@Transactional
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

	/**A method used to extract route having received url
	 * @param url
	 * @return KjcUrlRoutes with received url
	 */
	@Transactional
	public KjcUrlRoutes findRoutesByUrl(String url) {
		return (KjcUrlRoutes) sessionFactory.getCurrentSession().createCriteria(KjcUrlRoutes.class).add(Restrictions.eq("url", url)).uniqueResult();
	}
	
    /**A method used to extract all routes except for route with received id
     * @param id
     * @return List<KjcUrlRoutes> containing all routes but the one with id forwarded as param
     */
    @SuppressWarnings("unchecked")
	@Transactional
    public List<KjcUrlRoutes> findAllWithoutOne(Integer id){
        return sessionFactory.getCurrentSession().createCriteria(KjcUrlRoutes.class).add(Restrictions.not(Restrictions.eq("id", id))).list();
    }
    
    /**A method used to update route in database
     * @param kjcUrlRoutes
     */
    @Transactional
    public void updateRoute(KjcUrlRoutes kjcUrlRoutes){
    	KjcUrlRoutes kjcUrlRoutesForEdit = findById(kjcUrlRoutes.getId());
    	kjcUrlRoutesForEdit.setUrl(kjcUrlRoutes.getUrl());
    	kjcUrlRoutesForEdit.setDescription(kjcUrlRoutes.getDescription());
    	kjcUrlRoutesForEdit.setKjcApplicationRoleses(kjcUrlRoutes.getKjcApplicationRoleses());
    }
    

}
