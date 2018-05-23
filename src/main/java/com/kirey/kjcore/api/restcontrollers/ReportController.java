package com.kirey.kjcore.api.restcontrollers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kirey.kjcore.api.dto.BookedReportDto;
import com.kirey.kjcore.api.dto.ComboBoxDto;
import com.kirey.kjcore.api.dto.FilterCriteriaDto;
import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ResponseMessagesConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.compositedao.CompaniesService;
import com.kirey.kjcore.data.compositedao.DictionaryService;
import com.kirey.kjcore.data.compositedao.ReportService;
import com.kirey.kjcore.data.dao.KjcApplicationRolesDao;
import com.kirey.kjcore.data.dao.KjcClassCategoriesDao;
import com.kirey.kjcore.data.dao.KjcClassesDao;
import com.kirey.kjcore.data.dao.KjcCompaniesDao;
import com.kirey.kjcore.data.dao.KjcReportBookingsDao;
import com.kirey.kjcore.data.dao.KjcReportParametersDao;
import com.kirey.kjcore.data.dao.KjcReportsDao;
import com.kirey.kjcore.data.dao.KjcUserAccountsDao;
import com.kirey.kjcore.data.entity.KjcApplicationRoles;
import com.kirey.kjcore.data.entity.KjcClassCategories;
import com.kirey.kjcore.data.entity.KjcClasses;
import com.kirey.kjcore.data.entity.KjcCompanies;
import com.kirey.kjcore.data.entity.KjcReportBookings;
import com.kirey.kjcore.data.entity.KjcReportParameters;
import com.kirey.kjcore.data.entity.KjcReports;
import com.kirey.kjcore.data.entity.KjcUserAccounts;
import com.kirey.kjcore.features.classloading.BaseObjectFactory;
import com.kirey.kjcore.features.classloading.ClassLoadingUtil;
import com.kirey.kjcore.features.classloading.classes.interfaces.BaseReportValidation;
import com.kirey.kjcore.features.internationalization.Translation;
import com.kirey.kjcore.validations.ClassLoadingValidation;
import com.kirey.kjcore.validations.CsvFileValidation;
import com.kirey.kjcore.validations.ReportValidation;


/**Rest controller used for report administration
 * @author 
 *
 */
@DependsOn("translation")
@RestController
@RequestMapping(value = "/rest/reports", produces = "application/json; charset=UTF-8")
public class ReportController {

	@Autowired
	private ReportService reportService;
	@Autowired
	private KjcReportsDao kjcReportsDao;
	@Autowired
	private DictionaryService dictionaryService;
	@Autowired
	private CsvFileValidation csvFileValidation;
	@Autowired
	private KjcClassCategoriesDao kjcClassCategoriesDao;
	@Autowired
	private KjcClassesDao kjcClassesDao;
	@Autowired
	private BaseObjectFactory baseObjectFactory;
	@Autowired
	private ClassLoadingUtil classLoadingUtil;
	@Autowired
	private ReportValidation reportValidation;
	@Autowired
	private ClassLoadingValidation classLoadingValidation;
	@Autowired
	private SessionFactory sessionFactory;;
	@Autowired
	private KjcApplicationRolesDao kjcApplicationRolesDao;
	@Autowired
	private Translation translation;
	@Autowired
	private KjcCompaniesDao kjcCompaniesDao;
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private KjcUserAccountsDao kjcUserAccountsDao;
	@Autowired
	private KjcReportBookingsDao kjcReportBookingsDao;
	@Autowired
	private KjcReportParametersDao kjcReportParametersDao;
	
	/**
	 * This method is used for get list of all companies
	 * @return Response Entity containing  list of all companies and HTTP status
	 */
	@RequestMapping(value = "/company", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getCompanies() {
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(kjcCompaniesDao.findAll(), HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method returns all reports depends on user roles
	 * @return Response Entity containing  list of all reports and HTTP status
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getReports() {

			List<KjcReports> reportList = reportService.findAll();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(reportList, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * This method returns list of populate filters depending on user roles.
	 * <p>
	 * - if the user role is "super_admin" : must see the filters "From date",
	 * "To date", "Company", "User". The last one it will be populated when
	 * the company is selected
	 * <p>
	 * - if the user role is "admin" or sub_admin : must see the filters "From date", "To
	 * date", "User". The last one it will be populated using the company id
	 * <p>
	 * - if the user role is "user" : must see the filters "From date", "To
	 * date"
	 * 
	 * @return Response Entity containing list of filters and HTTP status
	 */
	@RequestMapping(value = "/book/populateBookedReportsFilters", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> populateBookedReportsFilters() {
		List<FilterCriteriaDto> bookedReportsFiltersList = new ArrayList<FilterCriteriaDto>();

		// if the user is super admin/admin/subadmin must see the users filter
		if (Utilities.isRole(AppConstants.ROLE_SUPER_ADMIN) || Utilities.isRole(AppConstants.ROLE_ADMIN)
				|| Utilities.isRole(AppConstants.ROLE_SUBADMIN)) {
			// users filter it will be empty until a company is selected
			FilterCriteriaDto userFilter = new FilterCriteriaDto();
			userFilter.setFilterName(AppConstants.SELECT_BOOKED_USER);
			// if the user is admin/subadmin the users filter must be populated
			if (Utilities.isRole(AppConstants.ROLE_ADMIN)
					|| Utilities.isRole(AppConstants.ROLE_SUBADMIN)) {
				List<KjcUserAccounts> companyUsersList = kjcUserAccountsDao
						.findAllUsersNamesWithoutFakeByCompanyId(Utilities.getUserFromContext().getKjcCompanies().getId());
				List<ComboBoxDto> userFilterList = new ArrayList<ComboBoxDto>();
				for (KjcUserAccounts user : companyUsersList) {
					ComboBoxDto selectBox = new ComboBoxDto();
					selectBox.setKey(user.getId());
					selectBox.setName(user.getLastName() + "  " + user.getFirstName() + " - " + user.getUsername());
					userFilterList.add(selectBox);
				}
				userFilter.setSelectBoxList(userFilterList);
			} else {
				// if the user is super admin must see the companies filter
				FilterCriteriaDto companiesFilter = new FilterCriteriaDto();
				List<ComboBoxDto> companiesFilterList = new ArrayList<ComboBoxDto>();

				// find all companies
				List<KjcCompanies> companiesList = kjcCompaniesDao.findAll();
				for (KjcCompanies company : companiesList) {
					ComboBoxDto selectBox = new ComboBoxDto();
					selectBox.setKey(company.getId());
					selectBox.setName(company.getName());
					companiesFilterList.add(selectBox);
				}
				companiesFilter.setSelectBoxList(companiesFilterList);
				companiesFilter.setFilterName(AppConstants.SELECT_BOOKED_COMPANY);

				bookedReportsFiltersList.add(companiesFilter);

				// the users filter it will be populated when a company is
				// selected
				userFilter.setSelectBoxList(new ArrayList<ComboBoxDto>());
			}
			bookedReportsFiltersList.add(userFilter);
		}

		// Date from - combox
		FilterCriteriaDto dateFromFilter = new FilterCriteriaDto();
		dateFromFilter.setFilterName(AppConstants.SELECT_BOOKED_FROM_DATE);

		// Date to - combox
		FilterCriteriaDto dateToFilter = new FilterCriteriaDto();
		dateToFilter.setFilterName(AppConstants.SELECT_BOOKED_TO_DATE);

		bookedReportsFiltersList.add(dateFromFilter);
		bookedReportsFiltersList.add(dateToFilter);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(bookedReportsFiltersList, HttpStatus.OK.value()),
				HttpStatus.OK);
	}

	/**
	 * This method returns user list that belongs to a company used for
	 * filtering the booked reports using the company id.
	 * 
	 * @param company
	 *            - specifies the company id
	 * @return Response Entity containing the user filter and HTTP status
	 */
	@RequestMapping(value = "/populateUsersFilter", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> populateUsersFilter(@RequestParam(required = true) String company) {
		FilterCriteriaDto userFilter = new FilterCriteriaDto();
		List<ComboBoxDto> userFilterList = new ArrayList<ComboBoxDto>();
		List<KjcUserAccounts> listUsers = kjcUserAccountsDao.findAllUsersNamesWithoutFakeByCompanyId(Integer.parseInt(company));
		for (KjcUserAccounts user : listUsers) {
			ComboBoxDto selectBox = new ComboBoxDto();
			selectBox.setKey(user.getId());
			selectBox.setName(user.getLastName() + "  " + user.getFirstName() + " - " + user.getUsername());
			userFilterList.add(selectBox);
		}
		userFilter.setFilterName(AppConstants.SELECT_BOOKED_USER);
		userFilter.setSelectBoxList(userFilterList);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(userFilter, HttpStatus.OK.value()),
				HttpStatus.OK);
	}

	/**
	 * This method is used for get list of all booked reports by selected
	 * filters.
	 * 
	 * @param filterMap
	 *            - specifies the selected filters
	 * @return Response Entity containing list of all booked reports and HTTP
	 *         status
	 */
	@RequestMapping(value = "/book/allFilteredBooked", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllFilteredBookedReports(@RequestParam(required = true) Map<String, String> filterMap) {
		List<FilterCriteriaDto> listSelection = new ArrayList<>();
		try {
			listSelection = objectMapper.readValue(filterMap.get("filterMap"), new TypeReference<List<FilterCriteriaDto>>(){});
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		List<BookedReportDto> reportList = reportService.findAllFilteredBookedReports(listSelection);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(reportList, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	/**
	 * This method is used to get the booked report in order to be seen in front-end.
	 * 
	 * @param bookedReportId
	 *            - specifies the booked report id
	 * @return Response Entity containing list of all booked reports and HTTP
	 *         status
	 */
	@RequestMapping(value = "/book/print/{bookedReportId}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getBookedReportBlob(@PathVariable String bookedReportId) {
		byte[] bookedReport = kjcReportBookingsDao.findBookedReportBlob(Integer.parseInt(bookedReportId));
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(Base64.getEncoder().encodeToString(bookedReport), HttpStatus.OK.value()), HttpStatus.OK);
	}


	/**
	 * This method returns report by id
	 * @param id
	 * @return Response Entity containing  report with received id and HTTP status
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> findById(@PathVariable(value = "id") int id) {
		KjcReports report = kjcReportsDao.findById(id);
		reportValidation.validationForGetSingleReport(report);
		List<KjcReportParameters> listParameters = report.getKjcReportParameterses();
		for (KjcReportParameters kjcReportParameters : listParameters) {
			if(kjcReportParameters.getDependencyParameter() != null){
				kjcReportParameters.setDependencyParamName(kjcReportParameters.getDependencyParameter().getName());
			}
		}
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(report, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method returns all validation classes for reports
	 * @return Response Entity containing  list of all validation classes and HTTP status
	 */
	@RequestMapping(value = "/classes", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> findValidationClasses() {

		List<KjcClasses> listClasses = kjcClassesDao.findAllValidation();

		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listClasses, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method saves new report in database
	 * @param report
	 * @param masterFile
	 * @param subreportFiles
	 * @param supbreportFilesNames
	 * @param csvFile
	 * @param javaFile
	 * @param compiledJavaFile
	 * @param checked
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "", method = RequestMethod.POST, consumes = "multipart/form-data")
	public ResponseEntity<RestResponseDto> saveReport(@RequestPart(required = true, name = "report") KjcReports report,
			@RequestPart(required = true, name = "masterFile") MultipartFile masterFile,
			@RequestPart(required = false, name = "subreportFiles") MultipartFile[] subreportFiles,
			@RequestPart(required = false, name = "subreportFilesParams") Map<String, String> supbreportFilesNames,
			@RequestPart(required = false, name = "propertyFile") MultipartFile csvFile,
			@RequestPart(required = false, name = "javaFile") MultipartFile javaFile,
			@RequestPart(required = false, name = "compiledJavaFile") MultipartFile compiledJavaFile,
			@RequestParam(required = true, name = "checked") int checked) {


		if(csvFile != null){
			csvFileValidation.doValidation(csvFile);
			dictionaryService.saveTranslationsFromCsvFile(csvFile, checked);
			translation.init();
		}
			
		if(report.getKjcClasses() != null && report.getKjcClasses().getId() != null){
			KjcClasses validationFromDB = kjcClassesDao.findById(report.getKjcClasses().getId());
			report.setKjcClasses(validationFromDB);
		}
		
		KjcClasses kjcClass = new KjcClasses();
		if(javaFile != null && compiledJavaFile != null){

				
			KjcClassCategories classCategory = kjcClassCategoriesDao.findByName(AppConstants.CLASS_CATEGORY_REPORT_VALIDATION);
			kjcClass.setKjcClassCategories(classCategory);	
			try {
				kjcClass = kjcClassesDao.prepareClassForUpload(kjcClass, javaFile.getBytes(), compiledJavaFile.getBytes(), javaFile.getOriginalFilename().replace(".java", ""), null);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
			
			report.setKjcClasses(kjcClass);
			
		}
		reportValidation.validationForSaveNewReport(report);				
		reportService.saveReport(report, masterFile, subreportFiles, supbreportFilesNames);

		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_REPORT_SUCCESSFULLY_SAVED),HttpStatus.OK);
	}
	
	@RequestMapping(value = "/populateDropdownParameter", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getDropdownParameter(@RequestParam Integer dependencyValueId, @RequestParam Integer dependentId){
		KjcReportParameters dependentParameter = kjcReportParametersDao.findById(dependentId);
		dependentParameter = reportService.populateParameter(dependentParameter, dependencyValueId);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(dependentParameter, HttpStatus.OK.value()), HttpStatus.OK);
	}


	/**
	 * This method is used for edit existing report in database
	 * @param report
	 * @param javaFile
	 * @param compiledJavaFile
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/edited", method = RequestMethod.POST, consumes = "multipart/form-data")
	public ResponseEntity<RestResponseDto> updateReport(@RequestPart(name = "report") KjcReports report,
			@RequestPart(required = false, name = "javaFile") MultipartFile javaFile,
			@RequestPart(required = false, name = "compiledJavaFile") MultipartFile compiledJavaFile) {

			if((javaFile != null && compiledJavaFile != null) || (report.getKjcClasses() != null )) { 	 
				KjcReports reportOld = kjcReportsDao.findById(report.getId());
				if (reportOld.getKjcClasses() != null && report.getKjcClasses() != null && 
						(report.getKjcClasses().getName() == null || (!report.getKjcClasses().getName().equals(reportOld.getKjcClasses().getName())))){
							if(reportService.haveReport(reportOld.getKjcClasses()))
								reportService.removeValidationeClass(report.getId());
							else{
								reportService.removeValidationeClass(report.getId());
								kjcClassesDao.deleteClassManually(reportOld.getKjcClasses());
							}
				}
			}
			reportValidation.validationForUpdateReport(report, javaFile, compiledJavaFile);
			reportService.updateReport(report, javaFile, compiledJavaFile);
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(),
					ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_REPORT_SUCCESSFULLY_UPDATED), HttpStatus.OK);
	}
	
	/**
	 * This method is used for set status
	 * @param id
	 * @param enabled
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/status/{id}", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> setStatus(@PathVariable Integer id, @RequestParam int enabled) {
		reportValidation.validationForEnable(id);
		reportService.changeStatus(id, enabled);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_REPORT_SUCCESSFULLY_CHANGED_STATUS), HttpStatus.OK);
	}

	/**
	 * This method is used for generate report
	 * @param viewType
	 * @param format
	 * @param report
	 * @return Response Entity containing  encoded report  and HTTP status
	 */
	@RequestMapping(value = "/{format}/{viewType}", method = RequestMethod.PUT)
    public ResponseEntity<RestResponseDto> generateReport(@PathVariable String viewType, @PathVariable String format,
			@RequestBody(required = true) KjcReports report)	{

		// validate input parameter types and size
		reportValidation.validateReportParameters(report);

		List<KjcReportParameters> reportParametersList = report.getKjcReportParameterses();

		KjcReports reportDb = kjcReportsDao.findById(report.getId());

		if (reportDb.getKjcClasses() != null) {
			KjcClasses clazz = report.getKjcClasses();
			String fullyQualifiedName = classLoadingUtil.getQualifiedName(clazz);
			BaseReportValidation rValidation = (BaseReportValidation) baseObjectFactory.create(fullyQualifiedName);
			rValidation.validate(sessionFactory, reportParametersList);
		}

		HashMap<String, Object> reportParameters = (HashMap<String, Object>) Utilities.createParametersMap(reportParametersList);

		byte[] reportGenerated = reportService.generateReport(format, reportParameters, reportDb);
		reportValidation.validateGeneratedReport(reportGenerated);
		String encoded = Base64.getEncoder().encodeToString(reportGenerated);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(encoded, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method is used to retrieve unavailable dates for booking
	 * @param id
	 * 		specifies the selected report id
	 * @return a list with unavailable dates
	 */
	@RequestMapping(value = "/book/{id}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getUnavailableDates(@PathVariable Integer id) {
		List<Date> unavailableDates = this.reportService.getUnavailableDatesForBooking(id);
		List<Date> unavailableDatesWithTime = new ArrayList<>();
		//add current time for a correct date adjustment
		for (Date date : unavailableDates) {
			unavailableDatesWithTime.add(Utilities.setCurrentTimeToDate(date));
		}

		return new ResponseEntity<RestResponseDto>(new RestResponseDto(unavailableDatesWithTime, HttpStatus.OK.value()),
				HttpStatus.OK);
	}
	
	/**
	 * This method is used for save booking for report
	 * @param reportBooking
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/book", method = RequestMethod.PUT)
	public ResponseEntity<RestResponseDto> addReportBooking(@RequestBody(required = true) KjcReportBookings reportBooking) {
		
		List<Date> unavailabileDates = this.reportService.getUnavailableDatesForBooking(reportBooking.getKjcReports().getId());
		reportValidation.validateAvailabilityDay(unavailabileDates, reportBooking.getBookedDate());
		this.reportService.saveOrUpdateReportBooking(reportBooking);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_REPORT_SUCCESSFULLY_BOOKED), HttpStatus.OK);
	}

	/**
	 * This method is used for delete report
	 * @param id
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<RestResponseDto> deleteReport(@PathVariable Integer id) {
		KjcReports report = kjcReportsDao.findById(id);
		reportValidation.validationForDeleteReport(report);
		reportService.deleteReport(report);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_REPORT_SUCCESSFULLY_DELETED), HttpStatus.OK);
	}
	
	/**
	 * This method returns all tables
	 * @return Response Entity containing  list of all tables and HTTP status
	 */
	@RequestMapping(value = "/tables", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllTables() {
		List<String> reportList = kjcReportsDao.findAllTables();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(reportList, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method returns all columns by table name
	 * @param tableName
	 * @return Response Entity containing  list of all columns for received table and HTTP status
	 */
	@RequestMapping(value = "/tables/columns", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllColumnsByTableName(
			@RequestParam(required = true, name = "tableName") String tableName) {
		List<Object> reportList = kjcReportsDao.findAllColumnsByTableName(tableName);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(reportList, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method is used for delete validation class
	 * @param id
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/validationClass/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<RestResponseDto> deleteValidationClass(@PathVariable Integer id) {
		KjcReports reportOld = kjcReportsDao.findById(id);
		reportService.removeValidationeClass(id);
		classLoadingValidation.validationForDeleteValidationClass(reportOld.getKjcClasses());
		kjcClassesDao.deleteClassManually(reportOld.getKjcClasses());
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(),
				ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_REPORT_SUCCESSFULLY_DELETED_VALLIDATION_CLASS), HttpStatus.OK);
	}

	/**
	 * This method returns all roles
	 * @return Response Entity containing  list of all roles and HTTP status
	 */
	@RequestMapping(value = "/roles", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllRoles(){
		List<KjcApplicationRoles> listRoles = kjcApplicationRolesDao.findAll();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listRoles, HttpStatus.OK.value()), HttpStatus.OK);
	}
}
