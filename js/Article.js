import User from './User.js'
import New from './New.js'
import functions from './functions.js'
class Article{
    constructor(news,user){
        this._news = news
        this._user = user
    }
    get news(){
        return this._news
    }
    set news(news){
        this._news = news
    }
    get user(){
        return this._user
    }
    set user(user){
        this._user = user
    }
    getAsCard(){
        const article = functions.createElement('ARTICLE',['article'])
        const newsCard = this._news.getAsCard()
        const userCard = this._user.getAsCard()
        article.appendChild(newsCard)
        article.appendChild(userCard)
        return article
    }
}
export default Article
