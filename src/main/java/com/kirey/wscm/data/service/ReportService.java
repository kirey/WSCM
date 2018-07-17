package com.kirey.wscm.data.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.data.dao.KjcReportBlobsDao;
import com.kirey.wscm.data.dao.KjcReportParametersDao;
import com.kirey.wscm.data.dao.KjcReportsDao;
import com.kirey.wscm.data.entity.KjcReportBlobs;
import com.kirey.wscm.data.entity.KjcReportParameters;
import com.kirey.wscm.data.entity.KjcReports;

import net.sf.jasperreports.engine.JasperPrint;

/**
 * A service containing methods related to reports
 * 
 * @author paunovicm
 *
 */
@Service
public class ReportService {

	@Autowired
	private KjcReportsDao kjcReportsDao;
	@Autowired
	private ReportEngine reportEngine;
	@Autowired
	private KjcReportParametersDao kjcReportParametersDao;
	@Autowired
	private KjcReportBlobsDao kjcReportBlobsDao;
	@Autowired
	private SessionFactory sessionFactory;

	


	/**
	 * This method is used to generate report
	 * 
	 * @param format
	 * @param reportParam
	 * @param kjcReports
	 * @return byte[] containing generated report
	 */
	@Transactional(readOnly = true)
	public byte[] generateReport(String format, Map<String, Object> reportParam, KjcReports kjcReports) {
		if (!kjcReports.getKjcReportBlobses().isEmpty()) {
			Map<String, String> translationMap;

			// report uses translation
			if (reportParam.get(AppConstants.REPORT_TRANSLATION_MAP) != null
					&& reportParam.get(AppConstants.REPORT_TRANSLATION_MAP).equals(true)) {
				//TODO This version of Reports does not support translation
//				translationMap = translation.createTranslatedMap();
				// put translation in map
//				reportParam.put(AppConstants.REPORT_TRANSLATION_MAP, translationMap);
			}
			JasperPrint jp = reportEngine.generateReport(reportParam, kjcReports.getKjcReportBlobses());

			if (jp.getPages().isEmpty())
				return null;

			if ("pdf".equals(format))
				return reportEngine.exportPdf(jp).toByteArray();
			else
				return reportEngine.exportXls(jp).toByteArray();
		}
		return null;
	}

	/**
	 * This method is used to save report
	 * 
	 * @param report
	 * @param masterFile
	 * @param subreportFiles
	 * @param supbreportFilesNames
	 */
	public void saveReport(KjcReports report, MultipartFile masterFile, MultipartFile[] subreportFiles,
			Map<String, String> supbreportFilesNames) {
		//set initial values for the average execution time and number of execution
		report.setAvgExecTime(new Long(0));
		report.setNumExecution(new Long(0));
		// master report
		KjcReportBlobs blob = new KjcReportBlobs();
		byte[] bytes;
		try {
			bytes = masterFile.getBytes();

			blob.setFileBlob(bytes);
			blob.setKjcReports(report);
			blob.setOrderBlob(AppConstants.REPORT_MASTER_REPORT_ORDER);
			blob.setSubreportParameterKey(AppConstants.REPORT_MASTER_REPORT);
			report.getKjcReportBlobses().add(blob);

			// subreports
			for (int i = 0; i < subreportFiles.length; i++) {
				KjcReportBlobs subBlob = new KjcReportBlobs();
				subBlob.setFileBlob(subreportFiles[i].getBytes());
				subBlob.setKjcReports(report);
				subBlob.setOrderBlob(i + 2);

				String fileName = subreportFiles[i].getOriginalFilename();
				String subRepParamKey = supbreportFilesNames.get(fileName);
				subBlob.setSubreportParameterKey(subRepParamKey);
				report.getKjcReportBlobses().add(subBlob);
			}
			
			kjcReportsDao.attachDirty(report);
			kjcReportParametersDao.makeDependency(report);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

	}

	/**
	 * This method deletes report
	 * 
	 * @param report
	 */
	@Transactional
	public void deleteReport(KjcReports report) {
		List<KjcReportBlobs> reportBlobList = report.getKjcReportBlobses();
		for (KjcReportBlobs reportBlob : reportBlobList) {
			kjcReportBlobsDao.delete(reportBlob);
		}

		List<KjcReportParameters> listParameters = report.getKjcReportParameterses();
		for (KjcReportParameters kjcReportParameters : listParameters) {
			kjcReportParametersDao.delete(kjcReportParameters);
		}

		kjcReportsDao.delete(report);

	}

	/**
	 * This method is used to edit existing report
	 * @param report
	 * @param javaFile
	 * @param compiledJavaFile
	 */
	@Transactional
	public void updateReport(KjcReports report)
			 {

		KjcReports currentReport = kjcReportsDao.findById(report.getId());
		currentReport.setFlEnabled(report.isFlEnabled());
		currentReport.setDescription(report.getDescription());
		currentReport.setType(report.getType());
//		currentReport.setKjcCompany(report.getKjcCompany());
		
		if (!currentReport.getName().equals(report.getName()) && !"".equals(report.getName().trim())) {
			currentReport.setName(report.getName());
		}

		List<KjcReportParameters> parametersOldList = currentReport.getKjcReportParameterses();
		
		if (report.getKjcReportParameterses().size() != 0) {
			for (KjcReportParameters reportParameter : report.getKjcReportParameterses()) {
				for (KjcReportParameters parametersOld : parametersOldList) {
					if (parametersOld.getId().equals(reportParameter.getId()) && !parametersOld.equals(reportParameter)) {
							parametersOld.setName(reportParameter.getName());
							parametersOld.setMinValue(reportParameter.getMinValue());
							parametersOld.setMaxValue(reportParameter.getMaxValue());
							parametersOld.setDescription(reportParameter.getDescription());
							parametersOld.setPosition(reportParameter.getPosition());
							parametersOld.setDbTable(reportParameter.getDbTable());
							parametersOld.setDbColumn(reportParameter.getDbColumn());
							parametersOld.setIsMandatory(reportParameter.getIsMandatory());
							parametersOld.setDependencyParameter(reportParameter.getDependencyParameter());
							parametersOld.setParameterDependencyFkColumn(reportParameter.getParameterDependencyFkColumn());
							parametersOld.setDependencyParamName(reportParameter.getDependencyParamName());
					}
				}
			}
		}
		kjcReportParametersDao.makeDependency(currentReport);
	}

	/**
	 * This method returns all reports
	 * 
	 * @return List<KjcReports> containing all reports from database
	 */
	@Transactional
	public List<KjcReports> findAll() {
//		List<String> listRoleNames = Utilities.getListRoleNamesOfUserInContext();
		List<KjcReports> reports = new ArrayList<>();
//		if (listRoleNames.contains(AppConstants.ROLE_SUPER_ADMIN)) {
			reports = kjcReportsDao.findAll();
//		} else {
		//	reports = this.findFiltered();
//		}

		if (reports != null) {
			// loop reports
			for (KjcReports kjcReport : reports) {
				if (kjcReport.getKjcReportParameterses() != null) {
					// loop parameters
					for (KjcReportParameters kjcReportParameter : kjcReport.getKjcReportParameterses()) {
						// if parameter is dropdown && type is String
						if (kjcReportParameter.getDependencyParameter() == null && kjcReportParameter.getDbTable() != null
								&& kjcReportParameter.getDbColumn() != null
								&&	( "String".equals(kjcReportParameter.getType()) 
									||"Integer".equals(kjcReportParameter.getType()))) {
							StringBuilder buffer = new StringBuilder(0);
							String column = kjcReportParameter.getDbColumn();
							String table = kjcReportParameter.getDbTable();
							buffer.append("SELECT DISTINCT ID, ");
							buffer.append(column);
							buffer.append(" FROM ");
							buffer.append(table);
							// executeQuery
							List<Object> resultSet = kjcReportParametersDao.executeSqlOneRow(buffer.toString());
							if (resultSet != null && resultSet.size() > 0) {
								for (int i = 0; i < resultSet.size(); i++) {
									// put in map
									Object[] result = (Object[]) resultSet.get(i);

									kjcReportParameter.getDropdownList().put((BigDecimal)result[0], (String)result[1]);
								}
							}
						}
					}
				}
			}
		}
		return reports;
	}

	/**
	 * 
	 * This method returns filtered reports
	 * 
	 * @return List<KjcReports> containing reports satisfying filters
	 * 
	 */
	/*
	@SuppressWarnings("unchecked")
	@Transactional
	public List<KjcReports> findFiltered() {
		KjcUserAccounts userFromContext = Utilities.getUserFromContext();
		List<String> listUserRoles = Utilities.getListRoleNamesOfUserInContext();
		StringBuilder hqlSB = new StringBuilder();
		hqlSB.setLength(0);
		hqlSB.append("select re from KjcReports re where re.id in (select rar.id from KjcApplicationRoles ar join ar.kjcReportses rar");
		
		for (String roleName : listUserRoles) {
			if(hqlSB.toString().endsWith("ar.kjcReportses rar")){
				hqlSB.append(" where ");
			}else{
				hqlSB.append(" or ");
			}
			hqlSB.append("ar.name = '");
			hqlSB.append(roleName);
			hqlSB.append("'");
		}
		hqlSB.append(")");
		hqlSB.append(" and re.id in (select ckr.id from KjcCompanies com join com.kjcReportses ckr where com.id = ");
		hqlSB.append(userFromContext.getKjcCompanies().getId());
		hqlSB.append(")");

		Query query = this.sessionFactory.getCurrentSession().createQuery(hqlSB.toString());
		return query.list();
	}
*/


	

	/**
	 * This method is used for changing report status
	 * 
	 * @param id
	 * @param enabled
	 */
	@Transactional
	public void changeStatus(Integer id, int enabled) {
		KjcReports kjcReports = kjcReportsDao.findById(id);
		kjcReports.setFlEnabled(enabled == 1);
	}


	public KjcReportParameters populateParameter(KjcReportParameters dependentParameter, Integer dependencyValueId) {
		if(dependentParameter.getDbTable() != null && dependentParameter.getDbColumn() != null){
			StringBuilder buffer = new StringBuilder(0);
			buffer.append("SELECT DISTINCT P.ID, P.");
			buffer.append(dependentParameter.getDbColumn());
			buffer.append(" FROM ");
			buffer.append(dependentParameter.getDbTable());
			buffer.append(" P, ");
			buffer.append(dependentParameter.getDependencyParameter().getDbTable());
			buffer.append(" C where P.");
			buffer.append(dependentParameter.getParameterDependencyFkColumn());
			buffer.append(" = ");
			buffer.append(dependencyValueId);
			// executeQuery
			List<Object> resultSet = kjcReportParametersDao.executeSqlOneRow(buffer.toString());
			if (resultSet != null && resultSet.size() > 0) {
				for (int i = 0; i < resultSet.size(); i++) {
					// put in map
					Object[] result = (Object[]) resultSet.get(i);
					dependentParameter.getDropdownList().put((BigDecimal)result[0], result[1].toString());
				}
			}
		}
		return dependentParameter;
	}

}
