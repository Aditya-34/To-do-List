const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-ele");
const displayList = document.getElementById("display-items");

function saveTasks() {
    localStorage.setItem("jkart-tasks", JSON.stringify(tasks));
}
function loadTasks() {
    const stored = localStorage.getItem("jkart-tasks");
    return stored ? JSON.parse(stored) : [];
}

let tasks = loadTasks();
let editingIndex = null;

taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const value = taskInput.value.trim();
    if (!value) return;

    if (editingIndex !== null) {
        // UPDATE existing task
        tasks[editingIndex] = value;
        editingIndex = null;
        taskInput.value = "";
        taskForm.querySelector("input[type=submit]").value = "Submit";
    } else {
        // ADD new task
        tasks.push(value);
        taskInput.value = "";
    }
    saveTasks();
    renderTasks();
});

function renderTasks() {
    displayList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className =
            "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
      <span id="task-text-${index}">${task}</span>
      <div class="d-flex gap-2">
        <button class="btn btn-sm btn-outline-primary" onclick="editTask(${index})">✏️ Update</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${index})">🗑️ Delete</button>
      </div>
    `;

        displayList.appendChild(li);
    });
}

function editTask(index) {
    taskInput.value = tasks[index];
    editingIndex = index;
    taskInput.focus();
    taskForm.querySelector("input[type=submit]").value = "Update";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    if (editingIndex === index) {
        editingIndex = null;
        taskInput.value = "";
        taskForm.querySelector("input[type=submit]").value = "Submit";
    }
    saveTasks();
    renderTasks();
}
renderTasks();
