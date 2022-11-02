function Particle(){
    this.pos = createVector(random(width),random(height));
    this.vel = createVector(random(1),random(1));
    this.acc = createVector(0,0);
    this.maxSpeed = 3;
    this.prevPos = this.pos.copy();

    this.updatePrev = function(){
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    this.update = function(){
        this.updatePrev();
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.acc.mult(0);
    }

    this.follow = function(vectors){
        let x = floor(this.pos.x / scale);
        let y = floor(this.pos.y / scale);
        let index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force);
    }

    this.applyForce = function(force){
        this.acc.add(force);
    }

    this.show = function(){
        // stroke(0);
        stroke(0, 5);
        strokeWeight(1);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    }

    this.edges = function(){
        let tempX = this.pos.x;
        let tempY = this.pos.y;
        if(this.pos.x > width) this.pos.x = 0;
        if(this.pos.x < 0) this.pos.x = width;
        if(this.pos.y > height) this.pos.y = 0;
        if(this.pos.y < 0) this.pos.y = height;
        if(this.pos.x != tempX || this.pos.y != tempY){
            this.updatePrev();
        }
    }
}