package com.kirey.wscm.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.Categories;

@Repository(value = "categoriesDao")
public class CategoriesDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public CategoriesDao() {
		log = LogFactory.getLog(CategoriesDao.class);
		entityClass = Categories.class;
	}

	public List<Categories> findCategoriesByIp(String ipAddress) {
		String hql = "select ipc.categories from IpAddressCategories ipc where ipc.ipAddress.address = :ip";
		List<Categories> listCat = sessionFactory.getCurrentSession().createQuery(hql).setParameter("ip", ipAddress).list();
		return listCat;
	}

}
