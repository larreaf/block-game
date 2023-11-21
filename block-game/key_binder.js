import movement from './game-logic/movement'
import { KEY_MOVE_DOWN, KEY_MOVE_LEFT, KEY_MOVE_RIGHT, KEY_ROTATE } from "./constants/gameConstants"
import { clickEventHandler, touchmoveEventHandler, touchstartEventHandler } from './touch_movement'
// import { game } from './game'

const keyDownEventHandler = (game) => (event) => {
    if (event.key === KEY_MOVE_LEFT) movement.moveLeft(game)
    if (event.key === KEY_MOVE_RIGHT) movement.moveRight(game)
    if (event.key === KEY_MOVE_DOWN) {
        game.score += game.level
        movement.moveDown(game)
    }
    if (event.key === KEY_ROTATE) movement.rotate(game)
}

let keyDownEventHandlerCallback;
let clickEventHandlerCallback;
let touchstartEventHandlerCallback;
let touchmoveEventHandlerCallback;

export const bindKeys = (game) => {    
    keyDownEventHandlerCallback = keyDownEventHandler(game)
    clickEventHandlerCallback = clickEventHandler(game)
    touchstartEventHandlerCallback = touchstartEventHandler(game)
    touchmoveEventHandlerCallback = touchmoveEventHandler(game)

    document.addEventListener('keydown', keyDownEventHandlerCallback)

    document.addEventListener('click', clickEventHandlerCallback)

    document.addEventListener('touchstart', touchstartEventHandlerCallback);

    document.addEventListener('touchmove', touchmoveEventHandlerCallback);
}

export const unbindKeys = (game) => {
    document.removeEventListener('keydown', keyDownEventHandlerCallback)
    document.removeEventListener('click', clickEventHandlerCallback)
    document.removeEventListener('touchstart', touchstartEventHandlerCallback)
    document.removeEventListener('touchmove', touchmoveEventHandlerCallback)
}