import { retrieveTask } from "."
import { toDoFactory } from "./toDoFactory"

let v = 1

function setVValue(vValue) {
    v = vValue
    return {
        v
    }
}

function createTask(pTitle, tName, tDue, tPriority, tDesc) {
    
    const newTask = toDoFactory(pTitle, tName, tDue, tPriority, tDesc)
    newTask.id = `${v}`
    v++
    retrieveTask(newTask)
}

export { createTask, setVValue }