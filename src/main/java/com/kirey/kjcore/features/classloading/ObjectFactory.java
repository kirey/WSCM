package com.kirey.kjcore.features.classloading;

import java.io.InputStream;
import com.kirey.kjcore.features.classloading.classes.interfaces.BaseObject;


/**
 * ObjectFactory class is designed to create instances of classes using the custom designed MyClassLoader
 * @author randjelovicv
 *
 */
public class ObjectFactory {

	private MyClassLoader myClassLoader;

	public ObjectFactory() {
		myClassLoader = new MyClassLoader(BaseObject.class.getClassLoader());
	}
	
	
	public ObjectFactory(ClassLoader classLoader) {
		myClassLoader = new MyClassLoader(classLoader);
	}
	

	/**
	 * This method finds the class within memory and parent class loaders and, if found, instantiates it and returns the instantiated object.
	 * @param qualifiedName represents the name of the class along with the name of the package
	 * @return the instance of the loaded class
	 */
	public Object findClass(String qualifiedName) {
		Object object=null;
		Class<?> clazz = myClassLoader.findClass(qualifiedName);
		if(clazz != null)
			try {
				object = clazz.newInstance();
			} catch (InstantiationException | IllegalAccessException e) {
				throw new RuntimeException(e);
			}
		return object;
	}
	

	/**
	 * The method loads the class from the InputStream, instantiates it and returns the instatiated object.
	 * @param qualifiedName represents the name of the class along with the name of the package
	 * @param inputStream defines the input stream from which the class will be loaded
	 * @return the instance of the loaded class
	 */
	public Object create(String qualifiedName, InputStream inputStream) {
		Object object;
		try {
			object = myClassLoader.loadClass(qualifiedName, inputStream, true).newInstance();
		} catch (InstantiationException | IllegalAccessException e) {
			throw new RuntimeException(e);
		}
		return object;
	}

	
	/**
	 * Returns the class loader of the ObjectFactory
	 * @return custom class loader of type MyClassLoader
	 */
	public MyClassLoader getMyClassLoader() {
		return myClassLoader;
	}

}
