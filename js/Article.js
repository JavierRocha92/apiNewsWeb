import User from './User.js'
import New from './New.js'
import functions from './functions.js'
/**
 * class to determiante an Articel Obejct
 */
class Article {
    /**
     * Function to construct an Article Object by takign this parameters given
     * 
     * @param {New} news 
     * @param {User} user 
     */
    constructor(news, user) {
        this._news = news
        this._user = user
    }
    // Getter and Setter for the news
    get news() {
        return this._news;
    }
    set news(news) {
        this._news = news;
    }

    // Getter and Setter for the user
    get user() {
        return this._user;
    }
    set user(user) {
        this._user = user;
    }
    /**
     * Funcition to create an html div element taking information about Article attributes and convert into card format
     * 
     * @returns html div element
     */
    getAsCard() {
        const article = functions.createElement('ARTICLE', ['article'])
        const newsCard = this._news.getAsCard()
        const userCard = this._user.getAsCard()
        article.appendChild(userCard)
        article.appendChild(newsCard)
        return article
    }
}
export default Article
