import functions from './functions.js'
import New from './New.js'
import Product from './Product.js'
import User from './User.js'
import Article from './Article.js'
/**
 * class to determinate a saver onject
 */
class Saver {


    /**
     * Function to convert all information in New Object and stroage all fo them into allNews array
     * 
     * @param {JSON} data 
     * @returns New Object Array
     */
    stroageNews = (data) => {
        let allNews = []

        data.articles.forEach(element => {
            allNews.push(new New(element.author,
                element.content,
                element.description,
                element.publishedAt,
                element.source.name,
                element.title,
                element.url,
                element.urlToImage))
        });
        return allNews
    }
    /**
     * Function to convert all information in Product Object and stroage all fo them into alProduct array
     * 
     * @param {JSON} data 
     * @returns Product Object Array
     */
    stroageProducts = (data) => {
        let allProducts = []

        data.products.forEach(element => {
            allProducts.push(new Product(
                element.albumTitle,
                element.department,
                element.updateDate,
                element.image,
                element.longDescription,
                element.url
            ))
        });
        return allProducts
    }
    /**
     * Function to convert all information in User Object and stroage all fo them into allUser array
     * 
     * @param {JSON} data 
     * @returns User Object Array
     */
    storageUsers = (data) => {
        let allUsers = []
        data.results.forEach(element => {
            allUsers.push(new User(
                element.name.first,
                element.name.last,
                element.email,
                element.picture.thumbnail,
                element.dob.age
            ))
        });
        return allUsers
    }
    /**
     * Function to convert all information in Article Object and stroage all fo them into allArticles array
     * 
     * @param {JSON} data 
     * @returns Article Object Array
     */
    storageArticles = (allNews,allUsers) => {
        let random
        let allArticles = []

        allNews.forEach(element => {
            random = Math.floor(Math.random() * allUsers.length)
            allArticles.push(new Article(element, allUsers[random]))
        });
        return allArticles
    }
    /**
     * Function to determinate which funtion call to get a aspedific array filled by taking informatino from parameter item given
     * 
     * @param {JSON} data 
     * @param {string} item 
     * @param {Array} allUsers 
     * @param {Array} allNews 
     * @returns object Array
     */
    storageData = async (data, item,allUsers,allNews) => {
        //Conditional to check if data has or nor values
        if (functions.dataHasValues(data)) {
            switch (item) {
                case 'user':
                    return this.storageUsers(data)
                case 'news':
                    return this.stroageNews(data)
                case 'product':
                    return this.stroageProducts(data)
                case 'articles':
                    return this.storageArticles(allNews,allUsers)
            }
        }
        return false
    }

}

export default Saver