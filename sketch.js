
var bluebubble,redbubble, zombie, box, DeadBush, Skeleton;

var bubbleImg, blastImg, BGImg;

var redBubbleGroup, bulletGroup;

var boxGroup, deadbushGroup, skeletonGroup;

var reset;

var resetButton;

var zombie;

var score = 0;

var life = 3;

var zombieDead = false;

var zombieWin = false;

function preload(){
  //blastImg = loadImage("images/blast.png")
  //blueBubbleImg = loadImage("images/waterBubble.png")
  //redBubbleImg = loadImage("images/redbubble.png")
  zombieRunImg = loadImage(" cowboy.png");
  BGImg = loadImage ("bg2.webp");
  boxImg = loadImage ("Crate.png");
  DeadBushImg = loadImage ("DeadBush.png");
  SkeletonImg = loadImage ("Skeleton.png");
  gameOverImg = loadImage ("gameOver.png");
  zombieWinImg = loadImage ("slide win.png");
  resetButton = loadImage ("resetbutton.png");
  
}

function setup() {
  createCanvas(1000, 500);

  BG = createSprite(500, 250);
  BG.addImage(BGImg);
  BG.velocityX = -4;
  BG.scale = 1.5;

  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();  
  zombie = createSprite(100, 350); 
  zombie.addImage(zombieRunImg);
  zombie.scale = 0.3;

 boxGroup = new Group ();
 deadbushGroup = new Group ();
 skeletonGroup = new Group ();
 
 reset = createSprite(500,350);
 reset.addImage(resetButton)
 reset.scale = 0.2
 reset .visible = false;

}

function draw() {
  background("#BDA297");

  //if (zombieDead===false){
 edges =  createEdgeSprites();
  zombie.bounceOff(edges);

  if (keyDown("LEFT_ARROW")) {
    zombie.x-=5
  }
1
  if (keyDown("UP_ARROW")){
    zombie.y-=5
  }

  if (keyDown("DOWN_ARROW")){
    zombie.y+=5
  }

  if (keyDown("RIGHT_ARROW")) {
    zombie.x+=5
  }
  
  if (BG.x<300){
  BG.x = width/2
  }
  if (zombieDead===false) {
    BG.velocityX = -4;
  }
//}
  
  if (zombie.isTouching(skeletonGroup)) {
  score += 5
  skeletonGroup.destroyEach();
  }
  
  if (zombie.isTouching(boxGroup)&&score>0) {
    score -= 5
    boxGroup.destroyEach();
    }
 
  if (zombie.isTouching(deadbushGroup)&&score>0) {
      score -= 5
      deadbushGroup.destroyEach();
      }

  if (zombie.isTouching(deadbushGroup)&&score===0&&life>0) {
        life -= 1
        deadbushGroup.destroyEach();
        }

  if (zombie.isTouching(boxGroup)&&score===0&&life>0) {
          life -= 1
          boxGroup.destroyEach();
          }

  if (life===0) {
    zombie.addImage(gameOverImg);
    zombie.scale = 1.5;
    zombieDead = true;
    zombie.x = width/2;
    zombie.y = height/2;
    reset.visible = true;
    zombieDead = true;
  }


  if (zombieDead || zombieWin) {
    deadbushGroup.destroyEach();
    skeletonGroup.destroyEach();
    boxGroup.destroyEach(); 
    BG.velocityX = 0
  }

  if (mousePressedOver(reset)) {
    zombie.addImage(zombieRunImg);
    zombie.scale = 0.3;
    life = 3
    zombie.x = 100;
    zombie.y = 350;
    reset.visible = false;
    zombieDead = false;

    
  }

  boxes()

  DeadBushes()

  Skeletons()
  

  drawSprites();


  if (score===100) {
    zombie.addImage(zombieWinImg);
    fill ("brown");
  textSize (35);
    text ("Yes! you Won!",400,height/2);
    zombieWin = true;
  }
 
  
  fill ("red");
  textSize (15);
  text ("Score = 100 you Win!",800,50);

  fill ("red");
  textSize (15);
  text ("Life = 0 you Loose!",50,50);
  text ("Be carefull you  will loose 5 points if you crash into an obstacle",50,20);
  
  fill ("black");
  textSize (20);
  text ("Score:"+score,width/2,50);

  fill ("black");
  textSize (20);
  text ("Life:"+life,width/3,50);
}

function boxes() {

  if (frameCount%100 === 0){
    box = createSprite(1050,Math.round(random(150,450)),20,20)
    box.velocityX = -12;
    box.addImage(boxImg)
    box.scale = 0.5;
    boxGroup.add(box);
    box.lifetime = width/4;

  }
}

  function DeadBushes() {

    if (frameCount%150 === 0){
      DeadBush = createSprite(1050,Math.round(random(150,450)),20,20)
      DeadBush.velocityX = -12;
      DeadBush.addImage(DeadBushImg)
      DeadBush.scale = 0.5;
      deadbushGroup.add(DeadBush);
      DeadBush.lifetime = width/4;
    }
 
}

function Skeletons() {

  if (frameCount%250 === 0){
    Skeleton = createSprite(1050,Math.round(random(150,450)),20,20)
    Skeleton.velocityX = -4;
    Skeleton.addImage(SkeletonImg)
    Skeleton.scale = 0.5;
    skeletonGroup.add(Skeleton);
    Skeleton.lifetime = width/4;
  }

}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"
      });
    }
  
}