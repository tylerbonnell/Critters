function Bear() {
  this.toString = function() {
    return 'x';
  };
  this.getMove = function(info) {
    if (info.getFront() == Neighbor.OTHER)
      return Action.INFECT;
    if (info.getFront() == Neighbor.EMPTY)
      return Action.HOP;
    return Action.RIGHT;
  };
};



var width = 80;
var height = 30;
var grid = new Array(width);
var availableSpots = [];
var critters = [];
var interval;

window.onload = function() {
  for (var x = 0; x < width; x++) {
    grid[x] = new Array(height);
    for (var y = 0; y < height; y++)
      availableSpots.push({"x": x, "y": y});
  }
  shuffle(availableSpots);
  addCritter(Bear, 30);
  display();
  setGameLoop(1000);
};

var Direction = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
};

var Action = {
  HOP: 0,
  LEFT: 1,
  RIGHT: 2,
  INFECT: 3,
};

var Neighbor = {
  WALL: 0,
  EMPTY: 1,
  SAME: 2,
  OTHER: 3,
};

function setGameLoop(rate) {
  if (interval)
    clearInterval(interval);

  setInterval(function () {  // GAME LOOP
    shuffle(critters);
    for (var i = 0; i < critters.length; i++) {
      updateCritter(critters[i]);
    }
    display();
  }, rate);
}

function CritterInfo(critter) {
  var surroundings = [critterAt(critter.x, critter.y - 1),
                      critterAt(critter.x + 1, critter.y),
                      critterAt(critter.x, critter.y + 1),
                      critterAt(critter.x - 1, critter.y)];
  this.getFront = function() { return this.getNESW(critter.direction); };
  this.getRight = function() { return this.getNESW(critter.direction + 1); };
  this.getBack = function() { return this.getNESW(critter.direction + 2); };
  this.getLeft = function() { return this.getNESW(critter.direction + 3); };
  this.getNESW = function(direction) {
    return compareCritters(critter, aaround[(critter.direction + direction) % 4]);
  }
  this.getDirection = function() {
    return critter.direction;
  };
  this.getFrontDirection = function() { return this.getNESWDirection(critter.direction); };
  this.getRightDirection = function() { return this.getNESWDirection(critter.direction + 1); };
  this.getBackDirection = function() { return this.getNESWDirection(critter.direction + 2); };
  this.getLeftDirection = function() { return this.getNESWDirection(critter.direction + 3); };
  this.getNESWDirection = function(direction) {
    if (surroundings[critter.direction] == Neighbor.SAME ||
        surroundings[critter.direction] == Neighbor.OTHER)
      return CritterInfo(surroundings[(critter.direction + direction) % 4]).getDirection();
    return -1;
  }
};

function updateCritter(critter) {
  var info = CritterInfo(critter);
  var move = critter.getMove(info);
  if (move == Action.HOP) {

  } else if (move == Action.RIGHT) {
    critter.direction = (critter.direction + 1) % 4;
  } else if (move == Action.LEFT) {
    critter.direction = (critter.direction + 3) % 4;
  } else if (move == Action.INFECT) {
    
  }
}

function critterAt(x, y) {
  if (x >= 0 && x < width && y >= 0 && y < height)
    if (grid[x][y]) return grid[x][y];
    else return Neighbor.EMPTY;
  else return Neighbor.WALL;
}

function compareCritters(critter, critter2) {
  if (critter2 == Neighbor.EMPTY || critter2 == Neighbor.WALL)
    return critter2;
  else if (obj1.getClass().equals(obj2.getClass()))
    return Neighbor.SAME;
  else
    return Neighbor.OTHER;
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
      animal.direction = Math.floor(Math.random() * 4);  // random direction
      grid[pos.x][pos.y] = animal;
      critters.push(animal);
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

function shuffle(arr) {
  for (var i = 0; i < arr.length; i++) {
    var temp = arr[i];
    var spot = Math.floor(Math.random() * arr.length);
    arr[i] = arr[spot];
    arr[spot] = temp;
  }
}