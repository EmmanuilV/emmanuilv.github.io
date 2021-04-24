class Task {
    constructor(id, title, description, done, dueDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.done = done;
        this.dueDate = dueDate;
    }
}

const todoItem = document.querySelector('main');
let todoList = [
    new Task(1, "Make Breakfast", "meat, vegetable", false, '2021-04-18'),
    new Task(2, "Make Dinner", "meat, rice", true, '2021-04-20'),
    new Task(3, "Make Supper", "meat, potato", false, '2021-04-25'),
    new Task(4, "Make Breakfast", "meat, vegetable", false, '2021-04-18'),
    new Task(5, "Make Dinner", "meat, rice", true, '2021-04-20'),
    new Task(6, "Make Supper", "meat, potato", false, '2021-04-25'),
    new Task(7, "Make Breakfast", "meat, vegetable", false, '2021-04-18'),
    new Task(8, "Make Dinner", "meat, rice", true, '2021-04-20'),
    new Task(9, "Make Supper", "meat, potato", false, '2021-04-25')
]

function deleteTask(target) {
    let id = target.parentElement.id;
    console.log("Deleted id", id, todoList[id - 1]);
    delete todoList[id - 1];
    target.parentElement.remove();
}

// function generateId(task) {
//     appendTask(task, index);
//     index++;
// }

function completeTask(target) {
    let id = target.parentElement.id - 1;
    let taskDone = todoList[id].done;
    if (taskDone) {
        taskDone = false;
        target.parentElement.classList.remove("task-complete");
    } else {
        taskDone = true;
        target.parentElement.classList.add("task-complete");
    }
}

function hideTasks(target) {
    let section = document.querySelectorAll('section');
    for (let i = 0; i < section.length; i++) {
        if(todoList[i] !== undefined && todoList[i].done) {
            console.log(section[i].id, todoList[i]);
            section[i - 1].style.display = 'none';
        }
    }
}

function showAllTasks(target) {
    let section = document.querySelectorAll('section');
    for (let i = 0; i < section.length; i++) {
        if(todoList[i] !== undefined && todoList[i].done) {
            console.log(section[i].id, todoList[i]);
            section[i - 1].style.display = 'flex';
        }
    }
}

function appendTask(task) {
    const { id, title, description, done, dueDate } = task;
    let date = new Date(dueDate);
    let dateStrFormat = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
    todoItem.innerHTML +=
        `<section id="${id}">` +
        `${id}` +
        `<button onclick="deleteTask(event.target)">&#735</button>` +
            `<div class="title ${isCompleteForTitle(done)}">` +
            `<input type="checkbox"  ${isCompleteForInput(done)} onclick="completeTask(event.target)"/>` +
            `<h3>${title}</h3>` +
        `</div>` +
        `<div class="info">` +
            `<p>${description}</p>` +
            `<p ${checkDate(dueDate, done)}>${getDueDate(dateStrFormat)}</p>` +
        `</div>` +
        `</section>`;
}


function isCompleteForTitle(done) {
    if (done) {
        return 'task-complete';
    }
}

function isCompleteForInput(done) {
    if (done) {
        return 'checked';
    } else {
        return '';
    }
}

function getDueDate(dueDate) {
    if (dueDate != "" && dueDate != undefined) {
        return dueDate;
    } else {
        return "";
    }
}

function checkDate(dueDate, done) {
    let date = new Date(dueDate);
    let now = new Date();

    if (date < now && done != true) {
        return 'class="over-due-date"'
    } else {
        return '';
    }

}

todoList.forEach(appendTask);
