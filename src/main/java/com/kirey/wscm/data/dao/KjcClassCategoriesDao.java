package com.kirey.wscm.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.wscm.data.entity.KjcClassCategories;


/**
 * Dao object for domain model class KjcClassCategories.
 */

@Repository(value = "kjcClassCategoriesDao")
public class KjcClassCategoriesDao extends KjcBaseDao{
	
	@Autowired
	private SessionFactory sessionFactory;

	public KjcClassCategoriesDao() {
		log = LogFactory.getLog(KjcClassCategoriesDao.class);
		entityClass=KjcClassCategories.class;
	}
	
	/**A method used to extract class category by name from database
	 * @param name
	 * @return KjcClassCategories with name received
	 */
	@Transactional(readOnly = true)
	public KjcClassCategories findByName(String name) {
			KjcClassCategories instance = (KjcClassCategories) sessionFactory.getCurrentSession().createCriteria(KjcClassCategories.class)
			.add(Restrictions.eq("name", name)).uniqueResult();
			return instance;

	}
	

	/**A method used to extract all category names from database
	 * @return List<String> containing category names
	 */
	@Transactional(readOnly = true)
	public List<String> findAllCategoryNames() {
		return sessionFactory.getCurrentSession().createCriteria(KjcClassCategories.class).setProjection(Projections.property("name")).list();
	}

	/**A method used to edit existing category in database
	 * @param kjcClassCategories
	 */
	@Transactional
	public void editCategory(KjcClassCategories kjcClassCategories) {
		KjcClassCategories kjcClassCategoriesForEdit = this.findById(kjcClassCategories.getId());
		kjcClassCategoriesForEdit.setName(kjcClassCategories.getName());
	}

	/**A method used for extraction all category names from database except for the received name
	 * @param kjcClassCategories
	 * @return List<String> containing all category names but received name
	 */
	@Transactional(readOnly = true)
	public List<String> findAllCategoryNamesWithoutOne(KjcClassCategories kjcClassCategories) {
		return sessionFactory.getCurrentSession().createCriteria(KjcClassCategories.class).add(Restrictions.not(Restrictions.eq("id", kjcClassCategories.getId()))).setProjection(Projections.property("name")).list();
	}
		
}
