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
    },
    dataHasValues: (data) => {
        if (data.article) {
            if (data.article.length == 0)
                return false
        }
        if (data.products) {
            if (data.products.length == 0)
                return false
        }
        if(data.results){
            if(data.results.length == 0)
            return false
        }
        return true
    },

    setNameUser:(name,element) => {
        let user = JSON.parse(localStorage.getItem('username'))
        console.log(user.name)
        element.textContent = 'User: ' + user.name
    }
}

export default functions;
