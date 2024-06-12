
import TaskManager from "./taskManager.js"
class Project{
    constructor(name){
         this.name = name
        
         
    }
}
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
                const tasksList = document.querySelector('#tasks-list')
                while(tasksList.firstChild) { 
                    tasksList.removeChild(tasksList.firstChild); 
                }
                const newTasksList = document.createElement('div')
               
            })   

            const NameSpan = document.createElement("span")
            NameSpan.textContent = `${project.name}`;
           

            const editProjectButton = document.createElement("button")
            editProjectButton.classList.add("editProjectButton")
            editProjectButton.textContent = 'edit'
            editProjectButton.style.cursor = 'pointer';
            editProjectButton.style.marginLeft = '10px'
            editProjectButton.addEventListener('click', ()=>{
            const newName = prompt('newName', project.name)
            this.editProject(index, newName)
            })

            const deleteProjectButton = document.createElement("button")
            deleteProjectButton.classList.add("deleteProjectButton")
            deleteProjectButton.textContent = 'delete'
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
export default ProjectManager