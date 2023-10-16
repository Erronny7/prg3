let Creature = require('./creature')

module.exports = class Flower extends Creature {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0
        //     this.x = x;
        //     this.y = y;
    }

            getNewCordinates(){
                this.directions = [
                    [this.x - 1, this.y - 1],
                    [this.x, this.y - 1],
                    [this.x + 1, this.y - 1],
                    [this.x - 1, this.y],
                    [this.x + 1, this.y],
                    [this.x - 1, this.y + 1],
                    [this.x, this.y + 1],
                    [this.x + 1, this.y + 1]
                ];
            }
     
        chooseCell(character) {
            this.getNewCordinates();
            return super.chooseCell(character)
            // var found = [];
            // for (var i in this.directions) {
            //     var x = this.directions[i][0];
            //     var y = this.directions[i][1];
            //     if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            //         if (matrix[y][x] == character) {
            //             found.push(this.directions[i]);
            //         }
            //     }
            // }

            // return found;
         }

        mull() {
            this.multiply++;
            var emptyCells = this.chooseCell(0);
            var newCell = random(emptyCells);

            if (newCell && this.multiply >= 8) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 4;

                var newFlower = new Flower(newX, newY, 1);
                flowerArr.push(newFlower);
                this.multiply = 0;
            }
        }
    }


