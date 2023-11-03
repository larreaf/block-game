import collisionChecker from './collisionChecker'
import bf from './boardFunctions'

const movement = {
    moveLeft: (game) => {
        game.playerPiece.position.x--
        if (collisionChecker.checkHorizontalcollision(game.board, game.playerPiece))
            game.playerPiece.position.x++
    },
    moveRight: (game) => {
        game.playerPiece.position.x++
        if (collisionChecker.checkHorizontalcollision(game.board, game.playerPiece))
            game.playerPiece.position.x--
    },
    moveDown: (game) => {
        game.playerPiece.position.y++        
        if (collisionChecker.checkVerticalcollision(game.board, game.playerPiece)) {
            game.playerPiece.position.y--
            bf.solidify(game)
            bf.removeRows(game)
            game.playerPiece = bf.spawnShape()            
            if(collisionChecker.checkVerticalcollision(game.board, game.playerPiece)) {
                game.board.forEach((row) => row.fill(0))
                game.score = 0
            }
        }
    },
    rotate: (game) => {
        const currentPlayerShape = game.playerPiece.shape

        const height = currentPlayerShape.length;
        const width = currentPlayerShape.reduce((max, row) => Math.max(max, row.length), 0);

        // Create a new array with the transposed dimensions
        const rotatedpiece = new Array(width);
        
        for (let i = 0; i < width; i++) {
            rotatedpiece[i] = new Array(height);
        }

        // Copy values from the original array to the rotated array
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < currentPlayerShape[i].length; j++) {
                rotatedpiece[j][height - 1 - i] = currentPlayerShape[i][j];
            }
        }

        game.playerPiece.shape = rotatedpiece
    }
}

export default movement