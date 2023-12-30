import New from './New.js'

//Elements from DOM
const main = document.getElementById('main')

let allNews = []

const fetchNews = async () => {
    const news = await fetch('https://newsapi.org/v2/everything?q=bitcoin&apiKey=e0a1ccd8efd54f3f91ef2cbb562ab56c')
    const json = await news.json()
    console.log(json)
    return json
}

const storageData = async (data) => {
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
        // console.log(allNews[0].truncateContent())
    return true
}

const showData = () => {
    let fragment = document.createDocumentFragment()
    allNews.forEach(element => {
        const header = element.getAsCard()
        fragment.appendChild(header)
    });
    main.appendChild(fragment)
}

const getNews = async () => {
    const data = await fetchNews()
    const storage = await storageData(data)
    if(storage)
    showData(allNews)
}

getNews()
