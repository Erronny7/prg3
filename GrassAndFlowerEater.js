let Creature = require('./creature')

module.exports = class GrassAndFlowerEater extends Creature {
    constructor(x, y) {
        super(x, y);
        this.energy = 8
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
        var newCell = this.selectRandomCell(0);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newGrassAndFlowerEater = new GrassAndFlowerEater(newX, newY);
            GrassAndFlowerEaterArr.push(newGrassAndFlowerEater);
            this.energy = 8
        }
    }

    move() {
        this.energy--
        var newCell = this.selectRandomCell(0);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }

    eat() {
        var newCell = this.selectRandomCell(0);
        if (newCell) {
            this.energy++
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in flowerArr) {
                if (newX == flowerArr[i].x && newY == flowerArr[i].y) {
                    flowerArr.splice(i, 1);
                    break;



                }

            }
            if (this.energy >= 12) {
                this.mul()
            }

        }
        else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in GrassAndFlowerEaterArr) {
            if (this.x == GrassAndFlowerEaterArr[i].x && this.y == GrassAndFlowerEaterArr[i].y) {
                GrassAndFlowerEaterArr.splice(i, 1);
                break;
            }
        }
    }
}