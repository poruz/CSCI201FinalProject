<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<%  
	String roomName = (String)session.getAttribute("roomName");
	String test = "test";
%>

<!DOCTYPE html>
<html>
	<head>
		<title><%=roomName%> Room</title>
		<script>
			var roomName = "<%=roomName%>";
			var test = "<%=test%>";
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
			var cards = [
				{
					direction: "north",
					magnitude: "2"
				},
				{
					direction: "east",
					magnitude: "3"
				},
				{
					direction: "south",
					magnitude: "4"
				},
				{
					direction: "west",
					magnitude: "1"
				}
			];
			function sendCard(i) {
				var pac = {
						type: 0,
						gameID: roomName,
						Card: cards[i]
				}
				socket.send(JSON.stringify(pac));
				return false;
			}
		</script>
	</head>
	<body onload="connectToServer()">
		<button onclick="sendCard('0')">Click me to use an north card!</button> <br />
		<button onclick="sendCard('1')">Click me to use an east card!</button> <br />
		<button onclick="sendCard('2')">Click me to use an west card!</button> <br />
		<button onclick="sendCard('3')">Click me to use an south card!</button> <br />
		<br />
		<div id="gameBox">Game Play Results will end up here: <br> </div>
	</body>
</html>