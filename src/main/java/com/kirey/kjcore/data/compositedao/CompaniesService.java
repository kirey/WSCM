package com.kirey.kjcore.data.compositedao;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kirey.kjcore.api.dto.CompanyCssDto;
import com.kirey.kjcore.api.dto.CompanyDetailsDto;
import com.kirey.kjcore.api.dto.CompanyDto;
import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.data.dao.KjcCompaniesDao;
import com.kirey.kjcore.data.dao.KjcCompanyCssDao;
import com.kirey.kjcore.data.entity.KjcCompanies;
import com.kirey.kjcore.data.entity.KjcCompanyCss;

/**A service containing methods related to companies
 * @author
 *
 */
@Service
public class CompaniesService {

	public static final String SPRING_QUALIFIER = "companiesService";

	@Autowired
	protected KjcCompaniesDao kjcCompaniesDao;

	@Autowired
	protected KjcCompanyCssDao kjcCompanyCssDao;
	
	@Autowired
	protected ObjectMapper objectMapper;

	/**
	 * This method gets list of companies without the default one
	 * 
	 * @return list of CompanyDto
	 */
	public List<CompanyDto> findCompaniesWithoutDefault() {
		List<CompanyDto> companyDtoList = new ArrayList<>();

		List<KjcCompanies> listOfCompanies = kjcCompaniesDao.findAll();

		for (KjcCompanies company : listOfCompanies) {

			if (!company.getCode().equals(AppConstants.DEFAULT_COMPANY_CODE)) {
				companyDtoList.add(new CompanyDto(company.getId(), company.getCode(),
						company.getDescription(), company.getName(), company.isFlActive(), company.getPasswordTimeout()));
			}

		}

		return companyDtoList;
	}

	/**
	 * This method gets the company details like company code, name,
	 * description, the active css and the previous one (if exists) and also the
	 * default css
	 * 
	 * @param id
	 *            specifies the company id.
	 * 
	 * @return CompanyDetailsDto object used in front-end
	 */
	public CompanyDetailsDto getCompany(Integer id) {

		CompanyDetailsDto companyDetails = new CompanyDetailsDto();

		KjcCompanies company = kjcCompaniesDao.findByIdWithCss(id);

		companyDetails.setCompany(new CompanyDto(company.getId(), company.getCode(), company.getDescription(),
				company.getName(), company.isFlActive(), company.getPasswordTimeout()));

		KjcCompanyCss defaultCss = kjcCompanyCssDao.findDefaultActiveCss();
		List<KjcCompanyCss> cssEntityList = company.getKjcCompanyCsses();
		KjcCompanyCss activeCss = cssEntityList.get(0);

		companyDetails.setActiveCss(createObjectsFromString(activeCss.getCssData()));
		if (cssEntityList.size() == 2) {
			KjcCompanyCss previousCss = cssEntityList.get(1);
			companyDetails.setPreviousCss(createObjectsFromString(previousCss.getCssData()));
		}

		companyDetails.setDefaultCss(createObjectsFromString(defaultCss.getCssData()));

		return companyDetails;
	}

	/**
	 * This method adds new company into database using the argument companyDto
	 * received from front-end.
	 * <p>
	 * It will be retrieved also the default css settings from the default
	 * company and associate to new company
	 * 
	 * @param companyDto
	 *            specifies the company details.
	 */
	public void addNewCompany(CompanyDto companyDto, byte[] logo) {
		KjcCompanies newCompany = new KjcCompanies();
		newCompany.setCode(companyDto.getCode());
		newCompany.setDescription(companyDto.getDescription());
		newCompany.setName(companyDto.getName());
		newCompany.setFlActive(AppConstants.GLOBAL_TRUE);
		newCompany.setPasswordTimeout(companyDto.getPasswordTimeout());

		KjcCompanyCss newCss = new KjcCompanyCss();
		KjcCompanyCss defaultCss = kjcCompanyCssDao.findDefaultActiveCss();

		newCss.setCssData(defaultCss.getCssData());
		newCss.setKjcCompanies(newCompany);

		newCompany.getKjcCompanyCsses().add(newCss);
		newCompany.setCompanyLogo(logo);
		kjcCompaniesDao.persist(newCompany);
	}

	/**
	 * This method add new default css settings for the default company using
	 * the companyCssDto list that contains the values for each css component.
	 * <p>
	 * All companies that uses the default css are updated
	 * 
	 * @param cssDataObjects
	 *            specifies css settings for each css component.
	 */
	@Transactional
	public void addNewDefaultCss(List<CompanyCssDto> cssDataObjects) {
		KjcCompanies defaultCompany = kjcCompaniesDao.findDefaultCompanyWithCss();
		List<KjcCompanies> companiesList = kjcCompaniesDao.findAllWithoutOne(defaultCompany.getId());
		String cssData = createCssData(cssDataObjects);

		// check if there is initial css and delete the active one
		if (defaultCompany.getKjcCompanyCsses().size() == 2)
			kjcCompanyCssDao.delete(defaultCompany.getKjcCompanyCsses().get(0));

		// insert the new css data
		KjcCompanyCss newCss = new KjcCompanyCss();
		newCss.setCssData(cssData);
		newCss.setKjcCompanies(defaultCompany);

		kjcCompanyCssDao.persist(newCss);
		for (KjcCompanies c : companiesList) {
			// if the company has only 1 active css,that means that company uses
			// the default css settings
			if (c.getKjcCompanyCsses().size() == 1) {
				kjcCompanyCssDao.updateInDefaultCss(c.getKjcCompanyCsses().get(0).getId(), cssData);
			}
		}
	}

	/**
	 * This method resets to the initial css settings for the default company and
	 * will update all companies that use the default css settings
	 * 
	 */
	@Transactional
	public void resetToInitialCss() {
		KjcCompanies defaultCompany = kjcCompaniesDao.findDefaultCompanyWithCss();
		List<KjcCompanies> companiesList = kjcCompaniesDao.findAllWithoutOne(defaultCompany.getId());
		// check if there is initial css settings and delete the active one
		if (defaultCompany.getKjcCompanyCsses().size() == 2) {
			kjcCompanyCssDao.delete(defaultCompany.getKjcCompanyCsses().get(0));

			for (KjcCompanies c : companiesList) {
				// if the company has only 1 active css settings,that means that
				// the company uses the default css settings
				if (c.getKjcCompanyCsses().size() == 1) {
					kjcCompanyCssDao.updateInDefaultCss(c.getKjcCompanyCsses().get(0).getId(),
							defaultCompany.getKjcCompanyCsses().get(1).getCssData());
				}
			}
		}
	}

	/**
	 * This method add new css style for the selected company.
	 * 
	 * @param companyId
	 *            specifies the company id.
	 * @param cssDataObjects
	 *            specifies css settings for each css component.
	 */
	@Transactional
	public void addNewCompanyCss(Integer companyId, List<CompanyCssDto> cssDataObjects) {
		KjcCompanies company = kjcCompaniesDao.findByIdWithCss(companyId);
		String cssData = createCssData(cssDataObjects);

		// check if there is previous css settings and delete it
		if (company.getKjcCompanyCsses().size() == 2)
			kjcCompanyCssDao.delete(company.getKjcCompanyCsses().get(1));

		// insert the new css settings
		KjcCompanyCss newCss = new KjcCompanyCss();
		newCss.setCssData(cssData);
		newCss.setKjcCompanies(company);

		kjcCompanyCssDao.persist(newCss);

	}

	/**
	 * This method associates the default css for the selected company and
	 * deletes the others css style.
	 * 
	 * @param companyId
	 *            specifies the company id.
	 */
	@Transactional
	public void resetToDefaultCss(Integer companyId) {
		KjcCompanies company = kjcCompaniesDao.findById(companyId);
		if (company != null) {
			KjcCompanyCss defaultCss = kjcCompanyCssDao.findDefaultActiveCss();

			KjcCompanyCss newCss = new KjcCompanyCss();

			newCss.setCssData(defaultCss.getCssData());
			newCss.setKjcCompanies(company);
			kjcCompanyCssDao.deleteAllCompanyCss(company.getId());
			kjcCompanyCssDao.persist(newCss);

		}
	}

	/**
	 * This method retrieves the css settings from database and create a css
	 * content specific for the logged in company
	 * 
	 * @param companyId
	 *            specifies the company id.
	 * @return byte[] the byte array from the css content
	 * @throws RuntimeException
	 */
	public byte[] loadCssStyle(Integer companyId) {
		KjcCompanyCss companyCss = kjcCompanyCssDao.findActiveCss(companyId);
		StringBuilder cssContent = new StringBuilder();
		List<CompanyCssDto> cssDtoList = createObjectsFromString(companyCss.getCssData());

		for (CompanyCssDto cssDto : cssDtoList) {
			cssContent.append(cssDto.getKey()).append("{").append("\n\t").append(cssDto.getValue()).append("\n")
					.append("}").append("\n");
		}
		return cssContent.toString().getBytes();
	}

	protected List<CompanyCssDto> createObjectsFromString(String cssData) {
		List<CompanyCssDto> cssDto = new ArrayList<>();
		try {
			cssDto = objectMapper.readValue(cssData, new TypeReference<List<CompanyCssDto>>() {
			});
			return cssDto;
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	/**This method maps all company css from list received into one string
	 * @param newCss
	 * @return String containing all css from list
	 * @throws RuntimeException
	 */
	private String createCssData(List<CompanyCssDto> newCss) {
		try {
			return objectMapper.writeValueAsString(newCss);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * This method is used for find all companies with status active
	 * @return List of companyDtos
	 */
	public List<CompanyDto> findAllActiveCompanies() {
		List<CompanyDto> companyDtoList = new ArrayList<>();
		List<KjcCompanies> listOfCompanies = kjcCompaniesDao.findAll();
		for (KjcCompanies company : listOfCompanies) {
			if (company.isFlActive()) {
				companyDtoList.add(new CompanyDto(company.getId(), company.getCode(),
						company.getDescription(), company.getName(), company.isFlActive(), company.getPasswordTimeout()));
			}
		}
		return companyDtoList;
	}


}
