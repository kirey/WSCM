package com.kirey.kjcore.data.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.logging.LogFactory;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.kirey.kjcore.api.dto.BookedReportDto;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.entity.KjcReportBlobs;
import com.kirey.kjcore.data.entity.KjcReportBookings;
import com.kirey.kjcore.data.entity.KjcReports;

/**
 * Dao object for domain model class KjcReportBookings.
 */
@Repository(value = "kjcReportBookingsDao")
public class KjcReportBookingsDao extends KjcBaseDao {

	@Autowired
	private SessionFactory sessionFactory;

	public KjcReportBookingsDao() {
		log = LogFactory.getLog(KjcReportBookingsDao.class);
		entityClass = KjcReportBookings.class;
	}

	/**
	 * A method used to extract all files related to report
	 * 
	 * @param reportId
	 * @return KjcReportBlobs containing file data
	 */
	@Transactional
	public KjcReportBlobs getBlobFileByReportId(Integer reportId) {
		KjcReports rep = (KjcReports) sessionFactory.getCurrentSession().createCriteria(KjcReports.class)
				.add(Restrictions.eq("id", reportId)).uniqueResult();
		return (KjcReportBlobs) sessionFactory.getCurrentSession().createCriteria(KjcReportBlobs.class)
				.add(Restrictions.eq("report", rep)).uniqueResult();
	}

	/**
	 * A method used to extract all unavailable dates used in the booking phase.
	 * 
	 * @param status
	 *            - specifies the status of report
	 * @param maxDate
	 *            - specifies the maxim date from the desired interval
	 * @return List<Object[]> containing the booked date and the sum of average
	 *         execution time per booked date
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Object[]> findAllBookedReports(String status, Date maxDate) {
		try {
			String hql = "select r.bookedDate, sum(r.kjcReports.avgExecTime) from KjcReportBookings r where r.bookedDate<=:maxDate and r.bookedDate>:startDate and r.status =:status group by r.bookedDate order by r.bookedDate asc";
			return (List<Object[]>) sessionFactory.getCurrentSession().createQuery(hql).setParameter("maxDate", maxDate)
					.setParameter("startDate", Utilities.dateWithZeroTime(new Date())).setParameter("status", status).list();

		} catch (RuntimeException re) {
			throw re;
		}
	}

	/**
	 * A method used to extract all booked reports for the current day in order
	 * to be generated.
	 * 
	 * @param status
	 *            - specifies the status of report
	 * @param currentDate
	 *            - specifies the current day
	 * @return List<KjcReportBookings> containing the booked reports
	 */
	@Transactional
	@SuppressWarnings("unchecked")
	public List<KjcReportBookings> findBookedReportsForGenerate(String status, Date currentDate) {

		try {
			return (List<KjcReportBookings>) sessionFactory.getCurrentSession().createCriteria(KjcReportBookings.class)
					.add(Restrictions.eq("status", status)).add(Restrictions.eq("bookedDate", currentDate)).list();
		} catch (RuntimeException re) {
			throw re;
		}

	}

	/**
	 * A method used to extract all booked reports that satisfy one or more
	 * received filters.
	 * 
	 * @param hqlSB
	 *            - indicates the query created using the filters
	 * @param parameterNameAndValues
	 *            - indicates the parameters for query
	 * @return List<Object[]> containing the booked reports
	 */
	@SuppressWarnings("unchecked")
	@Transactional
	public List<Object[]> findAllFilteredBookedReports(StringBuilder hqlSB,
			Map<String, Object> parameterNameAndValues) {
		try {
			Query query = this.sessionFactory.getCurrentSession().createQuery(hqlSB.toString());
			for (Entry<String, Object> e : parameterNameAndValues.entrySet()) {
				query.setParameter(e.getKey(), e.getValue());
			}
			return query.list();
		} catch (RuntimeException re) {
			throw re;
		}
	}

	/**
	 * A method used to extract the booked report blob in order to be printed.
	 * 
	 * @param bookedReportId
	 *            - specifies the booked report id
	 * @return List<KjcReportBookings> containing the blob report along
	 */
	@Transactional
	public byte[] findBookedReportBlob(int bookedReportId) {
		try {
			String hql = " select r.kjcReportBookingBlobs.fileBlob from KjcReportBookings r where r.id=:reportId";
			return (byte[]) sessionFactory.getCurrentSession().createQuery(hql).setParameter("reportId", bookedReportId)
					.uniqueResult();

		} catch (RuntimeException re) {
			throw re;
		}
	}

	/**
	 * This method is used to update a list with booked reports status.
	 * 
	 * @param status
	 *            - specifies the status of report
	 * @param bookedReportsId
	 *            - specifies the list of reports id
	 * @return
	 */
	@Transactional
	public void updateBookedReportsStatus(String status, List<Integer> bookedReportsId) {
		try {
			String hql = "update KjcReportBookings r set r.status=:status, r.utUpdate=:user, r.tsUpdate=:tsUpdate where r.id in(:bookedReportId)";
			sessionFactory.getCurrentSession().createQuery(hql).setParameter("status", status)
					.setParameter("user", Utilities.getUserFromContext().getId()).setParameter("tsUpdate", new Date())
					.setParameterList("bookedReportId", bookedReportsId).executeUpdate();

		} catch (RuntimeException re) {
			throw re;
		}
	}

	/**
	 * This method is used to update a single booked report status.
	 * 
	 * @param status
	 *            - specifies the status of report
	 * @param bookedReportId
	 *            - specifies the report id
	 * @return
	 */
	@Transactional
	public void updateBookedReportStatus(String status, Integer bookedReportId) {
		try {
			String hql = "update KjcReportBookings r set r.status=:status, r.utUpdate=:user, r.tsUpdate=:tsUpdate where r.id=:bookedReportId";
			sessionFactory.getCurrentSession().createQuery(hql).setParameter("status", status)
					.setParameter("user", Utilities.getUserFromContext().getId()).setParameter("tsUpdate", new Date())
					.setParameter("bookedReportId", bookedReportId).executeUpdate();

		} catch (RuntimeException re) {
			throw re;
		}
	}
}
