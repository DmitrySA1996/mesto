const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const openPopupButtons = document.querySelector('.popup_opened');
const closePopupButton = document.querySelector('.popup__close');
const profileEditText = document.querySelector('.profile__edit-text');
const popupForm = popupContainer.querySelector('.popup__form');

const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('.popup__text_type_title');
const infoInput = document.querySelector('.popup__text_type_subtitle');

const elementsLike = document.querySelectorAll('elements__like');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = title.textContent;
    infoInput.value = subtitle.textContent;
};

function closePopup() {
    popup.classList.remove('popup_opened');
};

profileEditText.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);

function handleFormSubmit(event) {
    event.preventDefault();

    title.textContent = nameInput.value;
    subtitle.textContent = infoInput.value;
    popup.classList.remove('popup_opened');
};

popupForm.addEventListener('submit', handleFormSubmit);