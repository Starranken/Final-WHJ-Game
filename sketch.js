const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var player;
var sensor;
var wall1, wall2;
var monster;

var form;

var score = 0;

var isGrounded = false;

var items = [];
var ground, platforms = [];

var playerPos;
var sensorPos;

var rand;
var rand2;

function setup(){
    createCanvas(displayWidth, displayHeight);
    engine = Engine.create();
    world = engine.world;

    for(i = 0; i < height/2+height/4; i+=200){
        rand = Math.round(random(150, width-150));
        rand2 = Math.round(random(1, 10));
        platforms.push(new Platform(rand, i, 200, 10));
        if(rand2 === 5){
            items.push(new Item(rand, i-30, 25));
        }
    }

    player = new Player(width/2, height/2, 50, 50);
    ground = new Platform(width/2, height+30, width, 100);

    platforms.push(ground);

    wall1 = new Platform(-5, height, 10, height*4);
    wall2 = new Platform(width+5, height, 10, height*4);
    monster = new Monster(width/2, height/2, 50, 50);
    form = new Form();

    playerPos = player.body.position;
    sensor = new Sensor(playerPos.x, playerPos.y+ 30, 20, 20)

    console.log("hello");
    setTimeout(3000);
    console.log("world");
}

function draw(){
    background("white");  
    Engine.update(engine);

    //sensorPos = sensor.body.position;

    player.display();
    ground.display();
    

    for(g = 0; g < platforms.length; g++){
        platforms[g].display(CENTER);
    }

    for(h = 0; h < items.length; h++){
        items[h].display();
    }

    wall1.display(CENTER);
    wall2.display(CENTER);
    monster.display();
    form.display();

    Matter.Body.setVelocity(monster.body, {x:2, y:0});

    bounceOff(monster, wall2);
    for(var i = 0; i < items.length; i++){
        if(isTouching(player, items[i])&&items[i].claimed===false){
            items[i].remove();
            console.log("hello");
        }
    }

    /*for(var i = 0; i < platforms.length; i++){
        if(isTouching(sensor, platforms[i])){
            isGrounded = true;
            setTimeout(setGrounded(), 1000, false);
        }
    }*/

}

function keyPressed(){
    if(keyCode===32/*&&isGrounded === true*/||keyCode===87/*&&isGrounded === true*/){
        Matter.Body.applyForce(player.body, player.body.position, {x:0, y:-0.15});
    }
    if(keyCode===65){
        Matter.Body.applyForce(player.body, player.body.position,{x:-0.07, y:0});
    }
    if(keyCode===68){
        Matter.Body.applyForce(player.body, player.body.position,{x:0.07, y:0});
    }
    if(keyCode=== 83){
        Matter.Body.applyForce(player.body, player.body.position,{x:0, y:0.15});
    }   

}

/*function setGrounded(bool){
    isGrounded = bool;
}*/
