const express = require('express');
const app = express();
const http = require("http");


const server = http.createServer(app);
const io = require('socket.io')(server);
module.exports = io;

app.use(express.static("."));

app.get('/', (req, res) => {
    res.redirect('index.html')
})
statisticsObj = {
    grass: 0,
    grassEater:0,
    predator:0,
    flower:0,
    grassAndFlow:0,
    water:0,
}

matrix = []
grassArr = []
grassEaterArr = []
predatorArr = []
flowerArr = []
GrassAndFlowerEaterArr = []
waterArr = []

let Grass = require("./grass.js");
let GrassEater = require("./GrassEater.js");
let predator = require("./predator.js");
let GrassAndFlowerEater = require("./GrassAndFlowerEater.js");
let Flower = require("./flower.js");
let Water = require("./water");

let cellNum = 15
function generate(cellNum, grassNum, grEaterNum, predatorNum, flowerNum, grassAndFlowNum, waterNum) {
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
    fillRandomCells(6, waterNum);

    return matrix;
}

function initGame() {
    matrix = generate(cellNum, 50, 15, 10, 15, 3, 6)
    initArrays();
    startInterval();
}
function initArrays() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    flowerArr = [];
    GrassAndFlowerEaterArr = [];
    waterArr = [];


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
            }else if (matrix[y][x] == 6) {
                let wt = new Water(x, y)
                waterArr.push(wt)
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
    }for (var i in waterArr) {
        waterArr[i].mul()
    }for (var i in waterArr) {
        waterArr[i].mul()
    }
    io.emit('draw matrix',matrix)
}
io.on("connection", function (socket) {
    socket.emit('draw matrix', matrix)
    initGame()
    socket.on('pause game',handlePauseGame);
    socket.on('restart game',hendleRestartGame);
    socket.on("change season", handleChangeSeason);
})
function  handleChangeSeason(season){
    if(season == 1){
        speed = 1000;
    }else if(season == 2 || season == 4){
        speed = 700;
    }else{
        speed = 300;
    }
    startInterval()
}

function  handlePauseGame(ifPaused){
    if(ifPaused){
    clearInterval(intId)
    }else{
    startInterval();
    }
} 

function hendleRestartGame(){
    clearInterval(intId);
    initGame();
}

server.listen(3001, () => {
    console.log('Server is working on port 3001');

})