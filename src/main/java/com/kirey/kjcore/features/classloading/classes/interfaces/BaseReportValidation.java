package com.kirey.kjcore.features.classloading.classes.interfaces;

import java.util.List;

import org.hibernate.SessionFactory;

import com.kirey.kjcore.data.entity.KjcReportParameters;



public interface BaseReportValidation extends BaseObject {
	//public void validate(HashMap<String, Object> reportParameters, List<KjcReportParameters> reportParametersList);
	public void validate(SessionFactory sessionFactory, List<KjcReportParameters> reportParametersList);
}
