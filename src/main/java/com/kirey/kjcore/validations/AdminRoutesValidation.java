package com.kirey.kjcore.validations;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.data.dao.KjcUrlRoutesDao;
import com.kirey.kjcore.data.entity.KjcUrlRoutes;
import com.kirey.kjcore.features.exception.customexceptions.BusinessValidationException;

/**A component used to handle routes administration validation
 * @author 
 *
 */
@Component
public class AdminRoutesValidation extends BaseValidation{
	
	@Autowired
	KjcUrlRoutesDao kjcUrlRoutesDao;
	
	List<ValidationErrorDto> validationErrorDtos;
	
	/**This method validates if route already exist
	 * @param kjcUrlRoutes
	 * @throws BusinessValidationException
	 */
	public void validationForAddNewRoute(KjcUrlRoutes kjcUrlRoutes){
		validationErrorDtos = new ArrayList<ValidationErrorDto>();
		if(kjcUrlRoutesDao.findRoutesByUrl(kjcUrlRoutes.getUrl()) != null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_URL_EXISTS));
		}
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**This method validates if route doesn't exist or route name doesn't exist
	 * @param kjcUrlRoutes
	 * @throws BusinessValidationException
	 */
	public void validationForEditRoute(KjcUrlRoutes kjcUrlRoutes){
		validationErrorDtos = new ArrayList<ValidationErrorDto>();
		List<KjcUrlRoutes> listRoutesForValidation = kjcUrlRoutesDao.findAllWithoutOne(kjcUrlRoutes.getId());
		for (KjcUrlRoutes kjcUrlRoutes2 : listRoutesForValidation) {
			if(kjcUrlRoutes2.getUrl().equals(kjcUrlRoutes.getUrl())){
				validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ROUTE_NAME_EXISTS));
			}
		}
		KjcUrlRoutes kjcUrlRoutesTemp = kjcUrlRoutesDao.findById(kjcUrlRoutes.getId());
			if(kjcUrlRoutesTemp == null){
				validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ROUTE_DOESNOT_EXIST));
			}
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**
	 * This method validates if route doesn't exist
	 * @param id
	 * @return KjcUrlRoutes presenting deleted route
	 * @throws BusinessValidationException
	 */
	public KjcUrlRoutes validationForDeleteRoute(Integer id) {
		validationErrorDtos = new ArrayList<ValidationErrorDto>();
		KjcUrlRoutes kjcUrlRoutes = kjcUrlRoutesDao.findById(id);
		if(kjcUrlRoutes == null){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_ROUTE_DOESNOT_EXIST));
		}
		
		if(!validationErrorDtos.isEmpty()){
			throw new BusinessValidationException(validationErrorDtos);
		}
		
		return kjcUrlRoutes;
	}
}
