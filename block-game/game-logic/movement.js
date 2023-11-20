import collisionChecker from './collisionChecker'
import bf from './boardFunctions'
import { rotateMatrix } from './arrayFunctions'

const pieceCanBeRotated = (board, rotatedPiece) => {

    var colission = collisionChecker.checkHorizontalcollision(board, rotatedPiece)

    if (colission !== null) {
        rotatedPiece.position.x -= rotatedPiece.shape[0].length - colission

        var checkColissionAgain = collisionChecker.checkHorizontalcollision(board, rotatedPiece)

        return checkColissionAgain === null
    }

    return true
}

const movement = {
    moveLeft: (game) => {
        game.playerPiece.position.x--
        if (collisionChecker.checkHorizontalcollision(game.board, game.playerPiece) !== null)
            game.playerPiece.position.x++
    },
    moveRight: (game) => {
        game.playerPiece.position.x++
        if (collisionChecker.checkHorizontalcollision(game.board, game.playerPiece) !== null)
            game.playerPiece.position.x--
    },
    moveDown: (game) => {
        game.playerPiece.position.y++
        if (collisionChecker.checkVerticalcollision(game.board, game.playerPiece)) {
            game.playerPiece.position.y--
            bf.solidify(game)
            bf.removeRows(game)
            game.playerPiece = bf.spawnShape()
            if (collisionChecker.checkVerticalcollision(game.board, game.playerPiece)) {
                bf.gameOver(game)
            }
        }
    },
    rotate: (game) => {
        const currentPlayerShape = game.playerPiece.shape

        const playerPiecePositionX = game.playerPiece.position.x
        const playerPiecePositionY = game.playerPiece.position.y

        const rotatedShape = rotateMatrix(currentPlayerShape)

        let rotatedPiece = {
            position: { x: playerPiecePositionX, y: playerPiecePositionY },
            shape: rotatedShape
        }

        if (pieceCanBeRotated(game.board, rotatedPiece))
            game.playerPiece = rotatedPiece
    }
}

export default movement