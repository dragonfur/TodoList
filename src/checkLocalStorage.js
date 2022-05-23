import { setVValue } from "./createTask"
import { setITitleValue } from "./domLogic"
import { setIValue } from "./projectUICreator"

function checkLocalStorage() {
    if (localStorage.getItem("projects") === null) {
        console.log("There are no projects available!")
        setIValue(1)
        setITitleValue(1)
        setVValue(1)
        return
    }
    else {
        let example = JSON.parse(localStorage.getItem("projects"))
        setCurrentProjectID(example)
        setCurrentTaskID(example)
        return {
            example
        }
    }
}

function setCurrentProjectID(projectsArray) {
    const x = Math.max.apply(Math, projectsArray.map(project => project.id))
    setIValue(x+1)
    setITitleValue(x+1)
}

function setCurrentTaskID(projectsArray) {
    projectsArray.forEach(project => {
    let x = 1
      project.tasksList.forEach(task => {
          if (task.id > x) {
              x = task.id
              x = parseInt(x)
              setVValue(x)
          }
          else {
              return
          }
      })
    })
}

export { checkLocalStorage, setCurrentProjectID }