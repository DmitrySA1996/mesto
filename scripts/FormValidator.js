export default class FormValidator {

  constructor(settings) {
    this._settings = settings;
    this._formList = Array.from(document.querySelectorAll(this._settings.formSelector));   
  }

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

  _checkInputValidity = (inputElement, formElement) => {
    this._errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  hideError() {
    this._formList.forEach((formElement) => {
      
    this._inputList = Array.from(formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = formElement.querySelector(this._settings.submitButtonSelector);

    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement, formElement);
    });

    });

  };

  enableValidation = () => {
    this._formList.forEach((formElement) => {

      this._setEventListeners(formElement);

    });

  };

  _setEventListeners = (formElement) => {
    this._inputList = Array.from(formElement.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = formElement.querySelector(this._settings.submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {

      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, formElement);
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