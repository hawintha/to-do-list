import { task } from './tasks.js';
import { ui } from './ui.js';
function listen() {
    ui.getTheme(); //Toggle dark/light mode
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.addEventListener('click', () => themeIcon.checked ? ui.setTheme('dark') : ui.setTheme('light'));

    const menuIcon = document.querySelector('.menu-icon');
    menuIcon.addEventListener('click', () => {
        ui.toggleSidebar();
    })
    const addTaskBtn = document.querySelector('.add-task'); //Toggle task creator form
    addTaskBtn.addEventListener('click', () => {
        ui.toggleForm(document.querySelector('.task-form'), false);
    })
    const closeIcon = document.querySelector('.cancel');
    closeIcon.addEventListener('click', () => {
        ui.closeForm();
    })
    const createTaskBtn = document.querySelector('.create-task');
    createTaskBtn.addEventListener('click', () => {
        ui.closeForm();
        task.createNewTask();
    })
    const confirmEditBtn = document.querySelector('.confirm-edit');
    confirmEditBtn.addEventListener('click', () => {
        ui.closeForm();
        task.editTask();
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
                        e.target.classList.toggle('hidden'); //Hide icon
                        e.target.innerText === "expand_more" ? icon.nextElementSibling.classList.toggle('hidden') : icon.previousElementSibling.classList.toggle('hidden'); //Show opposite icon
                        e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.toggle('hidden'); //Toggle details
                    } else if (icon.classList.contains('edit-icon')) {
                        ui.toggleForm(document.querySelector(".task-form"), true);
                        task.prepareEdit(e.target.parentElement.parentElement.parentElement);
                    } else if (icon.classList.contains('star')) {
                        e.target.classList.toggle('hidden');
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