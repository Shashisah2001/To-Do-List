document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  if (taskInput.value !== '') {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${taskInput.value}</span>
      <button class="remove" onclick="removeTask(this)">Remove</button>
    `;
    taskList.appendChild(li);

    saveTask(taskInput.value);

    taskInput.value = '';
  }
}

function removeTask(button) {
  const li = button.parentElement;
  li.remove();

  const taskText = li.querySelector('span').innerText;
  removeTaskFromStorage(taskText);
}

function saveTask(task) {
  let tasks = getTasksFromStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(task) {
  let tasks = getTasksFromStorage();
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromStorage() {
  const tasksString = localStorage.getItem('tasks');
  return tasksString ? JSON.parse(tasksString) : [];
}

function loadTasks() {
  const tasks = getTasksFromStorage();
  const taskList = document.getElementById('taskList');

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task}</span>
      <button class="remove" onclick="removeTask(this)">Remove</button>
    `;
    taskList.appendChild(li);
  });
}