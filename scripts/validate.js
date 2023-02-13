export class FormValidator {

  showInputError = (inputElement, formElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.add(settings.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(settings.inputErrorClass)
  };

  hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = ""
    inputElement.classList.remove(settings.inputErrorClass);
  };

  checkInputValidity = (inputElement, formElement, settings) => {
    if (!inputElement.validity.valid) {
      showInputError(inputElement, formElement, settings);
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  };

  hideError(formElement, settings) {

    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, settings);
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, settings);
    });

  };

  setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, settings);

    inputList.forEach((inputElement) => {

      inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement, formElement, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });

    });
  };

  enableValidation = (settings) => {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {

      setEventListeners(formElement, settings);

    });

  };

  hasInvalidInput(inputList, inputElement) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  toggleButtonState(inputList, buttonElement, settings) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };
}