import { format, isEqual, parseISO, isAfter, isBefore, parse, addWeeks  } from "date-fns"
import { editTask } from "."
import { addTaskListener, opentaskModal } from "./formsLogic"
import { removeTask } from "./removetask"

const dateParser = (tDue) => {
    const todaysDate = new Date().toISOString().slice(0, 10)
    const todaysDateParsed = parseISO(todaysDate)
    const tDueParsed = parseISO(tDue)
    const nextWeeksDate = addWeeks(todaysDateParsed, 1)

    const date = document.createElement("div")
    date.setAttribute("id", "date")
    // let formattedDate 
    if (isEqual(tDueParsed, todaysDateParsed)) {
        date.textContent = "Due today"
    }
    else if (isAfter(tDueParsed, todaysDateParsed) && isBefore(tDueParsed, nextWeeksDate)) {
        const DateFormattedWeek = format(tDueParsed, 'MMM do')
        date.textContent = `Due ${DateFormattedWeek}`
    }
    else if (isAfter(tDueParsed, nextWeeksDate) || isEqual(tDueParsed,nextWeeksDate)) {
        const DateFormattedUpcoming = format(tDueParsed, 'MMM do, yyyy')
        date.textContent = `Due ${DateFormattedUpcoming}`
    }
    else {
        date.textContent = "No date"
    }
    return date
}

const toDoFactory = (pTitle, tName, tDue, tPriority, tDesc) => {
    class toDoMaker {
        constructor(pTitle, tName, tDue, tPriority, tDesc) {
            this.projectTitle = pTitle
            this.taskName = tName
            this.taskDue = tDue
            this.taskPriority = tPriority
            this.taskDesc = tDesc
        }
    }

    const createNewTask = new toDoMaker (pTitle, tName, tDue, tPriority, tDesc)
    return createNewTask
}

const toDoCreator = (tPriority, tName, tDue, tDesc, tID) => {
    //task li container
    const taskLI = document.createElement("li")
    taskLI.setAttribute("id", "projectTasks")
    
    //priority
    const priorityType = document.createElement("div")
    priorityType.classList.add("priority")
    priorityType.setAttribute("id", tPriority)
    priorityType.addEventListener("click", (e) => {
        removeTask(e)
    })

    //text and date container
    const textandDateContainer = document.createElement("div")
    textandDateContainer.classList.add("textandDate")

    //text
    const text = document.createElement("div")
    text.setAttribute("id", "text")
    text.textContent = tName

    //date
    const date = dateParser(tDue)

    //task description
    const descUL = document.createElement("ul")
    descUL.classList.add("details")
    descUL.setAttribute("data-id", "hidden")
    const description = document.createElement("div")
    description.textContent = `Desc: ${tDesc}`
    description.setAttribute("id", "description")
    descUL.appendChild(description)

    //info container 
    const infoContainer = document.createElement("div")
    infoContainer.classList.add("editButtonsInfo")

    //task edit
    const editButton = document.createElement("img")
    editButton.src = "../dist/pencil-outline.svg"
    editButton.setAttribute("class", 'editImg')
    editButton.setAttribute("id", "edit")
    editButton.addEventListener("click", (e) => {
        const taskSubmit = document.querySelector('[data-id="addTask"]')
        const submitEdit = document.querySelector('[data-id="editTask"]')    
        const taskEditorTitle = document.querySelector(".task__top-title")
        taskEditorTitle.textContent = "Modify Task"
        const projectID = e.target.parentElement.parentElement.parentElement.dataset.projectid
        const taskID = e.target.parentElement.parentElement.parentElement.dataset.id
        const taskNameReference = e.target.parentElement.parentElement.firstChild
        const taskPriorityReference = e.target.parentElement.parentElement.parentElement.firstChild
        const taskDateReference = e.target.parentElement.firstChild
        const taskDescReference = e.target.parentElement.parentElement.nextSibling.firstChild
        taskSubmit.style.display = "none"
        submitEdit.style.display = "block"
        editTask(projectID, taskID, taskNameReference, taskDateReference, taskPriorityReference, taskDescReference)
        opentaskModal()

    })

    //dropdown desc
    const dropDownDesc = document.createElement("img")
    dropDownDesc.setAttribute("id", "dropDown")
    dropDownDesc.classList.add("dropDown")
    dropDownDesc.src = "../dist/menu-down.svg"
    dropDownDesc.addEventListener("click", (e) => {
        const desc = e.target.parentElement.parentElement.nextSibling
        if (desc.dataset.id === "hidden") {
            desc.style.display = "block"
            dropDownDesc.src = "../dist/menu-up.svg"
            desc.setAttribute("data-id", "showing")
        }
        else {
            desc.style.display = "none"
            dropDownDesc.src = "../dist/menu-down.svg"
            desc.setAttribute("data-id", "hidden")
        }
    })

    textandDateContainer.appendChild(text)
    infoContainer.appendChild(date)
    infoContainer.appendChild(editButton)
    infoContainer.appendChild(dropDownDesc)
    textandDateContainer.appendChild(infoContainer)
    taskLI.appendChild(priorityType)
    taskLI.appendChild(textandDateContainer)
    taskLI.appendChild(descUL)

    return taskLI
}

export {toDoFactory, toDoCreator, dateParser}