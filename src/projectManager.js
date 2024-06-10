import Project from "./project.js"
import todayImg from './todayImg.png'
class ProjectManager{
    constructor(){
        this.projects = []
    }

    addProject(name){
        const project = new Project(name)
        this.projects.push(project)
        this.displayProject()
    }

    editProject(index, newName){
        const project = this.projects[index]
        project.name =  newName
        this.displayProject()
    }

    deleteProject(index){
        this.projects.splice(index,1)
        this.displayProject()
    }

    displayProject(){
        const projectSide = document.querySelector('.tasks-list-side')
        projectSide.innerHTML = " "

        this.projects.forEach((project, index)=>{
            const projectItem = document.createElement('div')
            projectItem.classList.add('projectItem')

           /* projectItem.addEventListener('click',()=>{
                const tasksList = document.querySelector('#tasks-list')
                while(tasksList.firstChild) { 
                    tasksList.removeChild(tasksList.firstChild); 
                }
                tasksList.appendChild(taskItem)
            })*/

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