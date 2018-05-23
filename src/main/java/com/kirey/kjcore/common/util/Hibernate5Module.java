package com.kirey.kjcore.common.util;

import javax.annotation.PostConstruct;

public class Hibernate5Module extends com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module {

	public Hibernate5Module() {
		super();
	}
	
	@PostConstruct
	public void configure() {
		this.disable(Hibernate5Module.Feature.USE_TRANSIENT_ANNOTATION);
		this.enable(Hibernate5Module.Feature.REPLACE_PERSISTENT_COLLECTIONS);
	}
}
