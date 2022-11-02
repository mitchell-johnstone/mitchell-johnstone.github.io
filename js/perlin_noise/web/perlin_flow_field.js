/// <reference path="./library/p5.global-mode.d.ts"/>
/// <reference path="./particle.js"/>

let scale = 10;
let inc = 0.1;
let rows, cols;
let zoff = 0;
let fr;

let particles = [];

let flowfield = [];

function setup() {
    createCanvas(400,400);
    rows = height/scale;
    cols = width/scale;

    flowfield = new Array(rows * cols);

    fr = createP();
    for(let i = 0; i < 500; i++)
        particles[i] = new Particle();
    background(255);
}

function draw() {
    // fill(255,10);
    // rect(0,0,width,height);

    let yoff = 0;
    for(let y = 0; y < rows; y++){
        let xoff = 0;
        for(let x = 0; x < cols; x++){
            let index = x + y * cols;
            let angle = noise(xoff,yoff,zoff) * TWO_PI * 4;
            let v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowfield[index] = v;
            xoff += inc;
        }
        yoff += inc;
    }
    zoff += 0.01;

    for(let i = 0; i < particles.length; i++){
        particles[i].follow(flowfield);
        particles[i].edges();
        particles[i].show();
        particles[i].update();
    }

    fr.html(frameRate());
}