import { listeners } from './listeners.js';
import { ui } from './ui.js';
const task = (() => {
    const titleInput = document.querySelector('#taskTitle');
    const descInput = document.querySelector('#description');
    const projectInput = document.querySelector('#projectName');
    const dueDateInput = document.querySelector('#dueDate');
    const isImportant = document.querySelector('#isImportant');
    let toDos = [];
    class ToDo {
        constructor(title, description, project, dueDate, isImportant, isFinished, isDeleted) {
            this.title = title;
            this.description = description;
            this.project = project;
            this.dueDate = dueDate;
            this.isImportant = isImportant;
            this.isFinished = isFinished;
            this.isDeleted = isDeleted;
        }
    }
    toDos.push(new ToDo("Add light mode", "", "", "2022-10-22", false, true));
    toDos.push(new ToDo("Make sidebar menu collapsible", "", "", "2022-10-31", false, false));
    toDos.push(new ToDo("Allow tasks to be edited", "", "", "2022-11-30", true, false));
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
    function prepareEdit(task) { //Fill edit form with task's values
        titleInput.value = toDos[task.id.substring(5)].title;
        descInput.value = toDos[task.id.substring(5)].description;
        projectInput.value = toDos[task.id.substring(5)].project;
        dueDateInput.value = toDos[task.id.substring(5)].dueDate;
        if (document.querySelector('.editing')) { //Prevent multiple tasks from having the editing status
            document.querySelector('.editing').classList.remove("editing");
        }
        task.classList.add("editing");
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
    function deleteTask(task) {
        toDos[task.id.substring(5)].isDeleted = true; //Mark task as deleted in array
        task.remove()// Remove task from UI
    }

    function addToDo(title, description, project, dueDate, isImportant) { //Adds task to array
        let newToDo = new ToDo(title, description, project, dueDate, isImportant);
        toDos.push(newToDo);
    }
    function createNewTask() {
        addToDo(titleInput.value, descInput.value, projectInput.value, dueDateInput.value, isImportant.checked);
        ui.addTask(toDos, toDos.length - 1, document.querySelector('.tasks')); //Adds task to DOM
        ui.markTask(toDos, toDos.length - 1); //Adds appropriate CSS
        listeners.addTaskListeners();
        document.querySelector('.task-form').reset();
    }
    function editTask() {
        let editingToDo = toDos[document.querySelector('.editing').id.substring(5)];
        document.querySelector('.editing p').innerText = titleInput.value;
        editingToDo.title = titleInput.value;
        editingToDo.description = descInput.value;
        editingToDo.project = projectInput.value;
        editingToDo.dueDate = dueDateInput.value;
    }
    return {
        loadTasks, toggleFinish, prepareEdit, starTask, deleteTask, createNewTask, editTask
    };
})();

export { task };