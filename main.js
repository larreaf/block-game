import './style.css'
import colors from './block-game/assets/colors'
import pieceRandomizer from './block-game/game-logic/randomizer'
import movement from './block-game/game-logic/movement'
import bf from './block-game/game-logic/boardFunctions'
import { BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT, PLAYER_START_X, PLAYER_START_Y } from './block-game/constants/gameConstants'


const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

canvasContext.scale(BLOCK_SIZE, BLOCK_SIZE)

function create2DArray(rows, columns) {
  return Array.from({ length: rows }, () => Array(columns).fill(0));
}

const game = {
  board: create2DArray(BOARD_HEIGHT, BOARD_WIDTH),
  playerPiece: bf.spawnShape(),
  score: 0
}

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
  draw()
  window.requestAnimationFrame(update)
}


function draw() {
  drawBackground(canvasContext, game.board)
  drawSolidpieces(canvasContext, game.board)
  drawPlayerpiece(canvasContext, game.playerPiece)
  document.querySelector("#score").innerText = game.score
}

function iterateMatrix(matrix, callback) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => callback(x, y, value))
  })
}

const paintBackground = (canvasContext) => (x, y, color) => {
  if (color === 0) {
    canvasContext.fillStyle = 'black'
    canvasContext.lineWidth = 0.1
    canvasContext.strokeStyle = 'black'
    canvasContext.strokeRect(x, y, 0.8, 0.8)
    canvasContext.fillRect(x, y, 0.8, 0.8)
  }
}

const paintSolidPieces = (canvasContext) => (x, y, color) => {
  if (color !== 0) {
    canvasContext.fillStyle = colors[color]
    canvasContext.lineWidth = 0.1
    canvasContext.strokeStyle = 'white'
    canvasContext.strokeRect(x, y, 0.8, 0.8)
    canvasContext.fillRect(x, y, 0.8, 0.8)
  }
}

const paintPlayerPiece = (canvasContext, playerPositionX, playerPositionY) => (x, y, color) => {
  if (color !== 0) {
    let positionX = x + playerPositionX
    let positionY = y + playerPositionY
    canvasContext.fillStyle = colors[color]
    canvasContext.lineWidth = 0.1
    canvasContext.strokeStyle = 'grey'
    canvasContext.strokeRect(positionX, positionY, 0.8, 0.8)
    canvasContext.fillRect(positionX, positionY, 0.8, 0.8)
  }
}

function drawBackground(canvasContext, board) {
  iterateMatrix(board, paintBackground(canvasContext))
}

function drawSolidpieces(canvasContext, board) {
  iterateMatrix(board, paintSolidPieces(canvasContext))
}

function drawPlayerpiece(canvasContext, playerPiece) {
  const paintCallback = paintPlayerPiece(canvasContext, playerPiece.position.x, playerPiece.position.y)

  iterateMatrix(playerPiece.shape, paintCallback)  
}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') movement.moveLeft(game)
  if (event.key === 'ArrowRight') movement.moveRight(game)
  if (event.key === 'ArrowDown') {
    game.score++
    movement.moveDown(game)
  }
  if (event.key === 'ArrowUp') movement.rotate(game)
})

let touchStartX, touchStartY;

canvas.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', (e) => {
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // You can adjust these threshold values for smoother movement
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0)
          movement.moveRight(game) // Swipe right
        else
          movement.moveLeft(game) // Swipe left        
    } else {
        if (deltaY > 0) {
            // Swipe down
            game.score++
            movement.moveDown(game)
        }
    }

    touchStartX = touchEndX;
    touchStartY = touchEndY;
});

update()



