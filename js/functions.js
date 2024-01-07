const functions = {
    /**
     * Function to create an html element an set values given as parameter 
     * 
     * @param {string} tag 
     * @param {Array} classes 
     * @param {string} content 
     * @param {string} url 
     * @param {string} href 
     * @param {string} value 
     * @param {string} label 
     * @param {string} id 
     * @returns html element
     */
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
    /**
     * Function to check if a data attribute has or not content
     * 
     * @param {JSON} data 
     * @returns bool
     */
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
    /**
     * Function to show user name into div given as parameter
     * 
     * @param {string} name 
     * @param {HTMLDivElement} element 
     */
    setNameUser:(name,element) => {
        let user = JSON.parse(localStorage.getItem(name))
        element.innerHTML = '<i class="fa-solid fa-user"></i> ' + user.name
    }
}

export default functions;
