let x, y;

function setup() {
    createCanvas(1000,1000);
    background(55);
    x = 0;
}

function draw() {
    background(51);

    stroke(255);
    noFill();
    beginShape();
    for(let xoff = 0; xoff < width; xoff++){
        y = map(noise(x+map(xoff,0,width,0,5)), 0, 1, 0, height);
        vertex(xoff, y);
    }
    endShape();
    x+=0.02

    // stroke(200);
    // fill(200);
    // for(let xoff = 0; xoff < width; xoff++){
    //     y = map(noise(x+map(xoff,0,width,0,5)), 0, 1, 0, height);
    //     point(xoff, y);
    // }
    // x+=0.02
}