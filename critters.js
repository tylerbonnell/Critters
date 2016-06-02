function Bear() {
  this.toString = function() {
    return 'b';
  };
  this.getMove = function(info) {
    if (info.getFront() == Neighbor.OTHER)
      return Action.INFECT;
    if (info.getFront() == Neighbor.EMPTY)
      return Action.HOP;
    return Action.RIGHT;
  };
};

function FlyTrap() {
  this.toString = function() {
    return 'f';
  };
  this.getMove = function(info) {
    if (info.getFront() == Neighbor.OTHER)
      return Action.INFECT;
    return Action.RIGHT;
  };
};