import { parseISO, isBefore } from "date-fns"
import { closeModal } from "./formsLogic"
import { dateParser } from "./toDoFactory"


function editTasks (pIndex, tIndex, taskNameReference, taskDateReference, taskPriorityReference, taskDescReference, array) {

    const todaysDate = new Date().toISOString().slice(0, 10)

    //submit button
    const editButton = document.querySelector("[data-id='editTask']")

    //project+task index
    const projectOfEdit = array.findIndex(elem => elem.id === pIndex)
    const taskIndex = array[projectOfEdit].tasksList.findIndex(
        elem => elem.id === tIndex
    )

    //initial values to edit
    const taskReference = array[projectOfEdit].tasksList[taskIndex]
    //getting input boxes
    const whichProject = document.getElementById("whichProject")
    const taskTitle = document.getElementById("taskTitle")
    const taskDueDate = document.getElementById("taskDueDate")
    const taskPriority = document.getElementById("taskPriority")
    const taskDesc = document.getElementById("taskDesc")

    //setting initial values
    whichProject.value = taskReference.projectTitle
    taskTitle.value = taskReference.taskName
    if (taskReference.taskDue !== "none") {
        taskDueDate.value = taskReference.taskDue
    }
    taskPriority.value = taskReference.taskPriority
    taskDesc.value = taskReference.taskDesc

    //listen for edit
    editButton.addEventListener("click", () => {
        if (isBefore(parseISO(taskDueDate.value), parseISO(todaysDate))) {
            alert("Date can not be in the past!")
            return
        }
        const taskOverlay = document.querySelector('[data-id="taskOverlay"]')
        const taskModal = document.querySelector(".addNewTask__modal")
        closeModal(taskModal, taskOverlay)

        taskReference.taskName = taskTitle.value

        taskNameReference.textContent = taskTitle.value

        const date = dateParser(taskDueDate.value)
        taskDateReference.textContent = date.textContent
        taskReference.taskDue = taskDueDate.value

        taskPriorityReference.setAttribute("id", taskPriority.value)
        
        taskDescReference.textContent = taskDesc.value
        taskReference.taskDesc = taskDesc.value

        return {array}
    })
    return {array}
} 

export { editTasks }