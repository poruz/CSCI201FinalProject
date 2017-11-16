package Server;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Vector;

import javax.websocket.Session;

import com.google.gson.Gson;

import messages.Card;

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

	public Session getMainSesh() {
		return mainSesh;
	}

	public void setMainSesh(Session mainSesh) {
		this.mainSesh = mainSesh;
	}

	public void useCard(Card card) {
		try {

			System.out.println("Sending..");

			Gson gson = new Gson();
			String jsonInString = gson.toJson(card);
			this.getMainSesh().getBasicRemote().sendText(jsonInString);
			System.out.println("sent!");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	public void addPlayer(String roomId, Session session) {
		ClientSocketConnection newCSC = new ClientSocketConnection(roomId, session);
		players.add(newCSC);
		
	}
}