package com.kirey.wscm.websocket;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.kirey.wscm.data.dao.WscmUserAccountsDao;
import com.kirey.wscm.data.entity.WscmUserAccounts;
import com.kirey.wscm.data.service.ContentService;

@Component
public class CounterHandler extends TextWebSocketHandler {
	
	@Autowired
	private WscmUserAccountsDao wscmUserAccountsDao;
	
	@Autowired
	private ContentService contentService;

	List<WebSocketSession> allSessions = new CopyOnWriteArrayList<>();
	List<WebSocketSession> filteredSessions = new ArrayList<>();

	
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
		System.out.println("-------------------------------------------------- " + session.getHandshakeHeaders());
//		this.session = session;
		allSessions.add(session);
		Principal principal =  session.getPrincipal();
		UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
		WscmUserAccounts user = (WscmUserAccounts) token.getPrincipal();
		user.setSocketSessionId(session.getId());
		wscmUserAccountsDao.merge(user);
	}
	
	

	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
		System.out.println(status.getReason());
		System.out.println(status.getCode());
		System.out.println(session.getRemoteAddress());
		System.out.println(session.getId());
		System.out.println(session.getHandshakeHeaders());
		System.out.println(session.getHandshakeHeaders().getFirst("Cookie"));
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
