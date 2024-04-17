export const openModal = (modal) => {
    const layout = document.createElement('div')
    layout.classList.add("modal-backdrop")
    layout.classList.add("fade")
    document.body.append(layout)

    modal.style.display = 'block'
    setTimeout(() => {
        modal.classList.add('show')
        layout.classList.add('show')
    }, 300)

}
export const closeModal = (modal) => {
    const layout = document.querySelector('.modal-backdrop')
    if (layout) {
        layout.classList.remove('show')
    }
    modal.classList.remove('show')
    setTimeout(() => {
        modal.style.display = 'none'
        if (layout) {
            layout.remove()
        }

    }, 500)
}
