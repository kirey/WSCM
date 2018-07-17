package com.kirey.wscm.data.dao;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.metadata.ClassMetadata;
import org.hibernate.persister.entity.AbstractEntityPersister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.wscm.data.entity.KjcReports;
import com.kirey.wscm.security.SecurityUtils;


/**
 * Dao object for domain model class KjcReports.
 * @author paunovicm
 */
@Repository(value = "kjcReportsDao")
public class KjcReportsDao extends KjcBaseDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	public KjcReportsDao() {
		log = LogFactory.getLog(KjcReportsDao.class);
		entityClass=KjcReports.class;
	}

	/**A method used to find all tables from database related to project
	 * @return Map<String, ClassMetadata> contained of table related information
	 */
	public List<String> findAllTables() {
		Map<String, ClassMetadata> classMetaDataMap = sessionFactory.getAllClassMetadata();
		List<String> tables = new ArrayList<String>();
		for(Map.Entry<String, ClassMetadata> metaDataMap : classMetaDataMap.entrySet()) {
		    ClassMetadata classMetadata = metaDataMap.getValue();
		    AbstractEntityPersister abstractEntityPersister = (AbstractEntityPersister) classMetadata;
		    String tableName = abstractEntityPersister.getTableName();
		    String[] tableNamesArray = tableName.split("\\.");
		    if(tableNamesArray.length > 1){
		    	 tables.add(tableNamesArray[1]);
		    }else
		    	tables.add(tableNamesArray[0]);//.split("\\.")[1]
		}
		Collections.sort(tables);
		return tables;
	}
	
	/**A method used to extract all column names for received table name from database
	 * @param tableName
	 * @return List<Object> containing all table column names
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Object> findAllColumnsByTableName(String tableName) {
		StringBuilder sqlString = new StringBuilder();
		sqlString.setLength(0);

		sqlString.append("SELECT DISTINCT ");
		sqlString.append("a.attname as name ");
		sqlString.append("FROM pg_attribute a ");
		sqlString.append("JOIN pg_class pgc ON pgc.oid = a.attrelid ");
		sqlString.append("LEFT JOIN pg_index i ON ");
		sqlString.append("  (pgc.oid = i.indrelid AND i.indkey[0] = a.attnum) ");
		sqlString.append("LEFT JOIN pg_description com on ");
		sqlString.append("    (pgc.oid = com.objoid AND a.attnum = com.objsubid) ");
		sqlString.append("LEFT JOIN pg_attrdef def ON ");
		sqlString.append("    (a.attrelid = def.adrelid AND a.attnum = def.adnum) ");
		sqlString.append("WHERE a.attnum > 0 AND pgc.oid = a.attrelid ");
		sqlString.append("AND pg_table_is_visible(pgc.oid) ");
		sqlString.append("AND NOT a.attisdropped ");
		sqlString.append("AND pgc.relname = ");
		sqlString.append("'");
		sqlString.append(tableName.toLowerCase());
		sqlString.append("'");
		sqlString.append(" AND (format_type(a.atttypid, a.atttypmod) like 'numeric%'");
		sqlString.append("	OR format_type(a.atttypid, a.atttypmod) like 'int'");
		sqlString.append("	OR format_type(a.atttypid, a.atttypmod) like 'integer'");
		sqlString.append("	OR format_type(a.atttypid, a.atttypmod) like 'real'");
		sqlString.append("	OR format_type(a.atttypid, a.atttypmod) like 'character%'");
		sqlString.append("	OR format_type(a.atttypid, a.atttypmod) like 'text'");
		sqlString.append(" );");

        List<Object> columns = (List<Object>)this.sessionFactory.getCurrentSession().createSQLQuery(sqlString.toString()).list();
        return columns;
		
	}
	
	/**A method extracting all report names from database
	 * @return List<String> containing all report names
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<String> findAllReportNames() {
		return (List<String>) this.sessionFactory.getCurrentSession().createCriteria(KjcReports.class).setProjection(Projections.property("name")).list();
	}
	
    /**A method extracting all report names from database except for the one received
     * @param report
     * @return List<String> containing all report names but the received report name
     */
    @SuppressWarnings("unchecked")
	@Transactional
    public List<String> findAllNamesWithoutOne(KjcReports report){
        return  sessionFactory.getCurrentSession().createCriteria(KjcReports.class)
        		.add(Restrictions.not(Restrictions.eq("id", report.getId())))
        		.setProjection(Projections.property("name")).list();
    }
    
	/**
	 * A method extracting the average time execution for the selected report.
	 * 
	 * @param reportId
	 *            - specifies the report id
	 * @return Long - the average time execution
	 */
	@Transactional
	public Long findAvgTimeById(Integer reportId) {
		try {
			String hql = "select r.avgExecTime from KjcReports r where r.id =:reportId";
			return (Long) sessionFactory.getCurrentSession().createQuery(hql).setParameter("reportId", reportId)
					.uniqueResult();

		} catch (RuntimeException re) {
			throw re;
		}
	}
	
	   /**
     * A method used to update the average time execution and number of
     * execution of a report.
     * 
     * @param avgTimeExec
     *            - specifies the average time execution
     * @param numExecution
     *            - specifies the number of execution
     * @param reportId
     *            - specifies report id
     * @return
     */
	@Transactional
	public void updateReportAvgTimeNumExec(Long avgTimeExec, Long numExecution, Integer reportId) {
		try {
			String hql = "update KjcReports r set r.avgExecTime=:avgTimeExec, r.numExecution=:numExecution, r.utUpdate=:user, r.tsUpdate=:tsUpdate where r.id=:reportId";
			sessionFactory.getCurrentSession().createQuery(hql).setParameter("avgTimeExec", avgTimeExec)
					.setParameter("numExecution", numExecution)
					.setParameter("user", SecurityUtils.getUserFromContext().getId()).setParameter("tsUpdate", new Date())
					.setParameter("reportId", reportId).executeUpdate();

		} catch (RuntimeException re) {
			throw re;
		}
	}
	
	/**
	 * A method used to get a report by name
	 * 
	 * @param reportName
	 *            - the report name
	 * @return KjcReports - the report
	 */
	@Transactional
	public KjcReports findByName(String reportName) {
		try {
			String hql = " from KjcReports where name = :reportName";
			KjcReports result = (KjcReports) sessionFactory.getCurrentSession().createQuery(hql)
					.setParameter("reportName", reportName).uniqueResult();
			return result;

		} catch (RuntimeException re) {
			throw re;
		}
	}
}
