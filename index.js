const addTodoBtn = document.querySelector(".todo-add");
const inputTodo = document.querySelector("form input");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

addTodoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", checkRemove);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", todoLoaded);

function addTodo(e) {
    e.preventDefault();
    const todo = document.createElement("div");
    todo.classList.add("todo");
    const newTodo = `             
        <li>${inputTodo.value}</li>
        <span class="check-task far fa-check-square"></span>
        <span class="delete-task far fa-trash-alt"></span>
    `;
    todo.innerHTML = newTodo;
    todoList.appendChild(todo);
    mainLocalTodo(inputTodo.value);
    inputTodo.value = "";
}

function checkRemove(e) {
    const classLists = [...e.target.classList];
    const todo = e.target.parentElement;
    if (classLists[0] === "delete-task") {
        removeLocalTodo(todo);
        todo.remove();
    } else if (classLists[0] === "check-task") {
        todo.classList.toggle("checked-todo");
        todo.firstElementChild.classList.toggle("text-todo");
    }
}

function filterTodo(e) {
    const todos = [...todoList.childNodes];
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("checked-todo")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (todo.classList.contains("checked-todo")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    });
}

function mainLocalTodo(todo) {
    let savedTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function todoLoaded() {
    let savedTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];
    savedTodos.forEach((todoSaved) => {
        const todo = document.createElement("div");
        todo.classList.add("todo");
        const newTodo = `             
        <li>${todoSaved}</li>
        <span class="check-task far fa-check-square"></span>
        <span class="delete-task far fa-trash-alt"></span>
    `;
        todo.innerHTML = newTodo;
        todoList.appendChild(todo);
    });
}

function removeLocalTodo(todoRemoved) {
    let savedTodos = localStorage.getItem("todos") ?
        JSON.parse(localStorage.getItem("todos")) : [];
    const filteredTodos = savedTodos.filter((t) => {
        return t !== todoRemoved.children[0].innerText;
    })
    localStorage.setItem("todos", JSON.stringify(filteredTodos))
}