const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__text-error_active'
};

const profileUpdateAvatar = document.querySelector(".profile__edit-avatar")

const profileAddButton = document.querySelector(".profile__add-button")

const profileEditButton = document.querySelector(".profile__edit-text")

const formProfile = document.forms.popup__form

const formImage = document.forms.form

const editInputName = formProfile.elements.name

const editJobInput = formProfile.elements.info

const elementTemplate = document.querySelector('.element-template').content.querySelector('.elements__card');

const popupConfig = {
  popupEditSelector: ".popup",
  popupAddCardSelector: ".popup_type_image",
  popupImageSelector: ".popup_type_card",
  popupUpdateAvatarSelector: ".popup_type_update-avatar"
}

const elementsApi = {
  token: '4c774ee9-4e81-4dc7-a921-f3ea6d42f00e',
  URL: 'https://mesto.nomoreparties.co/v1/cohort-61/'
}

export {
  profileUpdateAvatar,
  popupConfig,
  profileAddButton,
  profileEditButton,
  formProfile,
  editInputName,
  editJobInput,
  formImage,
  settings,
  elementTemplate,
  elementsApi
}