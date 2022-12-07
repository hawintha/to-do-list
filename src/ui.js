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

    const showHide = (element) => {
        element.classList.contains('hidden') ? element.classList.remove('hidden') : element.classList.add('hidden');
    }
    const toggleForm = (form, isEditing) => {
        showHide(form);
        if (isEditing) {
            form.lastElementChild.previousElementSibling.classList.add('hidden'); //Hide create button
            form.lastElementChild.classList.remove('hidden'); //Show confirm edit button
            form.firstElementChild.innerText = "Edit Task";
            form.children.item(5).classList.add('hidden'); //Hide star
        } else {
            document.querySelector('.task-form').reset();
            form.lastElementChild.previousElementSibling.classList.remove('hidden'); //Show create button
            form.lastElementChild.classList.add('hidden'); //Hide confirm edit button
            form.firstElementChild.innerText = "New Task";
            form.children.item(5).classList.remove('hidden'); //Show star
        }
    }

    const addTask = (toDos, i, parent) => {
        const newTask = document.createElement('div');
        newTask.classList.add("task");
        newTask.id = "task-" + i;
        parent.appendChild(newTask);
        const newFlex = document.createElement('div');
        newFlex.classList.add("flex");
        newTask.appendChild(newFlex);
        const newSpan = document.createElement('span');
        newSpan.classList.add("finish-icon", "material-symbols-outlined");
        newSpan.innerText = "circle";
        newFlex.appendChild(newSpan);
        const newP = document.createElement('p');
        newP.innerText = toDos[i].title;
        newFlex.appendChild(newP);
        const newGrid = document.createElement('div');
        newGrid.classList.add("grid");
        newTask.appendChild(newGrid);
        const newEditIcon = document.createElement('lord-icon');
        newEditIcon.classList.add("edit-icon");
        newEditIcon.src = "https://cdn.lordicon.com/hiqmdfkt.json";
        newEditIcon.trigger = "loop-on-hover";
        newEditIcon.colors = "primary:#4FDDDE,secondary:#4FAAEF";
        newEditIcon.stroke = "100";
        newEditIcon.style = "width:32px;height:32px";
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
        newStarIcon.style = "width:32px;height:32px";
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
        newTrashIcon.style = "width:32px;height:32px";
        newTrashIcon.state = "hover-empty";
        newGrid.appendChild(newTrashIcon);
    }
    const markTask = (toDos, i) => {
        if (toDos[i].isImportant) { //Star important tasks
            document.querySelector(`#task-${i} lord-icon.star`).classList.add("hidden");
            document.querySelector(`#task-${i} span.star`).classList.remove("hidden");
        }
        if (toDos[i].isFinished) task.toggleFinish(document.querySelector(`#task-${i} .finish-icon`)); //Mark finished tasks
    }

    return {
        setTheme, getTheme, showHide, toggleForm, addTask, markTask
    };
})();

export { ui };