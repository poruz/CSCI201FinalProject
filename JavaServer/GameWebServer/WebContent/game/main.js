var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv', { preload: preload, create: create, update: update, render: render });
var timeLeftText;
var timeText;
var scoreText;
var scoreValueText;
const TOTAL_TIME = 120;
var rightButton;
var leftButton;
var upButton;
var downButton;
var mBall;
var mFinishBlock;
var mFinishBlocks;
const NUM_LEVELS = 7;
var mLevels = [];
var levelData;
var mBlocks = []; // an array of all the blocks
const WIDTH = 40;
var mScore;
var finishText;
const HEIGHT = 40;
var bouncyBounceMusic;
var bounceMusic;
var ifPlayBouncyBounce;
var levelFinishMusic;
var startGameButton;
var numPlayers;
var roomUrl;


function setRoomUrl(url){
	roomUrl = url;
}

function preload(){
	game.stage.disableVisibilityChange = true;
	game.load.audio('bounce', 'http://localhost:8080/GameWebServer/game/Assets/Bounce.wav');
	game.load.audio('bouncyBounce', 'http://localhost:8080/GameWebServer/game/Assets/BouncyBounce.wav');
	game.load.audio('levelFinish', 'http://localhost:8080/GameWebServer/game/Assets/levelFinish.wav');
	
	game.stage.backgroundColor = "#777777";
	game.load.image('Ball', "http://localhost:8080/GameWebServer/game/Assets/Ball1.png");
	game.load.image('BlockA', "http://localhost:8080/GameWebServer/game/Assets/BlockA.png");
	game.load.image('BlockB', "http://localhost:8080/GameWebServer/game/Assets/BlockB.png");
	game.load.image('BlockC', "http://localhost:8080/GameWebServer/game/Assets/BlockC.png");
	game.load.image('BlockD', "http://localhost:8080/GameWebServer/game/Assets/BlockD.png");
	game.load.image('BlockE', "http://localhost:8080/GameWebServer/game/Assets/BlockE.png");
	game.load.image('BlockF', "http://localhost:8080/GameWebServer/game/Assets/BlockF.png");
	game.load.image('Finish', "http://localhost:8080/GameWebServer/game/Assets/Finish.png");

	// Load Level
	game.load.json('level00', 'http://localhost:8080/GameWebServer/game/Assets/Level00.json');
	game.load.json('level01', 'http://localhost:8080/GameWebServer/game/Assets/Level01.json');
	game.load.json('level02', 'http://localhost:8080/GameWebServer/game/Assets/Level02.json');
	game.load.json('level03', 'http://localhost:8080/GameWebServer/game/Assets/Level03.json');
	game.load.json('level04', 'http://localhost:8080/GameWebServer/game/Assets/Level04.json');
	game.load.json('level05', 'http://localhost:8080/GameWebServer/game/Assets/Level05.json');
	game.load.json('level06', 'http://localhost:8080/GameWebServer/game/Assets/Level06.json');
	
	mLevels.push('level06');
	mLevels.push('level05');
	mLevels.push('level04');
	mLevels.push('level03');
	mLevels.push('level02');
	mLevels.push('level01');
	mLevels.push('level00');
}


/*
 * Load a random level and remove it from mLevels
 * If you reach finish block, call this function and it will load the next level
 * Before calling this function check that mLevels.length > 0 
 */

function LoadLevel() {

	timeLeftText = game.add.text(20, 10, 'Time Left: ', { font: "24px Century Gothic", fill: "#ffffff", align: "left" });
	timeText = game.add.text(140, 10, TOTAL_TIME, { font: "24px Century Gothic", fill: "#00ff00", align: "left" });	
	timeText.setText("" + TOTAL_TIME);
	
	scoreText = game.add.text(640, 10, 'Score: ', { font: "24px Century Gothic", fill: "#ffffff", align: "left" });
	scoreValueText = game.add.text(720, 10, mScore, { font: "24px Century Gothic", fill: "#00ff00", align: "left" });
	
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	// Random number between 0 to mLevels.length - 1 (both inclusive)
	//var levelIndex =  0; //Math.floor(Math.random() * mLevels.length);
	
	// Swap the levelIndex level with the last level and then pop it out.
	//var temp = mLevels[mLevels.length - 1];
	//mLevels[mLevels.length - 1] = mLevels[levelIndex];
	//mLevels[levelIndex] = temp;
	
	// Load level from popped out level
	levelData = game.cache.getJSON(mLevels.pop());
	
	mBlocks = game.add.group();
	mFinishBlocks = game.add.group();
	mFinishBlocks.enableBody = true;
	mFinishBlocks.physicsBodyType = Phaser.Physics.ARCADE;
	mBlocks.enableBody = true;	
	mBlocks.physicsBodyType = Phaser.Physics.ARCADE;

	for(var i = 0; i < levelData.levelRows.length; i++)
	{
		var rowString = levelData.levelRows[i];
		
		for(var j = 0; j < rowString.length; j++){
		    if(rowString[j] == 'A')
		    {
		    	block = mBlocks.create(j*WIDTH, i*HEIGHT,'BlockA');
		        block.body.bounce.set(0.5);
		        block.body.immovable = true;
		    }
		    else if(rowString[j] == 'B')
		    {
		    	block = mBlocks.create(j*WIDTH, i*HEIGHT,'BlockB');
		        block.body.bounce.set(0.5);
		        block.body.immovable = true;
		    }
		    else if(rowString[j] == 'C')
		    {
		    	block = mBlocks.create(j*WIDTH, i*HEIGHT,'BlockC');
		        block.body.bounce.set(0.5);
		        block.body.immovable = true;
		    }
		    else if(rowString[j] == 'D')
		    {
		    	block = mBlocks.create(j*WIDTH, i*HEIGHT,'BlockD');
		        block.body.bounce.set(0.5);
		        block.body.immovable = true;
		    }
		    else if(rowString[j] == 'E')
		    {
		    	block = mBlocks.create(j*WIDTH, i*HEIGHT,'BlockE');
		        block.body.bounce.set(0.5);
		        block.body.immovable = true;
		    }
		    else if(rowString[j] == 'F')
		    {
		    	block = mBlocks.create(j*WIDTH, i*HEIGHT,'BlockF');
		        block.body.bounce.set(0.5);
		        block.body.immovable = true;
		    }
		    else if(rowString[j] == 'P')
		    {
		    	mBall = game.add.sprite(j*WIDTH, i*HEIGHT , 'Ball');
		    	mBall.enablebody = true;
		    	game.physics.enable(mBall, Phaser.Physics.ARCADE);
		        mBall.checkWorldBounds = true;
		        mBall.body.collideWorldBounds = true;
		        mBall.body.bounce.set(0.5);
		        mBall.body.velocity.x = 0;
		    	mBall.body.velocity.y = 0;
		    	mBall.scale.setTo(0.5, 0.5);
		    }
		    else if(rowString[j] == 'Q')
		    {
			    mFinishBlock = mFinishBlocks.create(j*WIDTH, i*HEIGHT, 'Finish');
			    mFinishBlock.body.immovable = true;
			    
		    }	
	    }
    }
}



function create(){
		
	mScore = 0;
	ifPlayBouncyBounce = true;
	
	bounceMusic = game.add.audio('bounce');
	bouncyBounceMusic = game.add.audio('bouncyBounce');
	levelFinishMusic = game.add.audio('levelFinish');
	
	// LoadLevel
	LoadLevel();
	
	// Time
	game.world.bringToTop(timeLeftText);
	game.world.bringToTop(timeText);
	
	game.world.bringToTop(scoreText);
	game.world.bringToTop(scoreValueText);
	
	rightButton = this.input.keyboard.addKey(Phaser.KeyCode.D);
	leftButton = this.input.keyboard.addKey(Phaser.KeyCode.A);
	upButton = this.input.keyboard.addKey(Phaser.KeyCode.W);
	downButton = this.input.keyboard.addKey(Phaser.KeyCode.S);
	
	game.pause = true;
	//Timer.pause();
	game.physics.arcade.isPaused = true;
	startGameButton = game.add.text(100, 100, 'To join this game,\n get on your phone and go to \n http://aaba2181.ngrok.io/GameWebServer/c/' + roomUrl + '\n Start Game', { font: "20px Century Gothic", fill: "#ff0000", backgroundColor: 'rgba(0,255,0,1)' });
	startGameButton.inputEnabled = true;
	startGameButton.events.onInputUp.add(function(){
		game.pause = false;
		//Timer.resume();
		game.physics.arcade.isPaused = false;
		game.time.events.add(Phaser.Timer.SECOND * TOTAL_TIME, endGame, this);
		bouncyBounceMusic.play();
		var verify = {
				type: "1",
				// gameID: roomName
			};
		// socket.send(JSON.stringify(verify));
		startGameButton.destroy();
	});
	
}



function update(){
	
	if(mBall.body.blocked.up || mBall.body.blocked.down || mBall.body.blocked.left || mBall.body.blocked.right)
	{ 
		bounceMusic.play();
	}
	
	if(game.time.events.duration/1000 <= 10) // time left =
												// game.time.events.duration/1000
	{
		timeText.fill = "#ff0000";
	}
	else
	{
		timeText.fill = "#00ff00";
	}
	
	timeText.setText("" + parseInt(game.time.events.duration/1000));
	
	game.physics.arcade.collide(mBall, mBlocks, ballCollide, null, this);
	game.physics.arcade.collide(mBall, mFinishBlocks, finishBlock, null, this);
	
	mBall.body.velocity.x *= 0.995;
	mBall.body.velocity.y *= 0.995;
}



function render(){

}

function ballCollide(_ball, _block){
	bounceMusic.play();
}

function finishBlock(_ball, _block){
	game.world.removeAll();	
	mScore += 100;
	levelFinishMusic.play();
	if(mLevels.length <= 0){
		endGame();
	}
	else{
		LoadLevel();	
	}
}


function useCard(direction, magnitude){ // 0 = right, 1 = up, 2 = left, 3 = down
	console.log("Gdir: " +  direction);
	console.log("Gmag: " +  magnitude);
	if(direction == 0){
		console.log("Go right");
		mBall.body.velocity.x += magnitude*100;
		console.log(mBall.body.velocity.x);
	}
	else if(direction == 1){
		mBall.body.velocity.y -= magnitude*100;
	}
	else if(direction == 2){
		console.log("Go left");
		mBall.body.velocity.x -= magnitude*100;
		console.log(mBall.body.velocity.x);
	}
	else if(direction == 3){
		mBall.body.velocity.y += magnitude*100;
	}
}

function endGame(){
	game.world.removeAll();
	finishText = game.add.text(290, 280, "Score: " + mScore, { font: "48px Century Gothic", fill: "#ffffff", align: "middle", boundsAlignH: "center", boundsAlignV: "middle" });
}