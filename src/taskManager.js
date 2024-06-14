
import Task from './task.js'
import ProjectManager from './projectManager.js';
 class TaskManager {
    constructor(){
        this.tasks =  this.loadTasks() || [];
        
    }

    addTask(title, description, dueDate, priority, projectName=null){
        const task = new Task(title, description, dueDate, priority)
        this.tasks.push(task)
        // Ajouter la tache au projet specifique
        if(projectName) {
            ProjectManager.addTaskToProject(projectName, task)
        }
        this.saveTasks()
        this.displayTask() 
    }

    editTask(index, newTitle, newDescription, newDueDate, newPriority){
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
    }
    saveTasks(){
        localStorage.setItem('taskManager', JSON.stringify(this.tasks))
    }
    loadTasks(){
        const tasks = localStorage.getItem('taskManager');
        return tasks ? JSON.parse(tasks) : null;   
    }


    displayTask(){
    const tasksList = document.querySelector('.tasks-list')
    tasksList.innerHTML = " "

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
        deleteTaskButton.textContent = 'delete'
        deleteTaskButton.style.cursor = 'pointer';
        deleteTaskButton.style.marginLeft = '10px'
        deleteTaskButton.addEventListener('click', ()=>{
            this.deleteTask(index);
        })

        const editTaskButton = document.createElement("button")
        editTaskButton.classList.add("editButton")
        editTaskButton.textContent = 'edit'
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

  

}
export default TaskManager







































  