import logo from './data/gg.png';
import essg from './data/ESSG.png';
import ss from './data/ss.png';
export default function sketch(p) {

  var cols;
  var rows;
  var scale = 10;
  var imgScale = 10;

  let points = [];
  let flowfield;
  let zoff = 0;
  let num = 100;
  let img2;
  let img;
  let spaceship;

  let up = false;
  let right = false;
  let left = false;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    console.log(p);
    for(let i = 0; i < num; i++) {
      points.push(new Point(p.random(p.width), p.random(p.height), 4, p));
    }
    imgScale = p.windowWidth / 300;
    img2 = p.loadImage(essg);
    img = p.loadImage(logo);
    cols = Math.floor(p.width / scale);
    rows = Math.floor(p.height / scale);
    flowfield = new Array(cols * rows);
    spaceship = new Spaceship(p.loadImage(ss), p.windowWidth / 2, 3.5 * p.windowHeight / 4, 10, p);
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    imgScale = p.windowWidth / 200;
  }

  p.draw = () => {
    p.background(255);
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
    var xoff = 0;
      for (var x = 0; x < cols; x++) {
        let index = x + y * cols;
        let angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
        let v = p.createVector(Math.cos(angle), Math.sin(angle));
        v.setMag(0.01);
        flowfield[index] = v;
        xoff += 0.1;
      }
      yoff += 0.1;
      zoff += 0.0003;
    }

    for(let i = 0; i < num; i++) {
      points[i].follow(flowfield, cols, scale);
      points[i].draw(p);
      points[i].edges(p.width, p.height);
    }

    spaceship.update();
    spaceship.edges(p.width, p.height);
    spaceship.show(p);

    if(up) {
      spaceship.boost();
    }
  
    if(right) {
      spaceship.rotate(0.1);
    }
  
    if(left) {
      spaceship.rotate(-0.1);
    }

    connectToMouse(p, num, points);

    let imageWidth = img.width / imgScale;
    let imageHeight = img.height / imgScale;
    let image2Width = img2.width / imgScale * 2.5;
    let image2Height = img2.height / imgScale * 2.5;
    p.image(img, p.width / 2 - imageWidth / 2, p.height / 2 - imageHeight / 2, imageWidth,  imageHeight);
    p.image(img2, p.width / 2 - image2Width / 2, p.height / 2 - image2Height * 4, image2Width,  image2Height);
  }

  p.keyPressed = () => {
    if(p.keyCode === p.UP_ARROW) {
      up = true;
    }

    if(p.keyCode === p.RIGHT_ARROW) {
      right = true;
    }

    if(p.keyCode === p.LEFT_ARROW) {
      left = true;
    }
  }

  p.keyReleased = () => {
    if(p.keyCode === p.UP_ARROW) {
      up = false;
    }

    if(p.keyCode === p.RIGHT_ARROW) {
      right = false;
    }

    if(p.keyCode === p.LEFT_ARROW) {
      left = false;
    }
  }
}

function connectToMouse(p, num, points) {
  for(let i = 0; i < num; i++) {
    if(p.dist(p.mouseX, p.mouseY, points[i].position.x, points[i].position.y) < 100) {
      p.line(p.mouseX, p.mouseY, points[i].position.x, points[i].position.y);
    }
  }
}

class Point {
  constructor(x, y, r, p) {
    this.position = p.createVector(x, y);
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(0, 0);
    this.r = r;
  }

  follow = function(vectors, cols, scale) {
    var x = Math.floor(this.position.x / scale);
    var y = Math.floor(this.position.y / scale);
    var index = x + y * cols;
    var force = vectors[index];
    this.update(force);
  }

  update(force) {
    this.acceleration.add(force);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  draw(p) {
    p.fill(255, 0, 0);
    p.ellipse(this.position.x, this.position.y, this.r, this.r);
  }

  edges(width, height) {
    let x = this.position.x;
    let y = this.position.y;

    if(x < 0) {
      this.position.x = width;
    }

    if(x > width) {
      this.position.x = 0;
    }

    if(y < 0) {
      this.position.y = height;
    }

    if(y > height) {
      this.position.y = 0;
    }
  }
}

// The Spaceship class

class Spaceship {
  constructor(img, x, y, size, p) {
    this.img = img;
    this.position = p.createVector(x, y);
    this.velocity = p.createVector(0, -0.2);
    this.acceleration = p.createVector(0, 0);
    this.size = size;
    this.angle = 0;
    this.up = p.createVector(0, -0.1);
  }

  boost() {
    this.applyForce(this.up);
  }

  rotate(rad) {
    this.angle += rad;
    this.up.rotate(rad);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  show(p) {
    p.push();
    p.translate(this.position.x, this.position.y);
    p.rotate(this.angle);
    p.image(this.img, -64, -64, 128,  128);
    p.pop();
  }

  edges(width, height) {
    let x = this.position.x;
    let y = this.position.y;

    if(x < 0) {
      this.position.x = width;
    }

    if(x > width) {
      this.position.x = 0;
    }

    if(y < 0) {
      this.position.y = height;
    }

    if(y > height) {
      this.position.y = 0;
    }
  }
}
