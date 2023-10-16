const express = require('express');
const app = express();
// const http = require('http');
const server = require("http").createServer(app);
const io = require('socket.io')(server);





app.use(express.static("."));

app.get('/', (req, res) => {
    res.redirect('index.html')
})
matrix=[]
 grassArr = []
 grassEaterArr = []
 predatorArr = []
 flowerArr = []
 GrassAndFlowerEaterArr = []

// gr, grEat, predat, Flow, GrAndFlwEat
// generate(15, 50, 15, 10, 15, 3)
let cellNum=15
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
}
io.on("connection", function (socket) {
    socket.emit('draw matrix', matrix)
    initGame()
})
matrix = generate(cellNum, 50, 15, 10, 15, 3)
console.log(matrix);


server.listen(3000, () => {
    console.log('Server is working on port 3000');

})