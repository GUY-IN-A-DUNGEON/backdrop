let dots = [];
const numDots = 50;
const maxDist = 100;
let lineOpacity = 100;
let dotColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create random dots
  for (let i = 0; i < numDots; i++) {
    let dot = createVector(random(width), random(height));
    dots.push(dot);
  }
  
  dotColor = color(0); // Initial dot color
}

function draw() {
  background(255);
  
  // Adjust line opacity based on mouse proximity
  lineOpacity = map(dist(mouseX, mouseY, width/2, height/2), 0, width/2, 100, 200);
  
  // Draw lines between dots based on mouse proximity
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      let d = dist(dots[i].x, dots[i].y, dots[j].x, dots[j].y);
      if (d < maxDist) {
        stroke(0, lineOpacity);
        line(dots[i].x, dots[i].y, dots[j].x, dots[j].y);
      }
    }
  }
  
  // Adjust dot color based on mouse position
  let targetColor = map(mouseX, 0, width, 0, 255);
  dotColor = lerpColor(dotColor, color(targetColor), 0.05);
  
  // Draw dots
  noStroke();
  fill(dotColor);
  for (let i = 0; i < dots.length; i++) {
    ellipse(dots[i].x, dots[i].y, 5, 5);
  }
}
