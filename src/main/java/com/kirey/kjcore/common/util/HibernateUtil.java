package com.kirey.kjcore.common.util;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Set;

import org.hibernate.Hibernate;
import org.hibernate.proxy.HibernateProxy;


/**
 * @author nicutac
 * Utility class for initializing the desired children's from a parent
 *
 */
public class HibernateUtil {

	/**
	 * @param parent - a list of objects or a single one
	 * @param objectsForInitializing - a list that contains the types of objects that we want to initialize
	 * 
	 * Method for initializing the children's from parent, only for the first level
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static void initializeObject(Object parent, List<Class> objectsForInitializing) {

		if (parent instanceof List) {
			for (Object item : (List<Object>) parent) {
				initializeChildrens(item, objectsForInitializing);
			}
			return;
		} else if (parent instanceof Set) {
			for (Object item : (Set<Object>) parent) {
				initializeChildrens(item, objectsForInitializing);
			}
			return;
		}
		initializeChildrens(parent, objectsForInitializing);

	}

	/**
	 * @param o - the parent object
	 * @param objectsForInitializing - a list that contains the types of objects that we want to initialize
	 * @throws RuntimeException
	 * A private method that initialize the desired children's
	 * It uses the mechanism of reflection to get all the parent methods and will focus only on the getters methods. 
	 * If the getter returns the desired type, it will be invoked and initialized using Hibernate.initialize().
	 */
	@SuppressWarnings({ "rawtypes" })
	private static void initializeChildrens(Object o, List<Class> objectsForInitializing) {

		try {
			if(o instanceof HibernateProxy){
				o = ((HibernateProxy) o).getHibernateLazyInitializer()
				                .getImplementation();
			}
			Method[] methods = o.getClass().getDeclaredMethods();
			for (Method method : methods) {
				Object r = null;
				Type type = null;

				String methodName = method.getName();
				// check Getters exclusively
				if (methodName.length() < 3 || !"get".equals(methodName.substring(0, 3)))
					continue;

				// Getters without parameters
				if (method.getParameterTypes().length > 0)
					continue;

				int modifiers = method.getModifiers();

				// Getters that are public
				if (!Modifier.isPublic(modifiers))
					continue;

				// but not static
				if (Modifier.isStatic(modifiers))
					continue;

				
				try {
					// get returned type for collections
					type = ((ParameterizedType) method.getGenericReturnType()).getActualTypeArguments()[0];
				} catch (Exception e) {
					// get returned type for single object 
					type = method.getGenericReturnType();
				}

				// check if the object must be initialized
				if (!objectsForInitializing.contains(type))
					continue;

				r = method.invoke(o);

				if (r == null)
					continue;

				// initialize child object
				Hibernate.initialize(r);
			}
		} catch (IllegalAccessException e) {
			throw new RuntimeException(e);
		} catch (InvocationTargetException e) {
			throw new RuntimeException(e);
		}
	}
}