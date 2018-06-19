package com.kirey.wscm.data.service;

import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kirey.wscm.common.constants.AppConstants;

import freemarker.template.Template;

/**
 * @author paunovicm
 *
 */

@Service
public class TemplateEngine {
	
	/**
	 * Method for creating {@link HashMap} which will be used for processing {@link Template}. 
	 * Each content will be set as key "content + increment" (ie content0, content1...)
	 * and each list will be set as key "contents + increment" (ie contents0, contents1...)
	 * @param lists
	 * @param content
	 * @return {@link HashMap}
	 */
	public Map<String, Object> buildContentAsMap(List<List<?>> lists, List<?> content){
		
		HashMap<String, Object> root = new HashMap<>();

		if(lists != null) {
			for (int i = 0; i < lists.size(); i++) {
				root.put("contents" + i, lists.get(i));
			}	
		}
		if(content != null) {
			for (int i = 0; i < content.size(); i++) {
				root.put("content"+i, content.get(i));
			}
			
		}
		
		return root;
	}
	
	/**
	 * Method for getting processed HTML from {@link Template} and also for adding css and javascript if exist.
	 * @param html - template source code which need to be processed
	 * @param css
	 * @param script
	 * @param root - the holder of the variables visible from the template (name-value pairs); 
	 * @return {@link String} which contains html, css and javascript
	 */
	public String getProcesedHTMLwithCSSandScript(String html, String css, String script, Map<String, Object> root) {
		StringBuilder sb = new StringBuilder();
		try (Writer out = new StringWriter()){
			Template template = new Template("templ", html, null);
			template.process(root, out);
			
			if(css != null) {
				sb.append(AppConstants.STYLE_OPEN_TAG);
				sb.append(css);
				sb.append(AppConstants.STYLE_CLOSE_TAG);
			}
			sb.append(out.toString());
			if(script != null) {
				sb.append(AppConstants.SCRIPT_OPEN_TAG);
				sb.append(script);
				sb.append(AppConstants.SCRIPT_CLOSE_TAG);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sb.toString();
	}
	
	/**
	 * Method for getting email content by processing {@link Template}
	 * @param model - the holder of the variables visible from the template (name-value pairs); 
	 * @param templateName - template source code which need to be processed
	 * @return {@link String} emailContent
	 */
	public String processTemplateContent(Map<String, Object> model, String templateName) {
		
		StringBuilder sb = new StringBuilder();
		try (Writer out = new StringWriter()){
			Template template = new Template("templ", templateName, null);
			template.process(model, out);
			sb.append(out.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sb.toString();
	}

}
