package messages;

public class ComPackage {

	private Card Card;
	private String gameID;
	private int Type; 
	// 0 = message is a card
	// 1 = signals the connection of this display game
	// 2 = signals the end of the game
	public Card getCard() {
		return Card;
	}
	public void setCard(Card card) {
		Card = card;
	}
	public int getType() {
		return Type;
	}
	public void setType(int type) {
		Type = type;
	}
	public String getGameID() {
		return gameID;
	}
	public void setGameID(String gameID) {
		this.gameID = gameID;
	}
	
}
