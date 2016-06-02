var width = 50;
var height = 30;
var grid = new Array(width);

var interval;

window.onload = function() {
  for (var x = 0; x < width; x++) {
    grid[x] = new Array(height);
    for (var y = 0; y < height; y++)
      availableSpots[x * width + height] = x * width + height;
  }
  addCritter(Bear, 30);
  display();
  setGameLoop(1000);
}

function setGameLoop(rate) {
  if (interval)
    clearInterval(interval);
  setInterval(function () {  // GAME LOOP
    display();
  }, rate);
}

var availableSpots = [];
function addCritter(type, amount) {
  for (var i = 0; i < amount; i++) {

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
      str += grid[x][y] ? grid[x][y] : " ";
    }
    str += "\n"
  }
  return str;
}