const showRulesButton = document.querySelector('.play2');
const rulesContainer = document.getElementById('rules-defined');
const rulesToggleButton = document.getElementById('rules');
const cancelButton = document.getElementById('inner-cancel');

rulesToggleButton.addEventListener('click', () => {
    rulesContainer.style.visibility = 'visible';
});

cancelButton.addEventListener('click', () => {
    rulesContainer.style.visibility = 'hidden';
});

showRulesButton.addEventListener('click', () => {
    location.href = 'index.html';
});
