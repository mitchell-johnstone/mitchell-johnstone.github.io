let ptag;
let slider;

function setup() {
    createCanvas(400,400);
    // background(0);
    // noLoop();    
    slider = createSlider(0,width,0);
    ptag = createP();
}

function draw() {
    let cellWidth = 200;
    background(51);

    loadPixels();

    let z = slider.value();
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            let gray = noise(x/cellWidth, y/cellWidth, z/cellWidth)*255;
            let index = (x + y*width)*4;

            pixels[index+0] = gray;
            pixels[index+1] = gray;
            pixels[index+2] = gray;
            pixels[index+3] = 255;
        }
    }
    ptag.html(frameRate());

    updatePixels();
}