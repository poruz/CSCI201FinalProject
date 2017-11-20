<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>Login</title>
		<style>
			body {
				font-family: Helvetica Neue,Helvetica,Arial,sans-serif; 
				background-image: url("http://hdwallpaper2013.com/wp-content/uploads/2013/02/Download-Cool-Backgrounds-HD-Wallpaper.jpg");
			
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				font-weight: bold;
			}
			#message {
				font-weight: normal;
			}
			#login {

			}
			#register {
			
			}
			#guest {
			
			}
		</style>
		<script>
			function loginAsGuest()
			{
				document.getElementById(username).value = "guest";
				docuemnt.getElementById(password).value = "guest";
			}
			function verifyLogin()
			{
				console.log("HEREERE");
				
				var username = document.getElementById(username).value;
				var password = docuemnt.getElementById(password).value = "guest";
				if (username == null || password == null) return false;
				
				var userLength = username.length;
				var passLength = password.length;
				if (userLength < 6 || userLength > 20) return false;
				else if (passLength < 6 || userLength > 20) return false;
				else if (hasWhiteSpace(username) || hasWhiteSpace(password)) return false;
				
				return true;
				
			}
			function hasWhiteSpace(s) {
		    	return (s.indexOf(' ') >= 0);
			}
		</script>
	</head>
	<body>
		<div id="message">6 to 20 characters, and no spaces.</div>
		<form name="MainForm" id="MainForm" method="POST" onsubmit="return verifyLogin();" action="">
			Username: <input type="text" id="username" name="username"><br>
			Password: <input type="text" id="password" name="password"><br>
			<input type="submit" value="Login" id="login" name="login" onclick="form.action='../LoginServlet';">
			<input type="submit" value="Register" id="register" name="register" onclick="form.action='../RegisterServlet';">
			<input type="submit" value="Continue As Guest" id="guest" name="guest" onclick="loginAsGuest(); form.action='../LoginServlet';">
		</form>
	</body>
</html>