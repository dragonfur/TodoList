import { parseISO, isBefore, isEqual, isAfter, addDays } from "date-fns"
import { deleteProject, save } from "."
import { setCurrentProjectID } from "./checkLocalStorage"
import { saveToLocalStorage } from "./saveProjects"

const todaysDate = new Date().toISOString().slice(0, 10)
const nextWeeksDate = addDays(parseISO(todaysDate), 7)
const noDateProjects = document.querySelector('[data-id="noDate"]')
const todaysProjects = document.querySelector('[data-id="todaysDate"]')
const thisWeeksProjects = document.querySelector('[data-id="thisWeeksDate"]')
const upcomingProjects = document.querySelector('[data-id="upcomingDate"]')
const whichProject = document.querySelector('[data-id="whichProject"]')

let i

function setIValue(iValue) {
    i = iValue
    return {
        i
    }
}

function createProjects(array, arraytoPutProject) {
    array.forEach(project => {
        const projectandTaskcontainer = document.createElement("div")
        const tasksULContainer = document.createElement("div")
        const tasksUL = document.createElement("ul")
        tasksUL.classList.add(`project${i}`)
        tasksUL.classList.add("projectTasks")
        tasksULContainer.appendChild(tasksUL)
        const newProjectDiv = document.createElement("div")
        newProjectDiv.classList.add("displayprojects_projectModal")
        projectandTaskcontainer.classList.add(`project${i}`)
        const projectDiv = document.createElement("h2")
        let text = document.createTextNode(project.projectTitle)
        const projectOption = document.createElement("option")
        projectOption.setAttribute("value", i)
        projectOption.classList.add(`Option${i}`)
        projectOption.textContent = project.projectTitle
        whichProject.appendChild(projectOption)
        projectDiv.appendChild(text)
        projectDiv.classList.add("displayprojects__ProjectTitle")
        projectDiv.setAttribute("id", `project${i}`)
        project.id = `${i}`
        project.tasksList = new Array()
        i++
        newProjectDiv.appendChild(projectDiv)

        //remove button
        const removeButton = document.createElement("img")
        removeButton.src = "../dist/close.svg"
        removeButton.classList.add("removeButton")
        removeButton.addEventListener("click", (e) => {
            const answer = confirm("Are you sure you want to delete this?")
            let projectAlreadyInIndex = e.target.parentElement.parentElement.dataset.id
            console.log(projectAlreadyInIndex)
            if (answer === true) {
                const removeOption = document.querySelector(`.Option${projectAlreadyInIndex}`)
                removeOption.remove()
                removeButton.parentElement.parentElement.remove()
                deleteProject(projectAlreadyInIndex)
            }
        })
        newProjectDiv.appendChild(removeButton)
        
        projectandTaskcontainer.setAttribute("data-id", `${(i-1)}`)
        projectandTaskcontainer.appendChild(newProjectDiv)
        projectandTaskcontainer.appendChild(tasksUL)

        //date check
        const todaysDateforComparison = parseISO(todaysDate)
        const thisWeeksDateforComparison = nextWeeksDate
        if (project.projectDate === "none") {
            noDateProjects.appendChild(projectandTaskcontainer)
        }
        else if (isEqual(parseISO(project.projectDate), todaysDateforComparison)) {
            todaysProjects.appendChild(projectandTaskcontainer)
        }
        else if (isAfter(parseISO(project.projectDate), todaysDateforComparison)) {
            if ((isBefore(parseISO(project.projectDate), thisWeeksDateforComparison)) || (isEqual(parseISO(project.projectDate), thisWeeksDateforComparison))) {
                thisWeeksProjects.appendChild(projectandTaskcontainer)
            }
            else {
                upcomingProjects.appendChild(projectandTaskcontainer)
            }
        }
        updateProject(arraytoPutProject, project)
    })
    return arraytoPutProject
}

function updateProject(arraytoPutProject, project) {
    arraytoPutProject.push(project)
    return arraytoPutProject
}

export { createProjects, setIValue }