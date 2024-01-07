import functions from './functions.js'
/**
 * class to determinate an User Object
 */
class User {
    constructor(name, lastname, mail, avatar, age) {
        this._name = name
        this._lastname = lastname
        this._mail = mail
        this._avatar = avatar
        this._age = age
    }
    // Getter and Setter for the name
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }

    // Getter and Setter for the last name
    get lastname() {
        return this._lastname;
    }
    set lastname(lastname) {
        this._lastname = lastname;
    }

    // Getter and Setter for the email
    get mail() {
        return this._mail;
    }
    set mail(mail) {
        this._mail = mail;
    }

    // Getter and Setter for the avatar
    get avatar() {
        return this._avatar;
    }
    set avatar(avatar) {
        this._avatar = avatar;
    }

    // Getter and Setter for the age
    get age() {
        return this._age;
    }
    set age(age) {
        this._age = age;
    }
    /**
     * Function to create an html div elemetn with User Object info and covnert into card format
     * 
     * @returns html div element
     */
    getAsCard() {
        const content = functions.createElement('DIV', ['user'])

        const main = functions.createElement('MAIN', ['user__main'])
        const avatar = functions.createElement('IMG', ['user__avatar'], false, this._avatar)
        const name = functions.createElement('p', ['user__name'], this._name + ' ' + this._lastname)
        main.appendChild(avatar)
        main.appendChild(name)

        const footer = functions.createElement('FOOTER', ['user__footer'])
        const form = functions.createElement('FORM', ['user__form'])
        form.action = 'mailto:' + this._mail
        form.method = 'post'
        const input = functions.createElement('TEXTAREA', ['user__input'])
        input.name = 'message'
        input.placeholder = 'send feedback'
        const button = functions.createElement('BUTTON', ['user__button'], 'Send')
        form.appendChild(input)
        form.appendChild(button)
        footer.appendChild(form)
        content.appendChild(main)
        content.appendChild(footer)

        return content

    }
}

export default User