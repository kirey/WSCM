package com.kirey.kjcore.data.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.hibernate.annotations.ValueGenerationType;

/**Custom annotation interface used when creating user
 * @author 
 *
 */
@ValueGenerationType(generatedBy = UserInsertionOnCreation.class)
@Retention(RetentionPolicy.RUNTIME)
public @interface CreationUser {

}
