import { listeners } from './listeners.js';
import { ui } from './ui.js';
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
        document.querySelector('.nav-projects').replaceChildren();
        document.querySelector('.projects').replaceChildren();
        for (let i = 0; i < projects.length; i++) { //Load projects from array to DOM
            ui.addProject(projects, i, document.querySelector('.nav-projects')); //For nav
            ui.addProject(projects, i, document.querySelector('.projects'), true); //For form
        }
        listeners.addProjectListeners(); //Edit & delete buttons
    }

    const create = () => {
        projects.push(new Project(titleInput.value, false)); //To array
        ui.addProject(projects, projects.length - 1, document.querySelector('.projects'), true); //To form
        ui.addProject(projects, projects.length - 1, document.querySelector('.nav-projects'), false); //To nav
        titleInput.value = ""; //Clear input
        listeners.addProjectListeners();
    }
    const remove = (project) => {
        projects[project.dataset.index].isDeleted = true; //Update array
        project.remove()// Remove from form
        document.querySelector(`[data-index="${project.dataset.index}"`).remove()// Remove from nav
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
        projects[document.querySelector('.editing').dataset.index].title = titleInput.value; //Update array
        titleInput.value = "";
        document.querySelector(".add-project").classList.remove("hidden");
        document.querySelector(".save-project").classList.add("hidden");
        load();
    }
    return { load, create, remove, prepareEdit, edit }
})();

export { project };