import { addProjectListener, addTaskListener, closeModal } from "./formsLogic"
import { projectCreation, taskCreation } from "./domLogic.js"
import { toDoFactory, toDoCreator, dateParser } from "./toDoFactory"
import { projectFactory } from "./projectFactory"
import { compareAsc, format, getDate, parseISO, addDays, parse, isEqual, isAfter, isBefore } from 'date-fns'
import { id, pt } from "date-fns/locale"
import { createTask } from './createTask.js'
import { createProjects } from "./projectUICreator"
import { saveToLocalStorage } from "./saveProjects"
import { taskCreator } from "./taskUICreator"
import { editTasks } from "./editTask"
import { checkLocalStorage } from "./checkLocalStorage"
import { displayMadeProjects } from "./displayMadeProjects"

let projects = []
let projectAlreadyIn = []

//check local storage
let example = checkLocalStorage()
if (example !== undefined) {
    projects = example.example
    displaylocalStorageProjects(projects, projectAlreadyIn)
    projects = []
    projectAlreadyIn.forEach(project => {
        if (project.tasksList.length > 0) {
            const index = projectAlreadyIn.findIndex(elem => 
                elem.id === project.id)
            displaytask(index)
        }
    })
    console.log(projectAlreadyIn)
}

//listen for submission
addProjectListener()
addTaskListener()

//create todos
function retrieveTask(data) {
    const newTask = data
    pushTask(newTask, projectAlreadyIn)
}

//read and push task
function pushTask(task, projectsArray) {
    const projectIndex = projectsArray.findIndex(elem =>
        elem.id == task.projectTitle
    )
    projectsArray[projectIndex].tasksList.push(task)
    save()
    displaytask(projectIndex)
}

//edit task
function editTask(pIndex, tIndex, taskNameReference, taskDateReference, taskPriorityReference, taskDescReference, array) {
    editTasks (pIndex, tIndex, taskNameReference, taskDateReference, taskPriorityReference, taskDescReference, projectAlreadyIn)
    console.log(projectAlreadyIn)
    save()
}

//update/delete task 
function updateTask(projectID, taskID) {
    const projectIndex = projectAlreadyIn.findIndex(elem =>
        elem.id === projectID
    )
    const taskIndex = projectAlreadyIn[projectIndex].tasksList.findIndex(
        elem => elem.id === taskID
    )
    projectAlreadyIn[projectIndex].tasksList.splice(taskIndex, 1)
    save()
}

//create projects
function retrieveProject(data) {
    const newProject = data
    projects.push(newProject)
    displayproject(projects, projectAlreadyIn)
    projects = []
}

//update projects
function deleteProject(projectID) {
    const projectAlreadyInIndexValue = projectAlreadyIn.findIndex(elem =>
        elem.id === projectID
    )
    projectAlreadyIn.splice(projectAlreadyInIndexValue, 1)
    save()
}

//save to localstorage
function save() {
    saveToLocalStorage(projectAlreadyIn)
}

//display tasks
function displaytask(index) {
    taskCreator(index, projectAlreadyIn)
}

//display projects
function displayproject(projects, projectAlreadyIn) {
    projectAlreadyIn = createProjects(projects, projectAlreadyIn)
    save()
}

//display localStorage projects
function displaylocalStorageProjects(projects, projectAlreadyIn) {
    displayMadeProjects(projects, projectAlreadyIn)
}

export { retrieveTask, retrieveProject, editTask, save, updateTask, deleteProject }