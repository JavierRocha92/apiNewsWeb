const functions = {
    createElement: (tag, classes = false, content = false, url = false, href = false, value = false, label = false, id = false) => {
        const element = document.createElement(tag)
        if (classes) {
            classes.forEach(clas => {
                element.classList.add(clas)
            });
        }
        if (content) element.textContent = content
        if (url) element.src = url
        if (id) element.id = id
        if (value) element.value = value
        if (label) element.label = label
        if (href) element.href = href

        return element
    }
}

export default functions;
