package com.kirey.kjcore.features.scheduling.jobs.tasklet;

import java.util.ArrayList;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.constants.ErrorConstants;
import com.kirey.kjcore.data.compositedao.ReportService;
import com.kirey.kjcore.data.dao.KjcReportBookingsDao;
import com.kirey.kjcore.data.entity.KjcClasses;
import com.kirey.kjcore.data.entity.KjcReportBookingParameters;
import com.kirey.kjcore.data.entity.KjcReportBookings;
import com.kirey.kjcore.data.entity.KjcReportParameters;
import com.kirey.kjcore.data.entity.KjcReports;
import com.kirey.kjcore.features.classloading.BaseObjectFactory;
import com.kirey.kjcore.features.classloading.ClassLoadingUtil;

/**
 * 
 * @author nicutac
 *         <p>
 *         Class used to process a list of booked reports.
 */
public class AsyncReportsTasklet extends ParentNonTransactionalSingleThreadTasklet<KjcReportBookings> {

	@Autowired
	private ReportService reportService;

	@Autowired
	private ClassLoadingUtil classLoadingUtil;

	@Autowired
	private BaseObjectFactory baseObjectFactory;

	@Autowired
	private ApplicationContext applicationContext;

	@Autowired
	private KjcReportBookingsDao kjcReportBookingsDao;

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public List<KjcReportBookings> prepareExecutionItemList() {
		List<KjcReportBookings> bookedReports = new ArrayList<>();

		Calendar c = Calendar.getInstance();
		c.setTime(new Date());
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		c.set(Calendar.MILLISECOND, 0);
		// prepare list for processing
		bookedReports = reportService.getBookedReportAndChangeStatus(AppConstants.REPORT_STATUS_BOOKED, c.getTime());
		return bookedReports;
	}

	@Override
	public void processExecutionListItem(KjcReportBookings item) {
		KjcReports kjcReports = item.getKjcReports();
		// get booked report parameters
		HashMap<String, Object> reportParameters = new HashMap<>();
		List<KjcReportBookingParameters> bookingParametersList = item.getKjcReportBookingParameterses();
		for (KjcReportBookingParameters bookParam : bookingParametersList) {
			KjcReportParameters repParam = bookParam.getKjcReportParameters();
			reportParameters.put(repParam.getKey(), bookParam.getValue());
		}

		// report validation using class loading
		if (kjcReports.getKjcClasses() != null) {
			KjcClasses clazz = kjcReports.getKjcClasses();
			String fullyQualifiedName = classLoadingUtil.getQualifiedName(clazz);
//			IReportsValidation rValidation = (IReportsValidation) baseObjectFactory.create(fullyQualifiedName);
//			rValidation.validate(applicationContext, sessionFactory, reportParameters, item.getId().toString());
		}

		Long startTime = System.currentTimeMillis();
		byte[] reportGenerated = reportService.generateReport(item.getFormat(), reportParameters, kjcReports);

		Long stopTime = System.currentTimeMillis();

		if (reportGenerated != null) {
			Long execTimeNowMillis = stopTime - startTime;

			// update number of execution and average time
			Long avgExecTimeOld = kjcReports.getAvgExecTime();
			Long numExecutionOld = kjcReports.getNumExecution();

			// calculation of average time exec in milliseconds
			Long newAvgExecTimeMillis = ((avgExecTimeOld * numExecutionOld) + execTimeNowMillis)
					/ (numExecutionOld + 1);

			kjcReports.setAvgExecTime(newAvgExecTimeMillis);
			kjcReports.setNumExecution(numExecutionOld + 1);
			item.setStatus(AppConstants.REPORT_STATUS_GENERATED);

			reportService.updateBookedReport(item, reportGenerated, kjcReports);
		} else {
			throw new RuntimeException(ErrorConstants.EXCEPTION_NO_REPORT_GENERATED);
		}
	}

	@Override
	public String updateItemFailedExecutionStatus(KjcReportBookings item) {
		Integer taskId = item.getId();
		kjcReportBookingsDao.updateBookedReportStatus(AppConstants.REPORT_STATUS_FAILED, taskId);

		return taskId == null ? null : taskId.toString();
	}

}
