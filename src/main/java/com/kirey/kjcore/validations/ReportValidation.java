package com.kirey.kjcore.validations;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.dao.KjcClassesDao;
import com.kirey.kjcore.data.dao.KjcReportsDao;
import com.kirey.kjcore.data.entity.KjcClasses;
import com.kirey.kjcore.data.entity.KjcReportParameters;
import com.kirey.kjcore.data.entity.KjcReports;
import com.kirey.kjcore.features.exception.customexceptions.BusinessValidationException;

/**Component used for report related validation
 * @author 
 *
 */
@Component
public class ReportValidation extends BaseValidation {
	
	
	@Autowired
	KjcReportsDao kjcReportsDao;
	@Autowired 
	KjcClassesDao kjcClassesDao;

	/**This method is used when validating report parameters. It validates when report doesn't exist in database,
	 * mandatory parameter isn't inserted, size of parameter is out of range, inserted parameter size isn't integer or double
	 * parameter date isn't valid or parameter length is out of range
	 * @param report
	 * @throws BusinessValidationException
	 */
	public void validateReportParameters(KjcReports report) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();

		KjcReports kjcReportsTemp = kjcReportsDao.findById(report.getId());
		if(kjcReportsTemp == null) {
			validationErrorDtos
			.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_NOT_EXISTS));
		}
		for (KjcReportParameters parameter : report.getKjcReportParameterses()) {
			if(parameter.getIsMandatory() && !parameter.getKey().equals(AppConstants.REPORT_TRANSLATION_MAP) && (parameter.getValue() == null || "".equals(parameter.getValue().trim()))){
					validationErrorDtos
							.add(new ValidationErrorDto(null, ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_PARAM_IS_MANDATORY, parameter.getKey()));
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
									validationErrorDtos.add(new ValidationErrorDto(null, ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_PARAM_SIZE_OUT_OF_RANGE,
											parameter.getKey()));
								}
							}
							//just max
							if(parameter.getMinValue() == null && parameter.getMaxValue() != null){
								int maxValue = parameter.getMaxValue();
								if(intValue > maxValue)
									validationErrorDtos.add(new ValidationErrorDto(null, ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_PARAM_SIZE_OUT_OF_RANGE,
											parameter.getKey()));
							}
							//just min
							if(parameter.getMinValue() != null && parameter.getMaxValue() == null){
								int minValue = parameter.getMinValue();
								if(intValue < minValue)
									validationErrorDtos.add(new ValidationErrorDto(null, ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_PARAM_SIZE_OUT_OF_RANGE,
											parameter.getKey()));
							}
							
						}
					} catch (Exception e) {
						validationErrorDtos.add(
								new ValidationErrorDto(null, ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_PARAM_NOT_INTEGER, parameter.getKey()));
					}
					break;
				case "Date":
				case "Timestamp":
					try {
						String milisecondsValue = parameter.getValue().trim();
						Long.parseLong(milisecondsValue);
					} catch (Exception e) {
						validationErrorDtos.add(
								new ValidationErrorDto(null, ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_PARAM_NOT_VALID_DATE, parameter.getKey()));
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
									validationErrorDtos.add(new ValidationErrorDto(null, ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_PARAM_SIZE_OUT_OF_RANGE,
											parameter.getKey()));
								}
							}
							//just max
							if(parameter.getMinValue() == null && parameter.getMaxValue() != null){
								int maxValue = parameter.getMaxValue();
								if(doubleVal > maxValue)
									validationErrorDtos.add(new ValidationErrorDto(null, ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_PARAM_SIZE_OUT_OF_RANGE,
											parameter.getKey()));
							}
							//just min
							if(parameter.getMinValue() != null && parameter.getMaxValue() == null){
								int minValue = parameter.getMinValue();
								if(doubleVal < minValue)
									validationErrorDtos.add(new ValidationErrorDto(null, ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_PARAM_SIZE_OUT_OF_RANGE,
											parameter.getKey()));
							}
						}
					} catch (Exception e) {
						validationErrorDtos.add(
								new ValidationErrorDto(null, ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_PARAM_NOT_DOUBLE, parameter.getKey()));
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
								validationErrorDtos.add(new ValidationErrorDto(null, ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_PARAM_LENGTH_OUT_OF_RANGE,
										parameter.getKey()));
						}
						//just max
						if(parameter.getMinValue() == null && parameter.getMaxValue() != null){
							int maxValue = parameter.getMaxValue();
							if(paramSize > maxValue)
								validationErrorDtos.add(new ValidationErrorDto(null, ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_PARAM_LENGTH_OUT_OF_RANGE,
										parameter.getKey()));
						}
						//just min
						if(parameter.getMinValue() != null && parameter.getMaxValue() == null){
							int minValue = parameter.getMinValue();
							if(paramSize < minValue)
								validationErrorDtos.add(new ValidationErrorDto(null, ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_PARAM_LENGTH_OUT_OF_RANGE,
										parameter.getKey()));
						}
					}
					break;
				default:
					break;
				}
			}
			
		}
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**Method validates when report result is empty
	 * @param reportGenerated
	 * @throws BusinessValidationException
	 */
	public void validateGeneratedReport(byte[] reportGenerated) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		
		if (reportGenerated == null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_RESULT_EMPTY));
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
	
	/**This method validates when report doesn't exist in database
	 * @param id
	 * @throws BusinessValidationException
	 */
	public void validationForEnable(int id) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		//check if class exists
		KjcReports kjcReports = kjcReportsDao.findById(id);
		if(kjcReports == null){
			validationErrorDtos.add(new ValidationErrorDto (this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_NOT_EXISTS));
		}
		
		// creating BusinessValidationException
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}		
	}
	
	/**This method validates when report already exists in database
	 * @param kjcReports
	 * @throws BusinessValidationException
	 */
	public void validationForSaveNewReport(KjcReports kjcReports){
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		List<String> listReportNames = kjcReportsDao.findAllReportNames();
		
		if(listReportNames.contains(kjcReports.getName())){
			validationErrorDtos.add(new ValidationErrorDto (this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_ALREADY_EXISTS));
		}
		if(kjcReports.getKjcCompanieses().isEmpty()){
			validationErrorDtos.add(new ValidationErrorDto (this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_MUST_HAVE_COMPANY));
		}
		
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**This method validates when report already exists in database or description or validation class is null
	 * @param report
	 * @param javaFile
	 * @param compiledJavaFile
	 * @throws BusinessValidationException
	 */
	public void validationForUpdateReport(KjcReports report, MultipartFile javaFile, MultipartFile compiledJavaFile) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		List<String> listReportNames = kjcReportsDao.findAllNamesWithoutOne(report);
		
		if(listReportNames.contains(report.getName())){
			validationErrorDtos.add(new ValidationErrorDto (this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_ALREADY_EXISTS));
		}
		
		if ((javaFile == null && compiledJavaFile == null)  && report.getKjcClasses() != null){
			KjcClasses kjcClass = kjcClassesDao.findByName(report.getKjcClasses().getName());
			if(kjcClass == null && report.getKjcClasses().getDescription() != null){
				validationErrorDtos.add(new ValidationErrorDto (this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_VALIDATION_CLASS_DESCRIPTION));
			}
		}
		
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**This method validates if report doesn't exist or cannot be deleted
	 * @param report
	 * @throws BusinessValidationException
	 */
	public void validationForDeleteReport(KjcReports report) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		if (report == null) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_NOT_EXISTS));
		} else {
			if (!report.getKjcReportBookingses().isEmpty()) {
				validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
						ValidationErrorConstants.VALIDATION_BUSINESS_BOOKED_REPORT_COULD_NOT_DELETE));
			}
		}
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
	
	/**
	 * This methods validates if :
	 * <p>
	 * the bookedDate is between interval : from tomorrow + 30 days
	 * <p>
	 * the booked date is available anymore
	 * 
	 * @param unavailableDates
	 *            specifies the unavailable
	 * @param bookedDate
	 *            the desired date when we want the report generated
	 */
	public void validateAvailabilityDay(List<Date> unavailableDates, Date bookedDate) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		
		Calendar c = Calendar.getInstance();
		c.setTime(new Date()); // Now use today date.
		c.add(Calendar.DATE, 31); // Adding 30 days from tomorrow
		
		Date bookedDateWithZeroTime = Utilities.dateWithZeroTime(bookedDate);
		Date todayWithZeroTime = Utilities.dateWithZeroTime(new Date());
		Date maxIntervalWithZeroTime = Utilities.dateWithZeroTime(c.getTime());
	
		// check if selected date is in the interval : from tomorrow + 30 days
		if (bookedDateWithZeroTime.compareTo(todayWithZeroTime) <= 0
				|| bookedDateWithZeroTime.compareTo(maxIntervalWithZeroTime) > 0) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_BOOKED_REPORT_UNAVAILABLE_DATE));
		}

		if (!unavailableDates.isEmpty() && unavailableDates.contains(bookedDateWithZeroTime)) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_BOOKED_REPORT_UNAVAILABLE_DATE));
		}
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
		
	}

	public void validationForGetSingleReport(KjcReports report) {
		List<ValidationErrorDto> validationErrorDtos = new ArrayList<ValidationErrorDto>();
		if (report == null) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_REPORT_NOT_EXISTS));
		}
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
}
