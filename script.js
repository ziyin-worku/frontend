// Initial list of tasks
let tasks = [
  { id: 1, title: "Buy groceries", completed: false },
  { id: 2, title: "Read a book", completed: true },
];

// Current filter state: "all", "completed", or "pending"
let filter = "all";

// Render the list of tasks based on the current filter
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  // Filter tasks according to the selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  // Create and append each task item to the DOM
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

  // Update the filter button styles
  updateFilterButtons();
}

// Add a new task to the list
function addTask() {
  const input = document.getElementById("taskInput");
  const error = document.getElementById("error");
  const title = input.value.trim();

  // Show error if input is empty
  if (!title) {
    error.style.display = "block";
    return;
  }
  error.style.display = "none";

  // Create new task object
  const newTask = {
    id: Date.now(),
    title,
    completed: false,
  };

  // Add new task and re-render
  tasks.push(newTask);
  input.value = "";
  renderTasks();
}

// Toggle the completed state of a task
function toggleComplete(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// Delete a task by its id
function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// Set the current filter and re-render tasks
function filterTasks(type) {
  filter = type;
  renderTasks();
}

// Update the active state of filter buttons
function updateFilterButtons() {
  const buttons = document.querySelectorAll(".filter-container button");
  buttons.forEach((button) => {
    button.classList.remove("active");
    if (button.textContent.toLowerCase() === filter) {
      button.classList.add("active");
    }
  });
}

// Add task when Enter key is pressed in the input field
document.getElementById("taskInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// Initial render of tasks
renderTasks();
