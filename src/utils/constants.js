const initialCards = [
  {
    name: 'Фо-Бо',
    link: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
  },
  {
    name: 'Рамён',
    link: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
  },
  {
    name: 'Дамплинги',
    link: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Кимпаб',
    link: 'https://images.unsplash.com/photo-1532347231146-80afc9e3df2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80'
  },
  {
    name: 'Азиатский десерт',
    link: 'https://plus.unsplash.com/premium_photo-1664474819093-00a70490f5bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80'
  },
  {
    name: 'Роллы',
    link: 'https://images.unsplash.com/photo-1624224701172-8499296e2cdd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  }
];

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__text-error_active'
};

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
}

export {
  popupConfig,
  profileAddButton,
  profileEditButton,
  formProfile,
  editInputName,
  editJobInput,
  formImage,
  initialCards,
  settings,
  elementTemplate
}