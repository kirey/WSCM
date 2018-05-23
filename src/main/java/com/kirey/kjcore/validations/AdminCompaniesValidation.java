package com.kirey.kjcore.validations;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kirey.kjcore.api.dto.CompanyDto;
import com.kirey.kjcore.api.dto.ValidationErrorDto;
import com.kirey.kjcore.common.constants.ValidationErrorConstants;
import com.kirey.kjcore.data.dao.KjcCompaniesDao;
import com.kirey.kjcore.data.entity.KjcCompanies;
import com.kirey.kjcore.features.exception.customexceptions.BusinessValidationException;
import com.kirey.kjcore.common.constants.AppConstants;

/**A component used to handle companies administration validation
 * @author
 *
 */
@Component
public class AdminCompaniesValidation extends BaseValidation {

	@Autowired
	protected KjcCompaniesDao kjcCompaniesDao;

	protected List<ValidationErrorDto> validationErrorDtos;

	/**
	 * This method validates if:
	 * <p>
	 * - the company code contains white spaces
	 * <p>
	 * - the company already exists
	 * @param company
	 * @throws BusinessValidationException
	 *             if one of these fails
	 */
	public void validationForSaveCompany(CompanyDto company) {
		validationErrorDtos = new ArrayList<>();

		// check if the company code contains white spaces
		if (company.getCode().indexOf(' ') >= 0) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_COMPANY_CODE_BAD_FORMAT));
		}

		// check if the company already exists
		if (kjcCompaniesDao.findByCompanyCode(company.getCode()) != null) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_COMPANY_ALREADY_EXISTS_IN_DB));
		}

		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}

	/**
	 * This method validates if:
	 * <p>
	 * - the company code contains white spaces
	 * <p>
	 * - the company already exists
	 * @param newCompany
	 * @param actualCompany
	 * @throws BusinessValidationException
	 *             if one of these fails
	 */
	public void validationForEditCompany(CompanyDto newCompany, KjcCompanies actualCompany) {
		validationErrorDtos = new ArrayList<>();

		// check if the company code contains white spaces
		if (newCompany.getCode().indexOf(' ') >= 0) {
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
					ValidationErrorConstants.VALIDATION_BUSINESS_COMPANY_CODE_BAD_FORMAT));
		}

		// check if the company already exists
		if (!actualCompany.getCode().equals(newCompany.getCode())) {
			if (kjcCompaniesDao.findByCompanyCode(newCompany.getCode()) != null) {
				validationErrorDtos.add(new ValidationErrorDto(this.getPageId(),
						ValidationErrorConstants.VALIDATION_BUSINESS_COMPANY_ALREADY_EXISTS_IN_DB));
			}
		}
		
		if(actualCompany.getCode().equals(AppConstants.DEFAULT_COMPANY_CODE)){
			validationErrorDtos.add(new ValidationErrorDto(this.getPageId(), ValidationErrorConstants.VALIDATION_BUSINESS_DEFAULT_COMPANY_UNABLE_TO_EDIT));
		}
		if (!validationErrorDtos.isEmpty()) {
			throw new BusinessValidationException(validationErrorDtos);
		}
	}
}
