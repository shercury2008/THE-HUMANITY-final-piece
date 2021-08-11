var student,monster
var gameState="b"

function preload(){
  studentImg=loadImage("Sound and Images/Student.png")
  monsterImg=loadImage("Sound and Images/Strong monster.png")
  heartImg=loadImage("Sound and Images/heart.gif")
  victoryBG=loadImage("Sound and Images/victory.png")
  minion=loadImage("Sound and Images/minion.gif")
  explosion=loadSound("Sound and Images/explosion.wav")
  Victory=loadSound("Sound and Images/You win sound.wav")
}

function setup(){
  createCanvas(1200,400)
  edges=[]
  edges=createEdgeSprites()
  student=createSprite(1100,50,20,20)
  student.addImage(studentImg)
  student.scale=0.25
  monster=createSprite(600,200,20,20)
  monster.addImage(monsterImg)
  monster.scale=0.70
  minionGroup=new Group()
  heart=createSprite(30,50,20,20)
  heart.addImage(heartImg)
  heart.scale=0.2
  heart.visible=false
  wall1=createSprite(60,0,10,210)
  wall2=createSprite(0,110,130,10)
  wall1.shapeColor="green"
  wall2.shapeColor="green"
  wall1.visible=false
  wall2.visible=false
}

function draw(){
  background(0,150,0)
  if(gameState==="a"){
    makeInvisible()
    textSize(14)
    fill(250)
    text("You were a student before kid and now you are a hero. You must beat the monster who has trapped you in the abyss of his stomach. Also you can't speak now.",20,20)
    text("PRESS SPACE TO CONTINUE",500,200)
    if(keyCode === 32){
      gameState="c"
    }
  }
  monster.collide(edges)
  student.collide(edges)
  if(gameState==="b"){
    makeVisible()
  }
  if(keyDown("UP_ARROW")){
    student.y=student.y-4
  }
  if(keyDown("LEFT_ARROW")){
    student.x=student.x-4
  }
  if(keyDown("RIGHT_ARROW")){
    student.x=student.x+4
  }    
  if(keyDown("DOWN_ARROW")){
    student.y=student.y+4
  }
  if(frameCount%30===0){
    rand=Math.round(random(0,1200))
    monster.x=rand
    rand1=Math.round(random(0,400))
    monster.y=rand1
  }
  if(monster.isTouching(student)){
    gameState = "a"
    monster.destroy()
  }
  if(gameState === "c"){
    background(0)
    student.visible=true
    monsterBody()
  }
  if(gameState==="d"){
    background(victoryBG)
    heart.destroy()
    wall1.destroy()
    wall2.destroy()
    student.destroy()
    minion1.destroy()
    minion2.destroy()
  }
  drawSprites()
}
function monsterBody(){
  wall1.visible=true
  wall2.visible=true
  heart.visible=true
  if(frameCount%40===0){
    minion1=createSprite(800,20,15,15)
    minion1.shapeColor="red"
    minion1.velocityY=9
    minion1.collide(edges)
    minion1.lifetime=50
    minionGroup.add(minion1)
    minion2=createSprite(600,380,15,15)
    minion2.shapeColor="blue"
    minion2.velocityY=-9
    minion2.collide(edges)
    minion2.lifetime=50
    minionGroup.add(minion2)
  }
  if(minionGroup.isTouching(student)){
    student.x=1100
    student.y=50
  }
  //console.log(student.x)
  if(student.isTouching(wall1)||student.isTouching(wall2)){
    explosion.play()
    gameState="d"
  }
}
function makeInvisible(){
  monster.visible=false
  student.visible=false
}
function makeVisible(){
  monster.visible=true
  student.visible=true
}