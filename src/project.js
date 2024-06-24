export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
       
    }

    addTask(task) {
        this.tasks.push(task);
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }

    editTask(taskId, newTitle, newDescription, newDueDate, newPriority, completed) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.title = newTitle;
            task.description = newDescription;
            task.dueDate = newDueDate;
            task.priority = newPriority;
            task.completed = completed;
        }
    }

    
}

/*class Project{
    constructor(name){
         this.name = name  
         this.tasks = []
    }
    addTask(task){
        this.tasks.push(task)
    }
    deleteTask(index){
        this.tasks = this.tasks.filter(task => task.id!== index)
    }

    editTask(index, newTitle, newDescription, newDueDate, newPriority, completed) {
        const task = this.tasks.find(task => task.id === index);
        if (task) {
            task.title = newTitle;
            task.description = newDescription;
            task.dueDate = newDueDate;
            task.priority = newPriority;
            task.completed = completed;
        }
    }
    getTaskById(index){
        return this.tasks = this.tasks.find(task => task.id === index)
    }
    
}
export default Project*/
