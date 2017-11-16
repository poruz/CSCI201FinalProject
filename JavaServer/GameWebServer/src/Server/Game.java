package Server;

import javax.websocket.Session;

public class Game {
	private int numberOfPlayers;
	private String Id;
	private Session mainGame;
	
	public Game(String Id, int numberOfPlayers) {
		this.setNumberOfPlayers(numberOfPlayers);
		this.Id = Id;
	}


	public int getNumberOfPlayers() {
		return numberOfPlayers;
	}

	public void setNumberOfPlayers(int numberOfPlayers) {
		this.numberOfPlayers = numberOfPlayers;
	}


	public String getId() {
		return Id;
	}


	public void setId(String id) {
		Id = id;
	}


	public Session getMainGame() {
		return mainGame;
	}


	public void setMainGame(Session mainGame) {
		this.mainGame = mainGame;
	}

}
