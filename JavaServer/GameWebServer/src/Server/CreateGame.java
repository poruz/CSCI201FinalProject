package Server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class CreateGame
 */
@WebServlet("/CreateGame")
public class CreateGame extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String message;
	private int x;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CreateGame() {
        super();
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		
	    response.setContentType("text/html");
	    PrintWriter out = response.getWriter();
	    out.println("<h1>" + message + " " + this.x + "</h1>");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
    	String roomName = request.getParameter("roomName");
    	int numOfPlayers = 0;

		System.out.println("Attempting to create game: " + roomName );
		MobileControllerServerSocket.addGame(roomName, numOfPlayers);

		// TODO: Set session params for phaser to know what game to connect the socket to
		// TODO: Redirect to phaser
    	HttpSession session = request.getSession();  
    	session.setAttribute("roomName", roomName);
        request.getRequestDispatcher("/game/index.jsp").forward(request, response);

	}

}
