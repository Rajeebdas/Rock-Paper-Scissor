// Rock Paper Scissors Game Logic and Theme Switcher
window.onerror = function(message, source, lineno, colno, error) {
    const log = document.getElementById('error-log');
    if (log) {
        log.textContent = `Error: ${message} at line ${lineno}`;
    }
};
const choices = ['rock', 'paper', 'scissors'];
const choiceBtns = document.querySelectorAll('.choice-btn');
const playerChoiceDiv = document.getElementById('player-choice');
const computerChoiceDiv = document.getElementById('computer-choice');
const resultDiv = document.getElementById('result');
const themeSwitcher = document.getElementById('theme-switcher');
const body = document.body;

// Theme logic
const themes = ['light', 'dark', 'gradient'];
let currentThemeIdx = 0;

function applyTheme(idx) {
    body.classList.remove(...themes);
    body.classList.add(themes[idx]);
}

applyTheme(currentThemeIdx); // Set initial theme

themeSwitcher.addEventListener('click', () => {
    currentThemeIdx = (currentThemeIdx + 1) % themes.length;
    applyTheme(currentThemeIdx);
    themeSwitcher.textContent = `Switch Theme (${themes[(currentThemeIdx + 1) % themes.length]})`;
});

themeSwitcher.textContent = `Switch Theme (${themes[(currentThemeIdx + 1) % themes.length]})`;

// Game logic
function getComputerChoice() {
    const idx = Math.floor(Math.random() * 3);
    return choices[idx];
}

function getResult(player, computer) {
    if (player === computer) return "It's a Tie!";
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'You Win!';
    }
    return 'You Lose!';
}

function getChoiceIcon(choice) {
    if (choice === 'rock') return '<img src="./img/rock.png" alt="Rock" style="width:32px;vertical-align:middle;">';
    if (choice === 'paper') return '<img src="./img/paper.png" alt="Paper" style="width:32px;vertical-align:middle;">';
    if (choice === 'scissors') return '<img src="./img/scissor.png" alt="Scissors" style="width:32px;vertical-align:middle;">';
    return '-';
}

choiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const playerChoice = btn.getAttribute('data-choice');
        const computerChoice = getComputerChoice();
        const result = getResult(playerChoice, computerChoice);

        playerChoiceDiv.innerHTML = `You: ${getChoiceIcon(playerChoice)} <span style="font-size:1.1rem;">${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}</span>`;
        computerChoiceDiv.innerHTML = `Computer: ${getChoiceIcon(computerChoice)} <span style="font-size:1.1rem;">${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}</span>`;
        resultDiv.textContent = `Result: ${result}`;

        // Animate result
        resultDiv.style.transform = 'scale(1.15)';
        setTimeout(() => { resultDiv.style.transform = 'scale(1)'; }, 180);
    });
});