package com.kirey.wscm.classloading;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kirey.wscm.data.dao.KjcClassesDao;
import com.kirey.wscm.data.entity.KjcClasses;
import com.kirey.wscm.data.entity.KjcPackages;



/**Utility component containg class loading related methods 
 * @author
 *
 */
@Component
public class ClassLoadingUtil {
	

	@Autowired
	private KjcClassesDao kjcClassesDao;

	
	/**
	 * This method is used to get parameters for uploading new class in database.
	 * @param javaCode
	 * @return HashMap containing name of parameter (key) and parameter (value)
	 */
	public Map<String, Object> getParametersForClassUpload(String javaCode) {

		Map<String, Object> map = new HashMap<>();

		String packageNameJava = this.getPackageNameFromClass(javaCode);		
		map.put("packageName", packageNameJava);
		
		String classNameFromCode = this.getClassNameFromCode(javaCode);		
		map.put("className", classNameFromCode);
		
		KjcClasses parentClass = kjcClassesDao.findParent(javaCode);
		map.put("parentClass", parentClass);
		
		String parentClassName = this.getParentName(javaCode);
		map.put("parentClassName", parentClassName);
		
		boolean checkInterface = this.checkInterface(javaCode);
		map.put("checkInterface", checkInterface);
		
		return map;
	}
	
	
	/**
	 * This method finds the parent class name of the class defined by its
	 * source code in the javaText parameter.
	 * 
	 * @param javaText represents the String value of the java source code of the class
	 * @return The name of the parent class
	 */
	public String getParentName(String javaText) {
		String[] ress = javaText.split("extends ");
		String parentTemp;
		String parent;
		String parentFinal = null;
		if (ress.length > 1) {
			parentTemp = ress[1];
			String parentTemp2 = parentTemp.replaceAll("\\s+", "");
			String[] ress1 = parentTemp2.split("\\{");
			parent = ress1[0];
			String parent2 = parent.replaceAll("\\s+", "");
			String[] ress2 = parent2.split("implements");
			parentFinal = ress2[0];
		}
		return parentFinal;
	}


	/**
	 * This method returns the qualified name of the class specified by the
	 * Class object parameter.
	 * 
	 * @param kjcClass
	 *            represents the Class object for which this method returnes the
	 *            qualified name.
	 * @return The qualified name of the specified class
	 */
	public String getQualifiedName(KjcClasses kjcClass) {
		StringBuilder sb = new StringBuilder();
		sb.setLength(0);
		String name = kjcClass.getName();
		KjcPackages kjcPackages = kjcClass.getKjcPackages();
		String packName = kjcPackages.getName();
		sb.append(packName);
		sb.append(".");
		sb.append(name);
		
		return sb.toString();
	}

	/**
	 * This method returnes the package name as String of the class specified by
	 * the source code in the paramter javaText.
	 * 
	 * @param javaText
	 *            specifies the source code of the class for which the package
	 *            name is sought for.
	 * @return Package name as String.
	 */
	public String getPackageNameFromClass(String javaText) {
		String[] res = javaText.split("package");
		String packName = res[1];
		packName = packName.replaceAll("\\s+", "");
		String[] packName2 = packName.split(";");
		String packName3 = packName2[0];
		return packName3.trim();
	}

	/**
	 * This method returnes the package name as String of the class specified by
	 * the qualified class name.
	 * 
	 * @param qualifiedClassName
	 *            represents the qualified name of the class for which tha
	 *            package name is sought for.
	 * @return The package name of the class.
	 */
	public String getPackageName(String qualifiedClassName) {
		StringBuilder packageName = new StringBuilder();
		String[] results = qualifiedClassName.split("\\.");
		for (int i = 0; i < results.length - 2; i++) {
			packageName.append(results[i]).append(".");
		}
		packageName.append(results[results.length - 2]);
		return packageName.toString().trim();
	}

	/**
	 * This method returns the class name from the qualified class name spcified
	 * by the paramter qualifiedClassName.
	 * 
	 * @param qualifiedClassName
	 *            represents the qualified class name for which the package name
	 *            is sought for.
	 * @return The class name as String.
	 */
	public String getClassName(String qualifiedClassName) {
		String className = "";
		String[] results = qualifiedClassName.split("\\.");
		className += "." + results[results.length - 1];
		className = className.replaceFirst(".", "");
		className = className.replace(".class", "");
		return className.trim();
	}

	/**
	 * This method extracts the class name from the java source code string
	 * 
	 * @param javaText
	 * @return Class name as a String.
	 */
	public String getClassNameFromCode(String javaText) {
		String[] results = javaText.split("class ");
		String tempName = results[1];
		String[] results1 = tempName.split("\\{");
		String tempName1 = results1[0];
		String[] results2 = tempName1.split("implements ");
		String tempName2 = results2[0];
		String[] results3 = tempName2.split("extends ");
		String classNameFromCode = results3[0].replaceAll("\\s+", "");
		return classNameFromCode.trim();
	}

	/**
	 * This method check if class implements any interface
	 * 
	 * @param javaText
	 * @return true or false
	 */
	public boolean checkInterface(String javaText) {
		return javaText.contains(" implements ");
	}

	
	
}
