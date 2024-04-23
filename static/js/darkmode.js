// JavaScript to toggle dark mode
const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('change', () => {
    document.documentElement.classList.toggle('dark-mode', darkModeToggle.checked);
});