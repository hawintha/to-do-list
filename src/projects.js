import { listeners } from './listeners.js';
import { ui } from './ui.js';
import { task } from './tasks.js';
const project = (() => {
    const titleInput = document.querySelector('#newProject');
    let projects = [];
    class Project {
        constructor(title, isDeleted) {
            this.title = title;
            this.isDeleted = isDeleted;
        }
    }
    projects.push(new Project("Project 1", false));
    projects.push(new Project("Project 2", false));
    projects.push(new Project("Project 3", false));
    const load = () => {
        document.querySelector('.projects').replaceChildren();
        document.querySelector('#projectName').replaceChildren();
        for (let i = 0; i < projects.length; i++) { //Load projects from array to DOM
            if (!projects[i].isDeleted) {
                ui.addProject(projects, i, document.querySelector('.nav-projects')); //For nav
                ui.addProject(projects, i, document.querySelector('.projects'), true); //For form
            }
        }
        listeners.addProjectListeners(); //Edit & delete buttons
    }

    const create = () => {
        projects.push(new Project(titleInput.value, false)); //To array
        ui.addProject(projects, projects.length - 1, document.querySelector('.projects'), true); //To both forms
        ui.addProject(projects, projects.length - 1, document.querySelector('.nav-projects'), false); //To nav
        titleInput.value = ""; //Clear input
        listeners.addProjectListeners();
    }
    const remove = (project) => {
        let index = project.dataset.index;
        projects[index].isDeleted = true; //Update array
        project.remove()// Remove from project manager form
        document.querySelector(`[value="${projects[index].title}"]`).remove(); // Remove from selector in task creator form
        if (document.querySelector('.active').dataset.index === index) { //If active tab is the same project as the project being deleted, switch to All Tab
            ui.switchCategories(document.querySelector('.all'));
        }
        document.querySelector(`[data-index="${index}"]`).remove()// Remove from nav
    }
    const prepareEdit = (project) => {
        titleInput.value = projects[project.dataset.index].title;
        titleInput.focus();
        document.querySelector(".add-project").classList.add("hidden");
        document.querySelector(".save-project").classList.remove("hidden");
        if (document.querySelector('.editing')) document.querySelector('.editing').classList.remove("editing");
        project.classList.add("editing");
    }
    const edit = () => {
        let index = document.querySelector('.editing').dataset.index;
        task.updateProject(projects[index].title, titleInput.value); //Update tasks with updated project name
        document.querySelector('.editing').firstElementChild.lastElementChild.innerText = titleInput.value; // Update project name in project manager form
        document.querySelector(`[data-index="${index}"]`).firstElementChild.lastElementChild.innerText = titleInput.value; // Update project name in nav
        projects[index].title = titleInput.value; //Update array
        titleInput.value = "";
        document.querySelector(".add-project").classList.remove("hidden");
        document.querySelector(".save-project").classList.add("hidden");
    }
    return { load, create, remove, prepareEdit, edit }
})();

export { project };