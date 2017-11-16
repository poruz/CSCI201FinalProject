<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<%  
	String roomName = (String)session.getAttribute("roomName");

%>

<!DOCTYPE html>
<html>
	<head>
		<title><%=roomName%> Room</title>
		<script>
			var roomName = "<%=roomName%>";
			var socket;
			function connectToServer() {
				socket = new WebSocket("ws://localhost:8080/GameWebServer/ws/<%=roomName%>");
				socket.onopen = function(event) {
					document.getElementById("gameBox").innerHTML += "Connected!" +  "<br />";
				}
				socket.onmessage = function(event) {
					document.getElementById("gameBox").innerHTML += event.data + "<br />";
				}
				socket.onclose = function(event) {
					document.getElementById("gameBox").innerHTML += "Disconnected!";
				}
			}
			var verify = {
					type: "1",
					gameID: roomName
				};
			function connectAsMain() {
				socket.send(JSON.stringify(verify));
				return false;
			}
		</script>
	</head>
	<body onload="connectToServer();">
		<h1> To join, go to http://localhost:8080/GameWebServer/c/<%=roomName%> </h1>
		<br />
		<div id="gameBox">Game Play Results will end up here: <br> </div>
	</body>
</html>