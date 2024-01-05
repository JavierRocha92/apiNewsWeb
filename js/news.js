import New from './New.js'
import Product from './Product.js'
import User from './User.js'
import Article from './Article.js'
import functions from './functions.js'
import Downloader from './Downloader.js'
import Saver from './Saver.js'

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

const downloader = new Downloader('e0a1ccd8efd54f3f91ef2cbb562ab56c','RhH0aOAQZGREdeeD4DPtS3Xr')
const saver = new Saver()

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


//Functions about show data

const showNews = (allArticles) => {
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
const showProducts = (allProducts) => {
    aside.innerHTML = ''
    let fragment = document.createDocumentFragment()
    for (let i = 0; i <= 5; i++) {
        const articleProduct = allProducts[i].getAsCard()
        fragment.appendChild(articleProduct)
    }
    aside.appendChild(fragment)
}

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
    const storage = saver.storageData(data, 'news',allUsers,allNews,allProducts,allArticles)
    if (data && data.articles.length != 0) {
        return storage
    }
    else {
    }

}

//Function about get

const getUsers = async (filter) => {
    const data = await downloader.fetchUsers()
    const storage = await saver.storageData(data, 'user',allUsers,allNews,allProducts,allArticles)
    if (storage) {
        return storage
    }
}

const getProducts = async (filter) => {
    const data = await downloader.fetchProducts(filter,categorySelect,keyWordInput)
    const storage = await saver.storageData(data, 'product',allUsers,allNews,allProducts,allArticles)
    if (storage) {
        showProducts(storage)
        return storage
    }

}


const loadSelect = (select, array) => {
    const fragment = document.createDocumentFragment()
    for (const item of array) {
        const option = functions.createElement('OPTION', ['search__option'], item, false, false, item, item)
        fragment.appendChild(option)
    }
    select.appendChild(fragment)
}

const loadSelectByFetch = async (select) => {
    const json = await downloader.fetchCategories()
    json.sources.forEach(element => {
        allSources.push(element.id)
    });
    loadSelect(select,allSources)
}

const loadSelects = () => {
    loadSelect(countrySelect, allCountries)
    loadSelect(categorySelect, allCategories)
    loadSelectByFetch(sourceSelect)
}

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

const setValues = () => {
    page = 1
    paginator.textContent = page
}

const loadPage = async (filter = false) => {
    functions.setNameUser('username',username)
    const allNews = await getNews(filter)
    const selectsOk = await loadSelects()
    const allProducts = await getProducts(filter)
    const allUsers = await getUsers(filter)
    const allArticles = await saver.storageData(false, 'articles',allNews,allUsers)
    if (allArticles){
        setValues()
        showNews(allArticles)
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
    showNews()
})

