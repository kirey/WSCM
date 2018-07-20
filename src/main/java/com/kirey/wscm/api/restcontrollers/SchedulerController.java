package com.kirey.wscm.api.restcontrollers;

import java.util.List;

import org.quartz.CronExpression;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.wscm.api.dto.RestResponseDto;
import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.data.dao.CategoriesDao;
import com.kirey.wscm.data.dao.DicJobTypeDao;
import com.kirey.wscm.data.dao.EventDao;
import com.kirey.wscm.data.dao.JobCategoriesDao;
import com.kirey.wscm.data.dao.JobExecutionLogDao;
import com.kirey.wscm.data.dao.JobParametersDao;
import com.kirey.wscm.data.dao.JobsDao;
import com.kirey.wscm.data.dao.KjcClassesDao;
import com.kirey.wscm.data.dao.NotificationsDao;
import com.kirey.wscm.data.entity.Categories;
import com.kirey.wscm.data.entity.Content;
import com.kirey.wscm.data.entity.ContentCategories;
import com.kirey.wscm.data.entity.DicJobType;
import com.kirey.wscm.data.entity.Event;
import com.kirey.wscm.data.entity.JobCategories;
import com.kirey.wscm.data.entity.JobExecutionLog;
import com.kirey.wscm.data.entity.JobParameters;
import com.kirey.wscm.data.entity.Jobs;
import com.kirey.wscm.data.entity.KjcClasses;
import com.kirey.wscm.data.entity.Notifications;
import com.kirey.wscm.data.service.JobService;


@RestController
@RequestMapping(value = "rest/scheduler")
public class SchedulerController {

	@Autowired
	private JobsDao jobsDao;

	@Autowired
	private JobExecutionLogDao jobExecutionLogDao;

	@Autowired
	private JobService jobService;
	
	@Autowired
	private EventDao eventDao;
	
	@Autowired
	private JobCategoriesDao jobCategoriesDao;
	
	@Autowired
	private JobParametersDao jobParametersDao;
	
	@Autowired
	private NotificationsDao notificationsDao;
	
	@Autowired
	private CategoriesDao categoriesDao;
	
	@Autowired
	private DicJobTypeDao dicJobTypeDao;
	
	@Autowired
	private KjcClassesDao kjcClassesDao;

	/**
	 * get all jobs
	 * 
	 * @return
	 */
	@RequestMapping(value = "/jobs", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getAllSchedulers() {
		List<Jobs> listJobs = jobsDao.findAll();
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listJobs, AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}

	/**
	 * get job details
	 * 
	 * @param jobId
	 * @return
	 */
	@RequestMapping(value = "/job/{jobId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getJobById(@PathVariable int jobId) {
		Jobs scheduler = jobsDao.findById(jobId);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(scheduler, AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}

	/**
	 * add new job and return updated list of schedulers
	 * 
	 * @param scheduler
	 * @return
	 */
	@RequestMapping(value = "/addJob", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> addScheduler(@RequestBody Jobs scheduler) {
		
		if(scheduler.getClassLoading()) {
			List<Jobs> classLoadingJobs = jobsDao.findAllClassLoading();
			for (Jobs classLoadingJob : classLoadingJobs) {
				if(classLoadingJob.getKjcClasses().getId().equals(scheduler.getKjcClasses().getId())) {
					return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(),scheduler.getKjcClasses().getName() + " class already in use"), HttpStatus.BAD_REQUEST);
				}
			}
		}
		
		Jobs jobFromDb = jobsDao.findByJobName(scheduler.getJobName());
		if(jobFromDb != null) {
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(),"Job with name " + jobFromDb.getJobName() + " already exists"), HttpStatus.BAD_REQUEST);
		}

		Jobs savedJob = (Jobs) jobsDao.merge(scheduler);
		List<JobCategories> listJobCategories = scheduler.getJobCategorieses();
		for (JobCategories jobCategories : listJobCategories) {
			jobCategories.setJob(savedJob);
			jobCategoriesDao.attachDirty(jobCategories);
		}
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(jobsDao.findAll(), AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);

	}

	/**
	 * Edit job by id and return updated list of schedulers
	 * 
	 * @param scheduler
	 * @return
	 */
	@RequestMapping(value = "/editJob", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> editScheduler(@RequestBody Jobs scheduler) {
		Jobs jobById = jobsDao.findById(scheduler.getId());
		if(!jobById.getJobName().equals(scheduler.getJobName())) {
			Jobs jobFromDb = jobsDao.findByJobName(scheduler.getJobName());
			if(jobFromDb != null) {
				return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(),"Job with name " + jobFromDb.getJobName() + " already exists"), HttpStatus.BAD_REQUEST);
			}	
		}
		
		Jobs savedScheduler = (Jobs) jobsDao.merge(scheduler);
		
		List<JobCategories> jobCategoriesFromDb = jobCategoriesDao.findByJobId(savedScheduler.getId());
		
		List<JobCategories> jobCategorieses = scheduler.getJobCategorieses();
		
		for (JobCategories jobCategoryFromDb : jobCategoriesFromDb) {
			boolean exist = false;
			for (JobCategories jobCategories : jobCategorieses) {
				if(jobCategoryFromDb.getCategory().getId().equals(jobCategories.getCategory().getId())) {
					exist = true;
				}
			}
			if(exist) {
				jobCategoriesDao.delete(jobCategoryFromDb);	
			}
		}
		
		for (JobCategories jobCategory : jobCategorieses) {
			JobCategories jobCategories = jobCategoriesDao.findByJobAndCategory(savedScheduler.getId(), jobCategory.getCategory().getId());
			if(jobCategories == null) {
				jobCategories = new JobCategories();
				jobCategories.setCategory(jobCategory.getCategory());
				jobCategories.setJob(savedScheduler);
				jobCategories.setWeight(jobCategory.getWeight());
				jobCategoriesDao.attachDirty(jobCategories);
			} else {
				jobCategories.setCategory(jobCategory.getCategory());
				jobCategories.setJob(savedScheduler);
				jobCategories.setWeight(jobCategory.getWeight());
				jobCategoriesDao.merge(jobCategories);
			}
		}
	
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(jobsDao.findAll(), AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);

	}

	/**
	 * delete specific job and return updated list of schedulers
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deleteJob/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> deleteScheduler(@PathVariable int id) {
		Jobs job = jobsDao.findById(id);
		job.getListNotificationses().clear();
		jobsDao.merge(job);
		
		jobsDao.delete(job);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(jobsDao.findAll(), AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}

	/**
	 * get scheduler log details
	 * 
	 * @param idLog
	 * @return
	 */
	@RequestMapping(value = "/jobLog/{idLog}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getJobLog(@PathVariable int idLog) {
		JobExecutionLog sel = jobExecutionLogDao.findById(idLog);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(sel, AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}

	/**
	 * returns all logs for selected job
	 * 
	 * @param idJob
	 * @return
	 */
	@RequestMapping(value = "/jobHistory/event/{eventId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getHistoryByEventId(@PathVariable int eventId) {
		Event event = eventDao.findById(eventId);
		List<JobExecutionLog> listHistoryByJobId = jobExecutionLogDao.getLogsByJobId(event.getJobs().getId());
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listHistoryByJobId, AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	/**
	 * returns all logs for selected job
	 * 
	 * @param idJob
	 * @return
	 */
	@RequestMapping(value = "/jobHistory/{jobId}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getHistoryByJobId(@PathVariable int jobId) {
		List<JobExecutionLog> listHistoryByJobId = jobExecutionLogDao.getLogsByJobId(jobId);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listHistoryByJobId, AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}

	/**
	 * Method for starting scheduler/job
	 * 
	 * @param id
	 * @return
	 * @throws ClassNotFoundException 
	 * @throws SchedulerException
	 */
	@RequestMapping(value = "/startJob/event/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> startJobEvent(@PathVariable int id) throws ClassNotFoundException {

		try {
			Event event = eventDao.findById(id);
			if(event.getEventType().equals(AppConstants.EVENT_TYPE_CRON)) {
				jobService.startJob(id);
			} else {
				jobService.startJobImmediately(event.getJobs());
			}
			
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), AppConstants.MSG_JOB_SUCCESSFULL_STARTED), HttpStatus.OK);
		} catch (SchedulerException e) {
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), AppConstants.MSG_JOB_START_FAILED), HttpStatus.BAD_REQUEST);
		}
	}
	
	/**
	 * Method for stopping job with given id
	 * @param id
	 * @return
	 * @throws ClassNotFoundException
	 */
	@RequestMapping(value = "/startJob/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> startJob(@PathVariable int id) throws ClassNotFoundException {

		
		try {
			Jobs job = jobsDao.findById(id);
			if(job != null && job.getClassLoading()) {
				jobService.startJobClassLoading(job);	
			}else if (job != null && !job.getClassLoading()) {
				jobService.startJobImmediately(job);
			}
			
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), AppConstants.MSG_JOB_SUCCESSFULL_STARTED), HttpStatus.OK);
		} catch (SchedulerException e) {
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), AppConstants.MSG_JOB_START_FAILED), HttpStatus.BAD_REQUEST);
		}
	}
	

	/**
	 * MEthod for stopping job with given event id
	 * 
	 * @param id - of {@link Event}
	 * @return
	 */
	@RequestMapping(value = "/stopJob/event/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> stopJobEvent(@PathVariable Integer id) {

		try {
			Event event = eventDao.findById(id);
			jobService.stopJob(event.getJobs().getId());
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), AppConstants.MSG_JOB_SUCCESSFULL_STOPPED), HttpStatus.OK);
		} catch (SchedulerException e) {
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), AppConstants.MSG_JOB_STOP_FAILED), HttpStatus.BAD_REQUEST);
		}
	}
	
	/**
	 * MEthod for stopping job with given id
	 * @param id - of {@link Jobs}
	 * @return
	 */
	@RequestMapping(value = "/stopJob/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> stopJob(@PathVariable Integer id) {

		try {
			Jobs job = jobsDao.findById(id);
			jobService.stopJob(job.getId());
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), AppConstants.MSG_JOB_SUCCESSFULL_STOPPED), HttpStatus.OK);
		} catch (SchedulerException e) {
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), AppConstants.MSG_JOB_STOP_FAILED), HttpStatus.BAD_REQUEST);
		}
	}
	
	/**
	 * Method for getting all {@link Event}
	 * @return ResponseEntity containing the list of all events along with HTTP status
	 */
	@RequestMapping(value = "/events", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getEvents() {
		List<Event> listEvents = eventDao.findAll();
		for (Event event : listEvents) {
			event.getJobs().setJobCategorieses(null);
			event.getJobs().setListNotificationses(null);
			event.getJobs().setJobParameterses(null);
		}
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listEvents, AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	/**
	 * Method for adding new {@link Event}
	 * @param event
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/events", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> addNewEvent(@RequestBody Event event) {
		Event eventFromDb = eventDao.findByName(event.getEventName());
		if(eventFromDb != null) {
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Event with name " + event.getEventName() + "already exist"), HttpStatus.BAD_REQUEST);
		}
		eventDao.attachDirty(event);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("Successfully added new event", AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	/**
	 * Method for editing {@link Event}
	 * @param event
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/events", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> editEvent(@RequestBody Event event) {
		Event eventById = eventDao.findById(event.getId());
		if(!eventById.getEventName().equals(event.getEventName())) {
			Event eventByName = eventDao.findByName(event.getEventName());
			if(eventByName != null) {
				return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "Event with name " + event.getEventName() + "already exist"), HttpStatus.BAD_REQUEST);
			}
		}
		eventDao.merge(event);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("Successfully edited event", AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	/**
	 * Method for deleting {@link Event}
	 * @param id
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/events/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> deleteEvent(@PathVariable Integer id) {
		Event event = eventDao.findById(id);
		eventDao.delete(event);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("Successfully deleted event", AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	/**
	 * Method for getting all {@link JobParameters}
	 * @return ResponseEntity containing the list of all job parameters along with HTTP status
	 */
	@RequestMapping(value = "/params", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getAllParams() {
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(jobParametersDao.findAll(), AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	/**
	 * Method for getting {@link List} of {@link JobParameters} by job id
	 * @param id - of {@link Jobs}
	 * @return ResponseEntity containing the list of all job parameters along with HTTP status
	 */
	@RequestMapping(value = "/{id}/params", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getParamsByJob(@PathVariable Integer id) {
		List<JobParameters> listJobParameters = jobParametersDao.findByJob(id);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listJobParameters, AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	/**
	 * Method for adding new {@link JobParameters}
	 * @param jobParameter
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/params", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> addNewParams(@RequestBody JobParameters jobParameter) {
		JobParameters jobParamFromDb = jobParametersDao.findByNameAndJob(jobParameter.getName(), jobParameter.getJob());
		if(jobParamFromDb != null) {
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "parameter with name " + jobParameter.getName() + "already exist"), HttpStatus.BAD_REQUEST);
		}
	
		jobParametersDao.attachDirty(jobParameter);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(jobParametersDao.findAll(), AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	/**
	 * Method for editing {@link JobParameters}
	 * @param jobParameter
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/params", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> edit(@RequestBody JobParameters jobParameter) {
		JobParameters jobParamFromDb = jobParametersDao.findById(jobParameter.getId());
		if(!jobParamFromDb.getName().equals(jobParameter.getName())){
			JobParameters jobParamFromDbByName = jobParametersDao.findByNameAndJob(jobParameter.getName(), jobParameter.getJob());
			if(jobParamFromDbByName != null) {
				return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), "parameter with name " + jobParameter.getName() + "already exist"), HttpStatus.BAD_REQUEST);
			}
		}
		jobParametersDao.merge(jobParameter);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(jobParametersDao.findAll(), AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	/**
	 * Method for deleting {@link JobParameters} by id
	 * @param id - of {@link JobParameters}
	 * @return ResponseEntity containing the request status message and HTTP status code
	 */
	@RequestMapping(value = "/params/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> deleteParameter(@PathVariable Integer id) {
		JobParameters jobParameter = jobParametersDao.findById(id);
		jobParametersDao.delete(jobParameter);
		return new ResponseEntity<RestResponseDto>(new RestResponseDto("Successfully deleted parameter", AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	/**
	 * Method for getting all {@link Categories}
	 * @return ResponseEntity containing the list of all categories along with HTTP status
	 */
	@RequestMapping(value = "/categories", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getAllCategories() {
		List<Categories> categories = categoriesDao.findAll();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(categories, AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	/**
	 * Method for getting all {@link DicJobType}
	 * @return ResponseEntity containing the list of all job types along with HTTP status
	 */
	@RequestMapping(value = "/jobTypes", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getAllJobTypes() {
		List<DicJobType> jobTypes = dicJobTypeDao.findAll();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(jobTypes, AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	/**
	 * Method for getting all {@link Notifications} 
	 * @return ResponseEntity containing the list of all notifications along with HTTP status
	 */
	@RequestMapping(value = "/notifications", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getAllNotifications() {
		List<Notifications> notifications = notificationsDao.findAll();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(notifications, AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	
	/**
	 * Method for getting all {@link KjcClasses} 
	 * @return ResponseEntity containing the list of all classes along with HTTP status
	 */
	@RequestMapping(value = "/classes", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getAllUnusedClasses() {
		List<KjcClasses> listClasses = jobService.getAllUnusedKjcClasses();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listClasses, AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}

}
