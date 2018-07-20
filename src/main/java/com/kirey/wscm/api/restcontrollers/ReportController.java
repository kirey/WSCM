package com.kirey.wscm.api.restcontrollers;

import java.util.Base64;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.kirey.wscm.api.dto.RestResponseDto;
import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.common.util.Utilities;
import com.kirey.wscm.data.dao.KjcReportParametersDao;
import com.kirey.wscm.data.dao.KjcReportsDao;
import com.kirey.wscm.data.entity.KjcReportParameters;
import com.kirey.wscm.data.entity.KjcReports;
import com.kirey.wscm.data.service.ReportService;
import com.kirey.wscm.data.service.StatisticsService;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.data.JRMapArrayDataSource;



/**Rest controller used for report administration
 * @author paunovicm
 *
 */
@RestController
@RequestMapping(value = "/rest/reports", produces = "application/json; charset=UTF-8")
public class ReportController {

	@Autowired
	private ReportService reportService;
	@Autowired
	private KjcReportsDao kjcReportsDao;
	
	@Autowired
	private KjcReportParametersDao kjcReportParametersDao;
	
	@Autowired
	private StatisticsService statisticsService;
	


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
	 * This method returns report by id
	 * @param id
	 * @return Response Entity containing  report with received id and HTTP status
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> findById(@PathVariable(value = "id") int id) {
		KjcReports report = kjcReportsDao.findById(id);
		
		List<KjcReportParameters> listParameters = report.getKjcReportParameterses();
		for (KjcReportParameters kjcReportParameters : listParameters) {
			if(kjcReportParameters.getDependencyParameter() != null){
				kjcReportParameters.setDependencyParamName(kjcReportParameters.getDependencyParameter().getName());
			}
		}
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(report, HttpStatus.OK.value()), HttpStatus.OK);
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
			@RequestParam(required = false, name = "checked") int checked) {

		List<String> listReportNames = kjcReportsDao.findAllReportNames();
		
		if(listReportNames.contains(report.getName())){
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report name already exists"),HttpStatus.BAD_REQUEST);
		}
		
		reportService.saveReport(report, masterFile, subreportFiles, supbreportFilesNames);

		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), "Report successfully saved"),HttpStatus.OK);
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
	public ResponseEntity<RestResponseDto> updateReport(@RequestPart(name = "report") KjcReports report) {

		List<String> listReportNames = kjcReportsDao.findAllReportNames();
		
		if(listReportNames.contains(report.getName())){
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report name already exists"),HttpStatus.BAD_REQUEST);
		}
			
			reportService.updateReport(report);
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), "Report successfully updated"), HttpStatus.OK);
	}
	
	/**
	 * This method is used for set status
	 * @param id
	 * @param enabled
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/status/{id}", method = RequestMethod.POST)
	public ResponseEntity<RestResponseDto> setStatus(@PathVariable Integer id, @RequestParam int enabled) {
		reportService.changeStatus(id, enabled);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), "Successfully changed report status"), HttpStatus.OK);
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


		
		RestResponseDto failResponse = this.validateReportParameters(report);
		if(failResponse != null) {
			return new ResponseEntity<RestResponseDto>(failResponse,HttpStatus.BAD_REQUEST);
		}

		List<KjcReportParameters> reportParametersList = report.getKjcReportParameterses();

		KjcReports reportDb = kjcReportsDao.findById(report.getId());

		

		HashMap<String, Object> reportParameters = (HashMap<String, Object>) Utilities.createParametersMap(reportParametersList);

		byte[] reportGenerated = reportService.generateReport(format, reportParameters, reportDb);
		if(reportGenerated == null) {
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report is empty"),HttpStatus.BAD_REQUEST);
		}
		String encoded = Base64.getEncoder().encodeToString(reportGenerated);		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(encoded, HttpStatus.OK.value()), HttpStatus.OK);
	}
	

	private RestResponseDto validateReportParameters(KjcReports report) {
		KjcReports kjcReportsTemp = kjcReportsDao.findById(report.getId());
		if(kjcReportsTemp == null) {
			return new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report does not exist");
		}
		for (KjcReportParameters parameter : report.getKjcReportParameterses()) {
			if(parameter.getIsMandatory() && !parameter.getKey().equals(AppConstants.REPORT_TRANSLATION_MAP) && (parameter.getValue() == null || "".equals(parameter.getValue().trim()))){
				return new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report parameter is mandatory");
			}
	
			if(parameter.getValue() != null) {
				switch (parameter.getType()) {
				case "Integer":
//					String integerValue = parameter.getValue().trim();
					try {
						int intValue = Integer.parseInt(parameter.getValue());
						//min or max value exist
						if (parameter.getMinValue() != null || parameter.getMaxValue() != null) {
							
							//min and max
							if(parameter.getMinValue() != null && parameter.getMaxValue() != null){
								int minValue = parameter.getMinValue();
								int maxValue = parameter.getMaxValue();
								if (intValue < minValue || intValue > maxValue) {
									return new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report parameter size out of range");
								}
							}
							//just max
							if(parameter.getMinValue() == null && parameter.getMaxValue() != null){
								int maxValue = parameter.getMaxValue();
								if(intValue > maxValue)
									return new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report parameter size out of range");
							}
							//just min
							if(parameter.getMinValue() != null && parameter.getMaxValue() == null){
								int minValue = parameter.getMinValue();
								if(intValue < minValue)
									return new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report parameter size out of range");
							}
							
						}
					} catch (Exception e) {
						return new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report parameter not integer");
					}
					break;
				case "Date":
				case "Timestamp":
					try {
						String milisecondsValue = parameter.getValue().trim();
						Long.parseLong(milisecondsValue);
					} catch (Exception e) {
						return new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report parameter not valid date");
					}
					break;
				case "Decimal":
					try {
						String doubleValue = parameter.getValue().trim();
						Double doubleVal = Double.parseDouble(doubleValue);
						
						//min or max value exist
						if (parameter.getMinValue() != null || parameter.getMaxValue() != null) {
							
							//min and max
							if(parameter.getMinValue() != null && parameter.getMaxValue() != null){
								int minValue = parameter.getMinValue();
								int maxValue = parameter.getMaxValue();
								if (doubleVal < minValue || doubleVal > maxValue) {
									return new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report parameter size out of range");
								}
							}
							//just max
							if(parameter.getMinValue() == null && parameter.getMaxValue() != null){
								int maxValue = parameter.getMaxValue();
								if(doubleVal > maxValue)
									return new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report parameter size out of range");
							}
							//just min
							if(parameter.getMinValue() != null && parameter.getMaxValue() == null){
								int minValue = parameter.getMinValue();
								if(doubleVal < minValue)
									return new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report parameter size out of range");
							}
						}
					} catch (Exception e) {
						return new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report parameter not Double");
					}
					break;

				case "String":
					String paramValueString = String.valueOf(parameter.getValue());
					int paramSize = paramValueString.length();
					//min OR max value exists
					if (parameter.getMinValue() != null || parameter.getMaxValue() != null) {
						
						//min AND max
						if(parameter.getMinValue() != null && parameter.getMaxValue() != null){
							int minValue = parameter.getMinValue();
							int maxValue = parameter.getMaxValue();
							if (paramSize < minValue || paramSize > maxValue) 
								return new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report parameter length out of range");
						}
						//just max
						if(parameter.getMinValue() == null && parameter.getMaxValue() != null){
							int maxValue = parameter.getMaxValue();
							if(paramSize > maxValue)
								return new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report parameter length out of range");
						}
						//just min
						if(parameter.getMinValue() != null && parameter.getMaxValue() == null){
							int minValue = parameter.getMinValue();
							if(paramSize < minValue)
								return new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Report parameter length out of range");
						}
					}
					break;
				default:
					break;
				}
			}
			
		}
		return null;
	}

	
	

	/**
	 * This method is used for delete report
	 * @param id
	 * @return Response Entity containing response message and HTTP status
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<RestResponseDto> deleteReport(@PathVariable Integer id) {
		KjcReports report = kjcReportsDao.findById(id);
		reportService.deleteReport(report);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), "Report successfully deleted"), HttpStatus.OK);
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
	 * Method used for generating report which contains list of categories with number of requests for each
	 * @return base64 encoded pdf for preview
	 */
	@RequestMapping(value = "/preview", method = RequestMethod.PUT)
    public ResponseEntity<RestResponseDto> generateReport() {

		List<HashMap<String, Object>> responseList = statisticsService.categoryNo();
		KjcReports report = kjcReportsDao.findByName("JavaBean");
		
		HashMap<String, Object> params = new HashMap<>();
		
		byte[] reportGenerated = reportService.generateReportJavaBean("pdf", params, report, responseList);

		String encoded = Base64.getEncoder().encodeToString(reportGenerated);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(encoded, HttpStatus.OK.value()), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/preview/userLinks", method = RequestMethod.PUT)
    public ResponseEntity<RestResponseDto> generateReportUserLinks() {

		Map<String, Object> response = statisticsService.linksStatisticsByUser(1);
		KjcReports report = kjcReportsDao.findByName("LinksNoByUser");
		
		HashMap<String, Object> params = new HashMap<>();
		JRMapArrayDataSource arrDatasource = new JRMapArrayDataSource(new Map[]{response});
		
		JRBeanCollectionDataSource listDatasource = new JRBeanCollectionDataSource((Collection<?>) response.get("links"));
		
		params.put("DS1", arrDatasource);
		params.put("DS2", listDatasource);
		
		
		byte[] reportGenerated = reportService.generateReportDatasource("pdf", params, report, arrDatasource);

		String encoded = Base64.getEncoder().encodeToString(reportGenerated);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(encoded, HttpStatus.OK.value()), HttpStatus.OK);
	}



	@RequestMapping(value = "/preview/test", method = RequestMethod.PUT)
    public ResponseEntity<RestResponseDto> generateReportTest() {
		
	
		KjcReports report = kjcReportsDao.findByName("Category number");
		
		RestResponseDto validateResponse = this.validateReportParameters(report);
		if(validateResponse != null) {
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(validateResponse, HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
		}
		
		List<KjcReportParameters> reportParametersList = report.getKjcReportParameterses();
		HashMap<String, Object> reportParameters = (HashMap<String, Object>) Utilities.createParametersMap(reportParametersList);

		byte[] reportGenerated = reportService.generateReport("pdf", reportParameters, report);

		String encoded = Base64.getEncoder().encodeToString(reportGenerated);
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(encoded, HttpStatus.OK.value()), HttpStatus.OK);
	}
}
