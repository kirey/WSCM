package com.kirey.kjcore.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.data.entity.KjcEmailTemplates;

/**
 * Dao object for domain model class KjcEmailTemplates.
 */
@Repository(value = "kjcEmailTemplatesDao")
public class KjcEmailTemplatesDao extends KjcBaseDao{
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public KjcEmailTemplatesDao() {
		log = LogFactory.getLog(KjcEmailTemplatesDao.class);
		entityClass=KjcEmailTemplates.class;
	}

	/**A method used to save new email template into database
	 * @param transientInstance
	 * @throws RuntimeException
	 */
	@CacheEvict(value = "emailTemplateCache", allEntries = true)
	@Transactional
	public void persist(KjcEmailTemplates transientInstance) {
		log.debug("persisting KjcEmailTemplates instance");
		try {
			sessionFactory.getCurrentSession().persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	/**A method used to edit an old or save new email template into database
	 * @param instance
	 * @throws RuntimeException
	 */
	@CacheEvict(value = "emailTemplateCache", allEntries = true)
	@Transactional
	public void attachDirty(KjcEmailTemplates instance) {
		log.debug("attaching dirty KjcEmailTemplates instance");
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	/**A method used to delete email template from database
	 * @param persistentInstance
	 * @throws RuntimeException
	 */
	@CacheEvict(value = "emailTemplateCache", allEntries = true)
	@Transactional
	public void delete(KjcEmailTemplates persistentInstance) {
		log.debug("deleting KjcEmailTemplates instance");
		try {
			sessionFactory.getCurrentSession().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	/**A method used to update email template in database
	 * @param detachedInstance
	 * @return KjcEmailTemplates updated template
	 * @throws RuntimeException
	 */
	@CacheEvict(value = "emailTemplateCache", allEntries = true)
	@Transactional
	public KjcEmailTemplates merge(KjcEmailTemplates detachedInstance) {
		log.debug("merging KjcEmailTemplates instance");
		try {
			KjcEmailTemplates result = (KjcEmailTemplates) sessionFactory.getCurrentSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	/**A method used for finding all templates and inline resource templates from database
	 * @return List<KjcEmailTemplates> containing all template and resource info from database
	 * @throws RuntimeException
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<KjcEmailTemplates> findAllTemplatesWithResources() {
		try {
			String hql = "select distinct(template) from KjcEmailTemplates template left join fetch template.kjcInlineResourceTemplateses";
			List<KjcEmailTemplates> results = (List<KjcEmailTemplates>) sessionFactory.getCurrentSession()
					.createQuery(hql).list();
			return results;
		} catch (RuntimeException re) {
			throw re;
		}
	}


	/**A method used to find email template by name
	 * @param name
	 * @return KjcEmailTemplates with name received
	 * @throws RuntimeException
	 */
	@Transactional(readOnly = true)
	public KjcEmailTemplates findByTemplateName(String name) {
		log.debug("finding KjcEmailTemplates instance by name");
		try {
			KjcEmailTemplates instance = ((KjcEmailTemplates) sessionFactory.getCurrentSession()
					.createCriteria(KjcEmailTemplates.class).add(Restrictions.eq("name", name)).uniqueResult());
			if (instance == null) {
				log.debug("get successful, no instance found");
			} else {
				log.debug("get successful, instance found");
			}
			return instance;
		} catch (RuntimeException re) {
			log.error("find by name failed", re);
			throw re;
		}
	}

	/**A method used to extract email template and related resources from database by template id
	 * @param id 
	 * @return KjcEmailTemplates with id received
	 * @throws RuntimeException
	 */
	@Transactional
	public KjcEmailTemplates findByTemplateIdWithResources(Integer id) {
		try {
			String hql = "select distinct(template) from KjcEmailTemplates template left join fetch template.kjcInlineResourceTemplateses where template.id = :id";
			KjcEmailTemplates result = (KjcEmailTemplates) sessionFactory.getCurrentSession().createQuery(hql)
					.setParameter("id", id).uniqueResult();
			return result;
		} catch (RuntimeException re) {
			throw re;
		}
	}

	/**A method used to extract email template and related resources from database by template name
	 * @param templateName
	 * @return KjcEmailTemplates with name received
	 */
	@Transactional
	public KjcEmailTemplates findByTemplateNameWithResources(String templateName) {
		String hql = "select distinct(template) from KjcEmailTemplates template left join fetch template.kjcInlineResourceTemplateses where template.name = :templateName";
		KjcEmailTemplates template = (KjcEmailTemplates) sessionFactory.getCurrentSession().createQuery(hql)
				.setParameter("templateName", templateName).uniqueResult();
		return template;
	}

}
