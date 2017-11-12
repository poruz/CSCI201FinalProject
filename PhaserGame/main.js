var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

var mBall;
var velocityY;
var velocityX;
var timeLeft; //integer value of the time left
//var mBlock1;
var rightButton;
var leftButton;
var upButton;
var downButton;
var scoreText;

var mainState = { 

	preload: function(){
		game.stage.backgroundColor = "#777777";
		game.load.image('mBall', "assets/ball.png");
		game.load.image('mBlock1', "assets/block.png");
	},

	create: function(){
		timeLeftText = game.add.text(32, 32, 'Time Left: ', { font: "24px Arial", fill: "#ffffff", align: "left" });
		timeText = game.add.text(150, 32, '100', { font: "24px Arial", fill: "#00ff00", align: "left" });
		
		//game.physics.startSystem
		mBall = game.add.tileSprite(400, 300, 200, 200, 'mBall');
		game.physics.enable(mBall, Phaser.Physics.ARCADE);
		mBlock1 = game.add.tileSprite(100, 100, 20, 20, 'mBlock1');
		mBlock1.scale.setTo(1, 3);
		game.physics.enable(mBlock1, Phaser.Physics.ARCADE);
		mBall.scale.setTo(0.3, 0.3);
		velocityX = 5;
		velocityY = 5;
		rightButton = this.input.keyboard.addKey(Phaser.KeyCode.D);
		leftButton = this.input.keyboard.addKey(Phaser.KeyCode.A);
		upButton = this.input.keyboard.addKey(Phaser.KeyCode.W);
		downButton = this.input.keyboard.addKey(Phaser.KeyCode.S);
	},

	update: function(){
		
		mBall.x += velocityX;
		mBall.y += velocityY;

		if(downButton.isDown && !upButton.isDown){
			mBall.y += 5;
		}
		else if(upButton.isDown && !downButton.isDown){
			mBall.y -= 5;
		}

		if(rightButton.isDown && !leftButton.isDown){
			mBall.x += 5;
		}
		else if(leftButton.isDown && !rightButton.isDown){
			mBall.x -= 5;
		}
		
	}
}

function collisionHandler(obj1, obj2) {
}

game.state.add('mainState', mainState);
game.state.start('mainState');
