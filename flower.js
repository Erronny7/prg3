let Creature = require('./creature')
const io =  require("./server.js")

module.exports = class Flower extends Creature {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0
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
         }

        mull() {
            this.multiply++;
            var newCell = this.selectRandomCell(0);

            if (newCell && this.multiply >= 8) {
                statisticsObj.flower++
                io.emit("change statistics", statisticsObj)
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 4;

                var newFlower = new Flower(newX, newY, 1);
                flowerArr.push(newFlower);
                this.multiply = 0;
            }
        }
    }


