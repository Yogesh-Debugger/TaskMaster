const validUsername = "Yogesh";
const validPassword = "Yogesh2000";

document.getElementById('loginButton')?.addEventListener('click', login);
document.getElementById('addTaskButton')?.addEventListener('click', addTask);
document.getElementById('searchInput')?.addEventListener('keyup', searchTasks);
document.getElementById('logoutButton')?.addEventListener('click', logout);
document.getElementById('downloadButton')?.addEventListener('click', downloadTasks);

let tasks = [];

// Login Functionality
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');

    if (username === validUsername && password === validPassword) {
        window.location.href = 'index.html';
    } else {
        loginMessage.textContent = "Invalid username or password.";
    }
}

// Task Management Functionality
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const category = document.getElementById('categorySelect').value;
    const dueDate = document.getElementById('dueDate').value;

    if (taskText) {
        tasks.push({ text: taskText, priority: priority, category: category, dueDate: dueDate, completed: false });
        taskInput.value = '';
        document.getElementById('dueDate').value = '';
        renderTasks();
    } else {
        alert("Please enter a task.");
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.setAttribute('draggable', 'true');
        row.setAttribute('data-index', index);
        row.addEventListener('dragstart', dragStart);
        row.addEventListener('dragover', dragOver);
        row.addEventListener('drop', drop);

        const snoCell = document.createElement('td');
        snoCell.textContent = index + 1; // Serial number starts from 1

        const completeCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleComplete(index));
        completeCell.appendChild(checkbox);

        const taskCell = document.createElement('td');
        taskCell.textContent = task.text;

        const priorityCell = document.createElement('td');
        priorityCell.textContent = task.priority;

        const categoryCell = document.createElement('td');
        categoryCell.textContent = task.category;

        const dueDateCell = document.createElement('td');
        dueDateCell.textContent = task.dueDate;

        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => deleteTask(index));

        actionCell.appendChild(deleteButton);
        row.appendChild(snoCell);
        row.appendChild(completeCell);
        row.appendChild(taskCell);
        row.appendChild(priorityCell);
        row.appendChild(categoryCell);
        row.appendChild(dueDateCell);
        row.appendChild(actionCell);
        taskList.appendChild(row);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function searchTasks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchInput));
    renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filteredTasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.setAttribute('draggable', 'true');
        row.setAttribute('data-index', index);
        row.addEventListener('dragstart', dragStart);
        row.addEventListener('dragover', dragOver);
        row.addEventListener('drop', drop);

        const snoCell = document.createElement('td');
        snoCell.textContent = index + 1;

        const completeCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleComplete(index));
        completeCell.appendChild(checkbox);

        const taskCell = document.createElement('td');
        taskCell.textContent = task.text;

        const priorityCell = document.createElement('td');
        priorityCell.textContent = task.priority;

        const categoryCell = document.createElement('td');
        categoryCell.textContent = task.category;

        const dueDateCell = document.createElement('td');
        dueDateCell.textContent = task.dueDate;

        const actionCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => deleteTask(index));

        actionCell.appendChild(deleteButton);
        row.appendChild(snoCell);
        row.appendChild(completeCell);
        row.appendChild(taskCell);
        row.appendChild(priorityCell);
        row.appendChild(categoryCell);
        row.appendChild(dueDateCell);
        row.appendChild(actionCell);
        taskList.appendChild(row);
    });
}

// Drag and Drop Functions
let draggedIndex;

function dragStart(event) {
    draggedIndex = event.target.getAttribute('data-index');
    event.dataTransfer.effectAllowed = "move";
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
}

function drop(event) {
    event.preventDefault();
    const targetIndex = event.target.closest('tr').getAttribute('data-index');
    if (targetIndex !== draggedIndex) {
        const draggedTask = tasks[draggedIndex];
        tasks.splice(draggedIndex, 1);
        tasks.splice(targetIndex, 0, draggedTask);
        renderTasks();
    }
}

// Download Functionality
function downloadTasks() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'tasks.txt');
    downloadAnchor.click();
}

