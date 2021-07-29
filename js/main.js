const yourShip = document.querySelector(".player-shooter");
const playArea = document.querySelector("#main-play-area");

const instructionsText = document.querySelector(".game-instructions");
const startButton = document.querySelector(".start-button");

// movimento e tiro
function flyShip(event) {
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
    position -= 25;
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
    position += 25;
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
  newLaser.style.top = postionY - 80 + "px";
  return newLaser;
}

function moverLaser(laser) {
  let laserInterval = setInterval(() => {
    /* pegar valor de left de laser */
    let positionX = parseInt(laser.style.left);
    let aliens = document.querySelectorAll(".alien");
    aliens.forEach((alien) => {
      // verifcando se alien foi atingido
      if (checkLaserCollision(laser, alien)) {
        alien.src = "img/explosion.png";
        alien.classList.remove("alien");
        alien.classList.add("dead-alien");
      }
    });
    if (positionX > 500) {
      laser.remove(); /* remove laser */
      clearInterval(laserInterval);
    } else {
      laser.style.left = `${positionX + 8}px`;
    }
  }, 15);
}

// função para criar um alien

function createAliens() {
  let newAlien = document.createElement("img");
  /* seleciona de forma aleatrio uma imagem */
  newAlien.src = "img/monster-" + (Math.floor(Math.random() * 3) + 1) + ".png";
  newAlien.classList.add("alien");
  newAlien.classList.add("alien-transition");
  newAlien.style.left = 370 + "px";
  newAlien.style.top = Math.floor(Math.random() * 330) + 30 + "px";
  playArea.appendChild(newAlien);
  moveAlien(newAlien);
}

// função par mover o alien
function moveAlien(alien) {
  let moveAlienInterval = setInterval(() => {
    let positionX = parseInt(
      window.getComputedStyle(alien).getPropertyValue("left")
    );

    if (positionX <= 80) {
      if (Array.from(alien.classList).includes("dead-alien")) {
        alien.remove();
        clearInterval(moveAlienInterval);
      } else {
        gameOver();
      }
    } else {
      alien.style.left = positionX - 2 + "px";
    }
  }, 30);
}

//função para verificar colisão
function checkLaserCollision(laser, alien) {
  let laserTop = parseInt(laser.style.top);
  let laserLeft = parseInt(laser.style.left);
  // let laserBotton = laserTop - 20;

  let alienTop = parseInt(alien.style.top);
  let alienLeft = parseInt(alien.style.left);
  let alienBotton = alienTop - 30;

  if (laserLeft != 340 && laserLeft + 40 >= alienLeft) {
    if (laserTop <= alienTop && laserTop >= alienBotton) {
      return true;
    }
    return false;
  }
  return false;
}

// inicio do jogo
function playGame() {
  instructionsText.style.display = "none";
  startButton.style.display = "none";
  window.addEventListener("keydown", flyShip);
  alienInterval = setInterval(() => {
    createAliens();
  }, 2500);
}

//função de Game Over
function gameOver() {
  window.removeEventListener("keydown", flyShip);
  clearInterval(alienInterval);
  let aliens = document.querySelectorAll(".alien");
  aliens.forEach((alien) => alien.remove());
  let lasers = document.querySelectorAll(".laser");
  lasers.forEach((laser) => laser.remove());
  alert("Game Over!");
  setTimeout(() => {
    yourShip.style.top = "250px";
    startButton.style.display = "block";
    instructionsText.style.display = "block";
  }, 500);
}
