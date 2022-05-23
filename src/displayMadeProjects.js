import { parseISO, isBefore, isEqual, isAfter, addDays } from "date-fns"
import { save } from "."

const todaysDate = new Date().toISOString().slice(0, 10)
const nextWeeksDate = addDays(parseISO(todaysDate), 7)
const noDateProjects = document.querySelector('[data-id="noDate"]')
const todaysProjects = document.querySelector('[data-id="todaysDate"]')
const thisWeeksProjects = document.querySelector('[data-id="thisWeeksDate"]')
const upcomingProjects = document.querySelector('[data-id="upcomingDate"]')
const whichProject = document.querySelector('[data-id="whichProject"]')

function displayMadeProjects(array, arraytoPutProject) {
    array.forEach(project => {
        const projectandTaskcontainer = document.createElement("div")
        const tasksULContainer = document.createElement("div")
        const tasksUL = document.createElement("ul")
        tasksUL.classList.add(`project${project.id}`)
        tasksUL.classList.add("projectTasks")
        tasksULContainer.appendChild(tasksUL)
        const newProjectDiv = document.createElement("div")
        newProjectDiv.classList.add("displayprojects_projectModal")
        projectandTaskcontainer.classList.add(`project${project.id}`)
        const projectDiv = document.createElement("h2")
        let text = document.createTextNode(project.projectTitle)
        const projectOption = document.createElement("option")
        projectOption.setAttribute("value", project.id)
        projectOption.classList.add(`Option${project.id}`)
        projectOption.textContent = project.projectTitle
        whichProject.appendChild(projectOption)
        projectDiv.appendChild(text)
        projectDiv.classList.add("displayprojects__ProjectTitle")
        projectDiv.setAttribute("id", `project${project.id}`)
        newProjectDiv.appendChild(projectDiv)

        //remove button
        const removeButton = document.createElement("img")
        removeButton.src = "../dist/close.svg"
        removeButton.classList.add("removeButton")
        removeButton.addEventListener("click", (e) => {
            const answer = confirm("Are you sure you want to delete this?")
            let projectAlreadyInIndex = e.target.parentElement.parentElement.dataset.id
            if (answer === true) {
                const removeOption = document.querySelector(`.Option${projectAlreadyInIndex}`)
                removeOption.remove()
                removeButton.parentElement.parentElement.remove()
                const projectAlreadyInIndexValue = arraytoPutProject.findIndex(elem =>
                    elem.id === projectAlreadyInIndex
                )
                arraytoPutProject.splice(projectAlreadyInIndexValue, 1)
                save()
            }
        })
        newProjectDiv.appendChild(removeButton)
        
        projectandTaskcontainer.setAttribute("data-id", `${(project.id)}`)
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

export { displayMadeProjects }