export default class Task {
    constructor(id, title, description, dueDate, priority, completed = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }
}








/*
class Task{
    constructor(title, description,dueDate, priority, project, completed = false){
        
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.completed = completed;
    }

     
}
export default Task*/
