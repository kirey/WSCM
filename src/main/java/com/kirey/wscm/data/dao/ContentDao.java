package com.kirey.wscm.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.Hibernate;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.Content;

/**
 * @author paunovicm
 *
 */


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

	/**
	 * Method for getting html from {@link Content} by page and position
	 * @param page
	 * @param position
	 * @return String html
	 */
	public String getHtmlForPosition(String page, String position) {
		String hql = "select cont.html from Content cont where cont.page = :page and cont.position = :position";
		String html = (String) sessionFactory.getCurrentSession().createQuery(hql).setParameter("page", page).setParameter("position", position).uniqueResult();
		return html;
	}
	
	/**
	 * Method for getting css from {@link Content} by page and position
	 * @param page
	 * @param position
	 * @return String css
	 */
	public String getCssForPosition(String page, String position) {
		String hql = "select cont.css from Content cont where cont.page = :page and cont.position = :position";
		String css = (String) sessionFactory.getCurrentSession().createQuery(hql).setParameter("page", page).setParameter("position", position).uniqueResult();
		return css;
	}

	/**
	 * Method for getting {@link Content} by page and position
	 * @param page
	 * @param position
	 * @return {@link Content}
	 */
	public Content getContentByPagePosition(String page, String position) {
		String hql = "from Content cont where cont.page = :page and cont.position = :position";
		Content content = (Content) sessionFactory.getCurrentSession().createQuery(hql).setParameter("page", page).setParameter("position", position).uniqueResult();
		return content;
	}

	/**
	 * Method for getting {@link List} of {@link Content} by page and language
	 * @param page
	 * @param lang
	 * @return {@link List}<{@link Content}>
	 */
	public List<Content> findByPageLang(String page, String lang) {
		String hql = "from Content cont where cont.page = :page and cont.language = :lang";
		List<Content> listContent = sessionFactory.getCurrentSession().createQuery(hql).setParameter("page", page).setParameter("lang", lang).list();
		return listContent;
		
	}

	/**
	 * Method for getting {@link List} of {@link Content} by page, position and language
	 * @param page
	 * @param position
	 * @param lang
	 * @return {@link List}<{@link Content}>
	 */
	public List<Content> findByPagePositionLang(String page, String position, String lang) {
		String hql = "from Content cont where cont.page = :page and cont.position = :position and cont.language = :lang";
		List<Content> contents = sessionFactory.getCurrentSession().createQuery(hql).setParameter("page", page).setParameter("position", position).setParameter("lang", lang).list();
		return contents;
	}

	/**
	 * Method for getting {@link List} of {@link Content} by page
	 * @param page
	 * @return {@link List}<{@link Content}>
	 */
	public List<Content> findByPage(String page) {
		String hql = "from Content cont where cont.page = :page";
		List<Content> listContent = sessionFactory.getCurrentSession().createQuery(hql).setParameter("page", page).list();
		return listContent;
	}

	/**
	 * Method for getting {@link List} of {@link Content} by category id
	 * @param categoryId
	 * @return {@link List}<{@link Content}>
	 */
	public List<Content> findContentByCategory(int categoryId) {
		String hql = "select cc.content from ContentCategories cc where cc.categories.id = :categoryId";
		List<Content> listContent = sessionFactory.getCurrentSession().createQuery(hql).setParameter("categoryId", categoryId).list();
		return listContent;
	}

	/**
	 * Method for getting {@link List} of {@link Content} by page with all {@link Categories} initialized
	 * @param page
	 * @return {@link List}<{@link Content}>
	 */
	public List<Content> findByPageAndInitCategories(String page) {
		String hql = "from Content cont where cont.page = :page";
		List<Content> listContent = sessionFactory.getCurrentSession().createQuery(hql).setParameter("page", page).list();
		for (Content content : listContent) {
			Hibernate.initialize(content.getContentCategorieses());
		}
		return listContent;
	}

	public Content findByPagePositionLangUniversal(String page, String position, String lang) {
		String hql = "from Content cont where cont.page = :page and cont.position = :position and cont.language = :lang and cont";
		Content content = (Content) sessionFactory.getCurrentSession().createQuery(hql).setParameter("page", page).setParameter("position", position).setParameter("lang", lang).list();
		return content;
	}

	/**
	 * Method for getting all pages
	 * @return {@link List} pages
	 */
	public List<String> getAllDistinctPages() {
		String hql = "select distinct cont.page from Content cont";
		List<String> listPages = sessionFactory.getCurrentSession().createQuery(hql).list();
		return listPages;
	}
}
