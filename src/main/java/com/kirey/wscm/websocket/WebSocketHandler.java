package com.kirey.wscm.websocket;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.kirey.wscm.data.dao.NotificationsSentDao;
import com.kirey.wscm.data.dao.WscmUserAccountsDao;
import com.kirey.wscm.data.entity.Notifications;
import com.kirey.wscm.data.entity.NotificationsSent;
import com.kirey.wscm.data.entity.WscmUserAccounts;
import com.kirey.wscm.data.service.ContentService;
import com.kirey.wscm.data.service.TemplateEngine;

/**
 * @author paunovicm
 *
 */

@Component
public class WebSocketHandler extends TextWebSocketHandler {
	
	@Autowired
	private WscmUserAccountsDao wscmUserAccountsDao;
	
	@Autowired
	private ContentService contentService;
	
	@Autowired
	private TemplateEngine templateEngine;
	
	@Autowired
	private NotificationsSentDao notificationsSentDao;

	List<WebSocketSession> allSessions = new CopyOnWriteArrayList<>();
	List<WebSocketSession> filteredSessions = new ArrayList<>();

	// ****UNUSED****
	//Example method
	public void counterIncrementedCallback(int counter) {
		for (WebSocketSession session : allSessions) {
			System.out.println("Trying to send:" + counter);
			if (session != null && session.isOpen()) {
				try {
					System.out.println("Now sending:" + counter);
					session.sendMessage(new TextMessage("counter current value = " + counter));
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				System.out.println("Don't have open session to send:" + counter);
			}
		}
	}
	
	/**
	 * Method for sending a WebSocket message to specific users
	 * @param content
	 */
	public void sendNotificationToFilteredUsers(String content) {
		for (WebSocketSession session : filteredSessions) {
			if (session != null && session.isOpen()) {
				try {
					session.sendMessage(new TextMessage(content));
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				System.out.println("Don't have open session to send");
			}
		}
	}
	
	/**
	 * Method for sending a WebSocket message to filtered users
	 * @param content
	 */
	public void sendNotificationToFilteredUsers(Notifications notification, Map<String, Object> templateModel) {
		String templateString = notification.getNotificationTemplate(); 
		String notificationContent = templateEngine.processTemplateContent(templateModel, templateString);
		for (WebSocketSession session : filteredSessions) {
			if (session != null && session.isOpen()) {
				try {
					session.sendMessage(new TextMessage(notificationContent));
					//Add new NotificationsSent
					Principal principal =  session.getPrincipal();
					if(principal != null) {
						UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
						WscmUserAccounts user = (WscmUserAccounts) token.getPrincipal();
						NotificationsSent notificationSent = new NotificationsSent();
						notificationSent.setUserAccount(user);
						notificationSent.setNotification(notification);
						notificationsSentDao.attachDirty(notificationSent);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				System.out.println("Don't have open session to send");
			}
		}
	}
	
	/**
	 * Method for sending WebSocket message to specific users
	 * @param listUsers - the list of users to which the message is sent
	 * @param notification
	 * @param templateModel
	 */
	public void sendNotificationToSpecificUsers(List<WscmUserAccounts> listUsers, Notifications notification, Map<String, Object> templateModel) {
		String templateString = notification.getNotificationTemplate(); 
		String notificationContent = templateEngine.processTemplateContent(templateModel, templateString);
		for (WscmUserAccounts user : listUsers) {
			System.out.println("user: " + user.getName());
			for (WebSocketSession session : allSessions) {
				//for each user form list check does session exist
				if(user.getSocketSessionId() != null && user.getSocketSessionId().equals(session.getId())) {
					//check is session open
					if (session != null && session.isOpen()) {
						try {
							session.sendMessage(new TextMessage(notificationContent));
							System.out.println("poslato");
							//Add new NotificationsSent
							NotificationsSent notificationSent = new NotificationsSent();
							notificationSent.setUserAccount(user);
							notificationSent.setNotification(notification);
							notificationsSentDao.attachDirty(notificationSent);
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				} else {
					System.out.println("Don't have open session to send");
				}
			}
		}
	
			
			
	}

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message)
			throws InterruptedException, IOException {

		if ("CLOSE".equalsIgnoreCase(message.getPayload())) {
			session.close();
		} else {
			System.out.println("Received:" + message.getPayload());
		}
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("Connection established");
		allSessions.add(session);
		Principal principal =  session.getPrincipal();
		if(principal != null) {
			UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
			WscmUserAccounts user = (WscmUserAccounts) token.getPrincipal();
			user.setSocketSessionId(session.getId());
			wscmUserAccountsDao.merge(user);
		}else {
//			 throw new AuthenticationCredentialsNotFoundException("not found");
		}
		
	}
	
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
		filteredSessions.remove(session);
		allSessions.remove(session);
	}

	public List<WebSocketSession> getAllSessions() {
		return allSessions;
	}

	public void setAllSessions(List<WebSocketSession> allSessions) {
		this.allSessions = allSessions;
	}

	public List<WebSocketSession> getFilteredSessions() {
		return filteredSessions;
	}

	public void setFilteredSessions(List<WebSocketSession> filteredSessions) {
		this.filteredSessions = filteredSessions;
	}

	
	

}
