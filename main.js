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


function Bear() {
  this.char = 'x';
}


function setGameLoop(rate) {
  if (interval)
    clearInterval(interval);
  setInterval(function () {  // GAME LOOP
    display();
  }, rate);
}

function addCritter(type, amount) {
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
      str += grid[x][y] ? grid[x][y].char : " ";
    }
    str += "\n"
  }
  return str;
}