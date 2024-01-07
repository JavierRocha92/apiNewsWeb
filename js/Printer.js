//inport fromo others js files
import Product from './Product.js'
import New from './New.js'
/**
 * class to determinate a printer object
 */
class Printer{
    /**
     * Funtion to show all object in allArticlws array by calling for each loop by calling appenChild() function for section element given as parameter
     * 
     * @param {Array} allArticles 
     * @param {HTMLSelectElement} section 
     * @param {number} page 
     */
    showNews(allArticles,section,page){
        section.innerHTML = ''
        let fragment = document.createDocumentFragment()
        for (let i = (page - 1) * 10; i < page * 10; i++) {
            if (allArticles[i]) {
                const articleNews = allArticles[i].getAsCard()
                fragment.appendChild(articleNews)
            }
            else {
                break
            }
        }
        section.appendChild(fragment)
    }
    /**
     * Funtion to show all object in allProducts array by calling for each loop by calling appenChild() function for aside element given as parameter
     * 
     * @param {Array} allProducts 
     * @param {htmlasidelement} aside 
     */
    showProducts(allProducts,aside){
        aside.innerHTML = ''
        let fragment = document.createDocumentFragment()
        for (let i = 0; i <= 5; i++) {
            const articleProduct = allProducts[i].getAsCard()
            fragment.appendChild(articleProduct)
        }
        aside.appendChild(fragment)
    }
}

export default Printer