import { save } from "."
import { removeTask } from "./removetask"
import { toDoCreator } from "./toDoFactory"

function taskCreator(index, projectsArray) {

    const tasksUL = document.querySelector(`ul.project${(projectsArray[index].id)}`)
    clear(tasksUL)
    projectsArray[index].tasksList.forEach(task => {
        const taskLI = toDoCreator(task.taskPriority, task.taskName, task.taskDue, task.taskDesc, task.id)
        taskLI.setAttribute("data-id", task.id)
        taskLI.setAttribute("data-projectid", projectsArray[index].id)
        tasksUL.appendChild(taskLI)
    })}

function clear(tasksUL) {

    const ulselected = tasksUL
    ulselected.innerHTML = ""

}

export { taskCreator }