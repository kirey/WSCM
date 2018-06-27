package com.kirey.wscm.data.dao;

import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.Content;
import com.kirey.wscm.data.entity.ContentCategories;

/**
 * @author paunovicm
 *
 */

@Repository(value = "contentCategoriesDao")
public class ContentCategoriesDao extends KjcBaseDao {
	
	@Autowired
	private SessionFactory sessionFactory;
	
	public ContentCategoriesDao() {
		log = LogFactory.getLog(ContentCategoriesDao.class);
		entityClass = ContentCategories.class;
	}

	/**
	 * Method for getting {@link ContentCategories} by content id and category id
	 * @param contentId
	 * @param categoryId
	 * @return {@link ContentCategories}
	 */
	public ContentCategories findByContentCategory(Integer contentId, Integer categoryId) {
		String hql = "from ContentCategories cc where cc.categories.id = :categoryId and cc.content.id = :contentId";
		ContentCategories contentCategories = (ContentCategories) sessionFactory.getCurrentSession().createQuery(hql).setParameter("categoryId", categoryId).setParameter("contentId", contentId).uniqueResult();
		return contentCategories;
	}

	/**
	 * Method used for getting {@link List} of {@link ContentCategories} by content id
	 * @param contentId
	 * @return {@link List}<{@link ContentCategories}>
	 */
	public List<ContentCategories> findByContent(Integer contentId) {
		String hql = "from ContentCategories cc where cc.content.id = :contentId";
		 List<ContentCategories> contentCategories = sessionFactory.getCurrentSession().createQuery(hql).setParameter("contentId", contentId).list();
		return contentCategories;
	}

	/**
	 * Method for getting {@link Content} by {@link Categories} and max weight
	 * @param category
	 * @return {@link Content}
	 */
	public Content findContentByCategoryMaxWeightPagePositionLang(Categories category, String page, String position, String lang) {
		String hql = "select cc.content from ContentCategories cc where cc.categories.id = :categoryId and cc.content.page = :page and cc.content.position = :position and cc.content.language = :lang and cc.weight in (select max(ccc.weight) from ContentCategories ccc where ccc.categories.id = cc.categories.id)";
		Content content = (Content) sessionFactory.getCurrentSession().createQuery(hql)
				.setParameter("categoryId", category.getId())
				.setParameter("page", page)
				.setParameter("position", position)
				.setParameter("lang", lang).uniqueResult();
		return content;
	}
	
	/**
	 * Method for getting {@link Content} by {@link Categories} and max weight
	 * @param category
	 * @return {@link Content}
	 */
	public Content findContentByUniversalMaxWeightPagePositionLang(String page, String position, String lang) {
		String hql = "select cc.content from ContentCategories cc where cc.categories.categoryName = 'universal' and cc.content.page = :page and cc.content.position = :position and cc.content.language = :lang and cc.weight in (select max(ccc.weight) from ContentCategories ccc where ccc.categories.id = cc.categories.id)";
		Content content = (Content) sessionFactory.getCurrentSession().createQuery(hql)
				.setParameter("page", page)
				.setParameter("position", position)
				.setParameter("lang", lang).uniqueResult();
		return content;
	}

}
