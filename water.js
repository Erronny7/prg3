let Creature = require('./creature')
const io =  require("./server.js")

module.exports = class Water extends Creature {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0
    }
    getNewCoordinates() {
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
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    mul() {
        this.multiply++;
        var newCell = this.selectRandomCell(0);

        if (newCell && this.multiply >= 8) {
            statisticsObj.water++
            io.emit("change statistics", statisticsObj)
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newwater = new Water(newX, newY, 1);
            waterArr.push(newwater);
            this.multiply = 0;
        }
    }

}
