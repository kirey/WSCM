package com.kirey.kjcore.features.sftp;

import org.springframework.messaging.Message;


public class KjcServiceActivator {
	public void getMessage (Message<?> message){
		String body = (String) message.getPayload();
	}
}
