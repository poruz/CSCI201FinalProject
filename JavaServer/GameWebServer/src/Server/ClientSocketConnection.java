package Server;

import javax.websocket.Session;

public class ClientSocketConnection {
	private String roomId;
	private  Session session;

	public ClientSocketConnection(String roomId, Session session) {
		this.roomId = roomId;
		this.session = session;
	}

	public String getRoomId() {
		return roomId;
	}

	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}

	public Session getSession() {
		return session;
	}

	public void setSession(Session session) {
		this.session = session;
	}

}
