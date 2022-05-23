import { sub } from "date-fns"
import { projectCreation, taskCreation } from "./domLogic"

const addProjectListener = () => { 
    const addNewProject = document.querySelector('[data-id="addNewProject"]')
    const projectOverlay = document.querySelector('[data-id="projectOverlay"]')
    const projectModal = document.querySelector(".addNewProject")
    const close = document.querySelector(".close")
    const projectCloseButton = document.querySelector('[data-id="projectCloseButton"]')
    addNewProject.addEventListener("click", (e) => {
        projectOverlay.style.display = "flex"
        projectModal.classList.remove("scale-out-center")
        projectModal.classList.add("scale-in-center")
    })

    projectCloseButton.addEventListener("click", () => {
        closeModal(projectModal, projectOverlay)
    })

    close.addEventListener("click", () => {
        closeModal(projectModal, projectOverlay)
    })
    
    projectOverlay.addEventListener("click", (e) => {
        if (e.target === projectOverlay){
            closeModal(projectModal, projectOverlay)
        }
        else {
            return
        }
    })

    projectCreation()

    return {
        projectModal,
        projectOverlay
    }
}

const addTaskListener = () => { 

    const addNewTask = document.querySelector('[data-id="addNewTask"]')
    const taskEditorTitle = document.querySelector(".task__top-title")
    const taskOverlay = document.querySelector('[data-id="taskOverlay"]')
    const taskModal = document.querySelector(".addNewTask__modal")
    const close = document.querySelector(".closeTask")
    const taskCloseButton = document.querySelector('[data-id="taskCloseButton"]')
    const taskSubmit = document.querySelector('[data-id="addTask"]')
    const submitEdit = document.querySelector('[data-id="editTask"]')



    addNewTask.addEventListener("click", () => {
        taskEditorTitle.textContent = "New Task"
        taskSubmit.style.display = "block"
        submitEdit.style.display = "none"
        opentaskModal()
    })

    taskCloseButton.addEventListener("click", () => {
        closeModal(taskModal, taskOverlay)
    })

    close.addEventListener("click", () => {
        closeModal(taskModal, taskOverlay)
    })

    taskOverlay.addEventListener("click", (e) => {
        if (e.target === taskOverlay){
            closeModal(taskModal, taskOverlay)
        }
        else {
            return
        }
    })

    taskCreation()

    return {
        taskModal,
        taskOverlay
    }
}

const opentaskModal = () => {
    const taskOverlay = document.querySelector('[data-id="taskOverlay"]')
    const taskModal = document.querySelector(".addNewTask__modal")

    taskOverlay.style.display = "flex"
    taskModal.classList.remove("scale-out-center")
    taskModal.classList.add("scale-in-center")
}

function closeModal(modal, overlay) {
        const projectTitleInput = document.getElementById("pTitle")
        const projecteDateInput = document.getElementById("projectDueDate")
        const buttonContainer = document.querySelector(".bottom__actionButtons2")
        modal.classList.remove("scale-in-center")
        modal.classList.add("scale-out-center")
        setTimeout(() => {
            overlay.style.display = "none"
        }, 400);
        projectTitleInput.value = ""
        projecteDateInput.value = ""
}

export { addProjectListener, addTaskListener, closeModal, opentaskModal }