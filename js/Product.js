import functions from './functions.js'

class Product{
    constructor(albumTitle,department,updateDate,thumbnailImage,longDescription,url){
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

    getAsCard(){
        const article = functions.createElement('ARTICLE',['article'])
        const header = functions.createElement('HEADER',['article__header'])
        const header__image = functions.createElement('IMG',['article__image'],false,this._thumbnailImage)
        header.appendChild(header__image)
        article.appendChild(header)
 
        const main = functions.createElement('MAIN',['article__main'])
        const title = functions.createElement('H2',['article__title'],this._albumTitle)
        main.appendChild(title)
        const content = functions.createElement('P',['article__content'],this._longDescription)
        main.appendChild(content)
        const url = functions.createElement('A',['article__url'],'Go to article', false,this._url)
        main.appendChild(url)
        article.appendChild(main)
 
        const footer = functions.createElement('FOOTER',['article__footer'])
        const source = functions.createElement('P',['article__source'],this._department)
        footer.appendChild(source)
        const publishedAt = functions.createElement('P',['article__publishedAt'],this._updateDate)
        footer.appendChild(publishedAt)
        article.appendChild(footer)
        
        return article
     }
}

export default Product