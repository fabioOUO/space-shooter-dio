const yourShip = document.querySelector(".player-shooter");
const playArea = document.querySelector("#main-play-area");

// movimento e tiro
function flyAhip(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveUp();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    moveDown();
  } else if (event.key === " ") {
    event.preventDefault();
    fireLaser();
  }
}

// função subir
function moveUp() {
  /* pegar valor no css */
  let topPosition = getComputedStyle(yourShip).getPropertyValue("top");
  if (topPosition === "0px") {
    return;
  } else {
    let position = parseInt(topPosition); /* converte para inteiro */
    position -= 50;
    yourShip.style.top = position + "px";
  }
}

// função Descer
function moveDown() {
  /* pegar valor no css */
  let topPosition = getComputedStyle(yourShip).getPropertyValue("top");
  if (topPosition === "550px") {
    return;
  } else {
    let position = parseInt(topPosition); /* converte para inteiro */
    position += 50;
    yourShip.style.top = position + "px";
  }
}

// função para atirar
function fireLaser() {
  let laser = createLaserElement();
  playArea.appendChild(laser);
  moverLaser(laser);
}

function createLaserElement() {
  let postionX = parseInt(
    window.getComputedStyle(yourShip).getPropertyValue("left")
  );
  let postionY = parseInt(
    window.getComputedStyle(yourShip).getPropertyValue("top")
  );
  let newLaser = document.createElement("img");
  newLaser.src = "./img/shoot.png"; /* altera atributo src */
  newLaser.classList.add("laser"); /* adiciona uma class ao Elemento newLaser */
  newLaser.style.left = postionX + "px";
  newLaser.style.top = postionY - 25 + "px";
  return newLaser;
}

function moverLaser(laser) {
  let laserInterval = setInterval(() => {
    /* pegar valor de left de laser */
    let positionX = parseInt(laser.style.left);
    if (positionX === 500) {
      laser.remove(); /* remove laser */
    } else {
      laser.style.left = positionX + 8 + "px";
    }
  }, 10);
}

window.addEventListener("keydown", flyAhip);
