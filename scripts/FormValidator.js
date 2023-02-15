export default class FormValidator {

  constructor(inputElement,formElement,settings) {
    this.inputElement = inputElement; 
    this.formElement = formElement;
    this.settings = settings;
  }

  showInputError = () => {
    this.errorElement = this.formElement.querySelector(`.${this.inputElement.id}-error`);
    this.errorElement.classList.add(this.settings.errorClass);
    this.errorElement.textContent = this.inputElement.validationMessage;
    this.inputElement.classList.add(this.settings.inputErrorClass)
  };

  hideInputError = () => {
    this.errorElement = formElement.querySelector(`.${this.inputElement.id}-error`);
    this.errorElement.classList.remove(this.settings.errorClass);
    this.errorElement.textContent = ""
    this.inputElement.classList.remove(this.settings.inputErrorClass);
  };

  checkInputValidity = () => {
    if (!this.inputElement.validity.valid) {
      showInputError();
    } else {
      hideInputError();
    }
  };

  hideError() {

    this.inputList = Array.from(this.formElement.querySelectorAll(this.settings.inputSelector));
    this.buttonElement = this.formElement.querySelector(this.settings.submitButtonSelector);

    toggleButtonState();
    this.inputList.forEach(() => {
      hideInputError();
    });

  };

  setEventListeners = () => {
    this.inputList = Array.from(this.formElement.querySelectorAll(this.settings.inputSelector));
    this.buttonElement = this.formElement.querySelector(this.ettings.submitButtonSelector);

    toggleButtonState();

    this.inputList.forEach((inputElement) => {

      inputElement.addEventListener('input', () => {
        checkInputValidity();
        toggleButtonState();
      });

    });
  };

  enableValidation = () => {
    this.formList = Array.from(document.querySelectorAll(this.settings.formSelector));
    this.formList.forEach(() => {

      setEventListeners();

    });

  };

  hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  toggleButtonState() {
    if (hasInvalidInput()) {
      this.buttonElement.classList.add(this.settings.inactiveButtonClass);
      this.buttonElement.disabled = true;
    } else {
      this.buttonElement.classList.remove(this.settings.inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  };
}