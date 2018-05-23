package com.kirey.kjcore.data.annotations;

import org.hibernate.Session;
import org.hibernate.tuple.AnnotationValueGeneration;
import org.hibernate.tuple.GenerationTiming;
import org.hibernate.tuple.ValueGenerator;

import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.entity.KjcUserAccounts;

/**Custom annotation class used when updating user
 * @author 
 *
 */
public class UserInsertionOnUpdate implements AnnotationValueGeneration<UpdateUser>{

	private static final long serialVersionUID = -5016221025347264412L;
	
	private GenerationTiming gTiming;
	
	private final transient ValueGenerator<Integer> generator = new ValueGenerator<Integer>() {
        /* (non-Javadoc)
         * @see org.hibernate.tuple.ValueGenerator#generateValue(org.hibernate.Session, java.lang.Object)
         */
        public Integer generateValue(Session session, Object owner) {
        	KjcUserAccounts user = Utilities.getUserFromContext();
        	Integer returnValue = (user == null) ? null : user.getId();
        	return returnValue;
        }
    };
	
	/* (non-Javadoc)
	 * @see org.hibernate.tuple.ValueGeneration#getGenerationTiming()
	 */
	@Override
	public GenerationTiming getGenerationTiming() {
		return gTiming;
	}

	/* (non-Javadoc)
	 * @see org.hibernate.tuple.ValueGeneration#getValueGenerator()
	 */
	@Override
	public ValueGenerator<?> getValueGenerator() {
		return generator;
	}
	

	/* (non-Javadoc)
	 * @see org.hibernate.tuple.ValueGeneration#referenceColumnInSql()
	 */
	@Override
	public boolean referenceColumnInSql() {
		return false;
	}

	/* (non-Javadoc)
	 * @see org.hibernate.tuple.ValueGeneration#getDatabaseGeneratedReferencedColumnValue()
	 */
	@Override
	public String getDatabaseGeneratedReferencedColumnValue() {
		return null;
	}

	/* (non-Javadoc)
	 * @see org.hibernate.tuple.AnnotationValueGeneration#initialize(java.lang.annotation.Annotation, java.lang.Class)
	 */
	@Override
	public void initialize(UpdateUser annotation, Class<?> propertyType) {
		gTiming = annotation.generationTiming();
	}

}
