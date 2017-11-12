package Server;

public class Game {
	private int gameId;
	private String mobileUrl;
	
	public Game(int gameId, String mobileUrl) {
		this.gameId = gameId;
		this.mobileUrl = mobileUrl;
	}

	public int getGameId() {
		return gameId;
	}

	public void setGameId(int gameId) {
		this.gameId = gameId;
	}

	public String getMobileUrl() {
		return mobileUrl;
	}

	public void setMobileUrl(String mobileUrl) {
		this.mobileUrl = mobileUrl;
	}

}
