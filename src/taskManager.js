import Project from './project';
import Task from './task';

export default class TaskManager {
    constructor() {
        this.projects =[]
        this.loadProjects();
        this.taskIdCounter = 1;
        this.selectedProject = null;
        this.renderProjects();
        if (this.projects.length === 0) {
            this.createDefaultProject();
        } else {
            this.selectedProject = this.projects[0].name; // Select the first project by default
        }
        this.renderProjects();
        if (this.selectedProject) {
            this.renderTasks(this.selectedProject);
        }

    }

    createDefaultProject() {
        const defaultProject = this.createProject('Default Project');
        this.addTaskToProject(defaultProject.name, 'Default Task', 'This is a default task', '2024-06-25', 'medium');
        this.selectedProject = defaultProject.name;
        this.saveProjects()
    }

    createProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        this.saveProjects()
        this.renderProjects();
        return newProject;
    }

    addTaskToProject(projectName, title, description, dueDate, priority) {
        const project = this.getProjectByName(projectName);
        if (project) {
            const newTask = new Task(this.taskIdCounter++, title, description, dueDate, priority);
            project.addTask(newTask);
            this.renderTasks(projectName);
            this.saveProjects()
        }
    }

    getProjectByName(name) {
        return this.projects.find(project => project.name === name);
        
    }

    saveProjects() {
        const data = {
            projects: this.projects,
            taskIdCounter: this.taskIdCounter
        };
        localStorage.setItem('taskManager', JSON.stringify(data));
    }

    loadProjects() {
        const data = localStorage.getItem('taskManager');
        if (data) {
            const parsedData = JSON.parse(data);
            this.projects = parsedData.projects.map(projectData => {
                const project = new Project(projectData.name);
                project.tasks = projectData.tasks.map(taskData => new Task(taskData.id, taskData.title, taskData.description, taskData.dueDate, taskData.priority, taskData.completed));
                return project;
            });
            this.taskIdCounter = parsedData.taskIdCounter;
        }else {
            this.createDefaultProject();
        }
        
    }

   /* initializeDefaultProject() {
        const defaultProject = this.createProject('Default Project');
        this.addTaskToProject('Default Project', 'Default Task', 'This is a default task description', '2024-12-31', 'medium');
        this.selectedProject = defaultProject.name;
        this.renderTasks(defaultProject.name);
    }*/
    

    renderProjects() {
        const projectList = document.getElementById('projects-list');
       
        projectList.innerHTML = " ";
       

      
        this.projects.forEach(project => {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            projectItem.innerHTML = `
                <span class="project-name">${project.name}</span>
                <button class="edit-project-button">🖊️</button>
                <button class="delete-project-button">🗑️</button>
            `;
            projectItem.querySelector('.project-name').style.cursor = 'pointer';
            projectItem.querySelector('.project-name').classList.add('projectItem')
            projectItem.querySelector('.edit-project-button').classList.add('editProject')
            projectItem.querySelector('.delete-project-button').classList.add('deleteProject')
            projectItem.querySelector('.project-name').addEventListener('click', () => this.selectProject(project.name));
            projectItem.querySelector('.edit-project-button').addEventListener('click', () => this.openEditProjectDialog(project.name));
            projectItem.querySelector('.delete-project-button').addEventListener('click', () => this.deleteProject(project.name));
            projectList.appendChild(projectItem);

           
        });
    }

    renderTasks(projectName) {
        const project = this.getProjectByName(projectName);
        const taskList = document.getElementById('tasks-list');
        
        if (!project) {
            console.error(`Project not found: ${projectName}`);
            return;
        }

        taskList.innerHTML = ` <h3>Tasks for ${project.name}</h3>`;

        project.tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('item')
            taskItem.style.cursor = 'pointer'
           
            taskItem.className = `task ${task.completed ? 'completed' : ''}`;

            taskItem.innerHTML = `
           
                
                    <input type="checkbox" ${task.completed ? 'checked' : ''}>
                    <h3 class="task-title">Title: ${task.title}</h3>
                                        
                    <h4 style = "font-size:20px; color:#0369a1;">Description: ${task.description}</h4>
                   
                    <span style = "font-size:20px">Due Date: ${task.dueDate}</span>
                   
                    <span style = "font-size:20px; color:#b91c1c">Priority: ${task.priority}</span>
                    
                    <button class="edit-task-button">🖊️</button>

                    <button class="delete-task-button">❎</button>
                   
            `;
            taskList.appendChild(taskItem);

            taskItem.querySelector('.edit-task-button').addEventListener('click', () => this.openEditTaskDialog(task.id, project.name));
            taskItem.querySelector('.delete-task-button').addEventListener('click', () => this.deleteTask(task.id, project.name));
            taskItem.querySelector('input[type="checkbox"]').addEventListener('change', (event) => this.toggleTaskCompletion(task.id, project.name, event.target.checked));
        });
            
        
        
    }

    toggleTaskCompletion(taskId, projectName, completed) {
        const project = this.getProjectByName(projectName);
        if (project) {
            const task = project.tasks.find(task => task.id === taskId);
            if (task) {
                task.completed = completed;
                this.renderTasks(projectName);
                this.saveProjects()
            }
        }
    }

    deleteTask(taskId, projectName) {
        const project = this.getProjectByName(projectName);
        if (project) {
            project.deleteTask(taskId);
            this.renderTasks(projectName);
            this.saveProjects()
        }
    }

    editTask(taskId, title, description, dueDate, priority, projectName, completed) {
        const project = this.getProjectByName(projectName);
        if (project) {
            project.editTask(taskId, title, description, dueDate, priority, completed);
            this.renderTasks(projectName);
            this.saveProjects()
        }
    }
    
    deleteProject(projectName) {
        this.projects = this.projects.filter(project => project.name !== projectName);
        this.saveProjects();
        this.renderProjects();
        const taskList = document.getElementById('tasks-list');
        taskList.innerHTML = '';
    }

    editProject(oldName, newName) {
        const project = this.getProjectByName(oldName);
        if (project) {
            project.name = newName;
            this.saveProjects();
            this.renderProjects();
            if (this.selectedProject === oldName) {
                this.selectedProject = newName;
                this.renderTasks(newName);
            }
        }
    }

    selectProject(projectName) {
        this.selectedProject = projectName;
        this.saveProjects()
        this.renderTasks(projectName);
        const addTaskButton = document.getElementById('add-task-button');
        addTaskButton.style.display = 'block';

        //addTaskButton.onclick = () => openAddTaskDialog(projectName);

    function openAddTaskDialog(projectName) {
        document.getElementById('task-dialog').showModal();
        document.getElementById('taskIdInput').value = '';
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('due-date').value = '';
        document.getElementById('priority').value = 'medium';
        document.getElementById('project').value = projectName;
    }
        document.getElementById('add-task-button').addEventListener('click', () => openAddTaskDialog(projectName));
    }
    openEditTaskDialog(taskId, projectName) {
        const project = this.getProjectByName(projectName);
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
    }

     openEditProjectDialog(projectName) {
        document.getElementById('edit-project-dialog').showModal();
        document.getElementById('old-project-name').value = projectName;
        document.getElementById('new-project-name').value = projectName;
    }
}
/*
 class TaskManager {
      constructor(){
        this.tasks = []
        this.projects = [];
      }

      getProjectByName(name) {
        return this.projects.find(project => project.name === name);
    }

    displayTask(projectName) {
        
        const project = this.getProjectByName(projectName);
        const taskList = document.getElementById('tasks-list');
       

        taskList.innerHTML = `
        <button id="add-task-button">Add Task</button>`
        document.getElementById('add-task-button').addEventListener('click', () => openAddTaskDialog(project.name));

        this.tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task ${task.completed ? 'completed' : ''}`;

            taskItem.innerHTML = `
                <div class="task-header">
                    <input type="checkbox" ${task.completed ? 'checked' : ''}>
                    <span class="task-title">${task.title}</span>
                </div>
                <div class="task-body">
                    <div class="task-detail">
                        <label>Description:</label>
                        <span>${task.description}</span>
                    </div>
                    <div class="task-detail">
                        <label>Due Date:</label>
                        <span>${task.dueDate}</span>
                    </div>
                    <div class="task-detail">
                        <label>Priority:</label>
                        <span>${task.priority}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="edit-task-button">Edit</button>
                    <button class="delete-task-button">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);

            taskItem.querySelector('.edit-task-button').addEventListener('click', () => openEditTaskDialog(task.id, project.name));
            taskItem.querySelector('.delete-task-button').addEventListener('click', () => deleteTask(task.id, project.name));
            taskItem.querySelector('input[type="checkbox"]').addEventListener('change', (event) => toggleTaskCompletion(task.id, project.name, event.target.checked));
        });
    }

    toggleTaskCompletion(index, projectName, completed) {
        const project = this.getProjectByName(projectName);
        if (project) {
            const task = project.tasks.find(task => task.id === index);
            if (task) {
                task.completed = completed;
                this.displayTask(projectName);
            }
        }
    }
    deleteTask(index, projectName) {
        const project = this.getProjectByName(projectName);
        if (project) {
            project.deleteTask(index);
            this.displayTask(projectName);
        }
    }

    editTask(index, title, description, dueDate, priority, projectName, completed) {
        const project = this.getProjectByName(projectName);
        if (project) {
            project.editTask(index, title, description, dueDate, priority, completed);
            this.displayTask(projectName);
        }
    }

    selectProject(projectName) {
        this.selectedProject = projectName;
        this.displayTask(projectName);
    }
   /* editTask(index, newTitle, newDescription, newDueDate, newPriority){
        const task = this.tasks[index]
        task.title = newTitle
        task.description = newDescription
        task.dueDate = newDueDate
        task.priority = newPriority
        this.saveTasks()
        this.displayTask()
    }

    deleteTask(index){
        this.tasks.splice(index,1)  
        this.saveTasks()
        this.displayTask()      
    }

    switchTask(index){
        this.tasks[index].switchCompleted()
        this.saveTasks()
        this.displayTask() 
    }*/
   /* saveTasks(){
        localStorage.setItem('taskManager', JSON.stringify(this.tasks))
    }
    loadTasks(){
        const tasks = localStorage.getItem('taskManager');
        return tasks ? JSON.parse(tasks) : null;   
    }*/


  /*  displayTask(){
    const tasksList = document.getElementById('tasks-list')
    tasksList.innerHTML = " "

    const projectSide = document.querySelector('.tasks-list-side')
    projectSide.innerHTML = " "

    this.projects.forEach(project => {
        const projectDiv = document.createElement('div')
        projectDiv.className = 'project'
        projectDiv.innerHTML = `<h3>${project.name}</h3>`
        projectDiv.classList.add('projectItem') 
        projectDiv.addEventListener('click', ()=>{

        })

        project.tasks.forEach(task =>{
            const taskDiv = document.createElement('div')
           // taskDiv.className = 'task'
            taskDiv.classList.add('taskItem')
            const titleSpan = document.createElement("span")
            titleSpan.textContent = `${task.title}`;
    
            const descriptionSpan = document.createElement("span")
            descriptionSpan.textContent = `${task.description}`
    
            const dueDateSpan = document.createElement("span")
            dueDateSpan.textContent = `Date : ${task.dueDate}`
    
            const prioritySpan = document.createElement("span")
            prioritySpan.textContent = `Priority : ${task.priority}`
    
            const switchTaskButton = document.createElement("button")
            switchTaskButton.classList.add("switchButton")

            switchTaskButton.textContent = `${task.completed ? 'completed' : 'not completed'}`
            switchTaskButton.style.cursor = 'pointer';
            switchTaskButton.style.marginLeft = '10px';
            switchTaskButton.addEventListener("click",(index, projectName, completed)=>{
                const taskManager = new TaskManager()
                const project = taskManager.getProjectByName(projectName);
                if (project) {
                    const task = project.getTaskById(index);
                    if (task) {
                        task.completed = completed;
                        taskManager.displayTask();
                    }
                }
              
            })
    
            const deleteTaskButton = document.createElement("button")
            deleteTaskButton.classList.add("deleteButton")
            deleteTaskButton.textContent = '❎ '
            deleteTaskButton.style.cursor = 'pointer';
            deleteTaskButton.style.marginLeft = '10px'
            deleteTaskButton.addEventListener('click', (index) => {
            
                this.deleteTask(index);
            })
    
            const editTaskButton = document.createElement("button")
            editTaskButton.classList.add("editButton")
            editTaskButton.textContent = '🖊️'
            editTaskButton.style.cursor = 'pointer';
            editTaskButton.style.marginLeft = '10px'
            editTaskButton.addEventListener('click', (index, projectName)=>{
                const taskManager = new TaskManager()
                const project = taskManager.getProjectByName(projectName)
                const task = project.getTaskById(index)
                if(task){
                  
                 
                  document.getElementById('title').value = task.title;
                  document.getElementById('description').value = task.description;
                  document.getElementById('due-date').value = task.dueDate;
                  document.getElementById('priority').value = task.priority;
                  document.getElementById('project').value = projectName;
                }
            })
            taskDiv.appendChild(titleSpan)
            taskDiv.appendChild(descriptionSpan)
            taskDiv.appendChild(dueDateSpan)
            taskDiv.appendChild(prioritySpan)
            taskDiv.appendChild(switchTaskButton)
            taskDiv.appendChild(editTaskButton)
            taskDiv.appendChild(deleteTaskButton)
            tasksList.appendChild(taskDiv)
        })
        projectSide.appendChild(projectDiv)
    })

    this.tasks.forEach((task, index)=>{
        const taskItem = document.createElement('li')
        taskItem.classList.add('taskItem')
        
        const titleSpan = document.createElement("span")
        titleSpan.textContent = `${task.title}`;

        const descriptionSpan = document.createElement("span")
        descriptionSpan.textContent = `${task.description}`

        const dueDateSpan = document.createElement("span")
        dueDateSpan.textContent = `Date : ${task.dueDate}`

        const prioritySpan = document.createElement("span")
        prioritySpan.textContent = `Priority : ${task.priority}`

        const switchTaskButton = document.createElement("button")
        switchTaskButton.classList.add("switchButton")
        switchTaskButton.textContent = `${task.completed ? 'completed' : 'not completed'}`
        switchTaskButton.style.cursor = 'pointer';
        switchTaskButton.style.marginLeft = '10px';
        switchTaskButton.addEventListener("click",()=>{
          this.switchTask(index)
          
        })

        const deleteTaskButton = document.createElement("button")
        deleteTaskButton.classList.add("deleteButton")
        deleteTaskButton.textContent = '❎ '
        deleteTaskButton.style.cursor = 'pointer';
        deleteTaskButton.style.marginLeft = '10px'
        deleteTaskButton.addEventListener('click', ()=>{
            this.deleteTask(index);
        })

        const editTaskButton = document.createElement("button")
        editTaskButton.classList.add("editButton")
        editTaskButton.textContent = '🖊️'
        editTaskButton.style.cursor = 'pointer';
        editTaskButton.style.marginLeft = '10px'
        editTaskButton.addEventListener('click', ()=>{
            const newTitle = prompt('newTitle', task.title)
            const newDescription = prompt("newDescription", task.description)
            const newDueDate = prompt("newDueDate", task.dueDate)
            const newPriority = prompt("newPriority(high, medium, low)", task.priority)
            this.editTask(index, newTitle, newDescription, newDueDate, newPriority)

        })

        
        taskItem.appendChild(titleSpan)
        taskItem.appendChild(descriptionSpan)
        taskItem.appendChild(dueDateSpan)
        taskItem.appendChild(prioritySpan)
        taskItem.appendChild(switchTaskButton)
        taskItem.appendChild(editTaskButton)
        taskItem.appendChild(deleteTaskButton)
        tasksList.appendChild(taskItem)

        
        
    })
    
}
function openEditTaskDialog(index, projectName) {
    const taskManager = new TaskManager();
    taskManager.displayProject();
    const project = taskManager.getProjectByName(projectName);
    if (project) {
        const task = project.tasks.find(task => task.id === index);
        if (task) {
            //document.getElementById('taskIdInput').value = task.id;
            document.getElementById('title').value = task.title;
            document.getElementById('description').value = task.description;
            document.getElementById('due-date').value = task.dueDate;
            document.getElementById('priority').value = task.priority;
            document.getElementById('project').value = projectName;
            document.getElementById('task-dialog').showModal();
        }
    }
}


function deleteTask(index, projectName) {
    const taskManager = new TaskManager();
    taskManager.deleteTask(index, projectName);
}

function toggleTaskCompletion(index, projectName, completed) {
    const taskManager = new TaskManager();
    taskManager.toggleTaskCompletion(index, projectName, completed);
}


function openAddTaskDialog(projectName) {
    document.getElementById('task-dialog').style.display = 'block';
    //document.getElementById('taskIdInput').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('priority').value = 'Medium';
    document.getElementById('projectNameInput').value = projectName;
}
export default TaskManager

export {deleteTask, toggleTaskCompletion,openEditTaskDialog, openAddTaskDialog}

*/





































  