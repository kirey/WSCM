package com.kirey.wscm.data.service;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.kirey.wscm.common.constants.AppConstants;

import freemarker.template.Template;

@Service
public class TemplateEngine {
	
	
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

}
