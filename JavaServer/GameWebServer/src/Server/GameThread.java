package Server;
import java.io.IOException;
import java.util.Random;
import java.util.Vector;
import java.util.concurrent.ThreadLocalRandom;

import javax.websocket.Session;

import com.google.gson.Gson;

import messages.Card;
import messages.ComPackage;

public class GameThread extends Thread {

	private Game game;
	private String roomName;
	private int numOfPlayers;
	private Session mainSesh;
	private Vector<ClientSocketConnection> players;
	
	public GameThread(String roomName, int numOfPlayers) {
		this.setRoomName(roomName);
		this.setNumOfPlayers(numOfPlayers);
		this.setGame(new Game(roomName, numOfPlayers));
		this.players  = new Vector<ClientSocketConnection>();
		this.start();
	}

	public void sendMessage(String message) {
	}
	
	void sendRandomCardToSession(Session session)
	{
		ComPackage comPackage = returnCardComPakcage();
		
		Gson gson = new Gson();
		String jsonInString = gson.toJson(comPackage);
		try {
			session.getBasicRemote().sendText(jsonInString);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	void sendRandomCardsToAllSessions(int cardsPerPlayer)
	{
		for (ClientSocketConnection connection : players)
		{
			Session session = connection.getSession();
						
			for (int i = 0; i < cardsPerPlayer; i++)
			{
				sendRandomCardToSession(session);
			}
		}
	}
	
	public void run() {
		while(true) {
			
		}
	}

	public String getRoomName() {
		return roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public Game getGame() {
		return game;
	}

	public void setGame(Game game) {
		this.game = game;
	}

	public int getNumOfPlayers() {
		return numOfPlayers;
	}

	public void setNumOfPlayers(int numOfPlayers) {
		this.numOfPlayers = numOfPlayers;
	}
	
	ComPackage returnCardComPakcage()
	{
		String[] allDirections = new String[] { "north", "east", "south", "west" };
		String direction = allDirections[new Random().nextInt(allDirections.length)];
		int magnitude = ThreadLocalRandom.current().nextInt(1, 6);
		
		Card card = new Card(direction, magnitude);
		int type = 0; 
		String gameID = game.getId();
		
		return new ComPackage(card, gameID, type);
	}
	
	public Session getMainSesh() {
		return mainSesh;
	}

	public void setMainSesh(Session mainSesh) {
		this.mainSesh = mainSesh;
	}

	public void useCard(Card card, Session session) {
		try {
			Gson gson = new Gson();
			String jsonInString = gson.toJson(card);
			System.out.println("*Sending this card to main: " + jsonInString);
			this.getMainSesh().getBasicRemote().sendText(jsonInString);
			sendRandomCardToSession(session);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}

	public void addPlayer(String roomId, Session session) {
		ClientSocketConnection newCSC = new ClientSocketConnection(roomId, session);
		players.add(newCSC);
		sendRandomCardToSession(session);
		sendRandomCardToSession(session);
	}
}