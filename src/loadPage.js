
import TaskManager from './taskManager'

function initialLoad(){
        

/*taskManager.addTask("Fitness club", "Go to gym","07/06/2024", "high")
taskManager.addTask("Fitness club", "Go to gym","07/06/2024", "high")
taskManager.addTask("Fitness club", "Go to gym","07/06/2024", "high")
taskManager.addTask("Fitness club", "Go to gym","07/06/2024", "high")*/

document.getElementById('open-dialog').addEventListener('click', function() {
  document.getElementById('task-dialog').showModal();
});
document.getElementById('close-dialog').addEventListener('click', function() {
  document.getElementById('task-dialog').close();
});


    const taskManager = new TaskManager();
    document.getElementById('task-form').addEventListener('submit', function(event) {
        event.preventDefault();
      
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;
        const priority = document.getElementById('priority').value;
      
        taskManager.addTask(title, description, dueDate, priority);
      
        document.getElementById('tasks-list').appendChild(taskItem);
      
        document.getElementById('task-form').reset();
        document.getElementById('task-dialog').close();
      });
    

  
 
  
}
export default initialLoad