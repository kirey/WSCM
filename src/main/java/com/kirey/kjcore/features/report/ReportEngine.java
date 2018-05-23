package com.kirey.kjcore.features.report;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.hibernate.SessionFactory;
import org.springframework.orm.hibernate5.SessionFactoryUtils;
import org.springframework.stereotype.Component;

import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.data.entity.KjcReportBlobs;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;

/**Component containing methods for report creation
 * 
 * @author 
 */
@Component
public class ReportEngine {

	@Resource
	private SessionFactory sessionFactory;

	/**
	 * This method generates report
	 * @param reportParams - parameters for jasper report query
	 * @param blobs - .jasper files
	 * @return JasperPrint jasperPrint containing report details
	 */
	public JasperPrint generateReport(Map<String, Object> reportParams, List<KjcReportBlobs> blobs) {

		JasperPrint jasperPrint;
		try (Connection connection=SessionFactoryUtils.getDataSource(sessionFactory).getConnection()) {
			byte[] masterReport = null;

			for (int i = 0; i < blobs.size(); i++) {
				// master report
				if (blobs.get(i).getOrderBlob() == AppConstants.REPORT_MASTER_REPORT_ORDER) {
					masterReport = blobs.get(i).getFileBlob();
					// subreports
				} else {
					byte[] subByteArray = blobs.get(i).getFileBlob();
					InputStream is = new ByteArrayInputStream(subByteArray);
					JasperReport jasperSubreport = (JasperReport) JRLoader.loadObject(is);
					String subreportParamName = blobs.get(i).getSubreportParameterKey();
					// put subreport as parameter
					reportParams.put(subreportParamName, jasperSubreport);
				}
			}
			InputStream reportStream = new ByteArrayInputStream(masterReport);
			JasperReport jr = (JasperReport) JRLoader.loadObject(reportStream);
			jasperPrint = JasperFillManager.fillReport(jr, reportParams, connection);
			
		} catch (JRException | SQLException e) {
			throw new RuntimeException(e);
		}
		return jasperPrint;
	}
	
	/**
	 * This method exports report to pdf file
	 * @param jp
	 * @return ByteArrayOutputStream baos that represents prepared stream for pdf export
	 */
	public ByteArrayOutputStream exportPdf(JasperPrint jp) {
		ByteArrayOutputStream baos = null;
		try {
			baos = new ByteArrayOutputStream();
			JRPdfExporter exporter = new JRPdfExporter();
			exporter.setExporterInput(new SimpleExporterInput(jp));
			exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(baos));
			exporter.exportReport();
		} catch (JRException e) {
			throw new RuntimeException(e);
		}
		return baos;
	}

	/**
	 * This method exports report to xls file
	 * @param jp
	 * @return ByteArrayOutputStream baos that represents prepared stream for xls export
	 */
	public ByteArrayOutputStream exportXls(JasperPrint jp) {
		ByteArrayOutputStream baos = null;
		try {
			baos = new ByteArrayOutputStream();
			JRXlsxExporter exporter = new JRXlsxExporter();

			exporter.setExporterInput(new SimpleExporterInput(jp));
			exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(baos));

			exporter.exportReport();
		} catch (JRException e) {
			throw new RuntimeException(e);
		}
		return baos;
	}

}
