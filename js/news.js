import New from './New.js'
import Product from './Product.js'
import User from './User.js'
import Article from './Article.js'
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
let allUsers = []
let allArticles = []

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
    const news = await fetch('https://newsapi.org/v2/everything?q=world&apiKey=e0a1ccd8efd54f3f91ef2cbb562ab56c')
    //Conditional to check is request was well
    const json = await news.json()
    return json

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
        return null
    }
}
const fetchProducts = async (filter) => {
    try {
        const apiKey = 'RhH0aOAQZGREdeeD4DPtS3Xr'
        //Conditinal to check if butotn pressed was caegorySelect
        const category = (filter == 'category') ? categorySelect.value : 'technology'
        //Conditional to check if button pressed was keyEordInput
        const keyWord = (keyWordInput.value.trim() != '') ? keyWordInput.value.trim() : 'mobile'
        //Condtitional to construct url
        const url = (filter == 'category')
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

const fetchUsers = async () => {
    const users = await fetch('https://randomuser.me/api/?results=20')
    const json = await users.json()
    return json
}


//Function about save data
const stroageNews = (data) => {
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

const stroageProducts = (data) => {
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
}

const storageUsers = (data) => {
    data.results.forEach(element => {
        allUsers.push(new User(
            element.name.first,
            element.name.last,
            element.email,
            element.picture.thumbnail,
            element.dob.age
        ))
    });
}

const storageArticles = () => {
    console.log('entro en guardar articulos')
    console.log(allNews)
    allArticles = []
    let random
    allNews.forEach(element => {
        random = Math.floor(Math.random() * allUsers.length)
        allArticles.push(new Article(element, allUsers[random]))
    });
}

const storageData = async (data, item) => {
    console.log('entro cno ' + item)
    //Conditional to check if data has or nor values
    if (functions.dataHasValues(data)) {
        switch (item) {
            case 'user':
                allUsers = []
                storageUsers(data)
                break
            case 'news':
                allNews = []
                stroageNews(data)
                break
            case 'product':
                allProducts = []
                stroageProducts(data)
                break
            case 'articles':
                console.log('entro en articulos')
                allArticles = []
                storageArticles()
                break
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
const showProducts = () => {
    aside.innerHTML = ''
    let fragment = document.createDocumentFragment()
    for (let i = 0; i <= 5; i++) {
        const articleProduct = allProducts[i].getAsCard()
        fragment.appendChild(articleProduct)
    }
    aside.appendChild(fragment)
}

const getNews = async (filter) => {
    console.log('entron para descargar ntoicias')
    let data
    switch (filter) {
        case 'category':
            data = await fetchNewsByCategory()
            break
        case 'country':
            data = await fetchNewsByCountry()
            break
        case 'keyword':
            data = await fetchNewsByKeyword()
            console.log('las descargo conkey')
            console.log(data)
            break
        default:
            data = await fetchNews()
    }
    const storage = storageData(data, 'news')
    if (data && data.articles.length != 0) {
        console.log(data)
        return true
    }
    else {
    }

}

//Function about get

const getUsers = async () => {
    const data = await fetchUsers()
    const storage = await storageData(data, 'user')
    if (storage) {
        return true
    }
}

const getProducts = async (filter) => {
    const data = await fetchProducts(filter)
    console.log(data)
    const storage = await storageData(data, 'product')
    if (storage) {
        showProducts(allProducts)
        return true
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

const loadSelects = () => {
    loadSelect(countrySelect, allCountries)
    loadSelect(categorySelect, allCategories)
}

const handleSearch = (event) => {
    console.log('he dado eal boton de buscar')
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
        case dateSelect:
            break
    }
}

const loadPage = async (filter = false) => {
    const newsOk = await getNews(filter)
    const selectsOk = await loadSelects()
    const productsOk = await getProducts(filter)
    const usersOk = await getUsers()
    const articlesOk = await storageData(false, 'articles')
    if (articlesOk)
        showNews()
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
            if (page < allNews.length / 20) {
                page++
            }
            break
    }
    paginator.textContent = page
    showData()
})

