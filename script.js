let side = 50;
let cellNum = 15;
const socket = io();

const pauseBtn = document.querySelector('#pause');
const resumeBtn = document.querySelector('#resume');
const restartBtn = document.querySelector('#restart');
const seasonsBtn = document.querySelector('#Seasons');

pauseBtn.addEventListener("click",handlePauseGame);
resumeBtn.addEventListener("click",hendleResumeGame);
restartBtn.addEventListener("click",hendleRestartGame);
seasonsBtn.addEventListener("click", handleChangeSeason);
let season = 0;


function handleChangeSeason(){
  if(season < 4){
   season++
  }else{
    season = 1;
  }
  socket.emit("change season", season)
  if(season == 1){
    seasonsBtn.textContent = 'Winter'
  }
  else if(season == 2){
    seasonsBtn.textContent = 'Spring'
  }  else if(season == 3){
    seasonsBtn.textContent = 'Summer'
  }  else if(season == 4){
    seasonsBtn.textContent = 'Autumn'
  }

}


socket.on("change statistics", handleAddStatistics);
const grass = document.querySelector("#grass");
const grassEater = document.querySelector("#grassEater");
const predator = document.querySelector("#predator");
const flower = document.querySelector("#flower");
const grassAndFlow = document.querySelector("#grassAndFlow");
const water = document.querySelector("#water");


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

function handleAddStatistics(obj){
    grass.innerText = "New Grasses: " + obj.grass;
    grassEater.innerText = "New Grass Eaters: " + obj.grassEater;
    predator.innerText = "New Predators: " + obj.predator;
    flower.innerText = "New Flowers: " + obj.flower;
    grassAndFlow.innerText = "New Grass And Flower Eaters: " + obj.grassAndFlow;
    water.innerText = "New Water: " + obj.water;
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
                if(season === 1){
                    fill("#BCD4D8");
                }else if(season === 2){
                    fill("#0C6F38");
                }else if(season === 3){
                    fill("#10934A");
                }else{
                    fill("#313D33");
                }
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                if(season === 1){
                    fill("#24A8B8");
                }else if(season === 2){
                    fill("#245EB8");
                }else if(season === 3){
                    fill("#3824B8");
                }else{
                    fill("#6324B8");
                }
            }
            else if (matrix[y][x] == 3) {
                if(season === 1){
                    fill("#581845");
                }else if(season === 2){
                    fill("#900C3F");
                }else if(season === 3){
                    fill("#C70039");
                }else{
                    fill("#FF5733");
                }
            }
            else if (matrix[y][x] == 4) {
                if(season === 1){
                    fill("#AD24B8 ");
                }else if(season === 2){
                    fill("#E900FC");
                }else if(season === 3){
                    fill("#FC00A4");
                }else{
                    fill("#FC005C");
                }
            }
            else if (matrix[y][x] == 5) {
                if(season === 1){
                    fill("#DEDE85");
                }else if(season === 2){
                    fill("#ECEC20");
                }else if(season === 3){
                    fill("##AFA00");
                }else{
                    fill("#ACAC01");
                }
            }else if (matrix[y][x] == 6) {
                if(season === 1){
                    fill("#BEDDDF");
                }else if(season === 2){
                    fill("#8FDEE5");
                }else if(season === 3){
                    fill("#43DAE6");
                }else{
                    fill("#02E9FC");
                }
            }
            rect(x * side, y * side, side, side);
        }
    }
}

socket.on('draw matrix', drawMatrix)