import { task } from './tasks.js';
import { ui } from './ui.js';
function listen() {
    const finishIcons = document.querySelectorAll('.finish-icon');
    for (let finishIcon of finishIcons) {
        finishIcon.addEventListener('click', (e) => e.target.innerText === "circle" ? task.finishTask(e) : task.unFinishTask(e));
    }

    const starIcons = document.querySelectorAll('.star');
    for (let starIcon of starIcons) { //Mark task as starred
        starIcon.addEventListener('click', (e) => task.starTask(e));
    }
    ui.getTheme();
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.addEventListener('click', () => themeIcon.checked ? ui.setTheme('dark') : ui.setTheme('light'));
}
export { listen };