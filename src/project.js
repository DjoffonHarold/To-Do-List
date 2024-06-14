class Project{

    constructor(name){
         this.name = name  
         this.tasks = loadTaskProjects() || [] 
    }

    loadTaskProjects(name) {
        // Charger les taches du projets
        const taskProjects = JSON.parse(localStorage.getItem(`${name}-tasks`))
        if (!taskProjects || taskProjects.length == 0) {
            return []
        }
        return taskProjects
    }
    
}
export default Project