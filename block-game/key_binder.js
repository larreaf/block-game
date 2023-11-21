import movement from './game-logic/movement'
import { KEY_MOVE_DOWN, KEY_MOVE_LEFT, KEY_MOVE_RIGHT, KEY_ROTATE } from "./constants/gameConstants"
import { clickEventHandler, touchmoveEventHandler, touchstartEventHandler } from './touch_movement'
import { game } from './game'

export const bindKeys = () => {    
    document.addEventListener('keydown', event => {
        if (event.key === KEY_MOVE_LEFT) movement.moveLeft(game)
        if (event.key === KEY_MOVE_RIGHT) movement.moveRight(game)
        if (event.key === KEY_MOVE_DOWN) {
            game.score += game.level
            movement.moveDown(game)
        }
        if (event.key === KEY_ROTATE) movement.rotate(game)
    })

    document.addEventListener('click', clickEventHandler)

    document.addEventListener('touchstart', touchstartEventHandler);

    document.addEventListener('touchmove', touchmoveEventHandler);
}