const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var player;
var ground, platforms = [];
var wall1, wall2;
var monster;

var rand;

function setup(){
    createCanvas(displayWidth, displayHeight);
    engine = Engine.create();
    world = engine.world;

    for(i = 0; i < height/2+height/4; i+=200){
        rand = Math.round(random(150, width-150));
        platforms.push(new Platform(rand, i, 200, 10))
    }

    player = new Player(width/2, height/2, 50, 50);
    ground = new Platform(width/2, height+30, width, 100);

    wall1 = new Platform(-5, height, 10, height*4);
    wall2 = new Platform(width+5, height, 10, height*4);
    monster = new Monster(width/2, height/2, 50, 50);

}

function draw(){
    background("white");  
    Engine.update(engine);

    camera.y = player.x-player.h/2;

    player.display(0);
    ground.display(null);
    

    for(g = 0; g < platforms.length; g++){
        platforms[g].display(CENTER);
    }

    wall1.display(CENTER);
    wall2.display(CENTER);
    monster.display();

    Matter.Body.setVelocity(monster.body, {x:2, y:0});

    bounceOff(monster, wall2);

    
}

function keyPressed(){
    if(keyCode===32||keyCode===87){
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