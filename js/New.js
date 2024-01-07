import functions from './functions.js';

/**
 * class to determinate a New Object
 */
class New {
    /**
     * Function to construct a New objest taking information by parameters given or calling other functions to set values
     * 
     * @param {string} author 
     * @param {string} content 
     * @param {string} description 
     * @param {string} publishedAt 
     * @param {string} source 
     * @param {string} title 
     * @param {string} url 
     * @param {string} urlToImage 
     */
    constructor(author, content, description, publishedAt, source, title, url, urlToImage) {
        this._author = this.truncateAuthor(author)
        this._content = this.truncateContent(content)
        this._description = description
        this._publishedAt = this.truncateDate(publishedAt)
        this._source = source
        this._title = this.truncateTitle(title)
        this._url = url
        this._urlToImage = this.processUrlToImage(urlToImage)
    }
    /**
     * Static varibale to stroage deafult title
     */
    static title = "Revolutionary Technological Advances Transforming the Global Industry: A Glimpse into the Future"
    /**
    * Static varibale to stroage deafult content
    */
    static text = "Staying informed with current news is pivotal in today's dynamic world. News broadcasts and articles offer insights into global events, politics, innovations, and societal changes. It empowers individuals to make informed decisions, fosters awareness, and cultivates an engaged, knowledgeable society, shaping perspectives and driving progress."
    // Getter and setter from author news
    get author() {
        return author
    }
    set author(author) {
        this._author = author
    }
    // Getter and setter from content news
    
    get content() {
        return content
    }
    set content(content) {
        this._content = content
    }
    // Getter and setter from description news
    get description() {
        return description
    }
    set description(description) {
        this._description = description
    }
    // Getter and setter from  publishedAt news
    get publishedAt() {
        return publishedAt
    }
    set publishedAt(publishedAt) {
        this._publishedAt = publishedAt
    }
    // Getter and setter from source news
    get source() {
        return source
    }
    set source(source) {
        this._source = source
    // Getter and setter from title news
    }
    get title() {
        return title
    }
    set title(title) {
        this._title = title
    }
    // Getter and setter from url news
    get url() {
        return url
    }
    set url(url) {
        this._url = url
    }
    // Getter and setter from urlImage news
    get urlToImage() {
        return urlToImage
    }
    set urlToImage(urlToImage) {
        this._urlToImage = urlToImage
    }
    /**
     * Function to get a New aobject as div html element in card format
     * 
     * @returns htmldivelement
     */
    getAsCard() {
        const div = functions.createElement('DIV', ['article__container'])
        const header = functions.createElement('HEADER', ['article__header'])
        const header__image = functions.createElement('IMG', ['article__image'], false, this._urlToImage)
        header.appendChild(header__image)
        div.appendChild(header)

        const main = functions.createElement('MAIN', ['article__main'])
        const title = functions.createElement('H2', ['article__title'], this._title)
        main.appendChild(title)
        const content = functions.createElement('P', ['article__content'], this._content)
        main.appendChild(content)
        const url = functions.createElement('A', ['article__url'], 'Go to new', false, this._url)
        url.target = '_blank'
        main.appendChild(url)
        div.appendChild(main)

        const footer = functions.createElement('DIV', ['article__info'])
        const source = functions.createElement('P', ['article__source'], 'Information by: ' + this._source)
        footer.appendChild(source)
        const publishedAt = functions.createElement('P', ['article__publishedAt'], this._publishedAt)
        footer.appendChild(publishedAt)
        main.appendChild(footer)

        return div
    }
    /**
     * Function to tprocess text form content given as paramenter
     * 
     * @param {string} content 
     * @returns string
     */
    truncateContent(content) {
        if (content)
            return content.substring(0, content.indexOf('['))
        else
            return New.text
    }
    /**
     * Functtion to process author given as parameter
     * 
     * @param {string} author 
     * @returns string
     */
    truncateAuthor(author) {
        if (author) {
            if (author.indexOf('(') != -1) {
                author = author.substring(author.indexOf('(') + 1, author.indexOf(')'))
            }
            if (author.indexOf(',') != -1) {
                author = author.substring(0, author.indexOf(','))
            }

        } else {
            author = 'Anonimous'
        }
        return author
    }
    /**
     * Function to process title given as parameter
     * 
     * @param {string} title 
     * @returns string
     */
    truncateTitle(title) {
        if (title)
            return title.substring(0, 60) + '...'
        else
            return New.title
    }
    /**
     * Function to porcess utl image from New object
     * 
     * @param {string} urlToImage 
     * @returns  string
     */
    processUrlToImage(urlToImage) {
        if (!urlToImage)
            return '../assets/images/news__default.jpg'
        else
            return urlToImage
    }
    /**
     * Function to porcess prublished date from a New Object
     * 
     * @param {string} publishedAt 
     * @returns string
     */
    truncateDate(publishedAt) {
        publishedAt = publishedAt.replace('T', ' (')
        publishedAt = publishedAt.substring(0, publishedAt.length - 1)
        publishedAt = publishedAt + ')'
        return publishedAt
    }

}

export default New
