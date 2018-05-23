package com.kirey.kjcore.features.classloading;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;

import com.kirey.kjcore.data.dao.KjcClassesDao;
import com.kirey.kjcore.data.entity.KjcClassCompiled;
import com.kirey.kjcore.data.entity.KjcClasses;




/**
 * BaseObjectFactory is an object factory class used to generate objects from classes stored in the database.
 * It creates objects within the scope of one class loader. By calling loadAllClasses() method, the new
 * class loader scope is created where all the classes are loaded.
 * 
 * IMPORTANT!!! This class must be defined as SINGLETON in the Spring context files.
 * 
 * @author randjelovicv
 *
 */

public class BaseObjectFactory {

	
	@Autowired
	private KjcClassesDao kjcClassesDao;
	
	@Autowired
	private ClassLoadingUtil classLoadingUtil;
	private ObjectFactory objectFactory = new ObjectFactory();

	
	/**
	 * This method is used to create and return the instance of the class
	 * designated with the qualified name. The method first looks for the class in the memory
	 * and, if not found, loads the class from the database along with all of its parents.
	 * The class and its parents are loaded with the default class loader instance.
	 * 
	 * @param qualifiedName Represents he qualified name of the class for loading
	 * @return instance of the defined class
	 */
	public Object create(String qualifiedName) {
		Object object = objectFactory.findClass(qualifiedName);
		if (object == null) {
			List<KjcClasses> listAllParents = kjcClassesDao.findAllParents(qualifiedName);
			Collections.reverse(listAllParents);
			for (KjcClasses kjcClass : listAllParents) {
				object = objectFactory.findClass(classLoadingUtil.getQualifiedName(kjcClass));
				if (object == null) {
					KjcClassCompiled classCompiled = kjcClass.getKjcClassCompiled();
					InputStream myInputStream = new ByteArrayInputStream(classCompiled.getCompiledCode());
					objectFactory.create(classLoadingUtil.getQualifiedName(kjcClass), myInputStream);
				}
			}
			KjcClassCompiled classCompiled = (KjcClassCompiled) kjcClassesDao.findClassByQualifiedName(qualifiedName).getKjcClassCompiled();
			InputStream myInputStream = new ByteArrayInputStream(classCompiled.getCompiledCode());
			object = objectFactory.create(qualifiedName, myInputStream);
		}
		return object;
	}

	
	/**
	 * This method loads the class from the database regardless of its presence in the memory
	 * @param qualifiedName Represents the qualified name of the class for loading
	 * @return Instance of the specified class
	 */
	public Object createInSeparateScope(String qualifiedName) {
		ObjectFactory newObjectFactory = new ObjectFactory();
		Object object;
		List<KjcClasses> listAllParents = kjcClassesDao.findAllParents(qualifiedName);
		Collections.reverse(listAllParents);
		for (KjcClasses kjcClass : listAllParents) {
			KjcClassCompiled classCompiled = kjcClass.getKjcClassCompiled();
			InputStream myInputStream = new ByteArrayInputStream(classCompiled.getCompiledCode());
			newObjectFactory.create(classLoadingUtil.getQualifiedName(kjcClass), myInputStream);
		}
		KjcClassCompiled classCompiled = kjcClassesDao.findClassByQualifiedName(qualifiedName).getKjcClassCompiled();
		InputStream myInputStream = new ByteArrayInputStream(classCompiled.getCompiledCode());
		object = newObjectFactory.create(qualifiedName, myInputStream);
		return object;
	}

	
	/**
	 * This method loads all the classes from the database with the new instance of the class loader. 
	 * Only classes with checked ENABLE database filed are loaded.
	 */
	public void loadAllClasses() {
		objectFactory = new ObjectFactory();
		List<KjcClasses> listOfAllClasses = kjcClassesDao.findAll();
		Collections.reverse(listOfAllClasses);
		for (KjcClasses kjcClass : listOfAllClasses) {
			if(kjcClass.isFlEnabled()) 
				create(classLoadingUtil.getQualifiedName(kjcClass));
		}
	}
	

	/**
	 * This method is used to load all the classes from database at the start of the application
	 */
	@PostConstruct
	private void init() {
		this.loadAllClasses();
	}
	
	
	/**
	 * This method is used to create the ObjectFactory object which in turn creates a new class loader
	 * used to load new classes into its own scope of classes.  
	 */
	public void newClassLoaderScope()  {
		objectFactory = new ObjectFactory();
	}

}
