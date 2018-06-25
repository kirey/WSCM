package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.UserCategories;
import com.kirey.wscm.data.entity.WscmUserAccounts;

/**
 * @author paunovicm
 *
 */

@Repository(value = "userCategoriesDao")
public class UserCategoriesDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public UserCategoriesDao() {
		log = LogFactory.getLog(UserCategoriesDao.class);
		entityClass = UserCategories.class;
	}

	/**
	 * Method for getting {@link Categories} by user id and max weight
	 * @param user
	 * @return {@link Categories}
	 */
	public Categories findCategoryByUserMaxWeight(WscmUserAccounts user) {
		String hql = "select uc.categories from UserCategories uc where uc.userAccount.id = :userId and uc.weight in (select max(ucc.weight) from UserCategories ucc)";
		Categories category = (Categories) sessionFactory.getCurrentSession().createQuery(hql).setParameter("userId", user.getId()).uniqueResult();
		return category;
	}

}
