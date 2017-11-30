var mainState = {
    preload: function(){
        game.load.image('player','assets/player.png');
        game.load.image('wall','assets/wall.png');
        game.load.image('coin','assets/coin.png');
        game.load.image('enemy','assets/enemy.png');
    },
    
    create: function(){
        //change the game's background color 
        game.state.backgroundColor = '#3598db';
        //start physics system for movements and collisions
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //add hte physics engine to all the game objects
        game.world.enableBody = true;
        
        this.cursor = game.input.keyboard.createCursorKeys();
        
        //creates player in the center of the game 
        this.player = game.add.sprite(70,100, 'player');
        
        this.player.body.gravity.y = 600;
        
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();
        
        
//Game settings/player setup

// Create 3 groups that will contain our objects
this.walls = game.add.group();
this.coins = game.add.group();
this.enemies = game.add.group();

// Design the level. x = wall, o = coin, ! = lava.
var level = [
'xxxxxxxxxxxxxxxxxxxxxxxx',
'!            !         x',
'!                   o  x',
'!            o         x',
'!                      x',
'!        o !           x',
'xxxxxxxxxxxxxxxxxx!!!!!x',
];

// Create the level by going through the array
for (var i = 0; i < level.length; i++) {
    for (var j = 0; j < level[i].length; j++) {

// Create a wall and add it to the 'walls' group
if (level[i][j] == 'x') {
var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
this.walls.add(wall);
wall.body.immovable = true; 
}

// Create a coin and add it to the 'coins' group
else if (level[i][j] == 'o') {
var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
this.coins.add(coin);
}

// Create a enemy and add it to the 'enemies' group
 else if (level[i][j] == '!') {
var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
this.enemies.add(enemy);
      }
   }
}
    },
        
    update: function(){
        game.physics.arcade.collide(this.player,this.walls);
        
        game.physics.arcade.overlap(this.player,this.coins, this.takeCoin, null, this);
        
        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
        
        if(this.cursor.left.isDown){
            this.player.body.velocity.x = -200;
        }else if(this.cursor.right.isDown){
            this.player.body.velocity.x = 200;
        }else{
            this.player.body.velocity.x = 0;
        }
        
        if(this.cursor.up.isDown && this.player.body.touching.down){
            this.player.body.velocity.y = -250;
        }
    },
    
    takeCoin: function(player, coin){
        coin.kill();
    },
    
    restart: function(){
        game.state.start('main');
    }
};

var game = new Phaser.Game(500,200);
game.state.add('main', mainState);
game.state.start('main');