/// <reference path="./library/p5.global-mode.d.ts"/>

function setup() {
  createCanvas(400, 400, WEBGL);

  normalMaterial();
}

let scale = 50;

function draw() {
  background(0);  
  // translate(100,0,0);
  // box(60,60,60);
  // translate(-100,0,0);
  // box(60,60,60);
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  sponge(0,0,0,200,3);
}


function sponge(x,y,z,size,depth){
  if(depth == 0){
    push();
    translate(x,y,z);
    box(size,size,size);
    pop();
  } else {
    size /= 3;
    depth--;
    for(let xoff = -1; xoff <= 1; xoff++){
      for(let yoff = -1; yoff <= 1; yoff++){
        for(let zoff = -1; zoff <= 1; zoff++){
          if((xoff != 0 && yoff != 0) || 
          (xoff != 0 && zoff != 0) || 
          (zoff != 0 && yoff != 0)){
            sponge(x+xoff*size,y+yoff*size,z+zoff*size,size,depth);
          }
        }
      }
    }
  }
}