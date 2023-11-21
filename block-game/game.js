import { BOARD_HEIGHT, BOARD_WIDTH, GAME_START_DROP_SPEED } from "./constants/gameConstants";
import { create2DArray } from "./game-logic/arrayFunctions";
import bf from './game-logic/boardFunctions'

export const game = {
    board: create2DArray(BOARD_HEIGHT, BOARD_WIDTH),
    playerPiece: bf.spawnShape(),
    score: 0,
    level: 1,
    name: "",
    dropSpeed: GAME_START_DROP_SPEED,
    cancelToken: 0
}