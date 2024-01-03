import functions from './functions.js'
class User{
    constructor(name,lastname,mail,avatar,age){
        this._name = name 
        this._lastname = lastname 
        this._mail = mail 
        this._avatar = avatar 
        this._age = age 
    }

    get name(){
        return this._name
    }
    set name (name){
        this._name = name
    }
    get lastname(){
        return this._lastname
    }
    set lastname (lastname){
        this._lastname = lastname
    }
    get mail(){
        return this._mail
    }
    set mail (mail){
        this._mail = mail
    }
    get avatar(){
        return this._avatar
    }
    set avatar (avatar){
        this._avatar = avatar
    }
    get age(){
        return this._age
    }
    set age (age){
        this._age = age
    }
    getAsCard(){
        const content = functions.createElement('DIV',['user'])

        const main = functions.createElement('MAIN',['user__main'])
        const avatar = functions.createElement('IMG',['user__avatar'],false,this._avatar)
        const name = functions.createElement('p',['user__name'],this._name + ' ' + this._lastname)
        main.appendChild(avatar)
        main.appendChild(name)

        const footer = functions.createElement('FOOTER',['user__footer'])
        const form = functions.createElement('FORM',['user__form'])
        form.action = 'mailto:' + this._mail
        form.method = 'post'
        const input = functions.createElement('INPUT',['user__input'])
        input.name = 'message'
        input.placeholder = 'send feedback'
        const button = functions.createElement('BUTTON',['user__button'],'Send')
        form.appendChild(input)
        form.appendChild(button)
        footer.appendChild(form)
        content.appendChild(main)
        content.appendChild(footer)

        return content

    }
}

export default User