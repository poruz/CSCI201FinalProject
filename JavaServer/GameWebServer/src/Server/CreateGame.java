package Server;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
        // TODO Auto-generated constructor stub
        this.message = "hello world!";
        this.x = 3;
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	     // Set response content type
		this.x += 1;
		addNewGame();
	    response.setContentType("text/html");
	    PrintWriter out = response.getWriter();
	    out.println("<h1>" + message + " " + this.x + "</h1>");
	}

	private void addNewGame() {
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
