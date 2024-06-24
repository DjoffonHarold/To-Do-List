import Project from './project.js'
import Task from './task.js';
class ProjectManager{
    constructor(){
        /// this.tasks =  this.loadTasks() || [];
         this.projects = [];
         this.defaultProject = new Project("Default Project")
         this.projects.push(this.defaultProject);
         this.taskIdCounter = 1;
         this.selectedProject = null;
     }
 
     createProject(name){
         const newProject = new Project(name)
         this.projects.push(newProject)
         this.displayProject()
         return newProject
     }
 
     addTaskToProject(projectName, title, description, dueDate, priority) {
         const project = this.getProjectByName(projectName);
         if (project) {
             const newTask = new Task(this.taskIdCounter++, title, description, dueDate, priority);
             project.addTask(newTask);
             this.displayTask(projectName);
         }
     }
     
     getProjectByName(name) {
         return this.projects.find(project => project.name === name);
     }
 
     displayProject() {
         const projectList = document.getElementById('tasks-list-side');
         projectList.innerHTML = '';
         this.projects.forEach(project => {
             const projectItem = document.createElement('li');
             projectItem.textContent = project.name;
             projectItem.addEventListener('click', () => this.selectProject(project.name));
             projectList.appendChild(projectItem);
         });
     }
 
}
export default ProjectManager
/*
import Project from './project.js'

class ProjectManager{
    constructor(){
        this.projects = this.loadProjects() || []
       
    }

    addProject(name){
        const project = new Project(name)
        this.projects.push(project)
        this.saveProjects()
        this.displayProject()
    }

    editProject(index, newName){
        const project = this.projects[index]
        project.name =  newName
        this.saveProjects()
        this.displayProject()
    }

    deleteProject(index){
        this.projects.splice(index,1)
        this.saveProjects()
        this.displayProject()
    }

    saveProjects(){
        localStorage.setItem('projectManager', JSON.stringify(this.projects))
    }
    
    loadProjects(){
        const projects = localStorage.getItem('projectManager')
        return projects? JSON.parse(projects) : null
    }

    

    displayProject(){
    const projectSide = document.querySelector('.tasks-list-side')
    projectSide.innerHTML = " "

    this.projects.forEach((project, index)=>{
        const projectItem = document.createElement('div')
        projectItem.classList.add('projectItem')

        projectItem.addEventListener('click',()=>{
            
            
        })   

        const NameSpan = document.createElement("span")
        NameSpan.textContent = `${project.name}`;
       

        const editProjectButton = document.createElement("button")
        editProjectButton.classList.add("editProjectButton")
        editProjectButton.textContent = '🖊️'
        editProjectButton.style.cursor = 'pointer';
        editProjectButton.style.marginLeft = '10px'
        editProjectButton.addEventListener('click', ()=>{
        const newName = prompt('newName', project.name)
        this.editProject(index, newName)
        })

        const deleteProjectButton = document.createElement("button")
        deleteProjectButton.classList.add("deleteProjectButton")
        deleteProjectButton.textContent = '❎'
        deleteProjectButton.style.cursor = 'pointer';
        deleteProjectButton.style.marginLeft = '10px'
        deleteProjectButton.addEventListener('click', ()=>{
            this.deleteProject(index);
        })

        projectItem.appendChild(NameSpan)
        projectItem.appendChild(editProjectButton)
        projectItem.appendChild(deleteProjectButton)
        projectSide.appendChild(projectItem)
        


    })
       
    
}

   
}
export default ProjectManager*/
