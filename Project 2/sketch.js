let canvas_height = 800;
let canvas_width = 1450;
let coordX;
let coordY;

let party;

let colorR;
let colorG;
let colorB;
let transparency = 30;

let circle1 = 40;
let circle2 = 85;
let circle3 = 150;

let friendColorR = 0;
let friendColorG = 255;
let friendColorB = 255

let colorRme = 0;
let colorGme = 255;
let colorBme = 0;

let currentPerson;
let d;

let screen = 0;

let moveAmount = 50;  
let moveSpeed = 0.01;

// let mySound;
// function preload() {
//   soundFormats('mp3');
//   mySound = loadSound('rush-hour.mp3');
// }


//BODY
let bodyPoints;
let points = [];
let mainBody = ["head", "torso", "arms", "legs", "bloodstream"];
let headTop = ["head_top", "fingertips", "toes"];
let bloodstream = ["bloodstream"];
let heart = ["heart"];
let gut = ["gut"];

let regionColors = {
  head: "#ffffff",
  torso: "#ffffff",
  arms: "#ffffff",
  legs: "#ffffff",
  head_top: "#ee6504a2",
  bloodstream: "#2600ff",
  heart: "#ff0073",
  gut: "#e0ff17aa",

};

let relationshipProfiles = {
  "Friend": {
    emotion: "Excitement",
    response: "heart racing, ready for fun",
    regions: ["heart", "hands", "feet", "arms"]
  },
  "Close Friend": {
    emotion: "Comfort",
    response: "grounded, safe",
    regions: ["chest"]
  },
  "Acquaintance": {
    emotion: "Self-conscious",
    response: "social performance, choking up",
    regions: ["head_top", "throat"]
  },
  "Stranger": {
    emotion: "Discomfort",
    response: "chills, alertness, on-edge",
    regions: ["shoulders"]
  },
  "Crush": {
    emotion: "Thrill",
    response: "racing heart, blood rushing",
    regions: ["heart", "bloodstream"]
  },
  "Opp": {
    emotion: "Fight-or-Flight",
    response: "buzzing head, numbness, agitated",
    regions: ["eyes", "head_top", "fingertips", "feet"]
  },
  "Ex": {
    emotion: "Nauseous",
    response: "sick-to-the-stomach, throat closing",
    regions: ["gut", "throat"]
  }
};


function preload() {
  party = loadTable('Party.csv', 'csv', 'header')
  bodyPoints = loadTable("body_points.csv", "csv", "header");

}

function mousePressed() {
  print("(" + mouseX + ", " + mouseY + ")");
}

function setup() {
  createCanvas(canvas_width, canvas_height);
  frameRate(18);

  for (let r = 0; r < bodyPoints.getRowCount(); r++) {
    let row = bodyPoints.getRow(r);

    points.push({
      id: row.getNum("Point_ID"),
      region: row.getString("Region"),
      x: row.getNum("X") + 900,
      y: row.getNum("Y") + 75
    });
  }
}

function draw() {
  background(25);
  textFont('Courier New', 15);


  coordX = str(mouseX);
  coordY = str(mouseY);
  

    fill(250)
  circle(mouseX, mouseY, 10);
  stroke(250, 10);
  for (let r = circle3 + 30; r >= circle2 + 10; r -= 12) {
    fill(250, 2);
    circle(mouseX, mouseY, r);
  }  for (let r = circle2 + 10; r >= circle1 + 10; r -= 8) {
    fill(250, 2);
    circle(mouseX, mouseY, r);
  }  for (let r = circle1 + 10; r >= 12; r -= 5) {
    fill(250, 2);
    circle(mouseX, mouseY, r);
  }

  
  for (let i = 0; i < party.getRowCount(); i++) {
    
  let anchorX = party.getNum(i, "X");
  let anchorY = party.getNum(i, "Y");

  let posX = anchorX + sin(frameCount * moveSpeed + i * 1.7) * moveAmount;
  let posY = anchorY + cos(frameCount * moveSpeed + i * 2.1) * moveAmount;
    // let posX = anchorX;
    // let posY = anchorY;
    
  if (party.get(i, "Relation to me") == "Friend"){
    colorR = 200;
    colorG = 200;
    colorB = 0;
  } else if(party.get(i, "Relation to me") == "Opp") {
    colorR = 0;
    colorG = 0;
    colorB = 300;
  } else if(party.get(i, "Relation to me") == "Crush") {
    colorR = 200;
    colorG = 0;
    colorB = 200;
  } else if(party.get(i, "Relation to me") == "Stranger") {
    colorR = 200;
    colorG = 100;
    colorB = 0;
  } else if(party.get(i, "Relation to me") == "Close Friend") {
    colorR = 0;
    colorG = 200;
    colorB = 200;
  } else if(party.get(i, "Relation to me") == "Acquaintance") {
    colorR = 20;
    colorG = 200;
    colorB = 100;
  } else if(party.get(i, "Relation to me") == "Ex") {
    colorR = 200;
    colorG = 0;
    colorB = 0;
  }



  noStroke();

  // outer band: broad atmospheric spread
  for (let r = circle3 + 30; r >= circle2 + 10; r -= 12) {
    fill(colorR, colorG, colorB, 6);
    circle(posX, posY, r);
  }

  // middle band: more concentrated
  for (let r = circle2 + 10; r >= circle1 + 10; r -= 8) {
    fill(colorR, colorG, colorB, 10);
    circle(posX, posY, r);
  }

  // inner band: densest pressure
  for (let r = circle1 + 10; r >= 12; r -= 5) {
    fill(colorR, colorG, colorB, 16);
    circle(posX, posY, r);
  }

  // proxemic boundaries so categories still stay legible
  noFill();
  stroke(colorR, colorG, colorB, 40);
  strokeWeight(0.8);
  circle(posX, posY, circle1);
  circle(posX, posY, circle2);
  circle(posX, posY, circle3);
    
  }
  
  strokeWeight(1)
  
  for (let i = 0; i < party.getRowCount(); i++) {
    
    let anchorX = party.getNum(i, "X");
    let anchorY = party.getNum(i, "Y");

    let posX = anchorX + sin(frameCount * moveSpeed + i * 1.7) * moveAmount;
    let posY = anchorY + cos(frameCount * moveSpeed + i * 2.1) * moveAmount;
    // let posX = anchorX;
    // let posY = anchorY;
    
    fill(250)
    circle(posX, posY, 10);
  }
  
  
let activeRelation = "";
let activeEmotion = "";
let activeResponse = "";
let activeRegions = [];
let activePersonX = null;
let activePersonY = null;
let closestDist = circle3 / 2;
  
d = 0;

for (let i = 0; i < party.getRowCount(); i++) {
  let anchorX = party.getNum(i, "X");
  let anchorY = party.getNum(i, "Y");

  let posX = anchorX + sin(frameCount * moveSpeed + i * 1.7) * moveAmount;
  let posY = anchorY + cos(frameCount * moveSpeed + i * 2.1) * moveAmount;

  d = dist(posX, posY, mouseX, mouseY);

  if (d < closestDist) {
    let relation = party.get(i, "Relation to me");
    let profile = relationshipProfiles[relation];

    if (profile) {
      closestDist = d;
      activeRelation = relation;
      activeEmotion = profile.emotion;
      activeResponse = profile.response;
      activeRegions = profile.regions;
      activePersonX = posX;
      activePersonY = posY;
    }
  }
}

if (activeRelation !== "") {
  fill(255);
  noStroke();
  text("relation: " + activeRelation, canvas_width - 750, 270);
  text("emotion: " + activeEmotion, canvas_width - 750, 290);
  text("response: " + activeResponse, canvas_width - 750, 310);

  stroke(255);
  strokeWeight(0.5);
  line(activePersonX, activePersonY, mouseX, mouseY);
}

    
  
    
  
  noFill();
  noStroke();

  let cycleLength = 90;
  let t = frameCount % cycleLength;
  let beat1 = 0;
  let beat2 = 0;
  if (t >= 0 && t < 10) {
    beat1 = sin(map(t, 0, 10, 0, PI));
  }  if (t >= 14 && t < 22) {
    beat2 = sin(map(t, 14, 22, 0, PI)) * 0.7;
  }
  let heartPulse = beat1 + beat2;



  for (let p of points) {
  // base body
  if (mainBody.includes(p.region)) {
    fill(255);
    noStroke();
    circle(p.x, p.y, 1.1);
  }
  
  if (bloodstream.includes(p.region)) {
    let pulseSize = 2 + sin(frameCount * 0.15 + p.x * 0.01) * 1.0;
    fill(38, 0, 255, 120);
    circle(p.x, p.y, pulseSize);
  }

  // active triggered regions only
  if (activeRegions.includes(p.region)) {

    // heart pulse
    if (p.region === "heart") {
      let size = 2 + heartPulse * 2;
      fill(255, 0, 115, 180);
      circle(p.x, p.y, size);
      
    }

    // buzzing / alert head
    else if (activeRelation === "Opp" && (p.region === "head_top" || p.region === "eyes" || p.region === "fintertips" || p.region === "feet")) {
      let jitterX = random(-2, 2);
      let jitterY = random(-2, 2);

      fill(255, 90, 90, 180);
      circle(p.x + jitterX, p.y + jitterY, 2);
    }

    // bloodstream / flush / butterflies
    else if (p.region === "bloodstream") {
      let pulseSize = 2 + sin(frameCount * 0.15 + p.x * 0.01) * 1.8;
      fill(38, 0, 255, 120);
      circle(p.x, p.y, pulseSize);
    }

    // butterflies / fluttery gut
    else if (p.region === "gut") {
      let flutterX = sin(frameCount * 0.22 + p.y * 0.08) * 3;
      let flutterY = cos(frameCount * 0.28 + p.x * 0.06) * 2;

      fill(127, 0, 166, 120);
      circle(p.x + flutterX, p.y + flutterY, 2.5, 2);
      circle(p.x + flutterX, p.y + flutterY, 2.5, 2);


    }

    else if (activeRelation === "Close Friend" && p.region === "chest") {
    let breathe = 1 + sin(frameCount * 0.05 + p.y * 0.01) * 0.4;
    let driftX = sin(frameCount * 0.03 + p.y * 0.02) * 0.8;
    let driftY = cos(frameCount * 0.03 + p.x * 0.02) * 0.8;

    noStroke();

    fill(255, 0, 115, 22);
    circle(p.x + driftX, p.y + driftY, 6 * breathe);

    fill(180, 255, 230, 40);
    circle(p.x + driftX, p.y + driftY, 3.2 * breathe);

    fill(255, 0, 115, 90);
    circle(p.x + driftX, p.y + driftY, 1.5 * breathe);
    }

    else if (activeRelation === "Friend" && (p.region === "arms" || p.region === "feet")) {
    let breathe = 1 + sin(frameCount * 0.05 + p.y * 0.01) * 0.4;
    let driftX = sin(frameCount * 0.03 + p.y * 0.02) * 0.8;
    let driftY = cos(frameCount * 0.03 + p.x * 0.02) * 0.8;

    noStroke();

    fill(255, 159, 5, 22);
    circle(p.x + driftX, p.y + driftY, 6 * breathe);

    fill(180, 255, 230, 40);
    circle(p.x + driftX, p.y + driftY, 3.2 * breathe);

    fill(255, 159, 5, 60);
    circle(p.x + driftX, p.y + driftY, 1.5 * breathe);
    }

    else if (activeRelation === "Acquaintance" && (p.region === "chest" || p.region === "head_top" || p.region === "throat")) {
    let breathe = 1 + sin(frameCount * 0.05 + p.y * 0.01) * 0.4;
    let driftX = sin(frameCount * 0.03 + p.y * 0.02) * 0.8;
    let driftY = cos(frameCount * 0.03 + p.x * 0.02) * 0.8;

    noStroke();

    fill(120, 255, 210, 22);
    circle(p.x + driftX, p.y + driftY, 6 * breathe);

    fill(180, 255, 230, 40);
    circle(p.x + driftX, p.y + driftY, 3.2 * breathe);

    fill(220, 255, 245, 90);
    circle(p.x + driftX, p.y + driftY, 1.5 * breathe);
    }

    else if (p.region === "shoulders") {
      let wave = (frameCount * 2 + p.y * 0.9) % 120;
      if (wave < 18) {
        fill(147, 247, 40, 140);
        circle(p.x, p.y - wave * 0.15, 2.5);
      }
    }

    else if (activeRelation === "Ex" && p.region === "throat") {
      let flutterX = sin(frameCount * 0.22 + p.y * 0.08) * 3;
      let flutterY = cos(frameCount * 0.28 + p.x * 0.06) * 2;

      fill(127, 0, 166, 120);
      circle(p.x + flutterX, p.y + flutterY, 2.5, 2);
      circle(p.x + flutterX, p.y + flutterY, 2.5, 2);
    }

    else if (p.region === "eyes") {
    }


    // general torso glow
    else if (p.region === "torso") {
      fill(255, 255, 255, 75);
      circle(p.x, p.y, 2);
    }

  }
}




}

