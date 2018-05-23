package com.kirey.kjcore.data.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.hibernate.annotations.ValueGenerationType;
import org.hibernate.tuple.GenerationTiming;

/**Custom annotation interface used when updating user
 * @author 
 *
 */
@ValueGenerationType(generatedBy = UserInsertionOnUpdate.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface UpdateUser {
		GenerationTiming generationTiming() default GenerationTiming.ALWAYS;
}
