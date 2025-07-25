var container = document.createElement('div')
container.classList.add('loaderContainer')
document.body.append(container)

var loader = document.createElement('div')
loader.classList.add('loader')
container.append(loader)

window.addEventListener("load", () => {
    container.style.display = "none"
})

window.addEventListener("beforeunload", () => {
    container.style.display = "flex"
})