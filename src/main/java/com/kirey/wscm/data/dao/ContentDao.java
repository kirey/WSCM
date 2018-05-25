package com.kirey.wscm.data.dao;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.kjcore.data.dao.KjcBaseDao;
import com.kirey.wscm.data.entity.Content;

@Repository(value = "contentDao")
public class ContentDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public ContentDao() {
		log = LogFactory.getLog(ContentDao.class);
		entityClass = Content.class;
	}

	public Content getBasicTemplate(String page) {
		String hql = "from Content cont where cont.page = :page and cont.position = 'P1'";
		Content content = (Content) sessionFactory.getCurrentSession().createQuery(hql).setParameter("page", page).uniqueResult();
		return content;
	}

	public String getHtmlForBasicTemplate(String page) {
		String hql = "select cont.html from Content cont where cont.page = :page and cont.position = 'P0'";
		String html = (String) sessionFactory.getCurrentSession().createQuery(hql).setParameter("page", page).uniqueResult();
		return html;
	}

	public String getCssForBasicTemplate(String page) {
		String hql = "select cont.css from Content cont where cont.page = :page and cont.position = 'P0'";
		String css = (String) sessionFactory.getCurrentSession().createQuery(hql).setParameter("page", page).uniqueResult();
		return css;
	}

	public String getHtmlForPosition(String page, String position) {
		String hql = "select cont.html from Content cont where cont.page = :page and cont.position = :position";
		String html = (String) sessionFactory.getCurrentSession().createQuery(hql).setParameter("page", page).setParameter("position", position).uniqueResult();
		return html;
	}
	
	public String getCssForPosition(String page, String position) {
		String hql = "select cont.css from Content cont where cont.page = :page and cont.position = :position";
		String css = (String) sessionFactory.getCurrentSession().createQuery(hql).setParameter("page", page).setParameter("position", position).uniqueResult();
		return css;
	}

}
