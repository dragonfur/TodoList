import { save, updateTask } from "."

function removeTask(e) {
    e.target.parentElement.remove()
    let taskId = e.target.parentElement.dataset.id
    let projectId = e.target.parentElement.dataset.projectid
    updateTask(projectId, taskId)
}
    

export { removeTask }