import {BOARD_HEIGHT, BOARD_WIDTH} from '../constants/gameConstants'
import { iterateMatrix } from './arrayFunctions'

const collisionChecker = {
    checkVerticalcollision: (board, playerPiece) => {
        return playerPiece.shape.some((row, y) =>
          row.some((v, x) => {
            let positionX = x + playerPiece.position.x
            let positionY = y + playerPiece.position.y
            return v !== 0 && (positionY >= BOARD_HEIGHT || board[positionY][positionX] !== 0)
          }))
      },
      /**
       * 
       * @param {Array<Array<Char>>} board 
       * @param {*} playerPiece 
       * @returns first X position of the shape that collides
       */
      checkHorizontalcollision: (board, playerPiece) => {
        let shapeCollisionX = [];
        let positionX = 0
        let positionY = 0
        
        if(playerPiece.position.x < 0) return -1
        
        iterateMatrix(playerPiece.shape, (x, y, value) => {
            positionX = x + playerPiece.position.x
            positionY = y + playerPiece.position.y
            if(value !== 0 && (positionX >= BOARD_WIDTH || board[positionY][positionX] !== 0)){
              shapeCollisionX.push(x)
            }
        })

        return shapeCollisionX.length > 0 ? shapeCollisionX[0] : null;
      }
}

export default collisionChecker