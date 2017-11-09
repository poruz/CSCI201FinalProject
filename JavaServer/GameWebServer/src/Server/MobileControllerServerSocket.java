package Server;

import java.io.IOException;
import java.util.Vector;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import jdk.nashorn.internal.parser.JSONParser;



@ServerEndpoint(value = "/ws")
public class MobileControllerServerSocket {

	private static Vector<Session> sessionVector = new Vector<Session>();
	
	@OnOpen
	public void open(Session session) {
		System.out.println("Connection made!");
		sessionVector.add(session);
	}
	
	@OnMessage
	public void onMessage(String message, Session session) {
		Gson gson = new Gson();
		JsonParser parser = new JsonParser(); 
		JsonObject json = (JsonObject) parser.parse(message);
		
		Card card = gson.fromJson(json, Card.class);
		
		System.out.println("Player used card. Direction: " + card.getDirection() + " magnitude: " + card.getMagnitude());
		try {
			for(Session s : sessionVector) {
				s.getBasicRemote().sendText("Player used card. Direction: " + card.getDirection() + " magnitude: " + card.getMagnitude());
			}
		} catch (IOException ioe) {
			System.out.println("ioe: " + ioe.getMessage());
			close(session);
		}
	}
	
	@OnClose
	public void close(Session session) {
		System.out.println("Disconnecting!");
		sessionVector.remove(session);
	}
	
	@OnError
	public void error(Throwable error) {
		System.out.println("Error!" + error.getMessage());
	}
}