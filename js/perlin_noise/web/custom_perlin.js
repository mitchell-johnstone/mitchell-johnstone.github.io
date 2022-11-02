let resolution = 20;

function interpolate(a0, a1, w){
  // linear
  // return (a1-a0) * w + a0;
  // cubic:
  // return (a1 - a0) * (3.0 - w * 2.0) * w * w + a0;
  // Smootherstep for an even smoother result with a second derivative equal to zero on boundaries:
  return (a1 - a0) * ((w * (w * 6.0 - 15.0) + 10.0) * w * w * w) + a0;
}

function setup() {
  createCanvas(800,800);
  background(0);
  noLoop();
}

function draw() {
  let cellWidth = width / resolution;

  stroke(255);
  for(let i = 1; i < resolution; i++){
    line(i*width/resolution, 0, i*width/resolution, height)
    line(0, i*height/resolution, width, i*height/resolution)
  }

  // set grid 
  stroke(255,0,0);
  let grid = [];
  for(let x = 0; x < resolution+1; x++){
    grid[x] = []
    for(let y = 0; y < resolution+1; y++){
      grid[x][y] = createVector(random(-1,1), random(-1,1)).normalize()
      line(x*cellWidth, y*cellWidth, (x+grid[x][y].x)*cellWidth, (y+grid[x][y].y)*cellWidth)
    }
  }

  noStroke();

  for(let x = 0; x < width; x++){
    for(let y = 0; y < height; y++){
      let cellX = (1.0*x)/cellWidth;
      let cellY = (1.0*y)/cellWidth;
      
      let cellX0 = floor(cellX);
      let cellX1 = cellX0+1;
      let cellY0 = floor(cellY);
      let cellY1 = cellY0+1;

      let sx = cellX-cellX0;
      let sy = cellY-cellY0;

      let n0, n1, ix0, ix1;

      n0 = grid[cellX0][cellY0].dot(createVector(cellX-cellX0, cellY-cellY0));
      n1 = grid[cellX1][cellY0].dot(createVector(cellX-cellX1, cellY-cellY0));
      ix0 = interpolate(n0, n1, sx);

      n0 = grid[cellX0][cellY1].dot(createVector(cellX-cellX0, cellY-cellY1));
      n1 = grid[cellX1][cellY1].dot(createVector(cellX-cellX1, cellY-cellY1));
      ix1 = interpolate(n0, n1, sx);

      // console.log(interpolate(ix0, ix1, sy))
      let pixel = (interpolate(ix0, ix1, sy)+1)*255/2;
      fill(pixel);
      rect(x,y,1,1);
    }
  }
}