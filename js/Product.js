import functions from './functions.js'
/**
 * class to determinate a Product Object
 */
class Product {
    /**
     * Function to construct a Product Object by taking parameters given
     * 
     * @param {string} albumTitle 
     * @param {string} department 
     * @param {string} updateDate 
     * @param {string} thumbnailImage 
     * @param {string} longDescription 
     * @param {string} url 
     */
    constructor(albumTitle, department, updateDate, thumbnailImage, longDescription, url) {
        this._albumTitle = albumTitle
        this._department = department
        this._updateDate = updateDate
        this._thumbnailImage = thumbnailImage
        this._longDescription = longDescription
        this._url = url
    }
    // Getter and Setter for Product title
    get albumTitle() {
        return this._albumTitle;
    }
    set albumTitle(newTitle) {
        this._albumTitle = newTitle;
    }
    // Getter and Setter for Product department
    get department() {
        return this._department;
    }
    set department(newDepartment) {
        this._department = newDepartment;
    }
    // Getter and Setter for Product updateDate
    get updateDate() {
        return this._updateDate;
    }
    set updateDate(newUpdateDate) {
        this._updateDate = newUpdateDate;
    }
    // Getter and Setter for Product thumbnailImages
    get thumbnailImages() {
        return this._thumbnailImages;
    }
    set thumbnailImages(newThumbnailImages) {
        this._thumbnailImages = newThumbnailImages;
    }
    // Getter and Setter for Product longDescription
    get longDescription() {
        return this._longDescription;
    }
    set longDescription(newDescription) {
        this._longDescription = newDescription;
    }
    // Getter and Setter for Product URL
    get url() {
        return this._url;
    }
    set url(newUrl) {
        this._url = newUrl;
    }
    /**
     * Function to create a div html elemnet with Product object info and covert into card format
     * 
     * @returns html div element
     */
    getAsCard() {
        const product = functions.createElement('ARTICLE', ['product'])
        const header = functions.createElement('HEADER', ['product__header'])
        const header__image = functions.createElement('IMG', ['product__image'], false, this._thumbnailImage)
        header.appendChild(header__image)
        product.appendChild(header)

        const main = functions.createElement('MAIN', ['product__main'])
        const title = functions.createElement('H2', ['product__title'], this._albumTitle)
        main.appendChild(title)
        const content = functions.createElement('P', ['product__content'], this._longDescription)
        main.appendChild(content)
        const url = functions.createElement('A', ['product__url'], 'Go to product', false, this._url)
        url.target = '_blank'
        main.appendChild(url)
        product.appendChild(main)

        const footer = functions.createElement('FOOTER', ['product__footer'])
        const source = functions.createElement('P', ['product__source'], this._department)
        footer.appendChild(source)
        const publishedAt = functions.createElement('P', ['product__publishedAt'], this._updateDate)
        footer.appendChild(publishedAt)
        product.appendChild(footer)

        return product
    }
}

export default Product