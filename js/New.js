import  functions from './functions.js';


class New{
    constructor(author, content, description, publishedAt, source, title, url, urlToImage){
        this._author = this.truncateAuthor(author)
        this._content = this.truncateContent(content)
        this._description = description
        this._publishedAt = this.truncateDate(publishedAt)
        this._source = source
        this._title = this.truncateTitle(title)
        this._url = url
        this._urlToImage =this.processUrlToImage(urlToImage)
    }
    static title = "Revolutionary Technological Advances Transforming the Global Industry: A Glimpse into the Future"
    static text = "Staying informed with current news is pivotal in today's dynamic world. News broadcasts and articles offer insights into global events, politics, innovations, and societal changes. It empowers individuals to make informed decisions, fosters awareness, and cultivates an engaged, knowledgeable society, shaping perspectives and driving progress."
    get author(){
        return author
    }
    set author(author){
        this._author = author
    }
    get content(){
        return content
    }
    set content(content){
        this._content = content
    }
    get description(){
        return description
    }
    set description(description){
        this._description = description
    }
    get publishedAt(){
        return publishedAt
    }
    set publishedAt(publishedAt){
        this._publishedAt = publishedAt
    }
    get source(){
        return source
    }
    set source(source){
        this._source = source
    }
    get title(){
        return title
    }
    set title(title){
        this._title = title
    }
    get url(){
        return url
    }
    set url(url){
        this._url = url
    }
    get urlToImage(){
        return urlToImage
    }
    set urlToImage(urlToImage){
        this._urlToImage = urlToImage
    }
    
    getAsCard(){
       const div = functions.createElement('DIV',['article__content'])
       const header = functions.createElement('HEADER',['article__header'])
       const header__image = functions.createElement('IMG',['article__image'],false,this._urlToImage)
       header.appendChild(header__image)
       div.appendChild(header)

       const main = functions.createElement('MAIN',['article__main'])
       const title = functions.createElement('H2',['article__title'],this._title)
       main.appendChild(title)
       const content = functions.createElement('P',['article__content'],this._content)
       main.appendChild(content)
       const url = functions.createElement('A',['article__url'],'Go to new', false,this._url)
       main.appendChild(url)
       div.appendChild(main)

       const footer = functions.createElement('FOOTER',['article__footer'])
       const source = functions.createElement('P',['article__source'],this._source)
       footer.appendChild(source)
       const publishedAt = functions.createElement('P',['article__publishedAt'],this._publishedAt)
       footer.appendChild(publishedAt)
       div.appendChild(footer)
       
       return div
    }
    
    
    truncateContent(content){
        if(content)
        return content.substring(0,content.indexOf('['))
        else
        return New.text
    }
    truncateAuthor(author){
        if(author){
            if(author.indexOf('(') != -1){
                author = author.substring(author.indexOf('(') + 1, author.indexOf(')'))
            }
            if(author.indexOf(',') != -1){
                author = author.substring(0, author.indexOf(','))
            }

        }else{
            author = 'Anonimous'
        }
        return author
    }
    truncateTitle(title){
        if(title)
        return title.substring(0,35) + '...'
        else
        return New.title
    }

    processUrlToImage(urlToImage){
        if(!urlToImage)
        return '../assets/images/news__default.jpg'
        else
        return urlToImage
    }
    truncateDate(publishedAt){
        publishedAt = publishedAt.replace('T',' (')
        publishedAt = publishedAt.substring(0,publishedAt.length -1)
        publishedAt = publishedAt + ')'
        return publishedAt
    }
   
}

export default New

const pedirNumeros = () => {
    //pido lod umero al usuario
    //almaceno en un array
}

const hacerMedia = () => {
    //recoor el array y genero la media
}

const mostrarMedia = () => {
    //Muestro la media de los nuemros
}

// round(AVG(faltas),2)

// let faltaNumero15 = faltas[15]



// const AVG = (faltas) => {
//     faltas.forEach(falta => {
//         suma += falta
//     });
//     let media = suma / faltas.length
    
//     return media
// }
// const round = (numero, numeroDeciamles) => {

// }

// console.log('la media de los numero es '+AVG(faltas))





