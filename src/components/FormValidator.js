export default class FormValidator {

  constructor(settings, formElement) {
    this._settings = settings,
    this._formElement = formElement,
    this._inputList = Array.from(
      this._formElement.querySelectorAll(
      this._settings.inputSelector
      )
      ),
    this._buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    )
  }
  
  hideError() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {      
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      this._hideInputError(inputElement);
    });
  };

  _showInputError = (inputElement) => {
    this._errorElement.classList.add(this._settings.errorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._settings.inputErrorClass)
  };

  _hideInputError = (inputElement) => {
    this._errorElement.classList.remove(this._settings.errorClass);
    this._errorElement.textContent = ""
    inputElement.classList.remove(this._settings.inputErrorClass);
  };

  _checkInputValidity = (inputElement) => {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  enableValidation = () => {
    this._setEventListeners();
  };

  _setEventListeners = () => {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {

      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });

    });
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };
}