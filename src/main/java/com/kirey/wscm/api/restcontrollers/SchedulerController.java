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
import org.springframework.web.bind.annotation.RestController;

import com.kirey.wscm.api.dto.RestResponseDto;
import com.kirey.wscm.common.constants.AppConstants;
import com.kirey.wscm.data.dao.EventDao;
import com.kirey.wscm.data.dao.JobExecutionLogDao;
import com.kirey.wscm.data.dao.JobsDao;
import com.kirey.wscm.data.entity.JobCategories;
import com.kirey.wscm.data.entity.JobExecutionLog;
import com.kirey.wscm.data.entity.Jobs;
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

	/**
	 * get all jobs
	 * 
	 * @return
	 */
	@RequestMapping(value = "/jobs", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getAllSchedulers() {
		List<Jobs> listJobs = jobsDao.findAll();
		for (Jobs jobs : listJobs) {
			List<JobCategories> listCategories = jobs.getJobCategorieses();
			System.out.println("milos");
		}
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
		
//		if( CronExpression.isValidExpression(scheduler.getCronExpression()) ) { 
//			scheduler.setStatus(AppConstants.SCHEDULER_STATUS_INACTIVE);
			jobsDao.persist(scheduler);
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(jobsDao.findAll(), AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
//		} else {
//			 return new ResponseEntity<RestResponseDto>(new RestResponseDto(jobsDao.findAll(), AppConstants.MSG_CRON_EXPRESSION_INVALID), HttpStatus.BAD_REQUEST);
//		}
	}

	/**
	 * Edit job by id and return updated list of schedulers
	 * 
	 * @param scheduler
	 * @return
	 */
	@RequestMapping(value = "/editJob", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> editScheduler(@RequestBody Jobs scheduler) {
		
//		if( CronExpression.isValidExpression(scheduler.getCronExpression()) ) {
			jobsDao.attachDirty(scheduler);
		   return new ResponseEntity<RestResponseDto>(new RestResponseDto(jobsDao.findAll(), AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
//		} else {
//		   return new ResponseEntity<RestResponseDto>(new RestResponseDto(jobsDao.findAll(), AppConstants.MSG_CRON_EXPRESSION_INVALID), HttpStatus.BAD_REQUEST);
//		}
	}

	/**
	 * delete specific job and return updated list of schedulers
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/deleteJob/{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> deleteScheduler(@PathVariable int id) {
		jobsDao.delete(jobsDao.findById(id));
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
	@RequestMapping(value = "/jobHistory/{idJob}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getHistoryByJobId(@PathVariable int idJob) {
		List<JobExecutionLog> listHistoryByJobId = jobExecutionLogDao.getLogsByJobId(idJob);
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
	@RequestMapping(value = "/startJob/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> startJob(@PathVariable int id) throws ClassNotFoundException {

		try {
			jobService.startJob(id);
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), AppConstants.MSG_JOB_SUCCESSFULL_STARTED), HttpStatus.OK);
		} catch (SchedulerException e) {
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), AppConstants.MSG_JOB_START_FAILED), HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * MEthod for stopping job with given id
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/stopJob/{id}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> stopJob(@PathVariable Integer id) {

		try {
			jobService.stopJob(id);
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.OK.value(), AppConstants.MSG_JOB_SUCCESSFULL_STOPPED), HttpStatus.OK);
		} catch (SchedulerException e) {
			return new ResponseEntity<RestResponseDto>(new RestResponseDto(HttpStatus.BAD_REQUEST.value(), AppConstants.MSG_JOB_STOP_FAILED), HttpStatus.BAD_REQUEST);
		}
	}
	
	@RequestMapping(value = "/events", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<RestResponseDto> getEvents() {
		
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(eventDao.findAll(), AppConstants.MSG_SUCCESSFULL), HttpStatus.OK);
	}
	

}
