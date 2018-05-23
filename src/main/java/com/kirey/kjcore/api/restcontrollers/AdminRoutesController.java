package com.kirey.kjcore.api.restcontrollers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.kirey.kjcore.api.dto.RestResponseDto;
import com.kirey.kjcore.common.constants.ResponseMessagesConstants;
import com.kirey.kjcore.data.dao.KjcApplicationRolesDao;
import com.kirey.kjcore.data.dao.KjcUrlRoutesDao;
import com.kirey.kjcore.data.entity.KjcApplicationRoles;
import com.kirey.kjcore.data.entity.KjcUrlRoutes;
import com.kirey.kjcore.validations.AdminRoutesValidation;

/**Rest controller used for routes administration
 * @author 
 *
 */
@RestController
@RequestMapping(value = "/rest/adminRoute", produces = "application/json; charset=UTF-8")
public class AdminRoutesController {

	@Autowired
	private KjcUrlRoutesDao kjcUrlRoutesDao;

	@Autowired
	private KjcApplicationRolesDao kjcApplicationRolesDao;

	@Autowired
	private AdminRoutesValidation adminRoutesValidation;

	/**
	 * This method returns all routes from database
	 * @return ResponseEntity containing the list of all routes along with HTTP
	 *         status
	 */
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getRoutes() {
		List<KjcUrlRoutes> listRutes = kjcUrlRoutesDao.findAll();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listRutes, HttpStatus.OK.value()), HttpStatus.OK);
	}

	/**
	 * This method saves new route in database
	 * @param kjcUrlRoutes
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<Object> addNewRoute(@RequestBody KjcUrlRoutes kjcUrlRoutes) {
		adminRoutesValidation.validationForAddNewRoute(kjcUrlRoutes);
		kjcUrlRoutesDao.attachDirty(kjcUrlRoutes);
		return new ResponseEntity<Object>(
				new RestResponseDto(HttpStatus.OK.value(),
						ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_ROUTE_SUCCESSFULLY_ADDED + " " + kjcUrlRoutes.getUrl()),
				HttpStatus.OK);
	}

	/**
	 * This method deletes the route from database
	 * @param id
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> deleteRoute(@PathVariable Integer id) {
		KjcUrlRoutes kjcUrlRoutes = adminRoutesValidation.validationForDeleteRoute(id);
		kjcUrlRoutesDao.delete(kjcUrlRoutes);
		return new ResponseEntity<Object>(
				new RestResponseDto(HttpStatus.OK.value(),
						ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_ROUTE_SUCCESSFULLY_DELETED + " " + kjcUrlRoutes.getUrl()),
				HttpStatus.OK);
	}

	/**
	 * This method is used for edit existing route in database
	 * @param kjcUrlRoutes
	 * @return ResponseEntity containing the request status message and HTTP
	 *         status code
	 */
	@RequestMapping(value = "", method = RequestMethod.PUT)
	public ResponseEntity<Object> editRoute(@RequestBody KjcUrlRoutes kjcUrlRoutes) {
		adminRoutesValidation.validationForEditRoute(kjcUrlRoutes);
		kjcUrlRoutesDao.updateRoute(kjcUrlRoutes);
		return new ResponseEntity<Object>(
				new RestResponseDto(HttpStatus.OK.value(),
						ResponseMessagesConstants.RESPONSE_CONFIRMATION_MESSAGE_ROUTE_SUCCESSFULLY_EDITED + " " + kjcUrlRoutes.getUrl()),
				HttpStatus.OK);
	}

	/**
	 * This method returns all roles from database
	 * @return ResponseEntity containing the list of all roles along with HTTP
	 *         status
	 */
	@RequestMapping(value = "/roles", method = RequestMethod.GET)
	public ResponseEntity<RestResponseDto> getAllRoles() {
		List<KjcApplicationRoles> listAllRoles = kjcApplicationRolesDao.findAll();
		return new ResponseEntity<RestResponseDto>(new RestResponseDto(listAllRoles, HttpStatus.OK.value()), HttpStatus.OK);
	}

}
