let timex;
let timey;

function setup() {
    createCanvas(1000,1000);
    background(55);
    timex = 0;
    timey = 50;
}

function draw() {
    // background(51);

    timex += 0.02;
    timey += 0.02;
    
    x = map(noise(timex), 0, 1, 0, width);
    y = map(noise(timey), 0, 1, 0, height);

    fill(200);
    ellipse(x,y, 50, 50);
}