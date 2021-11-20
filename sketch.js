var path1;
var path1_img;
var hero;
var hero_img;
var invisible_ground;
var coin;
var coin_img;
var coin_g;
var monster, monster_img1, monster_img2, monster_img3, monster_img4;
var monster_g;
var coin_count = 0;
var score = 0;
var gameState = "play";
var play = 1;
var end = 0;
var sound;
var gameOverImg, gameOver;


function preload(){
  path1_img = loadImage("b5.jpeg");
  hero_img = loadAnimation("robot_1.png","robot_2.png");
  coin_img = loadAnimation("bronze_1.png","bronze_2.png","bronze_3.png","bronze_4.png","bronze_5.png","bronze_6.png");
  monster_img1 = loadImage("monster1.png");
  monster_img2 = loadImage("monster2.png");
  monster_img3 = loadImage("monster3.png");
  monster_img4 = loadImage("monster4.png");
  sound = loadSound("jump.mp3");
  gameOverImg = loadImage("game over.jpeg");
hero_jump = loadImage("robot_1.png");
}

function setup() {
createCanvas(400,260);
path1 = createSprite(10,100);
path1.addImage("path1_img",path1_img);
path1.scale = 0.9;
path1.velocityX= -2;

hero = createSprite(50,225);
hero.addAnimation("robot", hero_img);
hero.scale = 0.7;


invisible_ground = createSprite(50,260,3000,35);
invisible_ground.scale = 0.3;
invisible_ground.visible = false;


coin_g = new Group();
monster_g = new Group();

//hero.setCollider("rectangle",0,0,hero.width,hero.height);
//hero.debug = true
}

function draw() {
    background("black"); 
    
 if(gameState=="play"){   

    if(path1.x<-90){
      path1.x = width/2;
    }

    if(keyDown("space")){
      hero.velocityY = -7;  
      sound.play();
      hero.addImage(hero_jump)

    }
    
    hero.velocityY= hero.velocityY+1;
    hero.collide(invisible_ground);

    if (coin_g.isTouching(hero)) {
      coin_g.destroyEach();
      coin_count=coin_count+ 50;
    }
    spawnCoin();
    spawnMonster();
    drawSprites();
    fill("red");
    stroke("yellow");
    text("Coin Count: "+ coin_count,width-150,50);
    fill("red");
    stroke("yellow");
    score= score+1;
    text("score: "+score, width-150,50, 500);

    if(monster_g.isTouching(hero)){
      gameState ="end";
    }
 }

  if(gameState=="end"){
    stroke("red");
    fill("red");
    text("GAME OVER", 150,130);
    //gameOver.addImage(gameOverImg);
   if(keyDown("shift")){
     gameState = "play";
   }
  }   

}

function spawnCoin(){
  if(World.frameCount % 40 ==0){
    coin = createSprite(Math.round(random(72,720)),125);
    coin.addAnimation("coin", coin_img);
    coin.scale= 0.3;
    coin.velocityX = -4;
    coin.lifetime = 400;
    coin_g.add(coin);
  }

}

function spawnMonster(){
  if(World.frameCount % 120 ==0){
    monster = createSprite(600,230,10,40);
  var rand = Math.round(random(1,4));
  switch(rand){
    case 1:monster.addImage(monster_img1);
         break;
    case 2:monster.addImage(monster_img2);     
         break;
    case 3: monster.addImage(monster_img3);     
         break;
    case 4: monster.addImage(monster_img4);     
        break;
    default: break;
  }
  monster.scale = 0.6;
  monster.velocityX = -4;
  monster.lifetime = 400;
  monster_g.add(monster);
}
}






















