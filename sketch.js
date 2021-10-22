var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obs1,obs2
var building1,building2,lamp
var score=0
var obsGrp
var gameState="play"
var dieS
var jumpS
var gameOver

function preload(){
bgImg = loadImage("assets/LYzZh0.jpg")
obs1 = loadImage("assets/obsTop1.png")
obs2 = loadImage("assets/obsTop2.png")
building1 = loadImage("assets/obsBottom1.png")
building2 = loadImage("assets/obsBottom3.png")
lamp = loadImage("assets/obsBottom2.png")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
dieS = loadSound("assets/die.mp3")
jumpS = loadSound("assets/jump.mp3")
gameOverImg=loadImage("assets/gameOver.png")
}

function setup(){
createCanvas(displayWidth,displayHeight)


//background image
//bg = createSprite(displayWidth/2,displayHeight/2,displayWidth*2,displayHeight);
//bg.addImage(bgImg);
//bg.scale = 1
//bg.velocityX=-2
obsGrp=new Group()

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;

gameOver=createSprite(displayWidth/2,displayHeight/2,500,200)
gameOver.addImage(gameOverImg )


}

function draw() {
  
  background(bgImg);

  if(gameState=="play"){
    if(keyDown("space")){
      balloon.velocityY = -6 ; 
      jumpS.play()
    }
    
    if(balloon.y>displayHeight-70){
      gameState="end"
    }

    balloon.velocityY =balloon.velocityY + 1;
    score=Math.round(score+getFrameRate()/60)
    gameOver.visible=false

    topObsticles()
    bottomObsticles()
    
    if(balloon.isTouching(obsGrp)){
      gameState="end"
      dieS.play()
      
    }
  }
    else if(gameState=="end"){
      obsGrp.destroyEach()
      balloon.destroy()
      gameOver.visible=true
    }


    textSize(30)
    fill("white")
    text("Score: "+score,displayWidth-200,50) 

        
          //making the hot air balloon jump
         

          //adding gravity
           
         /* if(bg.x<0){
          bg.x=bg.width/2
          }*/
        drawSprites();
        
 
}

function topObsticles(){
if(frameCount%80==0){
obsticle=createSprite(displayWidth-10,random(10,displayHeight/2-30),30,50)
obsticle.velocityX=-6
obsticle.shapeColor="black"
var ran=Math.round(random(1,2))
switch(ran){
  case 1:obsticle.addImage(obs1)
  break
  case 2:obsticle.addImage(obs2)
  break
  default:break
}
obsticle.scale=0.2
obsGrp.add(obsticle)
}
}

function bottomObsticles(){
  if(frameCount%100==0){
  obsticle=createSprite(displayWidth-10,displayHeight-170,30,50)
  obsticle.velocityX=-6
  obsticle.shapeColor="black"
  var ran=Math.round(random(1,3))
  switch(ran){
    case 1:obsticle.addImage(building1)
    break
    case 2:obsticle.addImage(building2)
    break
    case 3:obsticle.addImage(lamp)
    break
    default:break
  }
  obsticle.scale=0.19
  obsGrp.add(obsticle)
  }
  }

 