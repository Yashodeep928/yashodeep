let score = 0;
let cross = true;

const audio = new Audio('music.mp3');
const audiogo = new Audio('gameover.mp3');

// Cache DOM elements for frequent access and add null checks
const dino = document.querySelector('.dino');
const gameOver = document.querySelector('.gameOver');
const obstacle = document.querySelector('.obstacle');
const scoreCont = document.querySelector('#scoreCount');

if (!dino || !gameOver || !obstacle || !scoreCont) {
    console.error('One or more game elements are missing from the DOM.');
}

// Function to handle keydown events
function handleKeyDown(e) {
    console.log("Key code is: ", e.keyCode);
    const dinoPosition = window.getComputedStyle(dino, null).getPropertyValue('left');
    let dinoX = parseInt(dinoPosition);

    switch (e.keyCode) {
        case 38: // Up arrow key for jump
            if (!dino.classList.contains('animateDino')) {
                dino.classList.add('animateDino');
                setTimeout(() => {
                    dino.classList.remove('animateDino');
                }, 700);
            }
            break;
        case 39: // Right arrow key to move right
            dino.style.left = dinoX + 112 + "px";
            break;
        case 37: // Left arrow key to move left
            dino.style.left = dinoX - 112 + "px";
            break;
    }
}

// Function to update the score display
function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}

// Main game loop for collision detection and score updates
setInterval(() => {
    if (!dino || !gameOver || !obstacle) {
        console.error('One or more game elements are missing from the DOM.');
        return;
    }

    const dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    const dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    const ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    const oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    const offsetX = Math.abs(dx - ox);
    const offsetY = Math.abs(dy - oy);

    // Check for collision
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Reload to Play Again";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    } 
    // Check if dinosaur has successfully crossed an obstacle
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        // Decrease animation duration to increase difficulty
        setTimeout(() => {
            const aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            const newDur = Math.max(aniDur - 0.1, 0.5); // Ensure the duration doesn't go below 0.5s
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur);
        }, 500);
    }
}, 10);

// Attach keydown event listener
document.addEventListener('keydown', handleKeyDown);

// Start the background music after the first user interaction
document.addEventListener('click', playAudio);
document.addEventListener('keydown', playAudio);

function playAudio() {
    audio.play().catch(error => {
        console.error('Failed to play audio:', error);
    });

    // Remove the event listeners after the first interaction
    document.removeEventListener('click', playAudio);
    document.removeEventListener('keydown', playAudio);
}
