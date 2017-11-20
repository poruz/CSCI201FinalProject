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
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<link rel="stylesheet" href="../css/mobileController.css">
		<!-- jQuery library -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		
		<!-- Latest compiled JavaScript -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		
		<script>
			var roomName = "<%=roomName%>";
			var test = "<%=test%>";
			var socket;
			var cards  = [];
			
			function connectToServer() {
				socket = new WebSocket("ws://localhost:8080/GameWebServer/ws/<%=roomName%>");
				socket.onopen = function(event) {
				}
				socket.onmessage = function(event) {

					var comPack = JSON.parse(event.data);
					
					if(comPack.Type == "0"){
						// recieved a card
						console.log(comPack);
						addCardToHand(comPack.Card.direction, comPack.Card.magnitude);
					}
					
					
				}
				socket.onclose = function(event) {
					// document.getElementById("gameBox").innerHTML += "Disconnected!";
				}
			}

			
			function addCardToHand(dir, mag){
				cards.push({
					direction: dir,
					magnitude: mag
				});
				refreshHand();
			}
			
			function removeCard() {
				  currentIndex = $('div.active').index();
				  var ActiveElement = $carousel.find('.item.active');
				  ActiveElement.remove();
				  var NextElement = $carousel.find('.item').first();
				  NextElement.addClass('active');
				}
			
			function sendCard(i) {
				var curCard;
				cards.forEach(function(card, j) {
					if(i == j){
						curCard = card;
					}
				});
				
				var pac = {
						type: 0,
						gameID: roomName,
						Card: curCard
				};
				socket.send(JSON.stringify(pac));
				var index = cards.indexOf(i);
				cards.splice(i, 1);
				refreshHand();
				return false;
			}
			
			function refreshHand(){
				var myNode = document.getElementById("slides");
				while (myNode.firstChild) {
				    myNode.removeChild(myNode.firstChild);
				}
				cards.forEach(function(card, i) {
					var dirArrow = '';
					dir = card.direction;
					mag = card.magnitude;
					if( dir == "east"){
						dirArrow = 'right';
					}
					if( dir == "north"){
						dirArrow = 'up';
					}
					if( dir == "west"){
						dirArrow = 'left';
					}
					if( dir == "south"){
						dirArrow = 'down';
					}
					var innerCD = ' <div class="text-center align-middle" '
	               + ' > '
	               + ' <h1> ' + '<span class="glyphicon glyphicon-arrow-' + dirArrow + '">' + ' </Glyphicon></h1> '
	              + '   <h1> ' + mag + '</h1> '
	              + '<button onclick="sendCard(\'' + i + ' \')"> '
	             + '<h1> <span class="glyphicon glyphicon-upload"></span></h1> '
	             + '  </button>'
	              + '</div>' ;
					 $('<div class="item">' + innerCD + '<div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
					 $('<li data-target="#carousel-example-generic" data-slide-to="' + cards.length + '"></li>').appendTo('.carousel-indicators')
					 $('.item').first().addClass('active');
					 $('.carousel-indicators > li').first().addClass('active');
					 $('#carousel-example-generic').carousel();
				});
			}
		</script>
	</head>
	<body onload="connectToServer()">
		
		<div class="container">

  <div id="carousel-example-generic" class="carousel slide" data-interval="false" data-ride="carousel">
    <!-- Indicators -->
   <!--  <ol class="carousel-indicators" id="indicators">
    </ol>-->

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox" id="slides">
    </div>

    <!-- Controls -->
    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>

</div>
	</body>
</html>