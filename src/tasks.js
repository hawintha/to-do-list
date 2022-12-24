import { listeners } from './listeners.js';
import { ui } from './ui.js';
import { date } from './date.js';
const task = (() => {
    const titleInput = document.querySelector('#taskTitle');
    const descInput = document.querySelector('#description');
    const projectInput = document.querySelector('#projectName');
    const dueDateInput = document.querySelector('#dueDate');
    const isImportant = document.querySelector('#isImportant');
    let tasks = [];
    class Task {
        constructor(title, description, project, dueDate, isImportant, isCompleted, isDeleted) {
            this.title = title;
            this.description = description;
            this.project = project;
            this.dueDate = dueDate;
            this.isImportant = isImportant;
            this.isCompleted = isCompleted;
            this.isDeleted = isDeleted;
        }
    }
    tasks.push(new Task("Add dark mode", "Switch toggle on upper right corner", "Project 1", "2022-10-20", false, true));
    tasks.push(new Task("Change font", "Find better fonts on Google Fonts", "Project 1", "2022-10-22", false, false));
    tasks.push(new Task("Allow tasks to be categorized into projects", "", "Project 1", "2022-10-31", true, true));
    tasks.push(new Task("Allow tasks to be categorized by date", "", "Project 1", "2022-11-30", true, true));
    tasks.push(new Task("Display due dates on each task", "Hide due date when screen is narrow", "Project 1", "2022-12-12", false, true));
    tasks.push(new Task("Add Overdue category", "In nav between This Month & Important", "Project 1", "2022-12-21", true, true));
    tasks.push(new Task("Organize tasks by day of the week", "Format as Sunday - Dec. 25, 2022", "Project 1", "2022-12-22", false, false));
    tasks.push(new Task("Allow the order of projects to be rearranged", "", "Project 1", "2022-12-24", false, false));
    tasks.push(new Task("Save data via localStorage", "", "Project 1", "2023-01-01", true, false));
    tasks.push(new Task("Add tasks for other projects", "Tic Tac Toe, Pixel Painter", "Project 2", "2024-02-24", false, false));
    const load = () => {//Load tasks from array to DOM
        for (let i = 0; i < tasks.length; i++) {
            if (!tasks[i].isDeleted) ui.displayTask(tasks, i)
        }
        listeners.addTaskListeners();
    }
    const filter = (category) => {
        document.querySelector('.tasks').replaceChildren(); //Clear all tasks
        for (let i = 0; i < tasks.length; i++) {
            let dueDate = tasks[i].dueDate;
            let dueYear = dueDate.substring(0, 4);
            let dueMonth = dueDate.substring(5, 7);
            let dueDay = dueDate.substring(8);
            if (!tasks[i].isDeleted) {
                if (category.classList.contains("project")) { //Only show that project's tasks   
                    let projectName = category.firstElementChild.lastElementChild.innerText;
                    document.querySelector('h1').innerText = `${projectName} Tasks`;
                    if (tasks[i].project === projectName) ui.displayTask(tasks, i);
                } else if (category.classList.contains("all")) { //Show all tasks
                    document.querySelector('h1').innerText = "All Tasks";
                    ui.displayTask(tasks, i);
                } else if (category.classList.contains("today")) { //Show today's tasks
                    document.querySelector('h1').innerText = "Today's Tasks";
                    if (dueDate === date.yyyy + "-" + date.mm + "-" + date.dd) ui.displayTask(tasks, i);
                } else if (category.classList.contains("thisWeek")) { //Show this week's tasks
                    document.querySelector('h1').innerText = "This Week's Tasks";
                    if (date.findWeekNum(dueYear, dueMonth, dueDay) === date.findWeekNum(date.yyyy, date.mm, date.dd)) ui.displayTask(tasks, i);
                } else if (category.classList.contains("thisMonth")) { //Show this month's tasks
                    document.querySelector('h1').innerText = "This Month's Tasks";
                    if (dueMonth === String(date.mm)) ui.displayTask(tasks, i);
                } else if (category.classList.contains("overdue")) { //Show overdue tasks
                    document.querySelector('h1').innerText = "Overdue Tasks";
                    if (0 > date.findDayNum(dueYear, dueMonth, dueDay) - date.findDayNum(date.yyyy, date.mm, date.dd) && !tasks[i].isCompleted) ui.displayTask(tasks, i);
                } else if (category.classList.contains("important")) { //Only show starred tasks
                    document.querySelector('h1').innerText = "Important Tasks";
                    if (tasks[i].isImportant) ui.displayTask(tasks, i);
                } else if (category.classList.contains("completed")) { //Only show completed tasks     
                    document.querySelector('h1').innerText = "Completed Tasks";
                    if (tasks[i].isCompleted) ui.displayTask(tasks, i);
                }
            }
        }
        listeners.addTaskListeners();
    }

    const toggleFinish = (circle, taskID) => {
        if (circle.innerText === "circle") { //Checks
            circle.innerText = "task_alt";
            circle.classList.add("finished");
            circle.nextElementSibling.classList.add("finished");
            if (taskID) tasks[taskID.substring(5)].isCompleted = true;
        } else { //Unchecks
            circle.innerText = "circle";
            circle.classList.remove("finished");
            circle.nextElementSibling.classList.remove("finished");
            if (taskID) tasks[taskID.substring(5)].isCompleted = false;
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
        document.querySelector('.task-form').reset();
        filter(document.querySelector('.active'));
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
        document.querySelector('.editing p').innerText = titleInput.value; //Edit in-line title
        document.querySelector('.editing .grid p').innerText = dueDateInput.value; //Edit in-line due date
        editingTask.title = titleInput.value;
        editingTask.description = descInput.value;
        editingTask.project = projectInput.value;
        editingTask.dueDate = dueDateInput.value;
        updateDetails();
    }
    const updateProject = (oldName, newName) => {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].project === oldName) {
                document.querySelector(`#task-${i} .detail-project`).lastElementChild.innerText = newName; //Edit project name in details
                tasks[i].project = newName; //Edit project name in array
            }
        }
        document.querySelector(`[value="${oldName}"]`).innerText = newName; //Update project selector option
        document.querySelector(`[value="${oldName}"]`).setAttribute('value', newName);
    }
    return { load, filter, toggleFinish, toggleStar, create, remove, prepareEdit, edit, updateProject };
})();

export { task };