var width = 50;
var height = 30;
var grid = new Array(width);
var availableSpots = [];
var interval;

window.onload = function() {
  for (var x = 0; x < width; x++) {
    grid[x] = new Array(height);
    for (var y = 0; y < height; y++)
      availableSpots.push({"x": x, "y": y});
  }
  //shuffle availableSpots
  for (var i = 0; i < availableSpots.length; i++) {
    var temp = availableSpots[i];
    var spot = Math.floor(Math.random() * availableSpots.length);
    availableSpots[i] = availableSpots[spot];
    availableSpots[spot] = temp;
  }
  addCritter(Bear, 30);
  display();
  setGameLoop(1000);
}

var Direction = {
  NORTH: 1,
  SOUTH: 2,
  EAST: 3,
  WEST: 4,
};

var Action = {
  HOP: 1,
  LEFT: 2,
  RIGHT: 3,
  INFECT: 4,
};

var Neighbor = {
  WALL: 1,
  EMPTY: 2,
  SAME: 3,
  OTHER: 4,
};

function Bear() {
  this.toString = function() {
    return 'x';
  }
  this.getMove = function(info) {

  }
}

function CritterInfo() {
  this.getFront() = function() {

  }
  this.getBack() = function() {

  }
  this.getLeft() = function() {

  }
  this.getRight() = function() {

  }
  this.getDirection() = function() {

  }
  this.getFrontDirection() = function() {

  }
  this.getBackDirection() = function() {

  }
  this.getLeftDirection() = function() {

  }
  this.getRightDirection() = function() {

  }
}

function setGameLoop(rate) {
  if (interval)
    clearInterval(interval);
  setInterval(function () {  // GAME LOOP
    display();
  }, rate);
}

function addCritter(type, amount) {
  o = new type();
  if (!o.hasOwnProperty('toString') || !o.hasOwnProperty('getMove'))
      return false;
  for (var i = 0; i < amount; i++) {
    if (availableSpots.length > 0) {
      var pos = availableSpots.pop();
      var animal = new type();
      animal.x = pos.x;
      animal.y = pos.y;
      grid[pos.x][pos.y] = animal;
    }
  }
}

function display() {
  var str = toString();
  document.getElementById("game").innerHTML = str;
}

function toString() {
  var str = "";
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      str += grid[x][y] ? grid[x][y].toString() : " ";
    }
    str += "\n"
  }
  return str;
}