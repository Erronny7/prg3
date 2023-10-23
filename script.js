let side = 50;
let cellNum = 15;
const socket = io();

const pauseBtn = document.querySelector('#pause');
const resumeBtn = document.querySelector('#resume');
const restartBtn = document.querySelector('#restart');

pauseBtn.addEventListener("click",handlePauseGame);
resumeBtn.addEventListener("click",hendleResumeGame);
restartBtn.addEventListener("click",hendleRestartGame);

let ifPaused = false;
function handlePauseGame(ifPaused){
    ifPaused = true ;
    socket.emit('pause game', ifPaused);
}
function hendleResumeGame(ifPaused){
    ifPaused = false;
    socket.emit('pause game', ifPaused);
}
function hendleRestartGame(){
    socket.emit('restart game');
}

function setup() {
    frameRate(5);
    createCanvas(cellNum * side , cellNum * side);
    background('#acacac');

}

function drawMatrix(matrix) {
    for (var y = 0; y < cellNum; y++) {
        for (var x = 0; x < cellNum; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("pink");
            }
            else if (matrix[y][x] == 5) {
                fill("brown");
            }

            rect(x * side, y * side, side, side);
        }
    }
}

socket.on('draw matrix', drawMatrix)