/// <reference path="./library/p5.global-mode.d.ts"/>


let l1 = 200;
let l2 = 200;

let g = 1;

let m1 = 8;
let m2 = 8;

let a1pos;
let a1vel = 0;
let a1acc = 0;

let a2pos;
let a2vel = 0;
let a2acc = 0;

let x0, y0, x1, y1, x2, y2, px2, py2;

// let points = [];
let buffer;

let m1slide, m2slide, gslide;

function setup() {
  createCanvas(800,800);
  x0 = width/2;
  y0 = height/3;
  a1pos = HALF_PI;
  a2pos = HALF_PI;

  m1slide = createSlider(1,10,8);
  m2slide = createSlider(1,10,8);
  gslide = createSlider(1,10,1);

  buffer = createGraphics(width, height);
  buffer.background(0);
  buffer.translate(x0, y0);
  buffer.rotate(HALF_PI);
}

function draw() {
  m1 = m1slide.value();
  m2 = m2slide.value();
  g = gslide.value();
  
  background(0);

  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  // a1pos+=1*TWO_PI/180;
  // a2pos+=2*TWO_PI/180;

  updateAcc();
  updateVel();
  updatePos();

  showPendulum();
  showTrail();
}

function updateAcc(){
  let t1 = -g*(2*m1+m2)*sin(a1pos);
  let t2 = -m2*g*sin(a1pos-2*a2pos);
  let t3 = -2*sin(a1pos-a2pos)*m2*(a2vel*a2vel*l2+a1vel*a1vel*l1*cos(a1pos-a2pos));
  let den = l1*(2*m1+m2-m2*cos(2*a1pos-2*a2pos));
  a1acc = (t1+t2+t3)/den;

  let n1 = 2*sin(a1pos-a2pos)*(a1vel*a1vel*l1*(m1+m2)+g*(m1+m2)*cos(a1pos)+a2vel*a2vel*l2*m2*cos(a1pos-a2pos));
  a2acc = n1/den;
}

function updateVel(){
  a1vel += a1acc;
  a2vel += a2acc;
}

function updatePos(){
  a1pos += a1vel;
  a2pos += a2vel;
}

function showPendulum(){
  translate(x0,y0);
  rotate(HALF_PI);
  x1 = l1*cos(a1pos);
  y1 = l1*sin(a1pos);
  px2 = x2;
  py2 = y2;
  x2 = x1+l2*cos(a2pos);
  y2 = y1+l2*sin(a2pos);

  stroke(255);
  strokeWeight(2);
  line(0,0,x1,y1);
  line(x1,y1,x2,y2);
  
  strokeWeight(4);
  point(x1,y1);
  point(x2,y2);
}

function showTrail(){
  buffer.stroke(131,238,255,60);
  buffer.strokeWeight(2);
  if(frameCount > 1){
    buffer.line(px2, py2, x2, y2);
  }
}