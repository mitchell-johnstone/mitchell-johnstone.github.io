let resolution = 20;

function setup() {
    createCanvas(800,800);
    background(0);
    noLoop();
}

function draw() {
    let cellWidth = width / resolution;
    noStroke();
    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
        fill(noise(x/cellWidth, y/cellWidth)*255);
        rect(x,y,1,1);
        }
    }
}