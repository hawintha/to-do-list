import { listeners } from './listeners.js';
import { ui } from './ui.js';
const task = (() => {
    const titleInput = document.querySelector('#taskTitle');
    const descInput = document.querySelector('#description');
    const projectInput = document.querySelector('#projectName');
    const dueDateInput = document.querySelector('#dueDate');
    const isImportant = document.querySelector('#isImportant');
    let tasks = [];
    class Task {
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
    tasks.push(new Task("Add dark mode", "Switch toggle on upper right corner", "Project 1", "2022-10-22", false, true));
    tasks.push(new Task("Allow tasks to be categorized into projects", "", "Project 1", "2022-10-31", false, false));
    tasks.push(new Task("Allow tasks to be categorized by date", "", "Project 1", "2022-11-30", true, false));
    const load = () => {
        for (let i = 0; i < tasks.length; i++) { //Load tasks from array to DOM
            ui.addTask(tasks, i, document.querySelector('.tasks'));
            ui.markTask(tasks, i);
        }
        listeners.addTaskListeners();
    }

    const toggleFinish = (circle, taskID) => {
        if (circle.innerText === "circle") { //Checks
            circle.innerText = "task_alt";
            circle.classList.add("finished");
            circle.nextElementSibling.classList.add("finished");
            if (taskID) tasks[taskID.substring(5)].isFinished = true;
        } else { //Unchecks
            circle.innerText = "circle";
            circle.classList.remove("finished");
            circle.nextElementSibling.classList.remove("finished");
            if (taskID) tasks[taskID.substring(5)].isFinished = false;
        }
    }
    const toggleStar = (star, taskID) => {
        if (star.tagName === "LORD-ICON") { //If unfilled star
            star.nextElementSibling.classList.toggle('hidden');
            tasks[taskID.substring(5)].isImportant = true;
        } else { //If filled star
            star.previousElementSibling.classList.toggle('hidden');
            tasks[taskID.substring(5)].isImportant = false;
        }
    }

    const create = () => {
        tasks.push(new Task(titleInput.value, descInput.value, projectInput.value, dueDateInput.value, isImportant.checked)); //Add to array
        ui.addTask(tasks, tasks.length - 1, document.querySelector('.tasks')); //Add to DOM
        ui.markTask(tasks, tasks.length - 1); //Add appropriate CSS
        listeners.addTaskListeners();
        document.querySelector('.task-form').reset();
    }
    const remove = (task) => {
        tasks[task.id.substring(5)].isDeleted = true; //Update array
        task.remove()// Remove from UI
    }
    const prepareEdit = (task) => { //Fill edit form with task's values
        titleInput.value = tasks[task.id.substring(5)].title;
        descInput.value = tasks[task.id.substring(5)].description;
        projectInput.value = tasks[task.id.substring(5)].project;
        dueDateInput.value = tasks[task.id.substring(5)].dueDate;
        if (document.querySelector('.editing')) document.querySelector('.editing').classList.remove("editing");
        task.classList.add("editing");
    }
    function updateDetails() {
        document.querySelector('.editing .detail-title span:last-child').innerText = titleInput.value;
        document.querySelector('.editing .detail-description span:last-child').innerText = descInput.value;
        document.querySelector('.editing .detail-project span:last-child').innerText = projectInput.value;
        document.querySelector('.editing .detail-due-date span:last-child').innerText = dueDateInput.value;
    }
    const edit = () => {
        let editingTask = tasks[document.querySelector('.editing').id.substring(5)];
        document.querySelector('.editing p').innerText = titleInput.value; //Edit in line
        editingTask.title = titleInput.value;
        editingTask.description = descInput.value;
        editingTask.project = projectInput.value;
        editingTask.dueDate = dueDateInput.value;
        updateDetails();
    }
    return { load, toggleFinish, toggleStar, create, remove, prepareEdit, edit };
})();

export { task };