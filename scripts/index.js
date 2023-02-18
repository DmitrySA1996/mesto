import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";

const popupProfile = document.querySelector('.popup');
const containerProfile = popupProfile.querySelector('.popup__container');
const formProfile = containerProfile.querySelector('.popup__form');
const profileAddButton = document.querySelector('.profile__add-button');

const profileEditText = document.querySelector('.profile__edit-text');

const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('.popup__text_type_title');
const infoInput = document.querySelector('.popup__text_type_subtitle');

const elementsContainer = document.querySelector('.elements__cards');
const elementTemplate = document.querySelector('.element-template').content.querySelector('.elements__card');

const popupImage = document.querySelector('.popup_type_image');
const containerImage = popupImage.querySelector('.popup__container');
const formImage = containerImage.querySelector('.popup__form');
const nameImage = formImage.querySelector('.popup__text_type_title');
const linkImage = formImage.querySelector('.popup__text_type_subtitle');

const popupCard = document.querySelector('.popup_type_card');
const cardContainer = popupCard.querySelector('.popup__container');
const cardImg = cardContainer.querySelector('.popup__image');
const cardSign = cardContainer.querySelector('.popup__sign');

const buttonCloseList = document.querySelectorAll('.popup__close');

const src = ""; 
const alt = ""; 
const textContent = "";

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

const ValidationForm = new FormValidator(settings);

const handleCardClick = (elementsImage, elementsText) => {
  cardImg.src = elementsImage.src;
  cardImg.alt = elementsImage.alt;
  cardSign.textContent = elementsText.textContent;

  openPopup(popupCard);
}

function createCard(element) {
  const card = new Card(element, elementTemplate, handleCardClick);
  const elementCard = card.createCard();
  

  return elementCard;
}

initialCards.forEach((element) => {
  const elementCard = createCard(element);
  elementsContainer.append(elementCard);
});

const handleImageSubmit = (element) => {
  element.preventDefault();
  const inputImage = {
    name: nameImage.value,
    link: linkImage.value,
  };
  const elementCard = createCard(inputImage);
  elementsContainer.prepend(elementCard);  
  closePopup(popupImage);
  formImage.reset();
};

function handleEscape(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscape);
};

profileEditText.addEventListener('click', (event) => {
  nameInput.value = title.textContent;
  infoInput.value = subtitle.textContent;
  openPopup(popupProfile);
  ValidationForm.hideError();
});

function handleFormSubmit(event) {
  event.preventDefault();

  title.textContent = nameInput.value;
  subtitle.textContent = infoInput.value;
  formProfile.reset();
  closePopup(popupProfile);
};

formProfile.addEventListener('submit', handleFormSubmit);

profileAddButton.addEventListener('click', () => {
  formImage.reset();
  ValidationForm.hideError();
  openPopup(popupImage);
});

formImage.addEventListener('submit', handleImageSubmit);

function closePopup(popup) {
  document.removeEventListener('keydown', handleEscape);
  popup.classList.remove('popup_opened');
};

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('click', function (evt) {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    }
  });
});

ValidationForm.enableValidation();