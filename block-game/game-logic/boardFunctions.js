import pieceRandomizer from "./randomizer";
import { PLAYER_START_X, PLAYER_START_Y, BOARD_WIDTH } from "../constants/gameConstants";
import {
  findallIndexes,
  removeItemsAt,
  unshiftNewRows,
} from "./arrayFunctions";
import { postNewGame } from "../api-request/ranking-request";

const boardFunctions = {
  spawnShape: () => ({
    position: {
      x: Math.floor(PLAYER_START_X + (Math.random() * (2 + 2 + 1) - 3)),
      y: PLAYER_START_Y,
    },
    shape: pieceRandomizer(),
  }),
  solidify: (game) => {
    game.playerPiece.shape.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color !== 0) {
          let positionX = x + game.playerPiece.position.x;
          let positionY = y + game.playerPiece.position.y;
          game.board[positionY][positionX] = color;
        }
      });
    });
  },
  removeRows: (game) => {
    let rowsIndexes = findallIndexes(game.board, (row) =>
      row.every((color) => color !== 0)
    );

    removeItemsAt(game.board, rowsIndexes);

    unshiftNewRows(game.board, rowsIndexes.length, BOARD_WIDTH);

    game.score += (150 * rowsIndexes.length * game.level);
  },
  gameOver: (game) => {
    postNewGame(game.name, game.score);
    game.board.forEach((row) => row.fill(0))
    game.score = 0
    game.level = 1
  }
};

export default boardFunctions;
