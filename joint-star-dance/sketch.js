// Declare kinectron
let kinectron = null;

//array of stars
let stars = [];

// a toggle to check distance
let startMoving = false;

// number of stars
let starsNum = 30;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("10.17.201.104");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // create star objects and put them in an array
  for (let i = 0; i <= starsNum; i++) {
    stars[i] = new Star(width / 2, height / 2);
  }

}

function draw() {
  background(0);



  for (let i = 0; i < stars.length; i++) {
    // stars show up
    stars[i].display();
    // if distance is shorter than the setting
    if (startMoving) {
      //reverse direction
      stars[i].moveFaster();
      // check if stars reach to center
      if (stars[i].reverseFinished()) {
        // stay at center
        stars[i].reverseReset()
      }
    } else {
      // if distance is longer than the setting, move outward
      stars[i].move();
      // if stars are trapped at center
      if (stars[i].reverseFinished()) {
        // move outward
        stars[i].reset()
      }
      // if stars reach to the edge of screen, reset from center
      if (stars[i].finished()) {
        stars[i].reset();
      }
    }

  }


}

function bodyTracked(body) {
  background(0, 10);

  // Draw all the joints
  //kinectron.getJoints(drawJoint);

  // Get all the joints off the tracked body and do something with them

  // Mid-line
  let head = scaleJoint(body.joints[kinectron.HEAD]);
  let neck = scaleJoint(body.joints[kinectron.NECK]);
  let spineShoulder = scaleJoint(body.joints[kinectron.SPINESHOULDER]);
  let spineMid = scaleJoint(body.joints[kinectron.SPINEMID]);
  let spineBase = scaleJoint(body.joints[kinectron.SPINEBASE]);

  // Right Arm
  let shoulderRight = scaleJoint(body.joints[kinectron.SHOULDERRIGHT]);
  let elbowRight = scaleJoint(body.joints[kinectron.ELBOWRIGHT]);
  let wristRight = scaleJoint(body.joints[kinectron.WRISTRIGHT]);
  let handRight = scaleJoint(body.joints[kinectron.HANDRIGHT]);
  let handTipRight = scaleJoint(body.joints[kinectron.HANDTIPRIGHT]);
  let thumbRight = scaleJoint(body.joints[kinectron.THUMBRIGHT]);

  // Left Arm
  let shoulderLeft = scaleJoint(body.joints[kinectron.SHOULDERLEFT]);
  let elbowLeft = scaleJoint(body.joints[kinectron.ELBOWLEFT]);
  let wristLeft = scaleJoint(body.joints[kinectron.WRISTLEFT]);
  let handLeft = scaleJoint(body.joints[kinectron.HANDLEFT]);
  let handTipLeft = scaleJoint(body.joints[kinectron.HANDTIPLEFT]);
  let thumbLeft = scaleJoint(body.joints[kinectron.THUMBLEFT]);

  // Right Leg
  let hipRight = scaleJoint(body.joints[kinectron.HIPRIGHT]);
  let kneeRight = scaleJoint(body.joints[kinectron.KNEERIGHT]);
  let ankleRight = scaleJoint(body.joints[kinectron.ANKLERIGHT]);
  let footRight = scaleJoint(body.joints[kinectron.FOOTRIGHT]);

  // Left Leg
  let hipLeft = scaleJoint(body.joints[kinectron.HIPLEFT]);
  let kneeLeft = scaleJoint(body.joints[kinectron.KNEELEFT]);
  let ankleLeft = scaleJoint(body.joints[kinectron.ANKLELEFT]);
  let footLeft = scaleJoint(body.joints[kinectron.FOOTLEFT]);

  // Pick 2 joints to connect
  let start = handRight;
  let end = handLeft;

  // Draw a line
  let d = dist(start.x, start.y, end.x, end.y);

  // checking the distance of joints
  if (d < 200) {
    startMoving = true;
  } else {
    startMoving = false;
  }


}

// Scale the joint position data to fit the screen
// 1. Move it to the center of the screen
// 2. Flip the y-value upside down
// 3. Return it as an object literal
function scaleJoint(joint) {
  return {
    x: (joint.cameraX * width / 2) + width / 2,
    y: (-joint.cameraY * width / 2) + height / 2,
  }
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  let pos = scaleJoint(joint);

  //Kinect location data needs to be normalized to canvas size
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}