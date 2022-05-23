const projectFactory = (projectTitle, projectDate) => {
    class projectMaker {
        constructor(projectTitle, projectDate) {
            this.projectTitle = projectTitle
            this.projectDate = projectDate
        }
    }

    const createProject = new projectMaker(projectTitle, projectDate)
    return createProject
}

export {projectFactory}