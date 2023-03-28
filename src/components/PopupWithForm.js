import Popup from "../components/Popup.js"

export default class PopupWithForm extends Popup {
  constructor(selector, callbackSubmit) {
    super(selector)
    this._callbackSubmit = callbackSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__text");
    this._submit = this._form.querySelector(".popup__submit");
  }

  _getInputValues() {
    this._values = {};
    this._inputs.forEach((input) => {
      this._values[input.name] = input.value
    })
    return this._values;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name]
    })
  }

  changeTextSubmitUsSave(popup) {
    popup._submit.textContent = "Сохранение..."
  }

  ResetSubmitTextToDefault(popup) {
    popup._submit.textContent = "Сохранить"
  }

  close() {
    super.close()
    this._form.reset()
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._callbackSubmit(this._getInputValues());
    }
    )
  }
}