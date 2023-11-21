import movement from "./game-logic/movement"
// import { game } from "./game"
import { BLOCK_SIZE } from "./constants/gameConstants"

const horizontalTouchThreshold = BLOCK_SIZE
const verticalTouchThreshold = BLOCK_SIZE/2

let touchStartX, touchStartY

export const clickEventHandler = (game) => (e) => {
    e.preventDefault();
    movement.rotate(game)
  }

export const touchstartEventHandler = (game) => (e) => {
    e.preventDefault();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
}

export const touchmoveEventHandler = (game) => (e) => {
    e.preventDefault();
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
  
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    // paintDotDebug(touchEndX, touchEndY)

    // You can adjust these threshold values for smoother movement
    if (Math.abs(deltaX) > horizontalTouchThreshold) {
      if (deltaX > 0)
        movement.moveRight(game) // Swipe right
      else
        movement.moveLeft(game) // Swipe left        
      touchStartX = touchEndX;
      
    }
    if (
      Math.abs(deltaY) > verticalTouchThreshold &&
      deltaY > 0) {
      game.score++
      movement.moveDown(game) // Swipe down
      touchStartY = touchEndY;
    }
  }

function paintDotDebug(touchEndX, touchEndY){
  const dot = document.createElement('div');
  dot.classList.add("dot");
  dot.style.left = `${touchEndX}px`;
  dot.style.top = `${touchEndY}px`;
  dot.id = Date.now();
  document.body.append(dot);
}