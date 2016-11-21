function Plane(){};

Plane.prototype.takeoff = function takeoff(callback) {
  setTimeout(function() {
    callback();
    console.log('Took off');
  }, 600);
};
Plane.prototype.closeChassis = function closeChassis(callback) {
  setTimeout(function() {
    callback();
    console.log('Chassis closed');
  }, 1000);
};
Plane.prototype.turnOnAutoPilot = function turnOnAutoPilot(callback) {
  setTimeout(function() {
    callback();
    console.log('Autopilot turned on');
  }, 750);
};
Plane.prototype.flyToDestination = function flyToDestination(callback) {
  setTimeout(function() {
    callback();
    console.log('Flown to destination');
  }, 2000);
};
Plane.prototype.openChassis = function openChassis(callback) {
  setTimeout(function() {
    callback();
    console.log('Chassis open');
  }, 500);
};
Plane.prototype.land = function land(callback) {
  setTimeout(function() {
    callback();
    console.log('Landed');
  }, 3000);
};
//DONT MODIFY ANYTHING ABOVE HERE

// START ADD YOUR CODE HERE

let methods = [
  'takeoff',
  'closeChassis',
  'turnOnAutoPilot',
  'flyToDestination',
  'openChassis',
  'land'
];

let plane = new Plane();
let planeProto = Object.getPrototypeOf(plane);
let chain;

methods.forEach(methodName => {
  plane[methodName] = function () {
    if (chain) {
      chain = chain.then(() => new Promise((resolve, reject) => {
        planeProto[methodName].call(this, resolve);
      }));
    } else {
      chain = new Promise((resolve, reject) => {
        planeProto[methodName].call(this, resolve);
      });
    }
    return this;
  };
});

// END ADD YOUR CODE HERE

//DONT MODIFY ANYTHING BELOW HERE
console.log("Expected Output:")
console.log("Took off");
console.log("Chassis closed");
console.log("Autopilot turned on");
console.log("Flown to destination");
console.log("Chassis open");
console.log("Landed");

console.log("\n\nActual Output:")
plane.takeoff().closeChassis().turnOnAutoPilot().flyToDestination().openChassis().land();
