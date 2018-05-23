package com.kirey.kjcore.data.dao;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.logging.LogFactory;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.api.dto.ComboBoxDto;
import com.kirey.kjcore.api.dto.FilterCriteriaDto;
import com.kirey.kjcore.data.entity.KjcErrorLogs;

/**
 * Dao object for domain model class KjcErrorLogs.
 */
@Repository(value = "kjcErrorLogsDao")
public class KjcErrorLogsDao extends KjcBaseDao{
	
	@Autowired
	private SessionFactory sessionFactory;
	
	private static final String COMBOBOX_DATE = "combobox.date"; 
	
	public KjcErrorLogsDao() {
		log = LogFactory.getLog(KjcErrorLogsDao.class);
		entityClass=KjcErrorLogs.class;
	}

	/**A method used to find all distinct error names from database
	 * @return List<String> containing all distinct error names from database
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<String> findDistinctErrorNames() {
		return this.sessionFactory.getCurrentSession()
				.createCriteria(KjcErrorLogs.class)
				.setProjection(Projections.distinct(Projections.property("errorName"))).list();
	}

	/**A method used to find distinct users that have error logs in database
	 * @return List<String> containing usernames 
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<String> findDistinctUsers() {
		return this.sessionFactory.getCurrentSession()
				.createCriteria(KjcErrorLogs.class)
				.setProjection(Projections.distinct(Projections.property("username"))).list();
	}

	/**A method that is used to find all error logs that satisfy one or more received filters
	 * @param listSelection
	 * @return List<KjcErrorLogs> containing logs that are satisfying criteria
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<KjcErrorLogs> findAllFiltered(List<FilterCriteriaDto> listSelection) {
		Map<String, Object> parameterNameAndValues = new HashMap<String, Object>();
		StringBuilder hqlSB = new StringBuilder();
		hqlSB.setLength(0);
		hqlSB.append("from KjcErrorLogs el ");

 	if (!listSelection.isEmpty()) {
			Iterator<FilterCriteriaDto> selectedSearchCreteria = listSelection.iterator();
			hqlSB.append("where ");
			while (selectedSearchCreteria.hasNext()) {
				FilterCriteriaDto selectedBoxes = selectedSearchCreteria.next();
				Iterator<ComboBoxDto> selectBox = selectedBoxes.getSelectBoxList().iterator();

				while (selectBox.hasNext()) {
					ComboBoxDto boxDto = selectBox.next();
					String comboBoxName = selectedBoxes.getFilterName();

					if (!comboBoxName.contains(COMBOBOX_DATE) && (boxDto.getKey() == null)) {
						hqlSB.append("el.");
						hqlSB.append(selectedBoxes.getFilterName());
						hqlSB.append(" = ");
						hqlSB.append("'");
						
						hqlSB.append(boxDto.getName().replaceAll("'", "''"));
						hqlSB.append("'");
					}
					if (!comboBoxName.contains(COMBOBOX_DATE) && (boxDto.getKey() != null)) {
						hqlSB.append("el.");
						hqlSB.append(selectedBoxes.getFilterName());
						hqlSB.append(" = ");
						hqlSB.append(boxDto.getKey());
					}

					if (comboBoxName.contains(COMBOBOX_DATE)) {
						String[] dateFieldName = comboBoxName.split("\\.");
						if ("from".equals(dateFieldName[dateFieldName.length - 2])) {

							hqlSB.append(dateFieldName[dateFieldName.length - 1]);
							hqlSB.append(" between ");
							Date dateSelectedFrom = new Date(Long.parseLong(boxDto.getName()));
							hqlSB.append(":dateSelectedFrom");
							parameterNameAndValues.put("dateSelectedFrom", dateSelectedFrom);

							hqlSB.append(" and ");
						}
						if ("to".equals(dateFieldName[dateFieldName.length - 2])) {
							Date dateSelectedTo = new Date(Long.parseLong(boxDto.getName()));
							parameterNameAndValues.put("dateSelectedTo", dateSelectedTo);
							hqlSB.append(":dateSelectedTo ");
							if (selectedSearchCreteria.hasNext()) {
								hqlSB.append(" and ");
							}
						}
					}
					if (selectBox.hasNext())
						hqlSB.append(" and ");
				}
				if (selectedSearchCreteria.hasNext() && !selectedBoxes.getFilterName().startsWith(COMBOBOX_DATE)) {
					hqlSB.append(" and ");
				}
			}
		}

		Query query = this.sessionFactory.getCurrentSession().createQuery(hqlSB.toString());
		for (Entry<String, Object> e : parameterNameAndValues.entrySet()) {
			query.setParameter(e.getKey(), e.getValue());
		}

		return query.list();
	}

	/**
	 * A method used to extract specific error traces from database.
	 * 
	 * @param processType
	 *            - specifies the process type ( OFFLINE or ONLINE)
	 * @param jobInstanceId
	 *            - specifies the job instance id
	 * @return List<KjcErrorLogs> containing the exception for a specific job
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<KjcErrorLogs> findSpecificTraces(String processType, Integer jobInstanceId) {
		String hql = "from KjcErrorLogs error join fetch error.kjcErrorTraces where  "
				+ " error.processType=:processType and error.batchJobInstanceId=:jobInstanceId";
		return (List<KjcErrorLogs>) sessionFactory.getCurrentSession().createQuery(hql)
				.setParameter("jobInstanceId", jobInstanceId).setParameter("processType", processType).list();
	}

}
