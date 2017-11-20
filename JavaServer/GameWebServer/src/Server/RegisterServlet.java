package Server;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.bson.Document;

import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

/**
 * Servlet implementation class RegisterServlet
 */
@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public RegisterServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String username = request.getParameter("username");
		String password = request.getParameter("password");
		System.out.println(username + " " + password);
		
		// Mongo credential code
		MongoClient mongo = new MongoClient( "localhost" , 27017 ); 
		MongoCredential credential; 
		credential = MongoCredential.createCredential("Oliver", "BallGameUsers", "password".toCharArray()); 
		System.out.println("Connected to the database successfully");
		
		// Accessing the database 
	    MongoDatabase database = mongo.getDatabase("BallGameUsers"); 
	    MongoCollection<Document> collection = database.getCollection("users");
      	
      	Document document = new Document();
      	document.put("username", username);
      	document.put("password", password);
      	collection.insertOne(document);
      	
      	response.sendRedirect(request.getContextPath()+"/jsp/Login.jsp");
	}

}
