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
        document.querySelector("body").classList.toggle("collapsed");
    }
    const toggleForm = (form, isEditing) => {
        document.querySelector('.taskView').classList.add('showingForm');
        document.querySelector('.task-form').classList.add('visible');
        if (isEditing) {
            document.querySelector('.create-task').classList.add('hidden'); //Hide create button
            document.querySelector('.confirm-edit').classList.remove('hidden'); //Show confirm edit button
            form.firstElementChild.innerText = "Edit Task";
            document.querySelector('.isImportant').classList.add('hidden'); //Hide star
        } else {
            document.querySelector('.task-form').reset();
            document.querySelector('.create-task').classList.remove('hidden'); //Show create button
            document.querySelector('.confirm-edit').classList.add('hidden'); //Hide confirm edit button
            form.firstElementChild.innerText = "New Task";
            document.querySelector('.isImportant').classList.remove('hidden'); //Show star
        }
    }
    const closeForm = () => {
        document.querySelector('.taskView').classList.remove('showingForm');
        document.querySelector('.task-form').classList.remove('visible');
    }

    const addTask = (toDos, i, parent) => {
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
        newP.innerText = toDos[i].title;
        newFlex.appendChild(newP);

        const newGrid = document.createElement('div');
        newGrid.classList.add("grid");
        newTaskLine.appendChild(newGrid);

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
        const newToDoTitle = document.createElement('span');
        newToDoTitle.innerText = toDos[i].title;
        newTitleDiv.appendChild(newToDoTitle);

        const newDescriptionDiv = document.createElement('div');
        newDescriptionDiv.classList.add("detail-description");
        newTaskDetails.appendChild(newDescriptionDiv);
        const newDescriptionLabel = document.createElement('span');
        newDescriptionLabel.innerText = "Description: ";
        newDescriptionDiv.appendChild(newDescriptionLabel);
        const newToDoDescription = document.createElement('span');
        newToDoDescription.innerText = toDos[i].description;
        newDescriptionDiv.appendChild(newToDoDescription);

        const newProjectDiv = document.createElement('div');
        newProjectDiv.classList.add("detail-project");
        newTaskDetails.appendChild(newProjectDiv);
        const newProjectLabel = document.createElement('span');
        newProjectLabel.innerText = "Project: ";
        newProjectDiv.appendChild(newProjectLabel);
        const newToDoProject = document.createElement('span');
        newToDoProject.innerText = toDos[i].project;
        newProjectDiv.appendChild(newToDoProject);

        const newDueDateDiv = document.createElement('div');
        newDueDateDiv.classList.add("detail-due-date");
        newTaskDetails.appendChild(newDueDateDiv);
        const newDueDateLabel = document.createElement('span');
        newDueDateLabel.innerText = "Due: ";
        newDueDateDiv.appendChild(newDueDateLabel);
        const newToDoDueDate = document.createElement('span');
        newToDoDueDate.innerText = toDos[i].dueDate;
        newDueDateDiv.appendChild(newToDoDueDate);
    }
    const markTask = (toDos, i) => {
        if (toDos[i].isImportant) { //Star important tasks
            document.querySelector(`#task-${i} lord-icon.star`).classList.add("hidden");
            document.querySelector(`#task-${i} span.star`).classList.remove("hidden");
        }
        if (toDos[i].isFinished) task.toggleFinish(document.querySelector(`#task-${i} .finish-icon`)); //Mark finished tasks
    }

    return {
        setTheme, getTheme, toggleSidebar, toggleForm, closeForm, addTask, markTask
    };
})();

export { ui };