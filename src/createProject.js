import { retrieveProject } from "."
import { projectFactory } from "./projectFactory"

function createProject(pTitle, pDate){
    let projectTitle = pTitle
    let projectDate = pDate

    const newProject = projectFactory(projectTitle, projectDate)
    retrieveProject(newProject)
}

export { createProject }