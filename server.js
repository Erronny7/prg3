const express = require('express');
const app = express();
const http = require("http");


const server = http.createServer(app);
const io = require('socket.io')(server);


app.use(express.static("."));

app.get('/', (req, res) => {
    res.redirect('index.html')
})
matrix = []
grassArr = []
grassEaterArr = []
predatorArr = []
flowerArr = []
GrassAndFlowerEaterArr = []

let Grass = require("./grass.js");
let GrassEater = require("./GrassEater.js");
let predator = require("./predator.js");
let GrassAndFlowerEater = require("./GrassAndFlowerEater.js");
let Flower = require("./flower.js");

let cellNum = 15
function generate(cellNum, grassNum, grEaterNum, predatorNum, flowerNum, grassAndFlowNum) {
    let matrix = [];
    for (let y = 0; y < cellNum; y++) {
        matrix[y] = [];
        for (let x = 0; x < cellNum; x++) {
            matrix[y][x] = 0;
        }
    }
    function fillRandomCells(value, count) {
        while (count > 0) {
            const col = Math.floor(Math.random() * cellNum);
            const row = Math.floor(Math.random() * cellNum);
            if (matrix[col][row] === 0) {
                matrix[col][row] = value;
                count--;
            }
        }
    }

    fillRandomCells(1, grassNum);
    fillRandomCells(2, grEaterNum);
    fillRandomCells(3, predatorNum);
    fillRandomCells(4, flowerNum);
    fillRandomCells(5, grassAndFlowNum);

    return matrix;
}

function initGame() {
    matrix = generate(cellNum, 50, 15, 10, 15, 3)
    initArrays();
    startInterval();
}
function initArrays() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    flowerArr = [];
    GrassAndFlowerEaterArr = [];


    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let grEat = new GrassEater(x, y)
                grassEaterArr.push(grEat)
            }
            else if (matrix[y][x] == 3) {
                let pr = new predator(x, y)
                predatorArr.push(pr)
            }
            else if (matrix[y][x] == 4) {
                let fl = new Flower(x, y)
                flowerArr.push(fl)
            }

            else if (matrix[y][x] == 5) {
                let grafle = new GrassAndFlowerEater(x, y)
                GrassAndFlowerEaterArr.push(grafle)
            }
        }
    }

}
let speed = 300;
let intId;
function startInterval() {
    clearInterval(intId);
    intId = setInterval(function () {
        playGame()
    }, speed)
}
function playGame() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }

    for (let i in predatorArr) {
        predatorArr[i].eat()
    }

    for (let i in flowerArr) {
        flowerArr[i].mull()
    }

    for (let i in GrassAndFlowerEaterArr) {
        GrassAndFlowerEaterArr[i].eat()
    }
    io.emit('draw matrix',matrix)
}
io.on("connection", function (socket) {
    socket.emit('draw matrix', matrix)
    initGame()
})

server.listen(3000, () => {
    console.log('Server is working on port 3000');

})