import './style.css'
import initialLoad from './loadPage'
initialLoad()
//Window.addEventListener("localStorage", initialLoad())


/*
const submit = document.querySelector('.buttonAddTask')

submit.addEventListener('click', (event)=>{
    event.preventDefault();
    const title = document.getElementById('title').Value
    const description = document.getElementById('description').Value
    const dueDate = document.getElementById('due-date').Value
    const priority = document.getElementById('priority').Value
    if(title && description && dueDate && priority){
        taskManager.addTask(title, description, dueDate, priority)  ;
        taskManager.displayTask()
         
    }
})*/









/*// Function to render tasks
const taskManager = new TaskManager();
function renderTasks() {
  const content = document.querySelector('.content')  
  const tasksList = document.getElementById('tasks-list');
  tasksList.innerHTML = '';

  taskManager.getTasks().forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <input type="checkbox" id="task${index}" ${task.completed ? 'checked' : ''}>
      <label for="task${index}">${task.title}</label>
      <button class="delete-btn">Delete</button>
    `;

    // Add event listener to toggle completion status
    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
      taskManager.toggleTask(index);
      renderTasks();
    });

    // Add event listener to delete task
    const deleteButton = taskItem.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      taskManager.deleteTask(index);
      renderTasks();
    });

    tasksList.appendChild(taskItem);
    content.appendChild(tasksList)
  });
}

// Add event listener to form submission
const taskForm = document.getElementById('task-form');
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const dueDate = document.getElementById('due-date').value;
  const priority = document.getElementById('priority').value;
  taskManager.addTask(title, description, dueDate, priority);
  renderTasks();
  taskForm.reset();
});




// Initial rendering
renderTasks();
*/
