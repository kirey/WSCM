package com.kirey.kjcore.data.dao;

import java.util.Date;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.entity.KjcCompanyCss;

/**
 * Dao object for domain model class KjcCompanyCss.
 */
@Repository(value = "kjcCompanyCssDao")
public class KjcCompanyCssDao extends KjcBaseDao {

	@Autowired
	private SessionFactory sessionFactory;

	public KjcCompanyCssDao() {
		log = LogFactory.getLog(KjcCompanyCssDao.class);
		entityClass = KjcCompanyCss.class;
	}

	/**
	 * This method returns the active css settings from database default company
	 * code.
	 * 
	 * @return KjcCompanyCss object from the database.
	 * @throws RuntimeException
	 */
	@Transactional
	public KjcCompanyCss findDefaultActiveCss() {
		try {
			String hql = "select defCss from KjcCompanyCss defCss where defCss.kjcCompanies.code = :code and defCss.tsUpdate = (select max(css.tsUpdate) from KjcCompanyCss css where css.kjcCompanies.code=:code)";
			return (KjcCompanyCss) sessionFactory.getCurrentSession().createQuery(hql)
					.setParameter("code", AppConstants.DEFAULT_COMPANY_CODE).uniqueResult();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	/**
	 * This method returns the active css settings from database using the
	 * argument companyId.
	 * 
	 * @param companyId
	 *            specifies the company id
	 * @return KjcCompanyCss object from the database.
	 * @throws RuntimeException
	 */
	@Transactional
	public KjcCompanyCss findActiveCss(Integer companyId) {
		try {
			String hql = "select activeCss from KjcCompanyCss activeCss where activeCss.kjcCompanies.id=:companyId and activeCss.tsUpdate = (select max(css.tsUpdate) from KjcCompanyCss css where css.kjcCompanies.id=:companyId)";
			return (KjcCompanyCss) sessionFactory.getCurrentSession().createQuery(hql)
					.setParameter("companyId", companyId).uniqueResult();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	/**
	 * This method deletes from KJC_COMPANY_CSS table using the argument id
	 * company id.
	 * 
	 * @param companyId
	 *            specifies the company id
	 * @throws RuntimeException
	 */
	@Transactional
	public void deleteAllCompanyCss(Integer companyId) {
		try {
			String hql = "delete KjcCompanyCss css where css.kjcCompanies.id =:companyId";
			sessionFactory.getCurrentSession().createQuery(hql).setParameter("companyId", companyId).executeUpdate();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	/**
	 * This method updates the oldest row (the previous css settings) from
	 * KJC_COMPANY_CSS table setting tsUpdate = new Date() using the arguments.
	 * company id
	 * 
	 * @param companyId
	 *            specifies the company id
	 * @throws RuntimeException
	 */
	@Transactional
	public void resetToPreviousCss(int companyId) {
		try {
			String hql = "update KjcCompanyCss set tsUpdate=:tsUpdate where kjcCompanies.id=:companyId and tsUpdate = (select min(css.tsUpdate) from KjcCompanyCss css where css.kjcCompanies.id=:companyId)";
			sessionFactory.getCurrentSession().createQuery(hql).setParameter("tsUpdate", new Date())
					.setParameter("companyId", companyId).executeUpdate();
		} catch (RuntimeException re) {
			throw re;
		}

	}

	/**
	 * This method updates all the active css settings for all companies using
	 * the arguments cssId.
	 * 
	 * @param cssId
	 *            specifies id of css settings
	 * @param cssData
	 *            the default css settings
	 * @throws RuntimeException
	 */
	@Transactional
	public void updateInDefaultCss(Integer cssId, String cssData) {
		try {
			String hql = "update KjcCompanyCss css set css.utUpdate=:utUpdate, css.tsUpdate=:tsUpdate, css.cssData=:cssData where css.id=:cssId";
			sessionFactory.getCurrentSession().createQuery(hql)
					.setParameter("utUpdate", Utilities.getUserFromContext().getId())
					.setParameter("tsUpdate", new Date()).setParameter("cssData", cssData).setParameter("cssId", cssId)
					.executeUpdate();
		} catch (RuntimeException re) {
			throw re;
		}

	}
}
