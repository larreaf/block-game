import './style.css'
import movement from './block-game/game-logic/movement'
import { BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT, PLAYER_START_X, PLAYER_START_Y } from './block-game/constants/gameConstants'
import { bindKeys } from './block-game/key_binder'
import { game } from './block-game/game'
import { drawBackground, drawPlayerpiece, drawSolidpieces } from './block-game/drawing/drawFunctions'
import { ranking } from './block-game/api-request/ranking-request'

const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

canvasContext.scale(BLOCK_SIZE, BLOCK_SIZE)

const startDropSpeed = 1000

let dropSpeed = startDropSpeed

const dropSpeedMinLimit = 100
let dropCounter = 0
let lastTime = 0

function increaseSpeed(game){
  if(dropSpeed > dropSpeedMinLimit){
    game.level = game.score / 1000 % 10
    dropSpeed = startDropSpeed - game.level * 100 
    if(dropSpeed < dropSpeedMinLimit) dropSpeed = dropSpeedMinLimit
  }
}

function autoDrop(game, time = 0) {

  increaseSpeed(game)

  const deltaTime = time - lastTime

  lastTime = time
  dropCounter += deltaTime

  if (dropCounter > dropSpeed) {
    movement.moveDown(game)
    dropCounter = 0
  }
}

// game loop
const update = (game) => (time = 0) => {
  autoDrop(game, time)
  draw(canvasContext, game)
  window.requestAnimationFrame(update(game))
}

function draw(canvasContext, game) {
  drawBackground(canvasContext, game.board)
  drawSolidpieces(canvasContext, game.board)
  drawPlayerpiece(canvasContext, game.playerPiece)
  document.querySelector("#score").innerText = game.score
}

function startGame(game){
  bindKeys()  
  update(game)()  
}

let name = document.querySelector("#name").value

// startGame(game)
document.querySelector("#name")
        .addEventListener('input', (e) => {
          name = e.target.value
        })
document.querySelector("#startButton")
        .addEventListener('click', (e) => {
          document.querySelector('#app').className = "visible"
          document.querySelector('#menu').className = "hidden"
          startGame(game)
        })

const requestRanking = async () => {
  const actualRanking = await ranking()
  
  const tablaRanking = document.querySelector("#ranking")
  
  actualRanking.forEach((item, index) => {
    const {name, score} = item;
    const row = tablaRanking.insertRow();
  
    const columnPosition = row.insertCell(1)
    const columnName = row.insertCell(1)
    const columnScore = row.insertCell(2)
    
    columnPosition.innerText = index;
    columnName.innerText = name;
    columnScore.innerText = score;
  })
}

requestRanking();


