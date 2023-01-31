import { task } from './tasks.js';
const ui = (() => {
    const setIconTheme = (colors) => {
        const lordIcons = document.querySelectorAll('lord-icon');
        for (let lordIcon of lordIcons) {
            lordIcon.setAttribute('colors', colors);
        }
    };
    const setTheme = (theme) => {
        document.documentElement.className = theme;
        localStorage.setItem('theme', theme);
        const themeIcon = document.querySelector('.theme-icon');
        if (theme === 'dark') { //Match toggle & icons with theme
            themeIcon.checked = true;
            setIconTheme('primary:#3565B0,secondary:#0540A0');
        } else {
            themeIcon.checked = false;
            setIconTheme('primary:#4FDDDE,secondary:#4FAAEF');
        }
    };
    const getTheme = () => { //Use previously used theme
        localStorage.getItem('theme');
        setTheme(localStorage.getItem('theme'));
    };

    const toggleSidebar = () => {
        document.querySelector(".container").classList.toggle("collapsed");
    }
    const switchCategories = (category) => {
        if (document.querySelector('.editing')) return;
        document.querySelector('.active').classList.remove("active");
        category.classList.add("active"); //Highlight clicked tab
        task.filter(category);
    }

    const taskForm = document.querySelector('.task-form');
    const projectForm = document.querySelector('.project-form');
    const toggleForm = (type) => {
        document.querySelector('.taskView').classList.add('minimized'); //Hide tasks
        if (type === "project-editor") {
            if (projectForm.classList.contains("visible")) {
                closeForm(); //Open/Close form with the same icon
            } else { //Open the hidden form
                taskForm.classList.replace('visible', 'minimized') //Hide task form if switching from task to project forms
                projectForm.classList.replace('minimized', 'visible');  //Show project form
                document.querySelector('#newProject').value = ""; //Clear input
                document.querySelector(".add-project").classList.remove("hidden"); //Show add button instead of save button
                document.querySelector(".save-project").classList.add("hidden"); //Hide save button until editing
                if (document.querySelector('.editing')) document.querySelector('.editing').classList.remove("editing");
            }
        } else { //Task form
            projectForm.classList.add('minimized'); // Minimize project form
            taskForm.classList.replace('minimized', 'visible'); //Show task form
            if (type === "task-editor") {
                document.querySelector('.create-task').classList.add('hidden'); //Hide create button
                document.querySelector('.confirm-edit').classList.remove('hidden'); //Show confirm edit button
                document.querySelector(".task-form").firstElementChild.innerText = "Edit Task";
                document.querySelector('.isImportant').classList.add('hidden'); //Hide star
            } else if (type === "task-creator") {
                taskForm.reset();
                if (document.querySelector('.active').classList.contains("project")) { ///Make selector default to currently active project tab
                    document.querySelector('#projectName').value = document.querySelector('.active').firstElementChild.lastElementChild.innerText;
                }
                document.querySelector('.create-task').classList.remove('hidden'); //Show create button
                document.querySelector('.confirm-edit').classList.add('hidden'); //Hide confirm edit button
                document.querySelector(".task-form").firstElementChild.innerText = "New Task";
                document.querySelector('.isImportant').classList.remove('hidden'); //Show star
            }
        }
    }
    const closeForm = () => {
        document.querySelector('.taskView').classList.remove('minimized'); //Show tasks
        document.querySelector('.visible').classList.replace('visible', 'minimized'); //Hide form
        if (document.querySelector('.editing')) document.querySelector('.editing').classList.remove("editing");
    }

    function addTask(tasks, i, parent) {
        const newTask = document.createElement('div');
        newTask.classList.add("task");
        newTask.id = "task-" + i;
        parent.appendChild(newTask);

        const newTaskLine = document.createElement('div');
        newTaskLine.classList.add("line");
        newTask.appendChild(newTaskLine);

        const newFlex = document.createElement('div');
        newFlex.classList.add("flex");
        newTaskLine.appendChild(newFlex);

        const newSpan = document.createElement('span');
        newSpan.classList.add("finish-icon", "material-symbols-outlined");
        newSpan.innerText = "circle";
        newFlex.appendChild(newSpan);
        const newP = document.createElement('p');
        newP.innerText = tasks[i].title;
        newFlex.appendChild(newP);

        const newGrid = document.createElement('div');
        newGrid.classList.add("grid");
        newTaskLine.appendChild(newGrid);

        const newDate = document.createElement('p');
        newDate.innerText = tasks[i].dueDate;
        newGrid.appendChild(newDate);

        const newExpandFlex = document.createElement('div');
        newExpandFlex.classList.add("flex");
        newGrid.appendChild(newExpandFlex);
        const newExpandMore = document.createElement('span');
        newExpandMore.classList.add("expand", "material-symbols-outlined");
        newExpandMore.innerText = "expand_more";
        newExpandFlex.appendChild(newExpandMore);
        const newExpandLess = document.createElement('span');
        newExpandLess.classList.add("expand", "material-symbols-outlined", "hidden");
        newExpandLess.innerText = "expand_less";
        newExpandFlex.appendChild(newExpandLess);

        const newEditIcon = document.createElement('lord-icon');
        newEditIcon.classList.add("edit-icon");
        newEditIcon.src = "https://cdn.lordicon.com/hiqmdfkt.json";
        newEditIcon.trigger = "loop-on-hover";
        newEditIcon.colors = "primary:#4FDDDE,secondary:#4FAAEF";
        newEditIcon.stroke = "100";
        newEditIcon.style = "width:25px;height:25px";
        newGrid.appendChild(newEditIcon);

        const newStarFlex = document.createElement('div');
        newStarFlex.classList.add("flex");
        newGrid.appendChild(newStarFlex);
        const newStarIcon = document.createElement('lord-icon');
        newStarIcon.classList.add("star");
        newStarIcon.src = "https://cdn.lordicon.com/whttoese.json";
        newStarIcon.trigger = "morph";
        newStarIcon.colors = "primary:#4FDDDE,secondary:#4FAAEF";
        newStarIcon.stroke = "100";
        newStarIcon.style = "width:25px;height:25px";
        newStarFlex.appendChild(newStarIcon);

        const newStarFilled = document.createElement('span');
        newStarFilled.classList.add("star", "material-symbols-outlined", "hidden");
        newStarFilled.innerText = "star";
        newStarFlex.appendChild(newStarFilled);

        const newTrashIcon = document.createElement('lord-icon');
        newTrashIcon.classList.add("trash-icon");
        newTrashIcon.src = "https://cdn.lordicon.com/tntmaygd.json";
        newTrashIcon.trigger = "loop-on-hover";
        newTrashIcon.colors = "primary:#4FDDDE,secondary:#4FAAEF";
        newTrashIcon.stroke = "100";
        newTrashIcon.style = "width:25px;height:25px";
        newTrashIcon.state = "hover-empty";
        newGrid.appendChild(newTrashIcon);

        const newTaskDetails = document.createElement('div');
        newTaskDetails.classList.add("details", "hidden");
        newTask.appendChild(newTaskDetails);

        const newTitleDiv = document.createElement('div');
        newTitleDiv.classList.add("detail-title");
        newTaskDetails.appendChild(newTitleDiv);
        const newTitleLabel = document.createElement('span');
        newTitleLabel.innerText = "Title: ";
        newTitleDiv.appendChild(newTitleLabel);
        const newTitle = document.createElement('span');
        newTitle.innerText = tasks[i].title;
        newTitleDiv.appendChild(newTitle);

        const newDescriptionDiv = document.createElement('div');
        newDescriptionDiv.classList.add("detail-description");
        newTaskDetails.appendChild(newDescriptionDiv);
        const newDescriptionLabel = document.createElement('span');
        newDescriptionLabel.innerText = "Description: ";
        newDescriptionDiv.appendChild(newDescriptionLabel);
        const newDescription = document.createElement('span');
        newDescription.innerText = tasks[i].description;
        newDescriptionDiv.appendChild(newDescription);

        const newProjectDiv = document.createElement('div');
        newProjectDiv.classList.add("detail-project");
        newTaskDetails.appendChild(newProjectDiv);
        const newProjectLabel = document.createElement('span');
        newProjectLabel.innerText = "Project: ";
        newProjectDiv.appendChild(newProjectLabel);
        const newProject = document.createElement('span');
        newProject.innerText = tasks[i].project;
        newProjectDiv.appendChild(newProject);

        const newDueDateDiv = document.createElement('div');
        newDueDateDiv.classList.add("detail-due-date");
        newTaskDetails.appendChild(newDueDateDiv);
        const newDueDateLabel = document.createElement('span');
        newDueDateLabel.innerText = "Due: ";
        newDueDateDiv.appendChild(newDueDateLabel);
        const newDueDate = document.createElement('span');
        newDueDate.innerText = tasks[i].dueDate;
        newDueDateDiv.appendChild(newDueDate);
    }
    function markTask(tasks, i) {
        if (tasks[i].isImportant) { //Star important tasks
            document.querySelector(`#task-${i} lord-icon.star`).classList.add("hidden");
            document.querySelector(`#task-${i} span.star`).classList.remove("hidden");
        }
        if (tasks[i].isCompleted) task.toggleFinish(document.querySelector(`#task-${i} .finish-icon`)); //Mark finished tasks
    }
    const displayTask = (tasks, i) => {
        addTask(tasks, i, document.querySelector('.tasks'));
        markTask(tasks, i);
    }

    const addOption = (value, text) => {
        const projectSelector = document.querySelector('#projectName');
        const newOption = document.createElement('option');
        newOption.value = value;
        newOption.innerText = text;
        projectSelector.appendChild(newOption);
    }
    const addProject = (projects, i, parent, isForm) => {
        const newProject = document.createElement('div');
        isForm ? newProject.classList.add("project", "category", "flex") : newProject.classList.add("nav-category", "project", "category", "flex");
        newProject.dataset.index = i;
        parent.appendChild(newProject);

        const newFlex = document.createElement('div');
        newFlex.classList.add("flex");
        newProject.appendChild(newFlex);
        const newSpan = document.createElement('span');
        newSpan.classList.add("material-symbols-outlined");
        isForm ? newSpan.innerText = "drag_indicator" : newSpan.innerText = "checklist";
        newFlex.appendChild(newSpan);
        const newTitle = document.createElement('span');
        newTitle.innerText = projects[i].title;
        newFlex.appendChild(newTitle);

        if (isForm) {
            addOption(projects[i].title, projects[i].title)

            const newIconsFlex = document.createElement('div'); //Project editor form's additional icons
            newIconsFlex.classList.add("flex");
            newProject.appendChild(newIconsFlex);

            const newEditIcon = document.createElement('lord-icon');
            newEditIcon.classList.add("project-edit");
            newEditIcon.src = "https://cdn.lordicon.com/hiqmdfkt.json";
            newEditIcon.trigger = "loop-on-hover";
            newEditIcon.colors = "primary:#4FDDDE,secondary:#4FAAEF";
            newEditIcon.stroke = "100";
            newEditIcon.style = "width:25px;height:25px";
            newEditIcon.state = "hover-empty";
            newIconsFlex.appendChild(newEditIcon);

            const newTrashIcon = document.createElement('lord-icon');
            newTrashIcon.classList.add("project-trash");
            newTrashIcon.src = "https://cdn.lordicon.com/tntmaygd.json";
            newTrashIcon.trigger = "loop-on-hover";
            newTrashIcon.colors = "primary:#4FDDDE,secondary:#4FAAEF";
            newTrashIcon.stroke = "100";
            newTrashIcon.style = "width:25px;height:25px";
            newTrashIcon.state = "hover-empty";
            newIconsFlex.appendChild(newTrashIcon);
        }
    }
    return { setTheme, getTheme, toggleSidebar, switchCategories, toggleForm, closeForm, displayTask, addOption, addProject };
})();

export { ui };