var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv', { preload: preload, create: create, update: update, render: render });

var timeLeftText;
var timeText;
const TOTAL_TIME = 90;
var rightButton;
var leftButton;
var upButton;
var downButton;
var mBall;
var mFinishBlock;
var levelData;
var mBlocks = []; //an array of all the blocks
const WIDTH = 40;
const HEIGHT = 40;


function preload(){
	game.stage.backgroundColor = "#000000";
	game.load.image('Ball', "Assets/Ball.png");
	game.load.image('BlockA', "Assets/BlockA.png");
	game.load.image('BlockB', "Assets/BlockB.png");
	game.load.image('BlockC', "Assets/BlockC.png");
	game.load.image('BlockD', "Assets/BlockD.png");
	game.load.image('BlockE', "Assets/BlockE.png");
	game.load.image('BlockF', "Assets/BlockF.png");
	//game.load.image('Finish', "Assets/Finish.png"); - TOOO
	
	//Load Level
	game.load.json('level', 'Assets/Level00.json');
}

function LoadLevel() {
    levelData = game.cache.getJSON('level');
    for(var i = 0; i < levelData.levelRows.length; i++)
    {
    	var rowString = levelData.levelRows[i];
    	for(var j = 0; j < rowString.length; j++){
    		if(rowString[j] == 'A')
    		{
    			var newBlock = game.add.sprite(j*WIDTH, i*HEIGHT , 'BlockA');
    			mBlocks.push(newBlock);
    		}
    		else if(rowString[j] == 'B')
    		{
    			var newBlock = game.add.sprite(j*WIDTH, i*HEIGHT , 'BlockB');
    			mBlocks.push(newBlock);
    		}
    		else if(rowString[j] == 'C')
    		{
    			var newBlock = game.add.sprite(j*WIDTH, i*HEIGHT , 'BlockC');
    			mBlocks.push(newBlock);
    		}
    		else if(rowString[j] == 'D')
    		{
    			var newBlock = game.add.sprite(j*WIDTH, i*HEIGHT , 'BlockD');
    			mBlocks.push(newBlock);
    		}
    		else if(rowString[j] == 'E')
    		{
    			var newBlock = game.add.sprite(j*WIDTH, i*HEIGHT , 'BlockE');
    			mBlocks.push(newBlock);
    		}
    		else if(rowString[j] == 'F')
    		{
    			var newBlock = game.add.sprite(j*WIDTH, i*HEIGHT , 'BlockF');
    			mBlocks.push(newBlock);
    		}
    		else if(rowString[j] == 'P')
    		{
    			mBall = game.add.sprite(j*WIDTH, i*HEIGHT , 'Ball');
    		}
    		else if(rowString[j] == 'Q')
    		{
    			//**Code for finish block
    			//mFinishBlock = game.add.sprite(j*WIDTH, i*HEIGHT , 'Finish');
    			//mBlocks.push(mFinishBlock);
    		}
    	}
    }
}

function create(){
	
	//LoadLevel
	LoadLevel();
	
	//Time
	timeLeftText = game.add.text(20, 10, 'Time Left: ', { font: "24px Century Gothic", fill: "#ffffff", align: "left" });
	timeText = game.add.text(140, 10, '', { font: "24px Century Gothic", fill: "#00ff00", align: "left" });
	game.time.events.add(Phaser.Timer.SECOND * TOTAL_TIME, endGame, this);
	game.world.bringToTop(timeLeftText);
	game.world.bringToTop(timeText);
	
	//Ball physics
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//mBall.anchor.set(0.5); Don't need anchor - collision would be easier without them
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

	mBall.body.velocity.x *= 0.999;
	mBall.body.velocity.y *= 0.999;
	
}

function render(){

}

function collisionHandler(obj1, obj2) {

}

function endGame(){

}
