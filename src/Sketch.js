import logo from './data/logo.png';
export default function sketch(p) {

  var cols;
  var rows;
  var scale = 10;
  var imgScale = 10;

  let points = [];
  let flowfield;
  let zoff = 0;
  let num = 100;
  let img;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight/2);
    for(let i = 0; i < num; i++) {
      points.push(new Point(p.random(p.width), p.random(p.height), 4, p));
    }
    imgScale = p.windowWidth / 200;
    img = p.loadImage(logo);
    cols = Math.floor(p.width / scale);
    rows = Math.floor(p.height / scale);
    console.log(img);
    flowfield = new Array(cols * rows);
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight/2);
    imgScale = p.windowWidth / 200;
    console.log(imgScale);
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

    connectToMouse(p, num, points);

    let imageWidth = img.width / imgScale;
    let imageHeight = img.height / imgScale;
    p.image(img, p.width / 2 - imageWidth / 2, p.height / 2 - imageHeight / 2, imageWidth,  imageHeight);
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