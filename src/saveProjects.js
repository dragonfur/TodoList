//save to localstorage

function saveToLocalStorage(array) {
    localStorage.setItem("projects", JSON.stringify(array))
}

export { saveToLocalStorage }