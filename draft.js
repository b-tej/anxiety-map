let table;
let points = [];
let mainBody = ["head", "torso", "arms", "legs", "bloodstream"];
let headTop = ["head_top", "fingertips", "toes"];
let heart = ["heart"];

let heartCenter = { x: 260, y: 330 };


let regionColors = {
  head: "#000000",
  torso: "#000000",
  arms: "#000000",
  legs: "#000000",
  head_top: "#ee6504a2",
  bloodstream: "#eeac04",
  heart: "#ff0073"
};

function preload() {
  bodyPoints = loadTable("body_points.csv", "csv", "header");
}

function setup() {
  createCanvas(800, 800);

  for (let r = 0; r < bodyPoints.getRowCount(); r++) {
    let row = bodyPoints.getRow(r);

    points.push({
      id: row.getNum("Point_ID"),
      region: row.getString("Region"),
      x: row.getNum("X"),
      y: row.getNum("Y")
    });
  }
}

function draw() {
  background(245);

  noStroke();


  let cycleLength = 90;
  let t = frameCount % cycleLength;

  let beat1 = 0;
  let beat2 = 0;

  // first beat
  if (t >= 0 && t < 10) {
    beat1 = sin(map(t, 0, 10, 0, PI));
  }

  // second beat
  if (t >= 14 && t < 22) {
    beat2 = sin(map(t, 14, 22, 0, PI)) * 0.7;
  }

  let heartPulse = beat1 + beat2;



  for (let p of points) {

    
    if (mainBody.includes(p.region)) {
      fill(regionColors[p.region] || 80);
      circle(p.x, p.y, 3);
    }
    if (headTop.includes(p.region)) {
      let jitterX = random(-2, 2);
      let jitterY = random(-2, 2);

      fill(255, 90, 90, 180);
      circle(p.x + jitterX, p.y + jitterY, 6);
    }
    if (heart.includes(p.region)) {
      let size = 3 + heartPulse * 5;
      let alpha = heartPulse * 75;

      fill(regionColors[p.region]);
      square(p.x, p.y, size);
    }
  }

  
}





































// let bodySVG;

// let points = [];
// let currentColor;
// let region;

// function preload() {
//   bodySVG = loadImage('body.png');
// }


// function setup() {
//   createCanvas(800, 600);
//   currentColor = color(255, 0, 0);
//   region = 'head';
// }

// function draw() {
//   background(240);

//   image(bodySVG, 0, 0);

//   noStroke();

//   for (let p of points) {
//     fill(p.c);
//     circle(p.x, p.y, 6);
//   }
// }

// function mousePressed() {
//   points.push({
//     x: mouseX,
//     y: mouseY,
//     c: currentColor,
//     r: region
//   });
//   print(`Region: ${region}, (${mouseX}, ${mouseY})`);
// }

// function keyPressed() {
//   if (key === '1') {
//     currentColor = color(180, 0, 0);   // red
//     region = 'head';
//   }
//   if (key === '2') {
//     currentColor = color(0, 0, 255);   // blue
//     region = 'head_top';
//   }
//   if (key === '3') {
//     currentColor = color(0, 200, 100); // green
//     region = 'throat';
//   }
//   if (key === '4') {
//     currentColor = color(255, 165, 0); // orange
//     region = 'arms';  
//   }
//   if (key === '5') {
//     currentColor = color(128, 0, 128); // purple
//     region = 'shoulders';
//   }
//   if (key === '6') {
//     currentColor = color(255, 192, 203); // pink
//     region = 'hands';
//   }
//   if (key === '7') {
//     currentColor = color(100, 192, 203); // cyan
//     region = 'fingertips';
//   }
//   if (key === '8') {
//     currentColor = color(39, 125, 40); // dark green
//     region = 'torso';
//   }
//   if (key === '9') {
//     currentColor = color(121, 125, 171); // greyblue
//     region = 'chest';
//   }
//   if (key === '0') {
//     currentColor = color(240, 34, 226); // magenta
//     region = 'heart';
//   }
//   if (key === 'q') {
//     currentColor = color(245, 236, 64); // yellow
//     region = 'gut';
//   }
//   if (key === 'w') {
//     currentColor = color(28, 235, 149); // sea foam
//     region = 'legs';
//   }
//   if (key === 'e') {
//     currentColor = color(235, 97, 28); // red orange
//     region = 'feet';
//   }
//   if (key === 'r') {
//     currentColor = color(117, 139, 235); // periwinkle
//     region = 'toes';
//   }
//   if (key === 't') {
//     currentColor = color(176, 117, 235); // lavender
//     region = 'eyes';
//   }
//   if (key === 'y') {
//     currentColor = color(247, 188, 158); // tan
//     region = 'lips';
//   }
// }