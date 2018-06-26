package com.kirey.wscm.data.service;

import java.util.List;

import javax.annotation.PostConstruct;

import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.data.dao.EventDao;
import com.kirey.wscm.data.entity.Event;
import com.kirey.wscm.data.entity.Jobs;

/**
 * 
 * @author paunovicm
 *
 */
@Service
public class EventsService {
	
	@Autowired
	private EventDao eventDao;
	
	@Autowired
	private JobService jobService;
	
	@PostConstruct
	private void loadAllCronsAndExecute() throws ClassNotFoundException, SchedulerException {
		List<Event> listEvents = eventDao.findByType(AppConstants.EVENT_TYPE_CRON);
		for (Event event : listEvents) {
			Jobs job = event.getJobs();
			if(event.getStatus() != null && event.getStatus().equals(AppConstants.SCHEDULER_STATUS_ACTIVE)) {
				job.setCronExpression(event.getDefinition());
//				jobService.startJobOnInit(job);
				System.out.println("***************************JOB STARTED********************************");
			}
		}
	}

}
