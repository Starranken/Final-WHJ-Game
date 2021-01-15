function bounceOff(object1, object2){
    if(object1.body.position.x-object2.body.position.x<=object1.w/2+object2.width/2
        &&object2.body.position.x-object1.body.position.x<=object2.width/2+object1.w/2
        &&object1.body.position.y-object2.body.position.y<=object1.h/2+object2.height/2
        &&object2.body.position.y-object1.body.position.y<=object2.height/2+object1.h/2){
        Matter.Body.setVelocity(object1.body,{x:-2, y:0}) 
    }
}