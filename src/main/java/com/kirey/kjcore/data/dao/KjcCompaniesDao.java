package com.kirey.kjcore.data.dao;

import java.util.Date;
import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.entity.KjcApplicationRoles;
import com.kirey.kjcore.data.entity.KjcCompanies;
import com.kirey.kjcore.data.entity.KjcUserAccounts;

/**
 * Dao object for domain model class KjcCompanies.
 */
@Repository(value = "kjcCompaniesDao")
public class KjcCompaniesDao extends KjcBaseDao {

	@Autowired
	private SessionFactory sessionFactory;

	public KjcCompaniesDao() {
		log = LogFactory.getLog(KjcCompaniesDao.class);
		entityClass = KjcCompanies.class;
	}

	/**
	 * This method returns the KjcCompanies object from database using the
	 * argument code.
	 * 
	 * @param code
	 *            specifies the company code.
	 * @return KjcCompanies object from the database.
	 */
	@Transactional
	public KjcCompanies findByCompanyCode(String code) {
		String hql = "Select k from KjcCompanies k where k.code = :code";
		return (KjcCompanies) sessionFactory.getCurrentSession().createQuery(hql).setParameter("code", code).uniqueResult();
	}
	

	/**
	 * This method returns the KjcCompanies object list along with the css
	 * settings
	 * 
	 * @param companyId
	 *            specifies the company that we do not want retrieved.
	 * 
	 * @return KjcCompanies object list from the database.
	 * @throws RuntimeException
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<KjcCompanies> findAllWithoutOne(int companyId) {
		try {
			String hql = "select distinct(c) from KjcCompanies c left join fetch c.kjcCompanyCsses css where c.id!=:id order by css.tsUpdate desc";
			return (List<KjcCompanies>) sessionFactory.getCurrentSession().createQuery(hql)
					.setParameter("id", companyId).list();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	/**
	 * This method returns the KjcCompanies object along with the css settings
	 * using the argument companyId.
	 * 
	 * @param companyId
	 *            specifies the company id.
	 * 
	 * @return KjcCompanies object from the database.
	 * @throws RuntimeException
	 */
	@Transactional
	public KjcCompanies findByIdWithCss(int companyId) {
		try {
			String hql = "select distinct(c) from KjcCompanies c left join fetch c.kjcCompanyCsses css where c.id=:id order by css.tsUpdate desc";
			return (KjcCompanies) sessionFactory.getCurrentSession().createQuery(hql).setParameter("id", companyId)
					.uniqueResult();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	/**
	 * This method returns the default company along with the css settings
	 * 
	 * @return KjcCompany object from the database.
	 * @throws RuntimeException
	 */
	@Transactional
	public KjcCompanies findDefaultCompanyWithCss() {
		try {
			String hql = "select distinct(c) from KjcCompanies c left join fetch c.kjcCompanyCsses css where c.code=:code order by css.tsUpdate desc";
			return (KjcCompanies) sessionFactory.getCurrentSession().createQuery(hql)
					.setParameter("code", AppConstants.DEFAULT_COMPANY_CODE).uniqueResult();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	/**
	 * This method changes flActiv = status using the arguments id and status
	 * 
	 * @param id
	 *            specifies the company id.
	 * @param status
	 *            specifies the desired status 
	 * @throws RuntimeException
	 */
	@CacheEvict(value = "companiesForSuperadmin", allEntries = true)
	@Transactional
	public void changeCompanyStatus(int id, boolean status) {
		try {
			String hql = "update KjcCompanies set flActive =:flActive, utUpdate = :utUpdate, tsUpdate = :tsUpdate where id =:id";
			sessionFactory.getCurrentSession().createQuery(hql).setParameter("flActive", status)
					.setParameter("utUpdate", Utilities.getUserFromContext().getId())
					.setParameter("tsUpdate", new Date()).setParameter("id", id).executeUpdate();
		} catch (RuntimeException re) {
			throw re;
		}

	}
	
}
