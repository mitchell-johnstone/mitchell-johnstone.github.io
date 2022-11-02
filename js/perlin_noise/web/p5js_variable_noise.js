let resolution = 5;
let slider;

function setup() {
    createCanvas(400,400);
    background(0);
    // noLoop();    
    slider = createSlider(0,800,0);

}

function draw() {
    let cellWidth = width / resolution;
    noStroke();
    let z = slider.value();
    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
            fill(noise(x/cellWidth, y/cellWidth, z/cellWidth)*255);
            rect(x,y,1,1);
        }
    }
}