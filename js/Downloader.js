/**
 * class to determinate a Downloader Object
 */
class Downonloader {
    /**
     * Function to sonstruct a Dwonloader Object tankign two apis keys attributes to connect to them
     * 
     * @param {string} newsKey 
     * @param {string} bestbuyKey 
     */
    constructor(newsKey,bestbuyKey) {
        this._newsKey = newsKey
        this._bestbuyKey = bestbuyKey
    }
    /**
     * Function to get this._newsky
     */
    get newsKey() {
        return this._newsKey
    }
    /**
     * Function to set value to this._newskey
     */
    set newsKey(newsKey) {
        this._newsKey = newsKey
    }
    /**
     * Function to get this._bestbuysky
     */
    get bestbuyKey() {
        return this._bestbuyKey
    }
    /**
     * Function to set value to this._bestbuykey
     */
    set bestbuyKey(bestbuyKey) {
        this._bestbuyKey = bestbuyKey
    }

    /**
     * Funcion to fetch asn specific information from news api and return this info convert into JSON element
     * 
     * @returns JSON 
     */
    fetchNews = async () => {
        const news = await fetch('https://newsapi.org/v2/everything?q=world&apiKey=' + this._newsKey)
        // const news = await fetch('https://newsapi.org//v2/everything?apiKey=& + this._newsKeyformat=json')
        //Conditional to check is request was well
        const json = await news.json()
        return json

    }

    /**
     * Funcion to fetch asn specific information from news api and return this info convert into JSON element, in this case information is filtered by category
     * 
     * 
     * @param {HTMLSelectElement} categorySelect 
     * @returns JSON
     */
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
    /**
     * Funcion to fetch asn specific information from news api and return this info convert into JSON element, in this case the informatino is filtered by country
     * 
     * 
     * @param {HTMLSelectElement} countrySelect 
     * @returns 
     */
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
    /**
     * Funcion to fetch asn specific information from news api and return this info convert into JSON element, in this case the informatino is filtered by key word
     * 
     * 
     * @param {HTMLInputElement} keyWordInput 
     * @returns 
     */
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
    /**
     * Funcion to fetch asn specific information from news api and return this info convert into JSON element, in this case the information is filtered by source
     * 
     * 
     * @param {HTMLSelectElement} sourceSelect 
     * @returns 
     */
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
    /**
     * Funcion to fetch asn specific information from bestnuy api and return this info convert into JSON element, in this case the informatino is filterd by category or keyword,
     * this is depending of the filter given as parameter
     * 
     * 
     * @param {string} filter 
     * @param {HTMLSelectElement} categorySelect 
     * @param {HTMLInputElement} keyWordInput 
     * @returns JSON
     */
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
    /**
     * Function to fetch an especific ifnormation from random user api, in this case only 20 users
     * 
     * @returns JSON
     */
    fetchUsers = async () => {
        const users = await fetch('https://randomuser.me/api/?results=20')
        const json = await users.json()
        return json
    }
    /**
     * FUncion to fect information about all categories form nes api
     * 
     * @returns JSON
     */
    fetchCategories = async () => {
        const sources = await fetch('https://newsapi.org/v2/top-headlines/sources?apiKey=' + this._newsKey + '&format=json')
        const json = await sources.json()
        return json
    }

}

export default Downonloader