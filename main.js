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

(function () {

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
  addCritter(FlyTrap, 30);
  display();
  setGameLoop(30);
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
  this.getFront = function() { return this.getNESW(0); };
  this.getRight = function() { return this.getNESW(1); };
  this.getBack = function() { return this.getNESW(2); };
  this.getLeft = function() { return this.getNESW(3); };
  this.getNESW = function(direction) {
    return compareCritters(critter, surroundings[(critter.direction + direction) % 4]);
  }
  this.getDirection = function() {
    return critter.direction;
  };
  this.getFrontDirection = function() { return this.getNESWDirection(0); };
  this.getRightDirection = function() { return this.getNESWDirection(1); };
  this.getBackDirection = function() { return this.getNESWDirection(2); };
  this.getLeftDirection = function() { return this.getNESWDirection(3); };
  this.getNESWDirection = function(direction) {
    if (surroundings[(critter.direction + direction) % 4] == Neighbor.SAME ||
        surroundings[(critter.direction + direction) % 4] == Neighbor.OTHER)
      return CritterInfo(surroundings[(critter.direction + direction) % 4]).getDirection();
    return -1;
  }
};

function updateCritter(critter) {
  var info = new CritterInfo(critter);
  var move = critter.getMove(info);
  var dx = critter.x;
  var dy = critter.y;
  if (critter.direction == Direction.NORTH) dy--;
  if (critter.direction == Direction.SOUTH) dy++;
  if (critter.direction == Direction.EAST) dx++;
  if (critter.direction == Direction.WEST) dx--;
  if (move == Action.HOP) {
    if (info.getFront() == Neighbor.EMPTY &&
        dx >= 0 && dx < width && dy >= 0 && dy < height) {
      grid[critter.x][critter.y] = null;
      grid[dx][dy] = critter;
      critter.x = dx;
      critter.y = dy;
    }
  } else if (move == Action.RIGHT) {
    critter.direction = (critter.direction + 1) % 4;
  } else if (move == Action.LEFT) {
    critter.direction = (critter.direction + 3) % 4;
  } else if (move == Action.INFECT) {
    if (info.getFront() == Neighbor.OTHER) {
      var old = grid[dx][dy];
      var idx = critters.indexOf(old);
      grid[dx][dy] = new critter.constructor();
      grid[dx][dy].direction = old.direction;
      grid[dx][dy].x = old.x;
      grid[dx][dy].y = old.y;
      critters[idx] = grid[dx][dy];
    }
  }
}

function critterAt(x, y) {
  if (x >= 0 && x < width && y >= 0 && y < height) {
    if (grid[x][y]) return grid[x][y];
    else return Neighbor.EMPTY;
  }
  return Neighbor.WALL;
}

function compareCritters(critter, critter2) {
  if (critter2 == Neighbor.EMPTY || critter2 == Neighbor.WALL)
    return critter2;
  else if (critter.constructor.name == critter2.constructor.name)
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

})();