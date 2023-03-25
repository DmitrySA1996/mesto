import Popup from "../components/Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._imagePopup = this._popup.querySelector(".popup__image")
    this._imagePopupTitle = this._popup.querySelector(".popup__sign")
  }

  open = (item) => {
    this._imagePopupTitle.textContent = item.alt
    this._imagePopup.alt = item.alt
    this._imagePopup.src = item.src

    super.open()
  }
}