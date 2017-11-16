<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Create New Game</title>
</head>
<body>
<form name="CreateGameForm" method="post" action="../CreateGame">
    Room Name: <input type="text" name="roomName"/> <br/>
    Number Of Players: <input type="text" name="numberPlayers" > <br/>
    <input type="submit" value="Submit" />
</form>
</body>
</html>