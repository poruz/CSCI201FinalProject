<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<%  
	String roomName = (String)session.getAttribute("roomName");

%>

<!DOCTYPE html>
<html>
	<head>
		<title><%=roomName%> Room</title>
		<script type="text/javascript" src = "./game/phaser.min.js"></script>
		<script type="text/javascript" src = "./game/main.js"></script>
		
		<script>
			var roomName = "<%=roomName%>";
			var socket;
			function connectToServer() {
				socket = new WebSocket("ws://localhost:8080/GameWebServer/ws/<%=roomName%>");
				socket.onopen = function(event) {
					document.getElementById("gameBox").innerHTML += "Connected!" +  "<br />";
				}
				socket.onmessage = function(event) {
					var card = JSON.parse(event.data);
					console.log(card);
					var dir = 0;
					if( card.direction == "east"){
						dir = 0;
					}
					if( card.direction == "north"){
						dir = 1;
					}
					if( card.direction == "west"){
						dir = 2;
					}
					if( card.direction == "south"){
						dir = 3;
					}
					console.log(dir);
					console.log("mag: " +  card.magnitude);
					getCard(dir, card.magnitude);
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