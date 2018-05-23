package com.kirey.kjcore.data.compositedao;

import java.io.IOException;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kirey.kjcore.api.dto.InlineResourcesDto;
import com.kirey.kjcore.data.dao.KjcEmailConfigsDao;
import com.kirey.kjcore.data.dao.KjcEmailTemplatesDao;
import com.kirey.kjcore.data.dao.KjcInlineResourceTemplatesDao;
import com.kirey.kjcore.data.entity.KjcEmailConfigs;
import com.kirey.kjcore.data.entity.KjcEmailTemplates;
import com.kirey.kjcore.data.entity.KjcInlineResourceTemplates;
import com.kirey.kjcore.features.email.MailService;

/**A service containing methods related to emailing
 * @author
 *
 */
@Service
public class EmailingService {
	public static final String SPRING_QUALIFIER = "emailingService";

	@Autowired
	private KjcEmailConfigsDao kjcEmailConfigsDao;

	@Autowired
	private KjcEmailTemplatesDao kjcEmailTemplatesDao;

	@Autowired
	private KjcInlineResourceTemplatesDao kjcInlineResourceTemplatesDao;

	@Autowired
	MailService mailService;

	/**This method is used to delete email configuration with id received
	 * @param id
	 */
	public void deleteEmailConfig(Integer id) {
		KjcEmailConfigs emailConfigs = kjcEmailConfigsDao.findById(id);
		kjcEmailConfigsDao.delete(emailConfigs);
		mailService.refreshConfiguration();
	}

	/**This method is used to save email configuration
	 * @param emailConfigs
	 */
	public void saveEmailConfigs(KjcEmailConfigs emailConfigs) {
		kjcEmailConfigsDao.persist(emailConfigs);

		mailService.refreshConfiguration();

	}

	/**This method is used for updating existing email configuration
	 * @param emailConfigs
	 */
	public void updateEmailConfigs(KjcEmailConfigs emailConfigs) {
		kjcEmailConfigsDao.merge(emailConfigs);

		mailService.refreshConfiguration();
	}

	/**This method is used for deleting emailing template by id received
	 * @param id
	 */
	public void deleteTemplate(Integer id) {
		KjcEmailTemplates emailTemplate = kjcEmailTemplatesDao.findByTemplateIdWithResources(id);
		kjcEmailTemplatesDao.delete(emailTemplate);
	}

	/**This method is used for saving email template in database
	 * @param emailTemplate
	 * @param templateFile
	 * @param inlineResources
	 * @throws IOException
	 */
	public void saveEmailTemplates(KjcEmailTemplates emailTemplate, MultipartFile templateFile,
			InlineResourcesDto[] inlineResources) throws IOException {

		emailTemplate.setTemplate(templateFile.getBytes());

		for (int i = 0; i < inlineResources.length; i++) {
			KjcInlineResourceTemplates resource = new KjcInlineResourceTemplates();
			setCommonData(resource, inlineResources[i]);
			resource.setKjcEmailTemplates(emailTemplate);
			emailTemplate.getKjcInlineResourceTemplateses().add(resource);
		}
		kjcEmailTemplatesDao.persist(emailTemplate);

	}

	/**This method is used for updating existing email template in database
	 * @param emailTemplate
	 * @param templateFile
	 * @param inlineResourcesNew
	 * @param arrDeletedResources
	 * @throws IOException
	 */
	public void updateEmailTemplates(KjcEmailTemplates emailTemplate, MultipartFile templateFile,
			InlineResourcesDto[] inlineResourcesNew, Integer[] arrDeletedResources) throws IOException {

		for (int i = 0; i < arrDeletedResources.length; i++) {
			kjcInlineResourceTemplatesDao.deleteById(arrDeletedResources[i]);
		}

		if (templateFile == null) {
			KjcEmailTemplates oldEmailTemplate = kjcEmailTemplatesDao.findById(emailTemplate.getId());
			emailTemplate.setTemplate(oldEmailTemplate.getTemplate());
		} else {
			emailTemplate.setTemplate(templateFile.getBytes());
		}

		for (int i = 0; i < inlineResourcesNew.length; i++) {
			if (inlineResourcesNew[i].getId() == null) {
				KjcInlineResourceTemplates resource = new KjcInlineResourceTemplates();
				setCommonData(resource, inlineResourcesNew[i]);
				resource.setKjcEmailTemplates(emailTemplate);
				emailTemplate.getKjcInlineResourceTemplateses().add(resource);
			}
		}

		kjcEmailTemplatesDao.attachDirty(emailTemplate);
	}

	/**This method sets common inline resource template data 
	 * @param resource
	 * @param inlineResources
	 */
	private void setCommonData(KjcInlineResourceTemplates resource, InlineResourcesDto inlineResources) {

		resource.setCdResource(inlineResources.getCdResource());
		resource.setDescription(inlineResources.getDescription());
		resource.setResourceFile(Base64.getDecoder().decode(inlineResources.getResourceFile().getBytes()));
		resource.setResourceName(inlineResources.getResourceName());
	}

	/**This method is used to find email configuration by name
	 * used only for MailService
	 * 
	 * @param configsName
	 * @return KjcEmailConfigs object used in MailService
	 */
	@Cacheable(value = "emailConfigsCache")
	public KjcEmailConfigs getCacheableEmailConfigs(String configsName) {
		return kjcEmailConfigsDao.findByConfigName(configsName);
	}
	
	/**This method is used to find email template by name
	 * used only for MailService
	 * 
	 * @param templateName
	 * @return KjcEmailTemplates object used in MailService
	 */
	@Cacheable(value = "emailTemplateCache")
	public KjcEmailTemplates getCacheableTemplate(String templateName) {
		return kjcEmailTemplatesDao.findByTemplateNameWithResources(templateName);
	}
	
}
