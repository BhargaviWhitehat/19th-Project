var street,mainCar,car2,car3,car4,coin,diamond;
var streetImg,mainCarImg,car2Img,car3Img,car4Img,coinImg,diamondImg;

var car2G , car3G , car4G;
var diamondG,coinG;

var Score = 0;
var blast,blastImg;
var end,endImg;

//Game states
var PLAY=1;
var END=0;
var gameState=1;


function preload(){
streetImg = loadImage("street image.jpg");

mainCarImg = loadImage("mainCar.png");
car2Img = loadImage("C1.png");
car3Img = loadImage("C2.png");
car4Img = loadImage("C3.png");

coinImg = loadImage("coin.png");
diamond = loadImage("diamond.png");

blastImg = loadImage("blast image.png");
endImg = loadImage("gameOver.png");


}

function setup() {
createCanvas(400,600);

//Moving background
street=createSprite(200,200);
street.addImage(streetImg);
street.velocityY = 3;

//creating main car
mainCar = createSprite(10,450,20,20);
mainCar.addImage("mainCar",mainCarImg);
mainCar.scale=0.4;

mainCar.debug = true;

blast = createSprite(200,200);
blast.addImage("blast",blastImg);



coinG=new Group();
diamondG=new Group();
obstacleGroup=new Group();
}

function draw() {
 if(gameState===PLAY){
 mainCar.x= World.mouseX;

 blast.visible=false;
 //coin.visible=true;

 edges= createEdgeSprites();
 mainCar.collide(edges);

 if(street.y > 400){
     street.y = height/2;
 }

 if(coinG.isTouching(mainCar)){
  coinG.visible=false;
  Score=Score+50;
}
 if(obstacleGroup.isTouching(mainCar)){
  gameState=END;
    
 }
 spawnCar();
 //createCoin();
 
}
 else if(gameState===END)
 {
  blast.visible=true;
  mainCar.visible=false;
  obstacleGroup.velocityY=0;
  street.velocityY=0;

   obstacleGroup.setVelocityXEach(0);
   obstacleGroup.setLifetimeEach(-1);

   //write condition for calling reset()
   if(mousePressedOver(restart))
    {
    reset();
   }
   

}

drawSprites();
textSize(20);
  fill(255);
  text("Score: "+ Score,150,30);
}

function spawnCar() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(70,100,10,40);
    //obstacle.debug = true;
    obstacle.velocityY = 3;
    obstacle.scale=0.4;
    //generate random obstacles
    var rand = Math.round(random(1,10));
    switch(rand) {
      case 1: obstacle.addImage(car2Img);
              break;
      case 2: obstacle.addImage(car3Img);
              break;
      case 3: obstacle.addImage(car4Img);
              break;
      
      default: break;
    }
  obstacleGroup.add(obstacle);
  }
}

/*function createCoin(){
  if (World.frameCount % 200 == 0){
     var coin = createSprite(Math.round(random(50,350),10,10,10));
     coin.addImage(coinImg);
     coin.scale=0.3;
     coin.velocityY=2;
     coin.lifetime = 150
     //coinG.add(coin);
     coin.debug = true;
  }
}*/

function spawnCoin() {
  if(frameCount % 60 === 0) {
    var coin = createSprite(50,0,10,40);
    //obstacle.debug = true;
    coin.velocityY = 3;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: coin.addImage(coinImg);
              break;
      case 2: coin.addImage(diamondImg);
              break;
      
      default: break;
    }
    coinG.add(coin);
  }
}
/*function createDiamond() {
  if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350),10, 10, 10));
    diamonds.addImage(diamondImg);
    diamonds.scale=0.3;
    diamond.velocityY=2;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
}
}*/

function reset(){
  gameState=PLAY;
  mainCar.visible=true;
  Score=0;
}