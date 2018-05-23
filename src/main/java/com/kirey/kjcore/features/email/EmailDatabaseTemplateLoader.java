package com.kirey.kjcore.features.email;

import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kirey.kjcore.data.compositedao.EmailingService;
import com.kirey.kjcore.data.entity.KjcEmailTemplates;

import freemarker.cache.TemplateLoader;

/**Service containing methods needed to load email templates from database
 * @author
 *
 */
@Service
public class EmailDatabaseTemplateLoader implements TemplateLoader {

	@Autowired
	EmailingService emailingService;

	/* (non-Javadoc)
	 * @see freemarker.cache.TemplateLoader#findTemplateSource(java.lang.String)
	 */
	@Override
	public Object findTemplateSource(String templateName) throws IOException {
		Locale locale = Locale.getDefault();
		return emailingService.getCacheableTemplate(templateName.split("_" + locale)[0]);
	}

	/* (non-Javadoc)
	 * @see freemarker.cache.TemplateLoader#getLastModified(java.lang.Object)
	 */
	@Override
	public long getLastModified(Object templateSource) {
		// TODO Auto-generated method stub
		return 0;
	}

	/* (non-Javadoc)
	 * @see freemarker.cache.TemplateLoader#getReader(java.lang.Object, java.lang.String)
	 */
	@Override
	public Reader getReader(Object templateSource, String encoding) throws IOException {
		return new StringReader(new String(((KjcEmailTemplates) templateSource).getTemplate()));
	}

	/* (non-Javadoc)
	 * @see freemarker.cache.TemplateLoader#closeTemplateSource(java.lang.Object)
	 */
	@Override
	public void closeTemplateSource(Object templateSource) throws IOException {
		// TODO Auto-generated method stub

	}

}
