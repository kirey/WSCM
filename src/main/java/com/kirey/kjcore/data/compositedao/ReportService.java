package com.kirey.kjcore.data.compositedao;

import java.io.IOException;

import java.math.BigDecimal;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import java.util.concurrent.TimeUnit;


import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.kirey.kjcore.api.dto.BookedReportDto;
import com.kirey.kjcore.api.dto.ComboBoxDto;
import com.kirey.kjcore.api.dto.FilterCriteriaDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.util.HibernateUtil;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.dao.KjcClassCategoriesDao;
import com.kirey.kjcore.data.dao.KjcClassesDao;
import com.kirey.kjcore.data.dao.KjcGenericsDao;
import com.kirey.kjcore.data.dao.KjcReportBlobsDao;
import com.kirey.kjcore.data.dao.KjcReportBookingBlobsDao;
import com.kirey.kjcore.data.dao.KjcReportBookingsDao;
import com.kirey.kjcore.data.dao.KjcReportParametersDao;
import com.kirey.kjcore.data.dao.KjcReportsDao;
import com.kirey.kjcore.data.entity.KjcClassCategories;
import com.kirey.kjcore.data.entity.KjcClasses;
import com.kirey.kjcore.data.entity.KjcGenerics;
import com.kirey.kjcore.data.entity.KjcReportBlobs;
import com.kirey.kjcore.data.entity.KjcReportBookingBlobs;
import com.kirey.kjcore.data.entity.KjcReportBookings;
import com.kirey.kjcore.data.entity.KjcReportParameters;
import com.kirey.kjcore.data.entity.KjcReports;
import com.kirey.kjcore.data.entity.KjcUserAccounts;
import com.kirey.kjcore.features.classloading.ClassLoadingUtil;
import com.kirey.kjcore.features.internationalization.Translation;
import com.kirey.kjcore.features.report.ReportEngine;

import net.sf.jasperreports.engine.JasperPrint;

/**
 * A service containing methods related to reports
 * 
 * @author
 *
 */
@Service
@DependsOn("translation")
public class ReportService {

	@Autowired
	private KjcReportsDao kjcReportsDao;
	@Autowired
	private ReportEngine reportEngine;
	@Autowired
	private KjcReportBookingsDao kjcReportBookingsDao;
	@Autowired
	private KjcReportBookingBlobsDao kjcReportBookingBlobsDao;
	@Autowired
	private KjcReportParametersDao kjcReportParametersDao;
	@Autowired
	private KjcReportBlobsDao kjcReportBlobsDao;
	@Autowired
	private KjcClassesDao kjcClassesDao;
	@Autowired
	private Translation translation;
	@Autowired
	private KjcClassCategoriesDao kjcClassCategoryDao;
	@Autowired
	private ClassLoadingUtil classLoadingUtil;
	@Autowired
	private KjcGenericsDao kjcGenericsDao;
	@Autowired
	private SessionFactory sessionFactory;

	private static final String COMBOBOX_DATE = "combobox.date"; 
	
	/**
	 * A method used to save new or update existing report booking
	 * 
	 * @param reportBooking
	 */
	@Transactional
	public void saveOrUpdateReportBooking(KjcReportBookings reportBooking) {
		reportBooking.setStatus(AppConstants.REPORT_STATUS_BOOKED);
		reportBooking.setBookedDate(Utilities.setZeroTimeToDate(reportBooking.getBookedDate()));
		this.kjcReportBookingsDao.attachDirty(reportBooking);
	}

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
				translationMap = translation.createTranslatedMap();
				// put translation in map
				reportParam.put(AppConstants.REPORT_TRANSLATION_MAP, translationMap);
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
			if (report.getKjcClasses() != null)
				kjcClassesDao.attachDirty(report.getKjcClasses());
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
	public void updateReport(KjcReports report, MultipartFile javaFile, MultipartFile compiledJavaFile)
			 {

		KjcReports currentReport = kjcReportsDao.findById(report.getId());
		currentReport.setFlEnabled(report.isFlEnabled());
		currentReport.setDescription(report.getDescription());
		currentReport.setType(report.getType());
//		currentReport.setKjcCompany(report.getKjcCompany());
		currentReport.setKjcCompanieses(report.getKjcCompanieses());
		if (!currentReport.getName().equals(report.getName()) && !"".equals(report.getName().trim())) {
			currentReport.setName(report.getName());
		}

		List<KjcReportParameters> parametersOldList = currentReport.getKjcReportParameterses();
		currentReport.setKjcApplicationRoleses(report.getKjcApplicationRoleses());
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
		if ((javaFile != null && compiledJavaFile != null)) {
			String qualifiedClassName;
			try {
				qualifiedClassName = classLoadingUtil.getPackageNameFromClass(new String(javaFile.getBytes())) + "."
						+ javaFile.getOriginalFilename().replaceAll(".java", "");
			} catch (IOException e) {
				throw new RuntimeException(e);
			}

			String className = javaFile.getOriginalFilename().replaceAll(".java", "");
			// upload validationClass doesn't exist in DB
			if (kjcClassesDao.findClassByQualifiedName(qualifiedClassName) == null) {
				KjcClasses kjcClass = new KjcClasses();
				KjcClassCategories kjcClassCategory = kjcClassCategoryDao.getValidationCategory();
				if (kjcClassCategory == null) {
					createNewClassCategory();
				}
				kjcClass.setKjcClassCategories(kjcClassCategoryDao.getValidationCategory());
				if (report.getKjcClasses() != null) {
					kjcClass.setDescription(report.getKjcClasses().getDescription());
				}

				KjcClasses prepareClassForUpload;
				try {
					prepareClassForUpload = kjcClassesDao.prepareClassForUpload(kjcClass, javaFile.getBytes(),
							compiledJavaFile.getBytes(), className, null);
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
				currentReport.setKjcClasses(prepareClassForUpload);
				kjcClassesDao.persist(prepareClassForUpload);
			}
			// if try to upload exist validationClass
			else {
				KjcClasses kjcClass = kjcClassesDao.findClassByQualifiedName(qualifiedClassName);
				if (report.getKjcClasses() != null) {
					kjcClass.setDescription(report.getKjcClasses().getDescription());
				}
				currentReport.setKjcClasses(kjcClass);
			}
		}
		// if selected validationclass from listBox
		else {
			if (report.getKjcClasses() != null) {
				String className1 = report.getKjcClasses().getName();
				KjcClasses kjcClass = kjcClassesDao.findByName(className1);
				kjcClass.setDescription(report.getKjcClasses().getDescription());
				currentReport.setKjcClasses(kjcClass);
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
		List<String> listRoleNames = Utilities.getListRoleNamesOfUserInContext();
		List<KjcReports> reports = new ArrayList<>();
		if (listRoleNames.contains(AppConstants.ROLE_SUPER_ADMIN)) {
			reports = kjcReportsDao.findAll();
		} else {
			reports = this.findFiltered();
		}

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
	 * This method is used to remove validation class
	 * 
	 * @param id
	 */
	@Transactional
	public void removeValidationeClass(int id) {
		KjcReports report = kjcReportsDao.findById(id);
		report.setKjcClasses(null);
	}

	/**
	 * This method returns filtered reports
	 * 
	 * @return List<KjcReports> containing reports satisfying filters
	 */
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

	/**
	 * This method is used for checking if class has report
	 * 
	 * @param kjcClass
	 * @return boolean
	 */
	public boolean haveReport(KjcClasses kjcClass) {
		if (kjcClass.getKjcReportses() != null && !kjcClass.getKjcReportses().isEmpty()
				&& kjcClass.getKjcReportses().size() >= 2) {
			return true;
		}
		return false;
	}

	/**
	 * This method is used for creating new class category
	 * 
	 * @return KjcClassCategories new category
	 */
	public KjcClassCategories createNewClassCategory() {
		KjcClassCategories kjcClassCategoryNew = new KjcClassCategories();
		kjcClassCategoryNew.setName(AppConstants.REPORT_VALIDATION_CLASS);
		kjcClassCategoryNew.setUtInsert(Utilities.getUserFromContext().getId());
		kjcClassCategoryNew.setTsInsert(new Date());
		kjcClassCategoryNew.setUtUpdate(Utilities.getUserFromContext().getId());
		kjcClassCategoryNew.setTsUpdate(new Date());
		kjcClassCategoryDao.attachDirty(kjcClassCategoryNew);
		return kjcClassCategoryNew;
	}

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

	/**
	 * This methods return unavailable dates used in the booking phase.
	 * <p>
	 * The available visibility is 30 days, without the current day.
	 * <p>
	 * In order to calculate the availability for each day we need 4 parameters.
	 * 3 of them must be in KJC_GENERICS table and 1 is from AppConstants:
	 * <ul>
	 * <li>reportAsync.batch.clusterNumber - number of clusters where the
	 * application is deployed and running
	 * <li>reportAsync.batch.timeFrame - time frame reserved for batch report
	 * execution in seconds
	 * <li>reportAsync.contingency.param - contingency parameter
	 * <li>REPORT_BATCH_THREAD_NUMBER - of threads of concurrent batch report
	 * instances The algorithm used is :
	 * <ul>
	 * <li>totalTimePerDay = (choosen_report_average_time +
	 * sum(all_reports_average_time)) * contingency param
	 * <li>totalTimePerDay>=*batch.clusterNumber*batch.timeFrame
	 * *batch_threadNumber then this day is NOT available for the execution of
	 * the selected report
	 * </ul>
	 * </ul>
	 * 
	 * @param reportId
	 *            specifies the report id
	 * @return unavailable dates
	 */
	public List<Date> getUnavailableDatesForBooking(Integer reportId) {
		Calendar c = Calendar.getInstance();
		c.setTime(new Date()); // Now use today date.
		c.add(Calendar.DATE, 31); // Adding 30 days from tomorrow

	    
		List<Object[]> bookedReports = kjcReportBookingsDao.findAllBookedReports(AppConstants.REPORT_STATUS_BOOKED,
				Utilities.dateWithZeroTime(c.getTime()));

		List<Date> unavailableDates = new ArrayList<>();
		if (!bookedReports.isEmpty()) {
			Long avgTimeSelectedReport = kjcReportsDao.findAvgTimeById(reportId);
			List<KjcGenerics> calculationParams = kjcGenericsDao.findByCategory(AppConstants.ASYNC_REPORT_CATEGORY);
			Long reportBatchTimeFrame = new Long(0);
			Long reportBatchClusterNumber = new Long(0);
			Double reportContingency = new Double(0);

			for (KjcGenerics g : calculationParams) {
				if (g.getKey().equals(AppConstants.REPORT_BATCH_TIME_FRAME_KEY)) {
					// get duration in milliseconds from time
					String[] timeFrame = g.getValue().split(":");
					int hours = Integer.parseInt(timeFrame[0]);
					int minutes = Integer.parseInt(timeFrame[1]);
					int seconds = Integer.parseInt(timeFrame[2]);

					reportBatchTimeFrame = TimeUnit.SECONDS
							.toMillis(Long.valueOf(3600 * hours + 60 * minutes + seconds));
				}
				if (g.getKey().equals(AppConstants.REPORT_BATCH_CLUSTER_NUMBER_KEY)){
					reportBatchClusterNumber = Long.valueOf(g.getValue());
				}
				if (g.getKey().equals(AppConstants.REPORT_CONTINGECY_PARAM_KEY)){
					reportContingency = Double.valueOf(g.getValue());
				}
			}
			Long windowTime = reportBatchTimeFrame * reportBatchClusterNumber * AppConstants.REPORT_BATCH_THREAD_NUMBER;

			for (int i = 0; i < bookedReports.size(); i++) {
				if (((avgTimeSelectedReport + (Long) bookedReports.get(i)[1]) * reportContingency) >= windowTime) {

					unavailableDates.add(Utilities.dateWithZeroTime((Date) bookedReports.get(i)[0]));
				}
			}
		}
		return unavailableDates;
	}

	/**
	 * This method is used for updating the booked report, adding the generated
	 * report and updating the average time execution and number of execution of
	 * report.
	 * 
	 * @param bookedReport
	 *            - used to update the status for report
	 * @param reportGenerated
	 *            - specifies the generated report blob
	 * @param kjcReports
	 *            - used to update the average time execution and number of
	 *            execution
	 */
	@Transactional
	public void updateBookedReport(KjcReportBookings bookedReport, byte[] reportGenerated, KjcReports kjcReports) {
		kjcReportBookingsDao.updateBookedReportStatus(bookedReport.getStatus(), bookedReport.getId());
		kjcReportsDao.updateReportAvgTimeNumExec(kjcReports.getAvgExecTime(), kjcReports.getNumExecution(),
				kjcReports.getId());
		KjcReportBookingBlobs kjcReportBookingBlobs = new KjcReportBookingBlobs();
		kjcReportBookingBlobs.setKjcReportBookings(bookedReport);
		kjcReportBookingBlobs.setFileBlob(reportGenerated);

		kjcReportBookingBlobsDao.persist(kjcReportBookingBlobs);
	}

	/**
	 * This method is used to get all booked report for the current day, and
	 * updates the status in "EXECUTING".
	 * 
	 * @param reportStatusBooked
	 *            - specifies the "BOOKED" status
	 * @param currentDate
	 *            - specifies the current day
	 * @return all booked report for the current day
	 */
	@Transactional
	public List<KjcReportBookings> getBookedReportAndChangeStatus(String reportStatusBooked, Date currentDate) {
		List<KjcReportBookings> bookedReports = kjcReportBookingsDao.findBookedReportsForGenerate(reportStatusBooked,
				currentDate);
		if (!bookedReports.isEmpty()) {
			HibernateUtil.initializeObject(bookedReports, new ArrayList<>(Arrays.asList(KjcReports.class)));

			// update all status in executing
			updateBookedReportsStatus(bookedReports, AppConstants.REPORT_STATUS_EXECUTING);
		}

		return bookedReports;

	}

	/**
	 * This method is used to update a list of booked reports into a desired
	 * status.
	 * 
	 * @param bookedReports
	 *            - specifies the list of booked reports
	 * @param reportStatus
	 *            - specifies the desired status
	 */
	@Transactional
	public void updateBookedReportsStatus(List<KjcReportBookings> bookedReports, String reportStatus) {
		List<Integer> reportIds = new ArrayList<>();
		for (KjcReportBookings report : bookedReports) {
			reportIds.add(report.getId());
		}
		kjcReportBookingsDao.updateBookedReportsStatus(reportStatus, reportIds);
	}

	/**
	 * This method is used to find all booked reports that satisfy one or more
	 * received filters.
	 * 
	 * @param listSelection
	 *            - specified the applied filters
	 * @param userRolesNames 
	 * 
	 * @return List<BookedReportDto> containing booked reports that are
	 *         satisfying criteria
	 */
	public List<BookedReportDto> findAllFilteredBookedReports(List<FilterCriteriaDto> listSelection) {
		Map<String, Object> parameterNameAndValues = new HashMap<String, Object>();
		List<BookedReportDto> bookedReportsList = new ArrayList<>();
		StringBuilder hqlSB = new StringBuilder();
		hqlSB.setLength(0);
		hqlSB.append(
				"select rep.id, rep.kjcReports.name, rep.bookedDate, rep.format, rep.status, user.username, user.firstName, user.lastName, user.kjcCompanies.name "
						+ "from KjcReportBookings rep, KjcUserAccounts user ");
		hqlSB.append("where rep.utInsert = user.id ");
		if (!listSelection.isEmpty()) {
			Iterator<FilterCriteriaDto> selectedSearchCreteria = listSelection.iterator();
			hqlSB.append("and ");
			while (selectedSearchCreteria.hasNext()) {
				FilterCriteriaDto selectedBoxes = selectedSearchCreteria.next();
				Iterator<ComboBoxDto> selectBox = selectedBoxes.getSelectBoxList().iterator();

				while (selectBox.hasNext()) {
					ComboBoxDto boxDto = selectBox.next();
					String comboBoxName = selectedBoxes.getFilterName();

					// the user role must not have user filter
					if (comboBoxName.contains(AppConstants.SELECT_BOOKED_USER)
							&& !Utilities.isRole(AppConstants.ROLE_USER)) {
						hqlSB.append("user.id");
						hqlSB.append(" = ");
						hqlSB.append(boxDto.getKey());
					}
					// the user and admin role must not have user filter
					if (comboBoxName.contains(AppConstants.SELECT_BOOKED_COMPANY)
							&& Utilities.isRole(AppConstants.ROLE_SUPER_ADMIN)) {
						hqlSB.append("user.kjcCompanies.id");
						hqlSB.append(" = ");
						hqlSB.append(boxDto.getKey());
					}

					if (comboBoxName.contains(COMBOBOX_DATE)) {
						String[] dateFieldName = comboBoxName.split("\\.");
						if ("from".equals(dateFieldName[dateFieldName.length - 2])) {
							hqlSB.append("rep.");
							hqlSB.append(dateFieldName[dateFieldName.length - 1]);
							hqlSB.append(" between ");
							Date dateSelectedFrom = Utilities.dateWithZeroTime(new Date(Long.parseLong(boxDto.getName())));
							hqlSB.append(":dateSelectedFrom");
							parameterNameAndValues.put("dateSelectedFrom", dateSelectedFrom);

							hqlSB.append(" and ");
						}
						if ("to".equals(dateFieldName[dateFieldName.length - 2])) {
							Date dateSelectedTo = Utilities.dateWithZeroTime(new Date(Long.parseLong(boxDto.getName())));
							parameterNameAndValues.put("dateSelectedTo", dateSelectedTo);
							hqlSB.append(":dateSelectedTo ");
							if (selectedSearchCreteria.hasNext()) {
								hqlSB.append(" and ");
							}
						}
					}
					if (selectBox.hasNext()) {
						hqlSB.append(" and ");
					}
				}
				if (selectedSearchCreteria.hasNext() && !selectedBoxes.getFilterName().startsWith(COMBOBOX_DATE)
						&& !hqlSB.toString().endsWith("and ")) {
					hqlSB.append(" and ");
				}
			}
		}
		// if user role -> must see only his reports
		if (Utilities.isRole(AppConstants.ROLE_USER)) {
			hqlSB.append(" and user.id");
			hqlSB.append(" = ");
			hqlSB.append(Utilities.getUserFromContext().getId());
		}
		// if admin role or subadmin-> must see only reports from his company
		if (Utilities.isRole(AppConstants.ROLE_ADMIN) || Utilities.isRole(AppConstants.ROLE_SUBADMIN)) {
			hqlSB.append(" and user.kjcCompanies.id");
			hqlSB.append(" = ");
			hqlSB.append(Utilities.getUserFromContext().getKjcCompanies().getId());
		}
		List<Object[]> results = kjcReportBookingsDao.findAllFilteredBookedReports(hqlSB, parameterNameAndValues);
		for (Object[] result : results) {
			BookedReportDto bookedReport = new BookedReportDto();
			bookedReport.setId((Integer) result[0]);
			bookedReport.setReportName((String) result[1]);
			//add current time for a correct date adjustment
			bookedReport.setBookedDate(Utilities.setCurrentTimeToDate((Date) result[2]));
			bookedReport.setFormat((String) result[3]);
			bookedReport.setStatus((String) result[4]);
			bookedReport.setUserName((String) result[5]);
			bookedReport.setFirstName((String) result[6]);
			bookedReport.setLastName((String) result[7]);
			bookedReport.setCompanyName((String) result[8]);
			bookedReportsList.add(bookedReport);
		}
		return bookedReportsList;

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
