const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var player;
var ground, platforms = [];

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
    ground = new Platform(width/2, height-10, width, 10);


}

function draw(){
    background("white");  
    Engine.update(engine);

    

    player.display(0);
    ground.display(0);

    for(g = 0; g < platforms.length; g++){
        platforms[g].display();
    }
}