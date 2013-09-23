var readline = require('readline');

READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Hanoi() {
  // this.pile1 = [1,2,3,4,5];
//   this.pile2 = [];
//   this.pile3 = [];

this.piles = [ [3, 2, 1], [], [] ];
}

Hanoi.prototype.run = function() {
  this.getInputAndMove();
};

Hanoi.prototype.has_won = function() {
  good_pile_length = 3;
  if (this.piles[1].length === good_pile_length || this.piles[2].length === good_pile_length) {
    return true;
  } else {
    return false;
  }
};

Hanoi.prototype.render = function() {
  console.log(this.piles);
};

Hanoi.prototype.getInputAndMove = function() {
  that = this;
  this.render();
  if (this.has_won()) {
     console.log("You Win!");
     READER.close()
  } else {
    READER.question("Where would you like to move? '0 1' (from, to)", function(stringInput) {
      var re = /(\d).*(\d)/;
      reArray = re.exec(stringInput);
      if (re.test(stringInput) === false) {
        that.getInputAndMove();
      } else {
        move_array = [parseInt(reArray[1]), parseInt(reArray[2])];
        that.move(move_array);
      }
    });
  }
};

Hanoi.prototype.move = function(array) {
  console.log(array);
  from = this.piles[array[0]]
  to = this.piles[array[1]]

  if (from.length === 0) {
    this.getInputAndMove();
  } else if (to.length === 0) {
    to.push(from.pop());
    this.getInputAndMove();
  } else if (to[to.length-1] < from[from.length-1]) {
    this.getInputAndMove();
  } else {
    to.push(from.pop());
    this.getInputAndMove()
  }
};

game = new Hanoi();
game.run();