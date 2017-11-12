var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv', { preload: preload, create: create, update: update, render: render });

var timeLeftText;
var timeText;
const TOTAL_TIME = 90;
var rightButton;
var leftButton;
var upButton;
var downButton;
var mBall;
function preload(){
	game.stage.backgroundColor = "#000000";
	game.load.image('mBall', "assets/ball.png");
	game.load.image('mBlock1', "assets/block.png");
}

function create(){
	timeLeftText = game.add.text(32, 32, 'Time Left: ', { font: "24px Century Gothic", fill: "#ffffff", align: "left" });
	timeText = game.add.text(150, 32, '', { font: "24px Century Gothic", fill: "#00ff00", align: "left" });
	game.time.events.add(Phaser.Timer.SECOND * TOTAL_TIME, endGame, this);
	game.physics.startSystem(Phaser.Physics.ARCADE);
	mBall = game.add.sprite(game.world.centerX, 500, 'mBall');
	mBall.scale.setTo(0.2, 0.2);
	mBall.anchor.set(0.5);
	mBall.enablebody = true;
	game.physics.enable(mBall, Phaser.Physics.ARCADE);
    mBall.checkWorldBounds = true;
    mBall.body.collideWorldBounds = true;
    mBall.body.bounce.set(1);
    mBall.body.velocity.x = 5;
    mBall.body.velocity.y = 5;
	rightButton = this.input.keyboard.addKey(Phaser.KeyCode.D);
	leftButton = this.input.keyboard.addKey(Phaser.KeyCode.A);
	upButton = this.input.keyboard.addKey(Phaser.KeyCode.W);
	downButton = this.input.keyboard.addKey(Phaser.KeyCode.S);
}

function update(){
	if(game.time.events.duration/1000 <= 10) //time left = game.time.events.duration/1000
	{
		timeText.fill = "#ff0000";
	}
	timeText.setText("" + parseInt(game.time.events.duration/1000));
	if(downButton.isDown && !upButton.isDown){
		mBall.body.velocity.y += 5;
	}
	else if(upButton.isDown && !downButton.isDown){
		mBall.body.velocity.y -= 5;
	}

	if(rightButton.isDown && !leftButton.isDown){
		mBall.body.velocity.x += 5;
	}
	else if(leftButton.isDown && !rightButton.isDown){
		mBall.body.velocity.x -= 5;
	}
}

function render(){

}

function collisionHandler(obj1, obj2) {

}

function endGame(){

}
