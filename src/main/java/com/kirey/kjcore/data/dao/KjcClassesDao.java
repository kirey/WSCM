package com.kirey.kjcore.data.dao;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.LogFactory;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import com.kirey.kjcore.common.constants.AppConstants;
import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.entity.KjcClassCategories;
import com.kirey.kjcore.data.entity.KjcClassCompiled;
import com.kirey.kjcore.data.entity.KjcClasses;
import com.kirey.kjcore.data.entity.KjcPackages;
import com.kirey.kjcore.features.classloading.ClassLoadingUtil;
import com.kirey.kjcore.validations.ClassLoadingValidation;

/**
 * Dao object for domain model class KjcClasses.
 */
@Repository(value = "kjcClassesDao")
public class KjcClassesDao extends KjcBaseDao {

	private List<KjcClasses> childrenList = new ArrayList<>();

	@Autowired
	private KjcPackagesDao packagesDao;

	@Autowired
	private SessionFactory sessionFactory;

	@Autowired
	private ClassLoadingUtil classLoadingUtil;

	@Autowired
	private ClassLoadingValidation classLoadingValidation;
	

	public KjcClassesDao() {
		log = LogFactory.getLog(KjcClassesDao.class);
		entityClass = KjcClasses.class;
	}


	/**
	 * 
	 * This method returns the Class object from database using the argument
	 * qualifiedClassName.
	 * 
	 * @param qualifiedClassName
	 *            specifies class to be retrieved from the database. Qualified
	 *            name includes the package name along with the class name.
	 * @return Class object from the database.
	 */
	@Transactional(readOnly = true)
	public KjcClasses findClassByQualifiedName(String qualifiedClassName) {
		KjcPackages kjcPackage = packagesDao.findByName(classLoadingUtil.getPackageName(qualifiedClassName));
		return (KjcClasses) sessionFactory.getCurrentSession().createCriteria(KjcClasses.class)
				.add(Restrictions.eq("name", classLoadingUtil.getClassName(qualifiedClassName)))
				.add(Restrictions.eq("kjcPackages", kjcPackage)).uniqueResult();
	}

	/**
	 * This method recursively searches for all the children of the class
	 * specified by the parameter Class object. The search is accomplished
	 * recursively through this method.
	 * 
	 * @param kjcClass
	 *            represents the Class object
	 * @return The list of Class objects representing the children of the
	 *         specified class.
	 */
	private List<KjcClasses> retrieveAllChildren(KjcClasses kjcClass) {
		List<KjcClasses> kjcClasseses = kjcClass.getKjcClasseses();
		childrenList.addAll(kjcClasseses);
		for (int i = 0; i < kjcClasseses.size(); i++) {
			KjcClasses kjcClass1 = kjcClasseses.get(i);
			if (kjcClass1 != null) {
				retrieveAllChildren(kjcClass1);
			}
		}
		return childrenList;
	}

	/**
	 * This method finds and returns all the children of the class specified by
	 * the Class object.
	 * 
	 * @param kjcClass
	 *            represents the Class object whose children are sought for.
	 * @return The List of all children classes
	 */
	@Transactional(readOnly = true)
	public List<KjcClasses> findAllChildren(KjcClasses kjcClass) {
		childrenList.clear();
		retrieveAllChildren(kjcClass);
		return childrenList;
	}

	/**
	 * This method is used to delete the class and the package in case that
	 * package remains without any classes after the deletion.
	 * @param qualifiedClassName
	 * @return List<String> containing class children names
	 */
	@Transactional
	public List<String> deleteClass(String qualifiedClassName) {

		classLoadingValidation.validationForDelete(qualifiedClassName);
		KjcClasses kjcClass = findClassByQualifiedName(qualifiedClassName);
		List<KjcClasses> listChildren = findAllChildren(kjcClass);
		List<String> listChildrenNames = new ArrayList<>();

		for (KjcClasses kjcClasses : listChildren) {
			String childrenName = kjcClasses.getName();
			listChildrenNames.add(childrenName);
		}

		if (listChildren.isEmpty()) {
			deleteClassManually(kjcClass);
		} else {
			Collections.reverse(listChildren);
			for (KjcClasses kjcClasses : listChildren) {
				deleteClassManually(kjcClasses);
			}
			deleteClassManually(kjcClass);
		}

		return listChildrenNames;
	}

	/**A method used to delete class from database
	 * @param kjcClass that is deleted
	 */
	@Transactional
	public void deleteClassManually(KjcClasses kjcClass) {
		KjcPackages kjcPackage = kjcClass.getKjcPackages();
		kjcClass.getKjcPackages().getKjcClasseses().remove(kjcClass);
		this.delete(kjcClass);

		if (kjcPackage.getKjcClasseses().isEmpty()) {
			packagesDao.delete(kjcPackage);
		}
	}

	/**
	 * This method finds the parent of the class specified by the java source
	 * code String parameter javaText. Class object is returned representing the
	 * parent of the specified class.
	 * 
	 * @param javaText
	 *            is the String representation of the java source code
	 * @return KjcClasses with parent class
	 */
	@Transactional(readOnly = true)
	public KjcClasses findParent(String javaText) {
		String parent = classLoadingUtil.getParentName(javaText);
		String packName = classLoadingUtil.getPackageNameFromClass(javaText);
		String parentQualifiedName = packName + "." + parent;
		KjcClasses kjcClasses1 = null;
		if (parent != null)
			kjcClasses1 = findClassByQualifiedName(parentQualifiedName);
		if (kjcClasses1 == null) {
			return null;
		} else {
			return kjcClasses1;
		}
	}

	/**
	 * This method finds all the parents of the specifed class. The parent
	 * classes are returned in the list of Class objects.
	 * 
	 * @param qualifiedClassName
	 *            specifies class for which all the parents are sought for
	 *            Qualified name includes the package name along with the class
	 *            name.
	 * @return The list of all the parent classes up to the top parent class.
	 */
	@Transactional(readOnly = true)
	public List<KjcClasses> findAllParents(String qualifiedClassName) {
		KjcClasses kjcClass = findClassByQualifiedName(qualifiedClassName);
		KjcClasses parentClass = kjcClass.getKjcClasses();
		KjcClasses parent1Classes = null;
		List<KjcClasses> allParents = new ArrayList<>();
		// get all parents
		do {
			if (parentClass != null) {
				allParents.add(parentClass);
				parent1Classes = parentClass.getKjcClasses();
				parentClass = parent1Classes;
			}
		} while (parent1Classes != null);

		return allParents;
	}

	/**A method used to upload class
	 * @param kjcClass
	 * @param javaFile
	 * @param compiledFile
	 */
	@Transactional
	public void uploadClass(KjcClasses kjcClass, MultipartFile javaFile, MultipartFile compiledFile) {
		uploadClass(kjcClass, javaFile, compiledFile, null);
	}

	/**
	 * This method uploads the class filed.
	 * 
	 * @param kjcClass
	 * @param javaFile
	 * @param compiledFile
	 * @param bindingResult
	 * 
	 * @throws RuntimeException
	 */
	@Transactional
	public void uploadClass(KjcClasses kjcClass, MultipartFile javaFile, MultipartFile compiledFile,
			BindingResult bindingResult) {
		KjcClasses preparedKjcClass;
		try {
			preparedKjcClass = prepareClassForUpload(kjcClass, javaFile == null ? null : javaFile.getBytes(),
					compiledFile == null ? null : compiledFile.getBytes(), javaFile == null ? null : javaFile.getOriginalFilename(), bindingResult);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		this.persist(preparedKjcClass);
	}

	/**A method used to save new class to database
	 * @param kjcClass
	 * @param javaFileBytes
	 * @param compiledFileBytes
	 * @param javaFileName
	 * @param bindingResult
	 */
	@Transactional
	public void uploadClass(KjcClasses kjcClass, byte[] javaFileBytes, byte[] compiledFileBytes, String javaFileName,
			BindingResult bindingResult)  {
		KjcClasses preparedKjcClass = prepareClassForUpload(kjcClass, javaFileBytes, compiledFileBytes, javaFileName, bindingResult);
		this.persist(preparedKjcClass);
	}

	/**
	 * This method prepares the class for upload
	 * 
	 * @param kjcClass
	 * @param javaFileBytes
	 * @param compiledFileBytes
	 * @param javaFileName
	 * @param bindingResult
	 * @return KjcClasses prepared class for uploading
	 */
	public KjcClasses prepareClassForUpload(KjcClasses kjcClass, byte[] javaFileBytes, byte[] compiledFileBytes,
			String javaFileName, BindingResult bindingResult)  {

		String javaCode = new String(javaFileBytes);
		final String packageName = "packageName";

		Map<String, Object> javaCodeParameters = classLoadingUtil.getParametersForClassUpload(javaCode);

		KjcClassCompiled classCompiled = new KjcClassCompiled();
		classCompiled.setCompiledCode(compiledFileBytes);
		classCompiled.setKjcClasses(kjcClass);
		kjcClass.setKjcClassCompiled(classCompiled);
		kjcClass.setName(javaFileName.replace(".java", ""));

		classLoadingValidation.validationForUpload(javaCodeParameters, kjcClass, bindingResult);

		Date currentDate = new Date();
		KjcPackages packageOfClass = new KjcPackages();

		kjcClass.setKjcClasses((KjcClasses) javaCodeParameters.get("parentClass"));

		KjcPackages tempPackages = packagesDao.findByName((String) javaCodeParameters.get(packageName));
		if (packagesDao.findByName((String) javaCodeParameters.get(packageName)) != null) {
			kjcClass.setKjcPackages(tempPackages);
		} else {
			packageOfClass.setName((String) javaCodeParameters.get(packageName));
			packageOfClass.setUtInsert(Utilities.getUserFromContext().getId());
			packageOfClass.setTsInsert(currentDate);

			packageOfClass.setUtUpdate(Utilities.getUserFromContext().getId());
			packageOfClass.setTsUpdate(currentDate);
			packageOfClass.getKjcClasseses().add(kjcClass);
			kjcClass.setKjcPackages(packageOfClass);
		}

		return kjcClass;
	}

	/**A method used to edit existing class
	 * @param qualifiedClassName
	 * @param compiledFile
	 * @param description
	 * @param kjcCategories
	 */
	@Transactional
	public void editClass(String qualifiedClassName, MultipartFile compiledFile, String description,
			KjcClassCategories kjcCategories) {
		editClass(qualifiedClassName, compiledFile, description, kjcCategories, null);
	}

	/**
	 * This method uploads the class file
	 * 
	 * @param qualifiedClassName
	 * @param compiledFile
	 * @param description
	 * @param kjcCategories
	 * @param bindingResult
	 * @throws RuntimeException
	 */
	@Transactional
	public void editClass(String qualifiedClassName, MultipartFile compiledFile, String description,
			KjcClassCategories kjcCategories, BindingResult bindingResult) {
		try {
			editClass(qualifiedClassName, compiledFile == null ? null : compiledFile.getBytes(),
					compiledFile == null ? null : compiledFile.getOriginalFilename(), description, kjcCategories,
					bindingResult);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

	}

	/**A method used for editing existing class
	 * @param qualifiedClassName
	 * @param compiledFileBytes
	 * @param compiledFileName
	 * @param description
	 * @param kjcCategories
	 * @param bindingResult
	 */
	@Transactional
	public void editClass(String qualifiedClassName, byte[] compiledFileBytes, String compiledFileName,
			String description, KjcClassCategories kjcCategories, BindingResult bindingResult) {
		KjcClasses kjcClass = findClassByQualifiedName(qualifiedClassName);
		
		//kjcClass object is changed within the transaction and, therefore, written into db 
		prepareClassForEdit(kjcClass, compiledFileBytes, compiledFileName, description, kjcCategories, bindingResult);
	}

	/**
	 * This method prepares the class to be edited.
	 * @param kjcClass
	 * @param compiledFileBytes
	 * @param compiledFileName
	 * @param descrtiption
	 * @param kjcCategories
	 * @param bindingResult
	 * @return KjcClasses prepared edited class for saving into database
	 */
	public KjcClasses prepareClassForEdit(KjcClasses kjcClass, byte[] compiledFileBytes, String compiledFileName,
			String descrtiption, KjcClassCategories kjcCategories, BindingResult bindingResult) {

		classLoadingValidation.validationForEdit(kjcClass, compiledFileBytes, compiledFileName, bindingResult);

		if (compiledFileBytes != null) {
			kjcClass.getKjcClassCompiled().setCompiledCode(compiledFileBytes);
		}
		kjcClass.setDescription(descrtiption);
		kjcClass.setKjcClassCategories(kjcCategories);
		kjcClass.setTsUpdate(new Date());
		kjcClass.setUtUpdate(Utilities.getUserFromContext().getId());

		return kjcClass;
	}

	/**A method used for finding class by name
	 * @param name
	 * @return KjcClasses that has received name
	 * @throws RuntimeException
	 */
	@Transactional(readOnly = true)
	public KjcClasses findByName(String name) {
		log.debug("finding KjcClasses instance by name");
		try {
			KjcClasses instance = (KjcClasses) sessionFactory.getCurrentSession().createCriteria(KjcClasses.class)
					.add(Restrictions.eq("name", name)).uniqueResult();
			if (instance == null) {
				log.debug("get successful, no instance found");
			} else {
				log.debug("get successful, instance found");
			}
			return instance;
		} catch (RuntimeException re) {
			log.error("find by name failed", re);
			throw re;
		}
	}

	/**A method that is used for extracting all validated classes from database
	 * @return List<KjcClasses> containing all validated classes from database
	 */
	@Transactional
	public List<KjcClasses> findAllValidation() {
		KjcClassCategories kjcClassCategories = (KjcClassCategories) sessionFactory.getCurrentSession()
				.createCriteria(KjcClassCategories.class)
				.add(Restrictions.eq("name", AppConstants.REPORT_VALIDATION_CLASS)).uniqueResult();
		return sessionFactory.getCurrentSession().createCriteria(KjcClasses.class)
				.add(Restrictions.eq("kjcClassCategories", kjcClassCategories)).list();
	}
	
	
	/**A method used to change checkmark flag on class
	 * @param id
	 * @param checked
	 * @return KjcClasses that was changed
	 */
	@Transactional
	public KjcClasses setCheckmark(Integer id, Integer checked) {
		KjcClasses kjcClass = findById(id);
		classLoadingValidation.validationForCheckmark(kjcClass);
		kjcClass.setFlEnabled(checked == 1);
		return kjcClass;
	}

	/**A method used for setting checkmarks on all classes
	 * @param checked
	 */
	@Transactional
	public void setAllCheckmarks(Integer checked) {
		List<KjcClasses> list = findAll();
		for (KjcClasses kjcClasses : list) {
			kjcClasses.setFlEnabled(checked == 1);
		}
	}

}
