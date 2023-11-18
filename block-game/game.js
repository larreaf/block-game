import { BOARD_HEIGHT, BOARD_WIDTH } from "./constants/gameConstants";
import { create2DArray } from "./game-logic/arrayFunctions";
import bf from './game-logic/boardFunctions'

export const game = {
    board: create2DArray(BOARD_HEIGHT, BOARD_WIDTH),
    playerPiece: bf.spawnShape(),
    score: 0
}