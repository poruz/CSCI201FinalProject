package Server;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Vector;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@ServerEndpoint(value = "/ws/{roomId}")
public class MobileControllerServerSocket {
	
    private volatile String roomId; 
	private static Vector<Session> sessionVector = new Vector<Session>();
	private static Vector<ClientSocketConnection> clientsVector = new Vector<ClientSocketConnection>();
	private static ArrayList<Game> currentGames = new ArrayList<Game>();
	
	@OnOpen
	public void open(@PathParam("roomId") String roomId, Session session) {
		System.out.println("Connection made to the room " + roomId);
		ClientSocketConnection newCSC = new ClientSocketConnection(roomId, session);
		clientsVector.add(newCSC);
	}
	
	@OnMessage
	public void onMessage(String message, Session session) {
		Gson gson = new Gson();
		JsonParser parser = new JsonParser(); 
		JsonObject json = (JsonObject) parser.parse(message);
		
		Card card = gson.fromJson(json, Card.class);
		
		System.out.println("Player used card. Direction: " + card.getDirection() + " magnitude: " + card.getMagnitude());
		try {
			// TODO
			// Instead of sending the card data to each player, just send it to the main game session based on id
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

	public void createGame(String urlName) {
		this.currentGames.add(new Game(1, urlName));
	}
}