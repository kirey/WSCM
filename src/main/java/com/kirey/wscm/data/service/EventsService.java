package com.kirey.wscm.data.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

	
	private List<Event> allEvents;
	
	public EventsService() {
		allEvents = Collections.synchronizedList(new ArrayList<>());
	}
	
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
	
	@PostConstruct
	private void loadAllEvents() {
		allEvents = eventDao.findAll();
	}

	public List<Event> getAllEvents() {
		return allEvents;
	}

	public void setAllEvents(List<Event> allEvents) {
		this.allEvents = allEvents;
	}
	
	/**
	 * Method for getting {@link List} of {@link Event} by type from cache
	 * @param type
	 * @return {@link List}<{@link Event}>
	 */
	public List<Event> getEventByType(String type){
		List<Event> eventsByType = new ArrayList<>();
		for (Event event : allEvents) {
			if(event.getEventType().equals(type)) {
				eventsByType.add(event);
			}
		}
		return eventsByType;
	}

}
