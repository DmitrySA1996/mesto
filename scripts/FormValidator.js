export default class FormValidator {

  constructor(settings) {
    this.settings = settings;
  }

  _showInputError = (inputElement, formElement) => {
    this.errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    this.errorElement.classList.add(this.settings.errorClass);
    this.errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this.settings.inputErrorClass)
  };

  _hideInputError = (inputElement, formElement) => {
    this.errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    this.errorElement.classList.remove(this.settings.errorClass);
    this.errorElement.textContent = ""
    inputElement.classList.remove(this.settings.inputErrorClass);
  };

  _checkInputValidity = (inputElement, formElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, formElement);
    } else {
      this._hideInputError(inputElement, formElement);
    }
  };

  hideError() {

    this.formList = Array.from(document.querySelectorAll(this.settings.formSelector));
    this.formList.forEach((formElement) => {
      
    this.inputList = Array.from(formElement.querySelectorAll(this.settings.inputSelector));
    this.buttonElement = formElement.querySelector(this.settings.submitButtonSelector);

    this._toggleButtonState();
    this.inputList.forEach((inputElement) => {
      this._hideInputError(inputElement,formElement);
    });

    });

  };

  enableValidation = () => {
    this.formList = Array.from(document.querySelectorAll(this.settings.formSelector));
    this.formList.forEach((formElement) => {

      this._setEventListeners(formElement);

    });

  };

  _setEventListeners = (formElement) => {
    this.inputList = Array.from(formElement.querySelectorAll(this.settings.inputSelector));
    this.buttonElement = formElement.querySelector(this.settings.submitButtonSelector);

    this._toggleButtonState();

    this.inputList.forEach((inputElement) => {

      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, formElement);
        this._toggleButtonState();
      });

    });
  };

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.buttonElement.classList.add(this.settings.inactiveButtonClass);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(this.settings.inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  };
}