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

var mFinishBlocks;

const NUM_LEVELS = 7;

var mLevels = [];

var levelData;

var mBlocks = []; //an array of all the blocks

const WIDTH = 40;

var score = 0;

var finishText;

const HEIGHT = 40;





function preload(){

game.stage.backgroundColor = "#777777";

game.load.image('Ball', "Assets/Ball.png");

game.load.image('BlockA', "Assets/BlockA.png");

game.load.image('BlockB', "Assets/BlockB.png");

game.load.image('BlockC', "Assets/BlockC.png");

game.load.image('BlockD', "Assets/BlockD.png");

game.load.image('BlockE', "Assets/BlockE.png");

game.load.image('BlockF', "Assets/BlockF.png");

//game.load.image('Finish', "Assets/Finish.png"); - TOOO


//Load Level

game.load.json('level00', 'Assets/Level00.json');

mLevels.push('level00');

game.load.json('level01', 'Assets/Level01.json');

mLevels.push('level01');

game.load.json('level02', 'Assets/Level02.json');

mLevels.push('level02');

game.load.json('level03', 'Assets/Level03.json');

mLevels.push('level03');

game.load.json('level04', 'Assets/Level04.json');

mLevels.push('level04');

game.load.json('level05', 'Assets/Level05.json');

mLevels.push('level05');

game.load.json('level06', 'Assets/Level06.json');

mLevels.push('level06');

}





/*

 * Load a random level and remove it from mLevels

 * If you reach finish block, call this function and it will load the next level

 * Before calling this function check that mLevels.length > 0

 */

function LoadLevel() {

timeLeftText = game.add.text(20, 10, 'Time Left: ', { font: "24px Century Gothic", fill: "#ffffff", align: "left" });

timeText = game.add.text(140, 10, '', { font: "24px Century Gothic", fill: "#00ff00", align: "left" });

game.physics.startSystem(Phaser.Physics.ARCADE);

//Random number between 0 to mLevels.length - 1 (both inclusive)

var levelIndex = Math.floor(Math.random() * mLevels.length);


//Swap the levelIndex level with the last level and then pop it out.

var temp = mLevels[mLevels.length - 1];

mLevels[mLevels.length - 1] = mLevels[levelIndex];

mLevels[levelIndex] = temp;

    

//Load level from popped out level

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

            block.body.bounce.set(1);

            block.body.immovable = true;

    }

    else if(rowString[j] == 'B')

    {

    block = mBlocks.create(j*WIDTH, i*HEIGHT,'BlockB');

            block.body.bounce.set(1);

            block.body.immovable = true;

    }

    else if(rowString[j] == 'C')

    {

    block = mBlocks.create(j*WIDTH, i*HEIGHT,'BlockC');

            block.body.bounce.set(1);

            block.body.immovable = true;

    }

    else if(rowString[j] == 'D')

    {

    block = mBlocks.create(j*WIDTH, i*HEIGHT,'BlockD');

            block.body.bounce.set(1);

            block.body.immovable = true;

    }

    else if(rowString[j] == 'E')

    {

    block = mBlocks.create(j*WIDTH, i*HEIGHT,'BlockE');

            block.body.bounce.set(1);

            block.body.immovable = true;

    }

    else if(rowString[j] == 'F')

    {

    block = mBlocks.create(j*WIDTH, i*HEIGHT,'BlockF');

            block.body.bounce.set(1);

            block.body.immovable = true;

    }

    else if(rowString[j] == 'P')

    {

    mBall = game.add.sprite(j*WIDTH, i*HEIGHT , 'Ball');

    mBall.enablebody = true;

    game.physics.enable(mBall, Phaser.Physics.ARCADE);

        mBall.checkWorldBounds = true;

        mBall.body.collideWorldBounds = true;

        mBall.body.bounce.set(1);

    }

    else if(rowString[j] == 'Q')

    {

    mFinishBlock = mFinishBlocks.create(j*WIDTH, i*HEIGHT, 'Finish');

    mFinishBlock.body.immovable = true;

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

game.time.events.add(Phaser.Timer.SECOND * TOTAL_TIME, endGame, this);

game.world.bringToTop(timeLeftText);

game.world.bringToTop(timeText);


//Ball physics


//mBall.anchor.set(0.5); Don't need anchor - collision would be easier without them

    

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

game.physics.arcade.collide(mBall, mBlocks, ballCollide, null, this);

game.physics.arcade.collide(mBall, mFinishBlocks, finishBlock, null, this);

mBall.body.velocity.x *= 0.999;

mBall.body.velocity.y *= 0.999;


}



function render(){



}

function ballCollide(_ball, _block){


}

function finishBlock(_ball, _block){

game.world.removeAll();

score += 1;

LoadLevel();

console.log("Finished");

}

function collisionHandler(obj1, obj2) {



}

function getCard(direction, magnitude){ //0 = right, 1 = up, 2 = left, 3 = down
	if(direction == 0){
		mBall.body.velocity.x += magnitude*100;
	}
	else if(direction == 1){
		mBall.body.velocity.y -= magnitude*100;
	}
	else if(direction == 2){
		mBall.body.velocity.x -= magnitude*100;
	}
	else if(direction == 3){
		mBall.body.velocity.y += magnitude*100;
	}
}

function endGame(){

game.world.removeAll();

}