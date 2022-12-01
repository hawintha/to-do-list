import { task } from './tasks.js';
import { ui } from './ui.js';
function listen() {
    ui.getTheme(); //Toggle dark/light mode
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.addEventListener('click', () => themeIcon.checked ? ui.setTheme('dark') : ui.setTheme('light'));

    const addTaskBtn = document.querySelector('.add-task');
    addTaskBtn.addEventListener('click', (e) => { //Display form to create task
        ui.showHide(e.target.parentElement.nextElementSibling);
    })
    const closeIcon = document.querySelector('.task-form .close'); //Close form
    closeIcon.addEventListener('click', (e) => {
        ui.showHide(e.target.parentElement);
    })
    const createTaskBtn = document.querySelector('.create-task');
    createTaskBtn.addEventListener('click', (e) => {
        ui.showHide(e.target.parentElement); // Close form
        task.createNewTask(); //Add new task to array
    })
}

const listeners = (() => {
    const addTaskListeners = () => {
        const finishIcons = document.querySelectorAll('.finish-icon');
        for (let finishIcon of finishIcons) { //Toggle finished/unfinished icons
            if (finishIcon.getAttribute('listener') !== 'true') {
                finishIcon.addEventListener('click', (e) => task.toggleFinish(e.target, e.target.parentElement.parentElement.id));
                finishIcon.setAttribute('listener', 'true'); //Prevents adding duplicate listeners
            }
        }
        const starIcons = document.querySelectorAll('.star');
        for (let starIcon of starIcons) {
            if (starIcon.getAttribute('listener') !== 'true') {
                starIcon.addEventListener('click', (e) => { //Toggle filled/unfilled star
                    ui.showHide(e.target);
                    task.starTask(e.target, e.target.parentElement.parentElement.parentElement.id);
                })
                starIcon.setAttribute('listener', 'true'); //Prevents adding duplicate listeners
            }
        }
    }
    return { addTaskListeners }
})();
export { listen, listeners };