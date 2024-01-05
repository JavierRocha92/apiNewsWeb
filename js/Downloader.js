class Downonloader {
    constructor(newsKey,bestbuyKey) {
        this._newsKey = newsKey
        this._bestbuyKey = bestbuyKey
    }
    get newsKey() {
        return this._newsKey
    }

    set newsKey(newsKey) {
        this._newsKey = newsKey
    }
    get bestbuyKey() {
        return this._bestbuyKey
    }

    set bestbuyKey(bestbuyKey) {
        this._bestbuyKey = bestbuyKey
    }

    //Functions about fecth information 
    fetchNews = async () => {
        const news = await fetch('https://newsapi.org/v2/everything?q=world&apiKey=' + this._newsKey)
        // const news = await fetch('https://newsapi.org//v2/everything?apiKey=& + this._newsKeyformat=json')
        //Conditional to check is request was well
        const json = await news.json()
        return json

    }


    fetchNewsByCategory = async (categorySelect) => {
        try {
            const category = categorySelect.value
            const news = await fetch('https://newsapi.org/v2/top-headlines?category=' + category + '&apiKey=' + this._newsKey)
            //Conditional to check is request was well
            if (!news.ok) {
                return null
            }
            const json = await news.json()
            return json

        } catch (error) {
            return null
        }
    }
    fetchNewsByCountry = async (countrySelect) => {
        try {
            const codeCountry = countrySelect.value.slice(countrySelect.value.indexOf(',') + 2)
            const news = await fetch('https://newsapi.org/v2/top-headlines?country=' + codeCountry + '&apiKey=' + this._newsKey)
            //Conditional to check is request was well
            if (!news.ok) {
                return null
            }
            const json = await news.json()
            return json

        } catch (error) {
            return null
        }
    }

    fetchNewsByKeyword = async (keyWordInput) => {
        try {
            const keyWord = keyWordInput.value.trim()
            const news = await fetch('https://newsapi.org/v2/top-headlines?q=' + keyWord + '&apiKey=' + this._newsKey)
            //Conditional to check is request was well
            if (!news.ok) {
                return null
            }
            const json = await news.json()
            return json

        } catch (error) {
            return null
        }
    }
    fetchNewsBySource = async (sourceSelect) => {
        try {
            const source = sourceSelect.value
            const news = await fetch('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this._newsKey)
            //Conditional to check is request was well
            if (!news.ok) {
                return null
            }
            const json = await news.json()
            return json

        } catch (error) {
            return null
        }
    }
    fetchProducts = async (filter, categorySelect, keyWordInput) => {
        try {
            //Conditinal to check if butotn pressed was caegorySelect
            const category = (filter == 'category') ? categorySelect.value : 'technology'
            //Conditional to check if button pressed was keyEordInput
            const keyWord = (keyWordInput.value.trim() != '') ? keyWordInput.value.trim() : 'mobile'
            //Condtitional to construct url
            const url = (filter == 'category')
                ? 'https://api.bestbuy.com/v1/products(categoryPath.name=' + category + ')?apiKey=' + this._bestbuyKey + '&format=json'
                : 'https://api.bestbuy.com/v1/products(search=' + keyWord + ')?apiKey=' + this._bestbuyKey + '&format=json'
            const news = await fetch(url)
            //Conditional to check is request was well
            if (!news.ok) {
                return null
            }
            const json = await news.json()
            return json

        } catch (error) {
            return null
        }
    }

    fetchUsers = async () => {
        const users = await fetch('https://randomuser.me/api/?results=20')
        const json = await users.json()
        return json
    }

    fetchCategories = async () => {
        const sources = await fetch('https://newsapi.org/v2/top-headlines/sources?apiKey=' + this._newsKey + '&format=json')
        const json = await sources.json()
        return json
    }

}

export default Downonloader