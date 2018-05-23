package com.kirey.kjcore.api.dto;

import java.io.Serializable;

/**
 * Class used for token transfer from server to client
 * @author Vladimir
 *
 */
public class TokenTransfer implements Serializable {

	private static final long serialVersionUID = -777442684038819324L;
	
	private final String token;

	public TokenTransfer(String token) {
		this.token = token;
	}

	public String getToken() {
		return this.token;
	}

}