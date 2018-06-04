package com.kirey.kjcore.features.template;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

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
	
	
	public String getProcesedHTMLwihtCSS(String html, String css, Map<String, Object> root) {
		String htmlWithCss = null;
		try (Writer out = new StringWriter()){
			Template template = new Template("templ", html, null);
			template.process(root, out);
			htmlWithCss = css + "\n" + out.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return htmlWithCss;
	}

}
