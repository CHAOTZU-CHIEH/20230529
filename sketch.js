let points = [[14, 5], [13, 3], [12, 0],[13,-2],[10,-1],[4,-2],[3,-4],[1,-3],[-4,-3],[-6,-2],[-6,-7],[-8,-5],[-9,-2],[-13,-1],[-11,0],[-14,1],[-12,2],[-9,3],[-4,3],[-2,7],[0,3],[3,2],[9,1],[14,5]];
var stroke_colors = "176FA6-236E8C-539CDB-507CF2-4D4EE8-8FCBD9".split("-").map(a=>"#"+a)
var fill_colors = "082126-50D4AC-133840-6693F2-674DE8".split("-").map(a=>"#"+a)

function preload(){  //最早執行的程式碼
  bullet_sound = loadSound("sound/Launching wire.wav")
  bullet_sound = loadSound("sound/woo.wav")
  // bg_sound = loadSound("sound/574197.wav")

}

var ball  
var balls =[]  //陣列
var bullet  //飛彈物件
var bullets=[]
var monster   //怪物物件
var monsters=[]
var score = 0
var shipP   //設定砲台的位置
function setup() {  //設定大象物件倉庫內的資料
  createCanvas(windowWidth, windowHeight);
  shipP = createVector(width/2,height/2)  //預設砲台的位置為視窗的中間
  //產生幾個物件
  for(var j=0;j<20;j=j+1)
  {
    ball = new Obj({})  
    balls.push(ball) 
  }
   for(var j=0;j<20;j=j+1)
   {
     monster = new Monster({})  
     monsters.push(monster) 
   }

}

function draw() {  //每秒會執行60次次
  background(220);
  
  if(keyIsPressed){ 
    if(key=="ArrowLeft" || key=="a"){  //往左鍵
      shipP.x = shipP.x-5
    }
    if(key=="ArrowRight" || key=="d"){  //往右鍵
      shipP.x = shipP.x+5
    }
    if(key=="ArrowUp" || key=="w"){  //往上鍵
      shipP.y = shipP.y-5
    }
    if(key=="ArrowDown" || key=="s"){  //往下鍵
      shipP.y = shipP.y+5
    }    
  }
  for(let ball of balls){ 
    ball.draw()
    ball.update()
   
    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y))  
      {
        score = score - 1     //分數扣一
        balls.splice(balls.indexOf(ball),1)        
        bullets.splice(bullets.indexOf(bullet),1)  
      }
    }
   

  }


  for(let bullet of bullets){
    bullet.draw()
    bullet.update()
  }

  for(let monster of monsters){ 
    if(monster.IsDead && monster.timenum>=6){
      monsters.splice(monsters.indexOf(monster),1) 
    }
    monster.draw()
    monster.update()
    
    for(let bullet of bullets){
      if(monster.isBallInRanger(bullet.p.x,bullet.p.y)) 
      {
        score = score + 1     //分數加一
       
        monster.IsDead = true //爆炸後的畫面
        bullets.splice(bullets.indexOf(bullet),1)   //讓飛彈從飛彈倉庫內移除
      }
    }

  }

  textSize(50)
  text(score,50,50)
  
  push()
    let dx = mouseX-width/2 //x軸距離
    let dy = mouseY-height/2 //y軸距離
    let angle = atan2(dy,dx)   
    translate(shipP.x,shipP.y) 
    rotate(angle)    
    noStroke()
    fill("#ffc03a")
    ellipse(0,0,60)  //劃出中間的圓
    fill("#ff0000")
    triangle(50,0,-25,-25,-25,25)  //劃出三角形
  pop()
 
}

function mousePressed(){
 
  bullet  = new Bullet({})
  bullets.push(bullet)  //放入飛彈倉庫
  bullet_sound.play()
 }

 function keyPressed(){
   if(key==" "){
   
    bullet  = new Bullet({})
    bullets.push(bullet)  //放入飛彈倉庫
    bullet_sound.play()
}  

}
