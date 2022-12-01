import { listeners } from './listeners.js';
import { ui } from './ui.js';
const task = (() => {
    let toDos = [];
    class ToDo {
        constructor(title, description, project, dueDate, isImportant, isFinished) {
            this.title = title;
            this.description = description;
            this.project = project;
            this.dueDate = dueDate;
            this.isImportant = isImportant;
            this.isFinished = isFinished;
        }
    }
    toDos.push(new ToDo("Add light mode", "", "", "10-22-2022", false, true));
    toDos.push(new ToDo("Make sidebar menu collapsible", "", "", "10-31-2022", false, false));
    toDos.push(new ToDo("Allow tasks to be edited", "", "", "11-30-2022", true, false));

    const loadTasks = () => {
        for (let i = 0; i < toDos.length; i++) { //Load tasks from array to DOM
            ui.addTask(toDos, i, document.querySelector('.tasks'));
            ui.markTask(toDos, i);
        }
        listeners.addTaskListeners();
    }

    function toggleFinish(circle, taskID) {
        if (circle.innerText === "circle") { //Checks
            circle.innerText = "task_alt";
            circle.classList.add("finished");
            circle.nextElementSibling.classList.add("finished");
            if (taskID) toDos[taskID.substring(5)].isFinished = true;
        } else { //Unchecks
            circle.innerText = "circle";
            circle.classList.remove("finished");
            circle.nextElementSibling.classList.remove("finished");
            if (taskID) toDos[taskID.substring(5)].isFinished = false;
        }
    }
    function starTask(star, taskID) {
        if (star.tagName === "LORD-ICON") { //If unfilled star
            ui.showHide(star.nextElementSibling);
            toDos[taskID.substring(5)].isImportant = true;
        } else { //If filled star
            ui.showHide(star.previousElementSibling);
            toDos[taskID.substring(5)].isImportant = false;
        }
    }

    function addToDo(title, description, project, dueDate, isImportant) { //Adds task to array
        let newToDo = new ToDo(title, description, project, dueDate, isImportant);
        toDos.push(newToDo);
    }
    function createNewTask() {
        const titleInput = document.querySelector('#taskTitle');
        const descInput = document.querySelector('#description');
        const projectInput = document.querySelector('#projectName');
        const dueDateInput = document.querySelector('#dueDate');
        const isImportant = document.querySelector('#isImportant');
        addToDo(titleInput.value, descInput.value, projectInput.value, dueDateInput.value, isImportant.checked);
        ui.addTask(toDos, toDos.length - 1, document.querySelector('.tasks')); //Adds task to DOM
        ui.markTask(toDos, toDos.length - 1); //Adds appropriate CSS
        listeners.addTaskListeners();
        document.querySelector('.task-form').reset();
    }
    return {
        loadTasks, toggleFinish, starTask, createNewTask
    };
})();

export { task };