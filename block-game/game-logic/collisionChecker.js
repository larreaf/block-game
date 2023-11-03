import {BOARD_HEIGHT, BOARD_WIDTH} from '../constants/gameConstants'

const collisionChecker = {
    checkVerticalcollision: (board, playerPiece) => {
        return playerPiece.shape.some((row, y) =>
          row.some((v, x) => {
            let positionX = x + playerPiece.position.x
            let positionY = y + playerPiece.position.y
            return v !== 0 && (positionY >= BOARD_HEIGHT || board[positionY][positionX] !== 0)
          }))
      },
      checkHorizontalcollision: (board, playerPiece) => {
        return playerPiece.shape.some((row, y) =>
          row.some((v, x) => {
            let positionX = x + playerPiece.position.x
            let positionY = y + playerPiece.position.y
            return v !== 0 && (positionX >= BOARD_WIDTH || board[positionY][positionX] !== 0)
          }))
      }
}

export default collisionChecker