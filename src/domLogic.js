import { closeModal } from "./formsLogic"
import { projectListener } from "."
import { parseISO, isBefore, parse, isEqual } from "date-fns"
import { createTask } from "./createTask"
import { createProject } from "./createProject"

let i

function setITitleValue(iValue) {
    i = iValue
    return {
        i
    }
}

const projectCreation = () => {
    const todaysDate = new Date().toISOString().slice(0, 10)
    const projectOverlay = document.querySelector('[data-id="projectOverlay"]')
    const projectModal = document.querySelector(".addNewProject")
    const projectSubmit = document.querySelector('[data-id="addProject"]')
    let projectTitle
    let projectDate

    projectSubmit.addEventListener("click", () => {
        const projectTitleInput = document.getElementById("pTitle")
        if (projectTitleInput.value === "")
        {projectTitle = `My project ${i}`;
        i++}
        else {
            projectTitle = projectTitleInput.value
        }
        const projecteDateInput = document.getElementById("projectDueDate")
        if (isBefore(parseISO(projecteDateInput.value), parseISO(todaysDate))) {
            alert("Date cannot be in the past!")
            return
        }
        if (projecteDateInput.value !== "")
        {projectDate = projecteDateInput.value}
        else {
            projectDate = "none"
        }
        closeModal(projectModal, projectOverlay)
        createProject(projectTitle, projectDate)
    })
}

const taskCreation = () => {
    const todaysDate = new Date().toISOString().slice(0, 10)
    const taskOverlay = document.querySelector('[data-id="taskOverlay"]')
    const taskModal = document.querySelector(".addNewTask__modal")
    const taskSubmit = document.querySelector('[data-id="addTask"]')

    let projectChosen
    let tName
    let tDue
    let tPriority
    let tDesc

    taskSubmit.addEventListener("click", () => {
        const whichProject = document.getElementById("whichProject")
        const taskTitle = document.getElementById("taskTitle")
        const taskDueDate = document.getElementById("taskDueDate")
        const taskPriority = document.getElementById("taskPriority")
        const taskDesc = document.getElementById("taskDesc")

        //project chosen
        if (whichProject.value === ""){
            alert("Please choose a project")
        }

        //task due error
        if (isBefore(parseISO(taskDueDate.value), parseISO(todaysDate))) {
            alert("Date cannot be in the past!")
            return
        }

        projectChosen = whichProject.value
        tName = taskTitle.value
        tDue = taskDueDate.value
        tPriority = taskPriority.value
        tDesc = taskDesc.value

        //task priority
        taskPriority.value = "priorityLow"

        //task name
        taskTitle.value = ""
        if (tName === "") {tName = "New task"}

        //task due
        taskDueDate.value = ""
        if (tDue === "") {tDue = "none"}

        //task description
        taskDesc.value = ""

        createTask(projectChosen, tName, tDue, tPriority, tDesc)
        closeModal(taskModal, taskOverlay)
        taskSubmit.style.display = "none"
    })
}

export { projectCreation, taskCreation, setITitleValue }