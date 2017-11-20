package messages;

import java.util.List;


public class Card {

	private String direction;
	private int magnitude;
	
	public Card(String direction, int magnitude)
	{
		this.direction = direction;
		this.magnitude = magnitude;
	}

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
}
