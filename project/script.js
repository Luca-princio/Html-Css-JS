// Récupération des éléments du DOM
const hoursElement = document.querySelector('.hours');
const minutesElement = document.querySelector('.minutes');
const secondsElement = document.querySelector('.seconds');
const millisecondsElement = document.querySelector('.milliseconds');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// Variables pour le chronomètre
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

// Fonction pour démarrer le chronomètre
function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
        isRunning = true;
        
        // Changer le texte et la couleur du bouton
        startButton.textContent = "Pause";
        startButton.style.backgroundColor = "#f39c12";
    }
}

// Fonction pour mettre en pause le chronomètre
function stopTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        
        // Changer le texte et la couleur du bouton
        startButton.textContent = "Reprendre";
        startButton.style.backgroundColor = "#2ecc71";
    }
}

// Fonction pour réinitialiser le chronomètre
function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    
    // Réinitialiser l'affichage
    hoursElement.textContent = "0";
    minutesElement.textContent = "0";
    secondsElement.textContent = "0";
    millisecondsElement.textContent = "0";
    
    // Remettre le texte et la couleur du bouton
    startButton.textContent = "Start";
    startButton.style.backgroundColor = "#2ecc71";
}

// Fonction pour mettre à jour l'affichage du chronomètre
function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    
    // Calculer les heures, minutes, secondes et millisecondes
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    
    // Mettre à jour l'affichage avec formatage à deux chiffres
    millisecondsElement.textContent = milliseconds.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    hoursElement.textContent = hours.toString().padStart(2, '0');
}

// Ajouter les écouteurs d'événements
startButton.addEventListener('click', function() {
    if (!isRunning) {
        startTimer();
    } else {
        stopTimer();
    }
});

stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Support des touches du clavier
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' || event.key === ' ') {
        event.preventDefault();
        if (!isRunning) {
            startTimer();
        } else {
            stopTimer();
        }
    } else if (event.code === 'Escape' || event.key === 'Escape') {
        resetTimer();
    }
});

// Initialisation
resetTimer();