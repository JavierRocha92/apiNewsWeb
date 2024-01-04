import functions from './functions.js'

class Product {
    constructor(albumTitle, department, updateDate, thumbnailImage, longDescription, url) {
        this._albumTitle = albumTitle
        this._department = department
        this._updateDate = updateDate
        this._thumbnailImage = thumbnailImage
        this._longDescription = longDescription
        this._url = url
    }

    // Getters
    get albumTitle() {
        return this._albumTitle;
    }

    get department() {
        return this._department;
    }

    get updateDate() {
        return this._updateDate;
    }

    get thumbnailImages() {
        return this._thumbnailImages;
    }

    get longDescription() {
        return this._longDescription;
    }

    get url() {
        return this._url;
    }

    // Setters
    set albumTitle(newTitle) {
        this._albumTitle = newTitle;
    }

    set department(newDepartment) {
        this._department = newDepartment;
    }

    set updateDate(newUpdateDate) {
        this._updateDate = newUpdateDate;
    }

    set thumbnailImage(newthumbnailImage) {
        this._thumbnailImage = newthumbnailImage;
    }

    set longDescription(newDescription) {
        this._longDescription = newDescription;
    }

    set url(newUrl) {
        this._url = newUrl;
    }

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