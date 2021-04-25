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
    new Task(1, "1Make Breakfast", "meat, vegetable", false, '2021-04-18'),
    new Task(2, "2Make Dinner", "meat, rice", true, '2021-04-20'),
    new Task(3, "3Make Supper", "meat, potato", false, '2021-04-25'),
    new Task(4, "4Make Breakfast", "meat, vegetable", false, '2021-04-18'),
    new Task(5, "5Make Dinner", "meat, rice", true, '2021-04-20'),
    new Task(6, "6Make Supper", "meat, potato", false, '2021-04-25'),
    new Task(7, "7Make Breakfast", "meat, vegetable", false, '2021-04-18'),
    new Task(8, "8Make Dinner", "meat, rice", true, '2021-04-20'),
    new Task(9, "9Make Supper", "meat, potato", false, '2021-04-25')
]

function deleteTask(target) {
    let id = target.parentElement.id;
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id == id) {
            todoList.splice(i, 1);
            target.parentElement.remove();
            console.log("deleted: " + id);
        }
    }
}

function completeTask(target) {
    let id = target.parentElement.parentElement.id;
    // let todoList[id - 1].done = todoList[id - 1].done;

    console.log("Start info: " + id + " - " + todoList[id - 1].done);

    if (todoList[id - 1].done) {
        todoList[id - 1].done = false;
        target.parentElement.classList.remove("task-complete");
        console.log(todoList[id - 1].done);        
    } else {
        todoList[id - 1].done = true;
        target.parentElement.classList.add("task-complete");
        console.log("Task Done inside:" + todoList[id - 1].done);
    }
    console.log("Task Done outside:" + todoList[id - 1].done);
    
}


function hideTasks(target) {
    let section = document.querySelectorAll('section');
    for (let i = 0; i < todoList.length; i++) {
        if(todoList[i] !== undefined && todoList[i].done) {
            console.log(section[i].id, todoList[i]);
            section[i].style.display = 'none';
        }
    }
}

function showAllTasks(target) {
    let section = document.querySelectorAll('section');
    for (let i = 0; i < todoList.length; i++) {
        if(todoList[i] !== undefined && todoList[i].done) {
            console.log(section[i].id, todoList[i]);
            section[i].style.display = 'flex';
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
