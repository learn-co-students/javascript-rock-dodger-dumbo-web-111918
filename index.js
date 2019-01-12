/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')
let animationRequest;

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {

  if (positionToInteger(rock.style.top) > 360) {
    const dodgerLeft = positionToInteger(DODGER.style.left);
    const dodgerRight = dodgerLeft + 40;

    const rockLeft = positionToInteger(rock.style.left);
    const rockRight = rockLeft + 20;

    let centeredHit = rockLeft >= dodgerLeft && rockRight <= dodgerRight;
    let leftHit = rockRight > dodgerLeft && rockLeft < dodgerLeft;
    let rightHit = rockLeft < dodgerRight && rockRight > dodgerRight;

    return (centeredHit || leftHit || rightHit);
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  var top = 0;

  rock.style.top = top;

  GAME.append(rock);

  function moveRock() {

    rock.style.top = `${top += 2}px`;
    if (checkCollision(rock)) {
      endGame();
    } else if (top < 400) {
     window.requestAnimationFrame(moveRock);
    } else {
     rock.remove();
    }
  }
  window.requestAnimationFrame(moveRock);
  ROCKS.push(rock)
  return rock
}

function endGame() {
  window.cancelAnimationFrame(animationRequest);
  clearInterval(gameInterval);
  window.removeEventListener('keydown', moveDodger);
  alert("YOU LOSE!");
  ROCKS.forEach(rock => rock.remove());
}

function moveDodger(e) {
  if (e.keyCode == LEFT_ARROW) {
    moveDodgerLeft();
  } else if (e.keyCode == RIGHT_ARROW) {
    moveDodgerRight();
  }
}
function stopDodger(e) {
  window.cancelAnimationFrame(animationRequest);
}

function moveDodgerLeft() {
  let dodgerLeft = positionToInteger(DODGER.style.left);
  if (dodgerLeft >= 4) {
    DODGER.style.left = `${dodgerLeft - 4}px`;
  }
  window.cancelAnimationFrame(animationRequest);
  animationRequest = window.requestAnimationFrame(moveDodgerLeft);
}

function moveDodgerRight() {
  let dodgerLeft = positionToInteger(DODGER.style.left);
  if (dodgerLeft <= 356) {
    DODGER.style.left = `${dodgerLeft + 4}px`;
  }
  window.cancelAnimationFrame(animationRequest);
  animationRequest = window.requestAnimationFrame(moveDodgerRight);
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger);
  window.addEventListener('keyup', stopDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() * (GAME_WIDTH - 20)))
  }, 1000)
}
