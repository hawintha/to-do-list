import { task } from './tasks.js';
import { project } from './projects.js';
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
        ui.toggleForm("task-creator");
    })
    const createTaskBtn = document.querySelector('.create-task');
    createTaskBtn.addEventListener('click', () => {
        task.create();
        ui.closeForm();
    })
    const confirmEditBtn = document.querySelector('.confirm-edit');
    confirmEditBtn.addEventListener('click', () => {
        task.edit();
        ui.closeForm();
    })

    const projectSettings = document.querySelector('.project-settings');
    projectSettings.addEventListener('click', () => {
        ui.toggleForm("project-editor");
    })
    const addProjectBtn = document.querySelector('.add-project');
    addProjectBtn.addEventListener('click', () => {
        project.create();
    })
    const saveProjectBtn = document.querySelector('.save-project');
    saveProjectBtn.addEventListener('click', () => {
        project.edit();
    })
}

const listeners = (() => {
    function findBtn(btns) {
        for (let btn of btns) {
            if (btn.getAttribute('listener') !== 'true') {
                btn.setAttribute('listener', 'true'); //Prevents adding duplicate listeners
                btn.addEventListener('click', (e) => {
                    if (btn.classList.contains('finish-icon')) {
                        task.toggleFinish(e.target, e.target.parentElement.parentElement.parentElement.id); //Toggle finished/unfinished icons
                    } else if (btn.classList.contains('expand')) {
                        e.target.classList.toggle('hidden'); //Hide icon
                        e.target.innerText === "expand_more" ? btn.nextElementSibling.classList.toggle('hidden') : btn.previousElementSibling.classList.toggle('hidden'); //Show opposite icon
                        e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.toggle('hidden'); //Toggle details
                    } else if (btn.classList.contains('edit-icon')) {
                        ui.toggleForm("task-editor");
                        task.prepareEdit(e.target.parentElement.parentElement.parentElement);
                    } else if (btn.classList.contains('star')) {
                        e.target.classList.toggle('hidden');
                        task.toggleStar(e.target, e.target.parentElement.parentElement.parentElement.parentElement.id); //Toggle filled/unfilled star
                    } else if (btn.classList.contains('trash-icon')) {
                        task.remove(e.target.parentElement.parentElement.parentElement);
                    } else if (btn.classList.contains('project-edit')) {
                        project.prepareEdit(e.target.parentElement.parentElement);
                    } else if (btn.classList.contains('project-trash')) {
                        project.remove(e.target.parentElement.parentElement);
                    } else if (btn.classList.contains('cancel')) {
                        ui.closeForm();
                    }
                })
            }
        }
    }
    const addTaskListeners = () => {
        findBtn(document.querySelectorAll('.tasks .material-symbols-outlined')); //Finish & filled star icons
        findBtn(document.querySelectorAll('.tasks lord-icon')); //Expand, edit, unfilled star & trash icons
        findBtn(document.querySelectorAll('.cancel'));
    }
    const addProjectListeners = () => {
        findBtn(document.querySelectorAll('.project-edit'));
        findBtn(document.querySelectorAll('.project-trash'));
    }
    return { addTaskListeners, addProjectListeners }
})();

export { listen, listeners };