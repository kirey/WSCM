package com.kirey.kjcore.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.entity.KjcApplicationRoles;
import com.kirey.wscm.common.constants.AppConstants;

/**
 * Dao object for domain model class KjcApplicationRoles.
 */
@Repository(value = "amApplicationRolesDao")
public class KjcApplicationRolesDao extends KjcBaseDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	public KjcApplicationRolesDao() {
		log = LogFactory.getLog(KjcApplicationRolesDao.class);
		entityClass=KjcApplicationRoles.class;
	}

	/**A method used to get application role by name
	 * @param name
	 * @return KjcApplicationRoles with received name
	 */
	@Transactional
	public KjcApplicationRoles findByName(String name) {
		return (KjcApplicationRoles) sessionFactory.getCurrentSession().createCriteria(KjcApplicationRoles.class).add(Restrictions.eq("name", name)).uniqueResult();
	}
	
	/**A method used to get all application roles except for the role with received id
	 * @param id
	 * @return List<KjcApplicationRoles> containing all roles except for the role with received id
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<KjcApplicationRoles> findAllWithoutOne(Integer id){
		return sessionFactory.getCurrentSession().createCriteria(KjcApplicationRoles.class).add(Restrictions.not(Restrictions.eq("id", id))).list();
	}
	
	/**
	 * This method is used to get all application roles except ROLE_SUPER_ADMIN
	 * @return List<KjcApplicationRoles> containing all roles except for the role with name ROLE_SUPER_ADMIN
	 */
	@Transactional
	public List<KjcApplicationRoles> findAllWithoutSuperAdmin(){
		return sessionFactory.getCurrentSession().createCriteria(KjcApplicationRoles.class).add(Restrictions.not(Restrictions.eq("name", AppConstants.ROLE_SUPER_ADMIN))).list();
	}
	
	/**A method used to update existing application role
	 * @param kjcApplicationRoles
	 */
	@Transactional
	public void updateRole(KjcApplicationRoles kjcApplicationRoles){
		KjcApplicationRoles kjcApplicationRolesForEdit = findById(kjcApplicationRoles.getId());
		kjcApplicationRolesForEdit.setName(kjcApplicationRoles.getName());
		kjcApplicationRolesForEdit.setTimeout(kjcApplicationRoles.getTimeout());
	}
}
