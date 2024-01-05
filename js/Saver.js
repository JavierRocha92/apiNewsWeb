import functions from './functions.js'
import New from './New.js'
import Product from './Product.js'
import User from './User.js'
import Article from './Article.js'
class Saver {


    //Function about save data
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

    storageArticles = (allNews,allUsers) => {
        let random
        let allArticles = []

        allNews.forEach(element => {
            random = Math.floor(Math.random() * allUsers.length)
            allArticles.push(new Article(element, allUsers[random]))
        });
        return allArticles
    }

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