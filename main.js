import './style.css'
import movement from './block-game/game-logic/movement'
import { BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT, GAME_START_DROP_SPEED, GAME_LIMIT_MIN_DROP_SPEED, GAME_LEVEL_MAX, GAME_INCREASE_SPEED_BY_LEVEL } from './block-game/constants/gameConstants'
import { bindKeys } from './block-game/key_binder'
import { game } from './block-game/game'
import { drawBackground, drawPlayerpiece, drawSolidpieces } from './block-game/drawing/drawFunctions'
import { ranking } from './block-game/api-request/ranking-request'
import bf from './block-game/game-logic/boardFunctions'

const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

canvasContext.scale(BLOCK_SIZE, BLOCK_SIZE)


let dropCounter = 0
let lastTime = 0

function increaseSpeed(game){

  if(game.dropSpeed > GAME_LIMIT_MIN_DROP_SPEED){    
    game.level = Math.floor(game.score / GAME_START_DROP_SPEED % GAME_LEVEL_MAX) + 1

    // if(game.score > GAME_START_DROP_SPEED * GAME_LEVEL_MAX) game.level = GAME_LEVEL_MAX

    game.dropSpeed = GAME_START_DROP_SPEED - game.level * GAME_INCREASE_SPEED_BY_LEVEL

    return;
  }
  
  game.dropSpeed = GAME_LIMIT_MIN_DROP_SPEED

}

function autoDrop(game, time = 0) {

  increaseSpeed(game)

  const deltaTime = time - lastTime

  lastTime = time
  dropCounter += deltaTime

  if (dropCounter > game.dropSpeed) {
    movement.moveDown(game)
    dropCounter = 0
  }
}

// game loop
const update = (game) => (time = 0) => {
  autoDrop(game, time)
  draw(canvasContext, game)
  game.token = window.requestAnimationFrame(update(game))
}

function draw(canvasContext, game) {
  drawBackground(canvasContext, game.board)
  drawSolidpieces(canvasContext, game.board)
  drawPlayerpiece(canvasContext, game.playerPiece)
  document.querySelector("#score").innerText = game.score
  document.querySelector("#level").innerText = game.level
}

function startGame(game){
  game.playerPiece = bf.spawnShape()
  bindKeys(game)
  update(game)()  
}

game.name = document.querySelector("#name").value

// startGame(game)
document.querySelector("#name")
        .addEventListener('input', (e) => {
          game.name = e.target.value
        })
document.querySelector("#startButton")
        .addEventListener('click', (e) => {
          document.querySelector('#app').className = "visible"
          document.querySelector('#menu').className = "hidden"
          startGame(game)
        })

const requestRanking = async () => {
  const actualRanking = await ranking()
  
  const tablaRanking = document.querySelector("tbody")
  
  actualRanking.forEach((item, index) => {
    const {name, score} = item;
    const row = tablaRanking.rows[index];
    console.log(row);
    row.cells[1].innerText = name;
    row.cells[2].innerText = score;
   
    row.classList.remove("loading");
    // const columnPosition = row.insertCell(0)
    // const columnName = row.insertCell(1)
    // const columnScore = row.insertCell(2)
    
    // columnPosition.innerText = index + 1;
    // columnName.innerText = name;
    // columnScore.innerText = score;
  })
}

requestRanking();


