package com.kirey.kjcore.features.classloading;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.io.IOUtils;

/**
 * Custom designed class loader.
 * 
 * @author randjelovicv
 */

public class MyClassLoader extends ClassLoader {

	public MyClassLoader(ClassLoader classLoader) {
		super(classLoader);
	}

	public MyClassLoader(Class<?> classLoader) {
		super(classLoader.getClassLoader());
	}

	/**
	 * This method finds the class within memory
	 */
	@Override
	public Class<?> findClass(String qualifiedName) {
		return findLoadedClass(qualifiedName);
	}

	/**
	 * This method finds the class within parent class loaders
	 * 
	 * @param qualifiedName represents the name of the class along with the name of the package
	 * @return Class object of the class specified by qualified name
	 */
	public Class<?> findClassInParents(String qualifiedName) {
		Class<?> clazz = null;
		try {
			clazz = getParent().loadClass(qualifiedName);
		} catch (ClassNotFoundException e) {
			throw new RuntimeException(e);
		}

		return clazz;
	}

	/**
	 * This method loads the class from the input stream without looking for it
	 * in memory or parent class loaders.
	 * 
	 * @param qualifiedName represents the name of the class along with the name of the package.
	 * @param inputStream represents the InputStream for loading the class
	 * @param resolveIt is the boolean value defining whether resolving should be performed
	 * @return the Class<?> object of the loaded class is returned.
	 */
	public synchronized Class<?> loadClass(String qualifiedName, InputStream inputStream, boolean resolveIt) {
		byte[] bytea = this.read((ByteArrayInputStream) inputStream);
		Class<?> clazz = defineClass(qualifiedName, bytea, 0, bytea.length);

		if (clazz != null && resolveIt)
			resolveClass(clazz);
		return clazz;
	}

	/**
	 * This method reads the input stream and returns it as byte[] array
	 * 
	 * @param bais represents the ByteArrayInputStream
	 * @return array of bytes
	 */
	private byte[] read(ByteArrayInputStream bais) {
	    byte [] array;
	    try {
	    	array = IOUtils.toByteArray(bais);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		return array;
	}
}
