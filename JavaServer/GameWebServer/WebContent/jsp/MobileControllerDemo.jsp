<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
	<head>
		<title>Chat Client</title>
		<script>
			var socket;
			function connectToServer() {
				socket = new WebSocket("ws://localhost:8080/GameWebServer/ws");
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
				socket.send(JSON.stringify(cards[i]));
				return false;
			}
		</script>
	</head>
	<body onload="connectToServer()">
		<button onclick="sendCard('0')">Click me to use an north card!</button>
		<button onclick="sendCard('1')">Click me to use an east card!</button>
		<button onclick="sendCard('2')">Click me to use an west card!</button>
		<button onclick="sendCard('3')">Click me to use an south card!</button>
		<br />
		<div id="gameBox">Game Play Results will end up here: <br> </div>
	</body>
</html>