import './style.css'
/*
import {initialLoad} from './loadPage'
initialLoad()*/
import TaskManager from './taskManager';

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();
    taskManager.renderProjects();
    
    const sidebar = document.getElementById('sideleftbar');
    const sidebarContent = document.getElementById('sidebar-content');
    const toggleButton = document.getElementById('toggle-sidebar');

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebar.classList.toggle('closed');
    });

    function openAddProjectDialog() {
        document.getElementById('open-dialog-project').showModal();
    }

   /* function openAddTaskDialog(projectName) {
        document.getElementById('task-dialog').showModal();
        document.getElementById('taskIdInput').value = '';
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('due-date').value = '';
        document.getElementById('priority').value = 'medium';
        document.getElementById('project').value = projectName;
    }*/

    /*function openEditTaskDialog(taskId, projectName) {
        const project = taskManager.getProjectByName(projectName);
        if (project) {
            const task = project.tasks.find(task => task.id === taskId);
            if (task) {
                document.getElementById('taskIdInput').value = task.id;
                document.getElementById('title').value = task.title;
                document.getElementById('description').value = task.description;
                document.getElementById('due-date').value = task.dueDate;
                document.getElementById('priority').value = task.priority;
                document.getElementById('project').value = projectName;
                document.getElementById('task-dialog').showModal();
            }
        }
    }*/

    function deleteTask(taskId, projectName) {
        taskManager.deleteTask(taskId, projectName);
    }

    function toggleTaskCompletion(taskId, projectName, completed) {
        taskManager.toggleTaskCompletion(taskId, projectName, completed);
    }

    document.getElementById('open-dialog-side').addEventListener('click', openAddProjectDialog);
    //document.getElementById('add-task-button').addEventListener('click',openAddTaskDialog)
  

    document.getElementById('project-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const projectName = document.getElementById('project-name').value.trim();
        if (projectName) {
            taskManager.createProject(projectName);
           
            document.getElementById('open-dialog-project').close();
        }
    });

    document.getElementById('task-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const taskId = document.getElementById('taskIdInput').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;
        const priority = document.getElementById('priority').value;
        const projectName = document.getElementById('project').value;
        const completed = false;
        if (taskId) {
            taskManager.editTask(parseInt(taskId), title, description, dueDate, priority, projectName, completed);
        } else {
      taskManager.addTaskToProject(projectName, title, description, dueDate, priority);
        }
        
        document.getElementById('task-dialog').close();
    });

    document.getElementById('confirm-edit-project').addEventListener('click', () => {
        const oldProjectName = document.getElementById('old-project-name').value;
        const newProjectName = document.getElementById('new-project-name').value;
        if (newProjectName) {
            taskManager.editProject(oldProjectName, newProjectName);
            document.getElementById('edit-project-dialog').close();
        }
    });

    document.getElementById('close-dialog').addEventListener('click', () => {
        document.getElementById('task-dialog').close();
    });

    document.getElementById('close-dialog-side').addEventListener('click', () => {
        document.getElementById('open-dialog-project').close();
    });
});