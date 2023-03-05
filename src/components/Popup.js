export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this._button = this._popup.querySelector(".popup__close")
        this._clickCloseButton = this._handleSubmit.bind(this)
        this._clickEscClose = this._handleEscClose.bind(this)
        this._clickClose = this._handleClose.bind(this)
        this._button.addEventListener("click", this._clickCloseButton)
    }

    open() {
        this.setEventListeners()
        this._popup.classList.add("popup_opened")
    }

    close() {
        this._popup.classList.remove("popup_opened")
        this.delEventListeners()
    }

    _handleSubmit() {
        this.close()
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close()
        }
    }

    _handleClose(evt) {
        if (evt.target.classList.contains("popup_opened")) {
            this.close()
        }
    }

    setEventListeners() {
        document.addEventListener("keydown", this._clickEscClose)
        document.addEventListener("mouseup", this._clickClose)
    }

    delEventListeners() {
        document.removeEventListener("keydown", this._clickEscClose)
        document.removeEventListener("mouseup", this._clickClose)
    }
}