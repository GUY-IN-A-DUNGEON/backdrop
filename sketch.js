let dots = [];
const numDots = 50;
const maxDist = 100;
let lineOpacity = 100;
let dotColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create random dots with initial velocities
  for (let i = 0; i < numDots; i++) {
    let dot = {
      position: createVector(random(width), random(height)),
      velocity: p5.Vector.random2D().mult(random(1, 2)) // Random velocity magnitude between 1 and 2
    };
    dots.push(dot);
  }
  
  dotColor = color(0); // Initial dot color
}

function draw() {
  background(255);
  
  // Adjust line opacity based on mouse proximity
  lineOpacity = map(dist(mouseX, mouseY, width/2, height/2), 0, width/2, 100, 200);
  
  // Update and draw lines between dots based on mouse proximity
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      let d = dist(dots[i].position.x, dots[i].position.y, dots[j].position.x, dots[j].position.y);
      if (d < maxDist) {
        stroke(0, lineOpacity);
        line(dots[i].position.x, dots[i].position.y, dots[j].position.x, dots[j].position.y);
      }
    }
    
    // Update dot position based on velocity
    dots[i].position.add(dots[i].velocity);
    
    // Bounce off walls (simple edge detection)
    if (dots[i].position.x < 0 || dots[i].position.x > width) {
      dots[i].velocity.x *= -1;
    }
    if (dots[i].position.y < 0 || dots[i].position.y > height) {
      dots[i].velocity.y *= -1;
    }
  }
  
  // Adjust dot color based on mouse position
  let targetColor = map(mouseX, 0, width, 0, 255);
  dotColor = lerpColor(dotColor, color(targetColor), 0.05);
  
  // Draw dots
  noStroke();
  fill(dotColor);
  for (let i = 0; i < dots.length; i++) {
    ellipse(dots[i].position.x, dots[i].position.y, 5, 5);
  }
}
