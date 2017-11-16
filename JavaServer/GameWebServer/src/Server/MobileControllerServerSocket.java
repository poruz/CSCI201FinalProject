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

import messages.Card;
import messages.ComPackage;

@ServerEndpoint(value = "/ws/{roomId}")
public class MobileControllerServerSocket {
	
    private volatile String roomId; 
	private static Vector<Session> sessionVector = new Vector<Session>();
	private static Vector<ClientSocketConnection> clientsVector = new Vector<ClientSocketConnection>();
	
	private static Vector<GameThread> gameThreads = new Vector<GameThread>();
	
	public static void addGame(String gameId, int numOfPlayers) {
		gameThreads.add(new GameThread(gameId, numOfPlayers));
		System.out.println("ADDING GAME: " + gameId);
	}
	
	public ClientSocketConnection getClientBySession(Session session) {
		for(ClientSocketConnection client : clientsVector) {
			if(client.getSession().equals(session)) {
				return client;
			}
		}
		return null;
	}
	
	@OnOpen
	public void open(@PathParam("roomId") String roomId, Session session) {
		for( GameThread gameThread : gameThreads ) {
			if(gameThread.getRoomName().equals(roomId)) {
				if(gameThread.getMainSesh() == null) {
					gameThread.setMainSesh(session);
					System.out.println("main game connection successful");
				}
				System.out.println("Connection made to the room " + roomId);
				gameThread.addPlayer(roomId, session);
				return;
			}
		}
		System.out.println(roomId + " does not exist.");
	}
	
	@OnMessage
	public void onMessage(String message, Session session) {
		Gson gson = new Gson();
		JsonParser parser = new JsonParser(); 
		JsonObject json = (JsonObject) parser.parse(message);
		
		ComPackage pack = gson.fromJson(json, ComPackage.class);
		
		if(pack.getType() == 0) {
			// A card was sent
			String roomId = pack.getGameID();
			Card card = pack.getCard();
			for(GameThread gameThread : gameThreads) {
				if(gameThread.getRoomName().equals(roomId)) {
					System.out.println("Sent Move to main");
					gameThread.useCard(card);
					System.out.println("Sent Move to main DONE");
				}
			}
			System.out.println("Player used card. Direction: " + card.getDirection() + " magnitude: " + card.getMagnitude());
			
		}
		if(pack.getType() == 1) {
			// The main game has connected
			
			String roomId = pack.getGameID();
			
			for(GameThread gameThread : gameThreads) {
				if(gameThread.getRoomName().equals(roomId)) {
					gameThread.setMainSesh(session);
					// game.setMainGame(session);
					try {
						session.getBasicRemote().sendText("main game connection successful");
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					System.out.println("main game connection successful");
				}
			}
		}

	}
	
	@OnClose
	public void close(Session session) {
		System.out.println("Disconnecting!");
		clientsVector.remove(this.getClientBySession(session));
		sessionVector.remove(session);
	}
	
	@OnError
	public void error(Throwable error) {
		System.out.println("Error!" + error.getMessage());
	}
}