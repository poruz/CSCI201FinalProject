package Server;

import java.util.List;


public class Card {

	private String direction;
	private int magnitude;
	private int gameID;

	public String getDirection() {
		return direction;
	}
	public void setDirection(String direction) {
		this.direction = direction;
	}
	public int getMagnitude() {
		return magnitude;
	}
	public void setMagnitude(int magnitude) {
		this.magnitude = magnitude;
	}
	public int getGameID() {
		return gameID;
	}
	public void setGameID(int gameID) {
		this.gameID = gameID;
	}
}
