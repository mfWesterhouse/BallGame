var Ball, database;
var position;

function setup(){

  database = firebase.database();

  createCanvas(500,500);

  Ball = createSprite(250,250,10,10);
  Ball.shapeColor = "red";

  var hbp = database.ref('ball/position');
  hbp.on("value", readPosition, showError);
}

function draw(){

  background("white");

  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
    console.log("Left")
  }
  if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
    console.log("Right");
  }
  if(keyDown(UP_ARROW)){
    writePosition(0,-1);
    console.log("Up")
  }
  if(keyDown(DOWN_ARROW)){
    writePosition(0,+1);
    console.log("Down");
  }

  drawSprites();

}

function writePosition(x,y){
  database.ref('ball/position').set ({

    'x': position.x + x,
    'y': position.y + y
  })
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  Ball.x = position.x;
  Ball.y = position.y;
}

function showError(){
  console.log("Error in writing to database");
}