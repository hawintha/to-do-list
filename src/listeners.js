import { task } from './tasks.js';
import { ui } from './ui.js';
function listen() {
    ui.getTheme(); //Toggle dark/light mode
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.addEventListener('click', () => themeIcon.checked ? ui.setTheme('dark') : ui.setTheme('light'));

    const addTaskBtn = document.querySelector('.add-task'); //Toggle task creator form
    addTaskBtn.addEventListener('click', () => {
        ui.toggleForm(document.querySelector(".task-form"), false);
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
    const confirmEditBtn = document.querySelector('.confirm-edit');
    confirmEditBtn.addEventListener('click', (e) => {
        ui.showHide(e.target.parentElement); // Close form
        task.editTask(); //Add new task to array
    })
}

const listeners = (() => {
    function addListener(icons) {
        for (let icon of icons) {
            if (icon.getAttribute('listener') !== 'true') { //Don't add duplicate listeners
                icon.addEventListener('click', (e) => {
                    if (icon.classList.contains('finish-icon')) {
                        task.toggleFinish(e.target, e.target.parentElement.parentElement.parentElement.id); //Toggle finished/unfinished icons
                    } else if (icon.classList.contains('expand')) {
                        ui.showHide(e.target); //Hide icon
                        e.target.innerText === "expand_more" ? ui.showHide(icon.nextElementSibling) : ui.showHide(icon.previousElementSibling); //Show opposite icon
                        ui.showHide(e.target.parentElement.parentElement.parentElement.nextElementSibling); //Toggle details
                    } else if (icon.classList.contains('edit-icon')) {
                        ui.toggleForm(document.querySelector(".task-form"), true);
                        task.prepareEdit(e.target.parentElement.parentElement.parentElement);
                    } else if (icon.classList.contains('star')) {
                        ui.showHide(e.target);
                        task.starTask(e.target, e.target.parentElement.parentElement.parentElement.parentElement.id); //Toggle filled/unfilled star
                    } else if (icon.classList.contains('trash-icon')) {
                        task.deleteTask(e.target.parentElement.parentElement.parentElement);
                    }
                })
                icon.setAttribute('listener', 'true'); //Prevents adding duplicate listeners
            }
        }
    }
    const addTaskListeners = () => {
        addListener(document.querySelectorAll('.finish-icon'));
        addListener(document.querySelectorAll('.expand'));
        addListener(document.querySelectorAll('.edit-icon'));
        addListener(document.querySelectorAll('.star'));
        addListener(document.querySelectorAll('.trash-icon'));
    }
    return { addTaskListeners }
})();
export { listen, listeners };