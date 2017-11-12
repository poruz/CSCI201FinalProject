var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv', { preload: preload, create: create, update: update, render: render });

var timeLeftText;
var timeText;
const TOTAL_TIME = 90;

function preload(){
	game.stage.backgroundColor = "#000000";
}

function create(){
	timeLeftText = game.add.text(32, 32, 'Time Left: ', { font: "24px Century Gothic", fill: "#ffffff", align: "left" });
	timeText = game.add.text(150, 32, '', { font: "24px Century Gothic", fill: "#00ff00", align: "left" });
	game.time.events.add(Phaser.Timer.SECOND * TOTAL_TIME, endGame, this);
}

function update(){
	if(game.time.events.duration/1000 <= 10) //time left = game.time.events.duration/1000
	{
		timeText.fill = "#ff0000";
	}
	timeText.setText("" + parseInt(game.time.events.duration/1000));
}

function render(){

}

function collisionHandler(obj1, obj2) {

}

function endGame(){

}
