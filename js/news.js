//imports from other js files
import New from './New.js'
import Product from './Product.js'
import User from './User.js'
import Article from './Article.js'
import functions from './functions.js'
import Downloader from './Downloader.js'
import Saver from './Saver.js'
import Printer from './Printer.js'

//Elements from DOM

const section = document.getElementById('section')
const searchButton = document.getElementById('search_button')
const keyWordInput = document.getElementById('keyword-input')
const categorySelect = document.getElementById('category-select')
const countrySelect = document.getElementById('country-select')
const sourceSelect = document.getElementById('source-select')
const dateSelect = document.getElementById('date-select')
const paginator = document.getElementById('paginator')
const containerPaginator = document.getElementById('container-paginator')
const back = document.getElementById('back')
const next = document.getElementById('next')
const allButton = document.getElementById('all-button')
const username = document.getElementById('username')

//Objects

const downloader = new Downloader('e0a1ccd8efd54f3f91ef2cbb562ab56c', 'RhH0aOAQZGREdeeD4DPtS3Xr')
const saver = new Saver()
const printer = new Printer()

//Global variables

let page = parseInt(paginator.textContent)
let allNews = []
let allProducts = []
let allUsers = []
let allArticles = []
let allSources = []
let allCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
let allCountries = [
    'united arab emirates, ae',
    'argentina, ar',
    'austria, at',
    'australia, au',
    'belgium, be',
    'bulgaria, bg',
    'brazil, br',
    'canada, ca',
    'switzerland, ch',
    'china, cn',
    'colombia, co',
    'cuba, cu',
    'czech republic, cz',
    'germany, de',
    'egypt, eg',
    'france, fr',
    'united kingdom, gb',
    'greece, gr',
    'hong kong, hk',
    'hungary, hu',
    'indonesia, id',
    'ireland, ie',
    'israel, il',
    'india, in',
    'italy, it',
    'japan, jp',
    'south korea, kr',
    'lithuania, lt',
    'luxembourg, lu',
    'holy see, va',
    'morocco, ma',
    'mexico, mx',
    'malaysia, my',
    'netherlands, nl',
    'norway, no',
    'new zealand, nz',
    'philippines, ph',
    'poland, pl',
    'portugal, pt',
    'romania, ro',
    'serbia, rs',
    'russia, ru',
    'saudi arabia, sa',
    'sweden, se',
    'singapore, sg',
    'slovakia, sk',
    'thailand, th',
    'turkey, tr',
    'taiwan, tw',
    'ukraine, ua',
    'united states of america, us',
    'venezuela, ve',
    'south africa, za'
];



//Function about get information********************************************************************************

/**
 * Functions to calling aa specific funtions to fetch data depending of the filter 
 * given as prameter aln retirn this value as json object
 * 
 * @param {string} filter 
 * @returns array
 */
const getNews = async (filter) => {
    let data
    switch (filter) {
        case 'category':
            data = await downloader.fetchNewsByCategory(categorySelect)
            break
        case 'country':
            data = await downloader.fetchNewsByCountry(countrySelect)
            break
        case 'keyword':
            data = await downloader.fetchNewsByKeyword(keyWordInput)
            break
        case 'source':
            data = await downloader.fetchNewsBySource(sourceSelect)
            break
        default:
            data = await downloader.fetchNews()
    }
    const storage = saver.storageData(data, 'news', allUsers, allNews)
    if (data && data.articles.length != 0) {
        return storage
    }
    else {
    }

}
/**
 * Function to call other function for returning an array fullfilled by Users object created by taking info from fetch
 * 
 * @param {string} filter 
 * @returns array
 */
const getUsers = async (filter) => {
    const data = await downloader.fetchUsers()
    const storage = await saver.storageData(data, 'user', allUsers, allNews)
    if (storage) {
        return storage
    }
}
/**
 * Function to call other function for returning an array fullfilled by Product object created by taking info from fetch
 * 
 * @param {string} filter 
 * @returns Product array
 */
const getProducts = async (filter) => {
    const data = await downloader.fetchProducts(filter, categorySelect, keyWordInput)
    const storage = await saver.storageData(data, 'product', allUsers, allNews)
    if (storage) {
        printer.showProducts(storage, aside)
        return storage
    }

}

//Functions about load elements*****************************************************************************

/**
 * ´Funtions to create option element by calling function and set all of them into select given as parameter
 * 
 * @param {HTMLSelectElement} select 
 * @param {Array} array 
 */
const loadSelect = (select, array) => {
    const fragment = document.createDocumentFragment()
    for (const item of array) {
        const option = functions.createElement('OPTION', ['search__option'], item, false, false, item, item)
        fragment.appendChild(option)
    }
    select.appendChild(fragment)
}
/**
 * Functiont to fect info from api and f get select given as parameter filled by this info
 * 
 * @param {HTMLSelectElement} select 
 */
const loadSelectByFetch = async (select) => {
    const json = await downloader.fetchCategories()
    json.sources.forEach(element => {
        allSources.push(element.id)
    });
    loadSelect(select, allSources)
}
/**
 * Function to call other function to get all select from pages filled
 */
const loadSelects = () => {
    loadSelect(countrySelect, allCountries)
    loadSelect(categorySelect, allCategories)
    loadSelectByFetch(sourceSelect)
}
/**
 * Function to load info on page depending of parameter given
 * 
 * @param {Event} event 
 */
const handleSearch = (event) => {
    const e = event.target
    switch (e) {
        case searchButton:
            loadPage('keyword')
            break
        case countrySelect:
            loadPage('country')
            break
        case categorySelect:
            loadPage('category')
            break
        case sourceSelect:
            loadPage('source')
            break
        case dateSelect:
            break
    }
}
/**
 * Function to set all values default 
 */
const setValues = () => {
    page = 1
    paginator.textContent = page
}
/**
 * Funtion to load spefici information on page depentding od parameter given
 * 
 * @param {string} filter 
 */
const loadPage = async (filter = false) => {
    functions.setNameUser('username', username)
    allNews = await getNews(filter)
    const selectsOk = await loadSelects()
    allProducts = await getProducts(filter)
    allUsers = await getUsers(filter)
    allArticles = await saver.storageData(false, 'articles', allNews, allUsers)
    if (allArticles) {
        setValues()
        printer.showNews(allArticles, section, page)
    }
}

// getNews()

//Events

//Event when the page load

document.addEventListener('DOMContentLoaded', loadPage)

//Event when all button is pressed

allButton.addEventListener('click', () => {
    location.reload()
})

//Events when any select changed

document.addEventListener('change', handleSearch)

//Event when search button is pressed

searchButton.addEventListener('click', handleSearch)

//Event when paginator is pressed

containerPaginator.addEventListener('click', (event) => {
    const e = event.target
    switch (e) {
        case back:
            if (page > 1) {
                page--
            }
            break
        case next:
            if (page < allNews.length / 10) {
                page++
            }
            break
    }
    paginator.textContent = page
    printer.showNews(allArticles, section, page)
})

