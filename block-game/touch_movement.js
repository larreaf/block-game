import movement from "./game-logic/movement"
import { game } from "./game"

const horizontalTouchThreshold = 2
const verticalTouchThreshold = 4

let touchStartX, touchStartY

export const clickEventHandler = (e) => {
    e.preventDefault();
    movement.rotate(game)
  }

export const touchstartEventHandler = (e) => {
    e.preventDefault();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

export const touchmoveEventHandler = (e) => {
    e.preventDefault();
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
  
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
  
    // You can adjust these threshold values for smoother movement
    if (Math.abs(deltaX) > horizontalTouchThreshold) {
      if (deltaX > 0)
        movement.moveRight(game) // Swipe right
      else
        movement.moveLeft(game) // Swipe left        
    }
    if (
      Math.abs(deltaY) > verticalTouchThreshold &&
      deltaY > 0) {
      game.score++
      movement.moveDown(game) // Swipe down
    }
  
    touchStartX = touchEndX;
    touchStartY = touchEndY;
  }
