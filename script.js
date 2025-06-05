let tasks = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Read a book", completed: true },
];
let filter = "all";

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });
  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
                    <span>${task.title}</span>
                    <div class="task-actions">
                        <button class="complete-btn" onclick="toggleComplete(${
                          task.id
                        })">
                            ${task.completed ? "Undo" : "Complete"}
                        </button>
                        <button class="delete-btn" onclick="deleteTask(${
                          task.id
                        })">Delete</button>
                    </div>
                `;
    taskList.appendChild(li);
  });
  updateFilterButtons();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const error = document.getElementById("error");
  const title = input.value.trim();
  if (!title) {
    error.style.display = "block";
    return;
  }
  error.style.display = "none";
  const newTask = {
    id: Date.now(),
    title,
    completed: false,
  };
  tasks.push(newTask);
  input.value = "";
  renderTasks();
}

function toggleComplete(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function filterTasks(type) {
  filter = type;
  renderTasks();
}

function updateFilterButtons() {
  const buttons = document.querySelectorAll(".filter-container button");
  buttons.forEach((button) => {
    button.classList.remove("active");
    if (button.textContent.toLowerCase() === filter) {
      button.classList.add("active");
    }
  });
}

document.getElementById("taskInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

renderTasks();
