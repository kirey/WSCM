package com.kirey.kjcore.api.dto;

import java.io.Serializable;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Custom DTO used for testing
 */
public class TestObject implements Serializable {

	private static final long serialVersionUID = 3338364520218104132L;

	private int id;
	
    @Size(min=2, max=10)
	private String firstName;
	
    @NotNull(/*message = "njamb.error.validation.notnull"*/)
    @Min(value=2 /*, message = "njamb.error.validation.size.greaterthan"*/)
	private int age;
    	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

}
