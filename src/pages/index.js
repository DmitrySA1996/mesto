import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../utils/Constants.js";
import Section from "../components/Section.js"

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

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: '.popup__input-error',
  errorClass: 'popup__text-error_active'
};

const validationFormProfile = createFormValidator(formProfile);
const validationFormImage = createFormValidator(formImage);

const cardList = new Section(
  {
    renderer: (data) => {
      const card = createCard(data)

      cardList.addItem(card)
    },
  },
  ".elements"
)

function createFormValidator(formElement) {
  const validationForm = new FormValidator(settings, formElement);
  validationForm.enableValidation();
  return validationForm;
}

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

profileEditText.addEventListener('click', () => {
  nameInput.value = title.textContent;
  infoInput.value = subtitle.textContent;
  validationFormProfile.hideError();
  openPopup(popupProfile);
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
  validationFormImage.hideError();
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