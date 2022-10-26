const task = (() => {
    function finishTask(e) {
        e.target.innerText = "task_alt";
        e.target.classList.add("finished");
        e.target.nextElementSibling.classList.add("finished");
    }
    function unFinishTask(e) {
        e.target.innerText = "circle";
        e.target.classList.remove("finished");
        e.target.nextElementSibling.classList.remove("finished");
    }
    function starTask(e) {
        e.target.classList.add("hidden");
        e.target.tagName === "LORD-ICON" ? e.target.nextElementSibling.classList.remove("hidden") : e.target.previousElementSibling.classList.remove("hidden");
    }
    return { finishTask, unFinishTask, starTask };
})();

export { task };