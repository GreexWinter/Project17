var PLAY = 0;
var END = 1;
var gameState = PLAY;

var monkey, monkey_running, monkeyCollided;

var banana, bananaImage, bananaGroup;

var obstacle, obstacleImage, obstacleGroup;

var ground;

var bananaScore = 0;

var survivalTime;

function preload(){
  
  monkey_running = loadAnimation("sprite_1.png", "sprite_2.png", 
                   "sprite_3.png", "sprite_4.png", "sprite_5.png",
                   "sprite_6.png", "sprite_7.png", "sprite_8.png")
  
  monkeyCollided = loadImage("sprite_1.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  gameOverImage = loadImage("gameOver.png");
}

function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(60, 270, 20, 20);
  monkey.addAnimation("Running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 800, 100);
  ground.shapeColor = color(rgb(160,82,45));
  ground.x = ground.width / 2;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
    
  if(gameState === PLAY){
    background(rgb(135,206,250))
    
    fill("black");
    textSize(22);
    text("Bananas: "+bananaScore, 280, 50);
  
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    
    monkey.collide(ground);
    
    if(keyDown("space") && monkey.y >= 269){
      monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      bananaScore = bananaScore + 1;
    }
    
    survival();
    
    bananaFunction();
    
    obstacleFunction();
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  }else if(gameState === END){
    
    fill("black");
    textSize(40)
    text("GAME OVER!", 75, 200);

    monkey.setVelocity(0,0);
    //monkey.addImage("Collided", monkeyCollided);
    monkey.destroy();
    
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
  }
  drawSprites();
}


function bananaFunction(){
  if(World.frameCount%100 === 0){
    var banana = createSprite(450, 150, 20, 20);
    banana.velocityX = -(9 + (survivalTime/3));
    banana.scale = 0.1;
    banana.lifetime = 300;
    
    banana.addImage(bananaImage);
    
    
    bananaGroup.add(banana);
  }
}

function obstacleFunction(){
  if(World.frameCount%250 === 0){
    var obstacle = createSprite(450, 290, 20, 20);
    obstacle.velocityX = -(8 +(survivalTime/20));
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    
    obstacle.addImage(obstacleImage);
    
    obstacleGroup.add(obstacle);
  }
}

function survival(){
  fill("black");
  textSize(22);
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime, 15, 50);
}
