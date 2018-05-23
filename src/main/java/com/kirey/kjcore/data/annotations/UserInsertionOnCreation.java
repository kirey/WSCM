package com.kirey.kjcore.data.annotations;

import org.hibernate.Session;
import org.hibernate.tuple.AnnotationValueGeneration;
import org.hibernate.tuple.GenerationTiming;
import org.hibernate.tuple.ValueGenerator;

import com.kirey.kjcore.common.util.Utilities;
import com.kirey.kjcore.data.entity.KjcUserAccounts;

public class UserInsertionOnCreation implements AnnotationValueGeneration<CreationUser>{

	private static final long serialVersionUID = -2219992796525197932L;
	
	private final transient ValueGenerator<Integer> generator = new ValueGenerator<Integer>() {
		
		@Override
        public Integer generateValue(Session session, Object owner) {
        	KjcUserAccounts user = Utilities.getUserFromContext();
        	Integer returnValue = (user == null) ? null : user.getId();
        	return returnValue;
        }
    };
	
	@Override
	public GenerationTiming getGenerationTiming() {
		return GenerationTiming.INSERT;
	}

	@Override
	public ValueGenerator<?> getValueGenerator() {
		return generator;
	}
	

	@Override
	public boolean referenceColumnInSql() {
		return false;
	}

	@Override
	public String getDatabaseGeneratedReferencedColumnValue() {
		return null;
	}

	@Override
	public void initialize(CreationUser annotation, Class<?> propertyType) {
	}

}
