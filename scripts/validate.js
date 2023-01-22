
const showInputError = (inputElement, formElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(settings.errorClass);
  inputElement.classList.add(settings.inputErrorClass)
};

const checkInputValidity = (inputElement, formElement, settings) => {
    showInputError(inputElement, formElement, settings);
};

const setEventListeners = (formElement, settings) => {
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

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {

    setEventListeners(formElement, settings);

  });

};

function hasInvalidInput(inputList, inputElement) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;    
  }
};