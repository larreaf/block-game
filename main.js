import './style.css'
import movement from './block-game/game-logic/movement'
import { BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT, PLAYER_START_X, PLAYER_START_Y } from './block-game/constants/gameConstants'
import { bindKeys } from './block-game/key_binder'
import { game } from './block-game/game'
import { drawBackground, drawPlayerpiece, drawSolidpieces } from './block-game/drawing/drawFunctions'

const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

canvasContext.scale(BLOCK_SIZE, BLOCK_SIZE)


let dropCounter = 0
let lastTime = 0

function autoDrop(time = 0) {
  const deltaTime = time - lastTime

  lastTime = time
  dropCounter += deltaTime


  if (dropCounter > 1000) {
    movement.moveDown(game)
    dropCounter = 0
  }
}

// game loop
function update(time = 0) {
  autoDrop(time)
  draw(canvasContext)
  window.requestAnimationFrame(update)
}

function draw(canvasContext) {
  drawBackground(canvasContext, game.board)
  drawSolidpieces(canvasContext, game.board)
  drawPlayerpiece(canvasContext, game.playerPiece)
  document.querySelector("#score").innerText = game.score
}

bindKeys()

update()



