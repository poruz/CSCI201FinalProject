package Server;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.bson.Document;

import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.*;


/**
 * Servlet implementation class LoginServlet
 */
@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public LoginServlet() 
    {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{

	}


	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		System.out.println(username + " " + password);
		
		// Mongo credential code
		MongoClient mongo = new MongoClient( "localhost" , 27017 ); 
		MongoCredential credential; 
		credential = MongoCredential.createCredential("Oliver", "project201", "password".toCharArray()); 
		System.out.println("Connected to the database successfully");
		
		// Accessing the database 
	    MongoDatabase database = mongo.getDatabase("project201"); 
	    MongoCollection<Document> collection = database.getCollection("usersCollection");
	    
	    Document thisUser = collection.find(and(eq("username", username), eq("password", password))).first();
	    
	    if (thisUser == null) 
	    {
	    	response.sendRedirect(request.getContextPath()+"/jsp/Login.jsp");
	    }
	    else
	    {
	    	response.sendRedirect(request.getContextPath()+"/jsp/CreateGame.jsp");
	    }
	}

}
