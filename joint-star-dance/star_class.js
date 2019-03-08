class Star {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.xdir = random(-5, 5);
    this.ydir = random(-5, 5);
    this.s = random(3, 15);
  }

  // star moves to edge of screen
  move() {
    this.x += this.xdir;
    this.y += this.ydir;
  }

  // reverse direction
  moveFaster() {
    this.x -= this.xdir
    this.y -= this.ydir
  }
  // display ellipses
  display() {
    fill(255, random(70, 250));
    noStroke();
    ellipse(this.x, this.y, this.s);
  }
  // check if ellipse reach the edge, return true or false
  finished() {
    return this.y > height || this.y < 0;
  }
  // check if stars reach to center area
  reverseFinished() {
    return (this.y < height / 2 + 0.5 && this.y > height / 2 - 0.5) || (this.x < width / 2 + 0.5 && this.x > width / 2 - 0.5)
  }
  // 0 speed for stars
  reverseReset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xdir = 0;
    this.ydir = 0;
  }
  // ellipse go from center again
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xdir = random(-5, 5);
    this.ydir = random(-5, 5);
  }
}