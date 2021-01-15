var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var c,cig
var o,oig1,oig2,oig3,oig4,oig5,oig6
var s=0
var ogroup,cgroup
var play=1
var end=0
var gameState=play
var gameO,gameOig
var restart,restartig
var jumps
var grs
var lups



function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  cig=loadImage("cloud.png")
oig1=loadImage("obstacle1.png")
  oig2=loadImage("obstacle2.png")
    oig3=loadImage("obstacle3.png")
    oig4=loadImage("obstacle4.png")
    oig5=loadImage("obstacle5.png")
    oig6=loadImage("obstacle6.png")
   restartig=loadImage("restart.png")
  gameOig=loadImage("game-over.jpg")
  groundImage = loadImage("ground2.png")
  jumps=loadSound("Mario_Jumping-Mike_Koenig-989896458.mp3")
  grs=loadSound("mixkit-sad-game-over-trombone-471.wav")
  lups=loadSound("Level-up-sound-effect.mp3")
}





function setup() {
createCanvas(windowWidth,windowHeight);

trex = createSprite(50,height-70,20,50);
trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
trex.scale = 0.5;
  

ground = createSprite(width/2,height-30,width,2);
  invisibleGround=createSprite(width/2,height-10,width,25)
  invisibleGround.visible=false
ground.addImage("ground",groundImage);
//ground.x = ground.width /2;
ground.scale=2
  
  ogroup=new Group()
  cgroup=new Group()
  trex.setCollider("circle",0,0,30)
  trex.debug=false
  gameO=createSprite(width/2,height/2- 50)
  gameO.addImage(gameOig)
  gameO.scale=0.2
  restart=createSprite(width/2,height/2)
  restart.addImage(restartig)
  restart.scale=0.07
  gameO.visible=false
  restart.visible=false
}





function draw() {
background("white");
 var x=Math.round(random(10,20))
//console.log(x)
  textSize(20)                    
fill("black")
  text("Your Score= "+s,60,30)
  
  if (gameState===play){
   clouds()  
 obstacles()  
     s=s+Math.round(getFrameRate()/60) 
    if (ground.x < 0) {
  ground.x = ground.width/2;
}
 if ((touches.length > 0 ||keyDown("space"))&& trex.y>150) {
  trex.velocityY = -13;
   jumps.play()
   touches=[]
   
}
    
ground.velocityX = -(4+3*s/100);
    
trex.velocityY = trex.velocityY + 0.8   

    if(trex.isTouching(ogroup)){
      gameState=end
    grs.play()     
     
  }
    if(s>0&&s%100===0){
     lups.play() 
      
    }
  }
  
  else if(gameState===end){
   ground.velocityX=0 
   ogroup.setLifetimeEach(-1) 
    cgroup.setLifetimeEach(-1)
     ogroup.setVelocityXEach(0)
      cgroup.setVelocityXEach(0)
    trex.velocityY=0
    gameO.visible=true
    restart.visible=true 
    trex.changeAnimation("collided",trex_collided)
  }
trex.collide(invisibleGround);
drawSprites();
  if (mousePressedOver(restart)){
    reset()
    
  }
}





function clouds(){
  if (frameCount%100===0){
   c=createSprite(width+20,height-300,40,10) 
  c.velocityX=-(4+3*s/100) 
    c.addImage(cig)
    c.scale=random(0.1,0.3)
   c.y=Math.round(random(30,80))
    c.depth=trex.depth
    trex.depth=trex.depth+1
    c.lifetime=200
    cgroup.add(c)
  }
}





function obstacles(){
if (frameCount%110===0){
o=createSprite(600,height-60,20,30)        
 o.velocityX=-(4+3*s/100) 
  ogroup.add(o)
  var r=Math.round(random(1,6))
  switch(r){
    case 1:o.addImage(oig1)  
      break;
      case 2:o.addImage(oig2)
      break;
      case 3:o.addImage(oig3)
      break;
      case 4 :o.addImage(oig4)
      break;
      case 5 :o.addImage(oig5)
      break;
      case 6:o.addImage(oig6)
      break;
      default:break     
  }
o.scale=0.1  
o.lifetime=200
}  
}
  
  function reset (){
    gameState=play
    ogroup.destroyEach()
    cgroup.destroyEach()
    s=0
    gameO.visible=false
    restart.visible=false
    trex.changeAnimation("running", trex_running);
  }
