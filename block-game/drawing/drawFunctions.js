import colors from "../assets/colors"
import { iterateMatrix } from "../game-logic/arrayFunctions"

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

export function drawBackground(canvasContext, board) {
    iterateMatrix(board, paintBackground(canvasContext))
}

export function drawSolidpieces(canvasContext, board) {
    iterateMatrix(board, paintSolidPieces(canvasContext))
}

export function drawPlayerpiece(canvasContext, playerPiece) {
    const paintCallback = paintPlayerPiece(canvasContext, playerPiece.position.x, playerPiece.position.y)

    iterateMatrix(playerPiece.shape, paintCallback)
}