package com.kirey.wscm.data.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.LogFactory;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.wscm.data.entity.KjcReportParameters;
import com.kirey.wscm.data.entity.KjcReports;


/**
 * Dao object for domain model class KjcReportParameters.
 * 
 * @author paunovicm
 */
@Repository(value = "kjcReportParametersDao")
public class KjcReportParametersDao extends KjcBaseDao{

	@Autowired
	private SessionFactory sessionFactory;
	
	@Autowired
	private KjcReportsDao kjcReportsDao;
	
	public KjcReportParametersDao() {
		log = LogFactory.getLog(KjcReportParametersDao.class);
		entityClass=KjcReportParameters.class;
	}
	
	/**A method that executes sql expression and returns a List of results
	 * @param sqlExpression
	 * @return List<String> containing query result
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Object> executeSqlOneRow(String sqlExpression) {
		Session sesion = this.sessionFactory.getCurrentSession();//.createSQLQuery(sqlExpression).list();
		Query query = sesion.createSQLQuery(sqlExpression);
		List<Object> list;
		try{
			list = query.list();	
		} catch(NoClassDefFoundError e){
			
			//IMPORTANT !!!
			//This ERROR must be considered. It happens sometimes without any order.
			throw new RuntimeException("NoClassDefFoundError in executeSqlOneRow() of the Report Management!!!");
		}
		
		return list;
	}

	/**
	 * This method is used for making dependency between report parameters
	 * @param kjcReport
	 */
	@Transactional
	public void makeDependency(KjcReports kjcReport) {
		List<KjcReportParameters> listParameterses = kjcReport.getKjcReportParameterses();
		for (KjcReportParameters kjcReportParameters : listParameterses) {
			if(kjcReportParameters.getDependencyParamName() != null){
				KjcReportParameters dependentParam = this.findByKeyByReport(kjcReportParameters.getDependencyParamName(), kjcReport.getId());
				kjcReportParameters.setDependencyParameter(dependentParam);
				this.merge(kjcReportParameters);
			}
		}
	}

	/**
	 * This method is used for getting report parameter by unique constraints (KJC_REPORT, KEY)
	 * @param dependencyParamName contains key of parameter
	 * @param reportId contains id of report
	 * @return report parameter
	 */
	@Transactional
	private KjcReportParameters findByKeyByReport(String dependencyParamName, Integer reportId) {
		StringBuilder hqlSB = new StringBuilder();
		hqlSB.setLength(0);
		hqlSB.append("from KjcReportParameters p where p.key = '");
		hqlSB.append(dependencyParamName);
		hqlSB.append("' and p.kjcReports.id = ");
		hqlSB.append(reportId);
		Query query = this.sessionFactory.getCurrentSession().createQuery(hqlSB.toString());
		return (KjcReportParameters) query.uniqueResult();
	}

}
