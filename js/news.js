import New from './New.js'
import Product from './Product.js'
import functions from './functions.js'

//Elements from DOM

const section = document.getElementById('section')
const searchButton = document.getElementById('search_button')
const keyWordInput = document.getElementById('keyword-input')
const categorySelect = document.getElementById('category-select')
const countrySelect = document.getElementById('country-select')
const dateSelect = document.getElementById('date-select')
const paginator = document.getElementById('paginator')
const containerPaginator = document.getElementById('container-paginator')
const back = document.getElementById('back')
const next = document.getElementById('next')
const allButton = document.getElementById('all-button')

let page = parseInt(paginator.textContent)
let allNews = []
let allProducts = []

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



//Functions about fecth information 

const fetchNews = async () => {
    try {
        const news = await fetch('https://newsapi.org/v2/everything?q=world&apiKey=e0a1ccd8efd54f3f91ef2cbb562ab56c')
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


const fetchNewsByCategory = async () => {
    try {
        const category = categorySelect.value
        const news = await fetch('https://newsapi.org/v2/top-headlines?category=' + category + '&apiKey=e0a1ccd8efd54f3f91ef2cbb562ab56c')
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
const fetchNewsByCountry = async () => {
    try {
        const codeCountry = countrySelect.value.slice(countrySelect.value.indexOf(',') + 2)
        const news = await fetch('https://newsapi.org/v2/top-headlines?country=' + codeCountry + '&apiKey=e0a1ccd8efd54f3f91ef2cbb562ab56c')
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

const fetchNewsByKeyword = async () => {
    try {
        const keyWord = keyWordInput.value.trim()
        const news = await fetch('https://newsapi.org/v2/top-headlines?q=' + keyWord + '&apiKey=e0a1ccd8efd54f3f91ef2cbb562ab56c')
        //Conditional to check is request was well
        if (!news.ok) {
            return null
        }
        const json = await news.json()
        return json

    } catch (error) {
        console.log('entro en el error')
        return null
    }
}
const fetchProducts = async (button) => {
    try {
        const apiKey = 'RhH0aOAQZGREdeeD4DPtS3Xr'
        //Conditinal to check if butotn pressed was caegorySelect
        const category = (button == categorySelect) ? categorySelect.value : 'technology'
        //Conditional to check if button pressed was keyEordInput
        const keyWord = (keyWordInput.value.trim() != '') ? keyWordInput.value.trim() : 'mobile'
        //Condtitional to construct url
        const url = (button == categorySelect)
            ? 'https://api.bestbuy.com/v1/products(categoryPath.name=' + category + ')?apiKey=' + apiKey + '&format=json'
            : 'https://api.bestbuy.com/v1/products(search=' + keyWord + ')?apiKey=' + apiKey + '&format=json'
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


//Function about save data
const storageData = async (data, item = 'news') => {
//Conditional to check if data has or nor values
if(functions.dataHasValues(data)){
    if (item == 'news') {
        allNews = []
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
    }
    if (item == 'product') {
        allProducts = []
        console.log(data.products)
        data.products.forEach(element => {
            allProducts.push(new Product(
                element.albumTitle,
                element.department,
                element.updateDate,
                element.image,
                element.longDescription,
                element.url
            ))
            // console.log(element.largeFrontImage)
        });
    }
    return true
}
return false


}

//Functions about show data

const showNews = () => {
    section.innerHTML = ''
    let fragment = document.createDocumentFragment()
    for (let i = (page - 1) * 20; i < page * 20; i++) {
        const articleNews = allNews[i].getAsCard()
        fragment.appendChild(articleNews)
    }
    section.appendChild(fragment)
}
const showProducts = () => {
    aside.innerHTML = ''
    let fragment = document.createDocumentFragment()
    for (let i = 0; i <= 5; i++) {
        // console.log(allProducts[i])
        const articleProduct = allProducts[i].getAsCard()
        fragment.appendChild(articleProduct)
    }
    aside.appendChild(fragment)
}

const getNews = async () => {
    const data = await fetchNews()
    let storage
    if (data)
        storage = await storageData(data)
    else
        fetchNews()
    if (storage)
        showNews(allNews)
}
const getNewsByCategory = async () => {
    const data = await fetchNewsByCategory()
    let storage
    if (data)
        storage = await storageData(data)
    else
        fetchNews()
    if (storage) {
        showNews(allNews)
    }
}
const getNewsByCountry = async () => {
    const data = await fetchNewsByCountry()
    let storage
    if (data)
        storage = await storageData(data)
    else
        fetchNews()
    if (storage)
        showNews(allNews)
}
const getNewsByKeyword = async () => {
    const data = await fetchNewsByKeyword()
    let storage
    if (data)
        storage = await storageData(data)
    else
        fetchNews()
    if (storage) {
        showNews(allNews)
    }
}
const getProducts = async () => {
    const data = await fetchProducts()
    let storage
    if (data)
        storage = await storageData(data, 'product')
    else
        fetchNews()

    if (storage)
        showProducts(allProducts)
}
const loadSelect = (select, array) => {
    const fragment = document.createDocumentFragment()
    for (const item of array) {
        const option = functions.createElement('OPTION', ['search__option'], item, false, false, item, item)
        fragment.appendChild(option)
    }
    select.appendChild(fragment)
}

const loadSelects = () => {
    loadSelect(countrySelect, allCountries)
    loadSelect(categorySelect, allCategories)
}

const handleSearch = (event) => {
    const e = event.target
    switch (e) {
        case searchButton:
            getNewsByKeyword()
            getProducts(keyWordInput)
            break
        case countrySelect:
            getNewsByCountry()

            break
        case categorySelect:
            getNewsByCategory()
            getProducts(categorySelect)
            break
        case dateSelect:
            break
    }
}


// getNews()

//Events

//Event when the page load

document.addEventListener('DOMContentLoaded', () => {
    getNews()
    loadSelects()
    getProducts()
})

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
    console.log('entro en la funcion')
    switch (e) {
        case back:
            if (page > 1) {
                page--
            }
            break
        case next:
            if (page < allNews.length / 20) {
                page++
            }
            break
    }
    paginator.textContent = page
    showData()
})

