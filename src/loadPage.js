/*

import Project from './project.js';
import TaskManager from './taskManager.js'

function initialLoad(){
  const taskManager = new TaskManager();
  taskManager.displayTask() 
  //taskManager.displayProject()
  
 
 document.getElementById('open-dialog').addEventListener('click', function() {
   document.getElementById('task-dialog').showModal();
 });
 document.getElementById('close-dialog').addEventListener('click', function() {
   document.getElementById('task-dialog').close();
 });
 
 document.getElementById('open-dialog-side').addEventListener('click', function() {
   document.getElementById('open-dialog-project').showModal();
 });
 document.getElementById('close-dialog-side').addEventListener('click', function() {
   document.getElementById('open-dialog-project').close();
 });
 
 
 
 document.getElementById('task-form-side').addEventListener('submit', function(event) {
   event.preventDefault();
   
   const projectName = document.getElementById('project').value;
   
     taskManager.createProject(projectName)
     taskManager.displayTask()
     document.getElementById('task-form-side').reset();
     document.getElementById('open-dialog-project').close();
    });
   
 
 
 document.getElementById('task-form').addEventListener('submit', function(event) {
         event.preventDefault();
     
     const title = document.getElementById('title').value;
     const description = document.getElementById('description').value;
     const dueDate = document.getElementById('due-date').value;
     const priority = document.getElementById('priority').value;
     const projectName = document.getElementById('project').value
    
       
        taskManager.addTask(title, description, dueDate, priority, projectName);
        document.getElementById('task-form').reset();
        document.getElementById('task-dialog').close();
 });

}



function selectProject(projectName) {
  const taskManager = new TaskManager();
  taskManager.selectProject(projectName);
}

    

  
 
  

export  {initialLoad,  selectProject, }

*/