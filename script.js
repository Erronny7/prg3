let side = 50;
let cellNum = 15;
const socket = io()
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