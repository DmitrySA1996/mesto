const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const openPopupButtons = document.querySelector('.popup_opened');
const closePopupButton = document.querySelector('.popup__close');

const profileEditText = document.querySelector('.profile__edit-text');
const profileAddButton = document.querySelector('.profile__add-button');

const popupForm = popupContainer.querySelector('.popup__form');

const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('.popup__text_type_title');
const infoInput = document.querySelector('.popup__text_type_subtitle');

const elementsСards = document.querySelector('.elements__cards');
const elementTemplate = document.querySelector('.element-template').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (element) {
  const elementCard = elementTemplate.cloneNode(true);

  elementCard.querySelector('.elements__image').src = element.link;
  elementCard.querySelector('.elements__image').alt = element.name;
  elementCard.querySelector('.elements__text').textContent = element.name;

  elementsСards.append(elementCard)
});

function editpopup(Edit, name, subname) {
  Edit.addEventListener('click', (event) => {
    popup.classList.add('popup_opened');
    nameInput.value = name;
    infoInput.value = subname;
  })
};

editpopup(profileEditText, title.textContent, subtitle.textContent);
editpopup(profileAddButton, 'Название', 'Ссылка на картинку');

function closePopup() {
  popup.classList.remove('popup_opened');
};

closePopupButton.addEventListener('click', closePopup);

function handleImageSubmit(event) {
  event.preventDefault();

  const elementCard = elementTemplate.cloneNode(true);

  elementCard.querySelector('.elements__image').src = infoInput.value;
  elementCard.querySelector('.elements__image').alt = nameInput.value;
  elementCard.querySelector('.elements__text').textContent = nameInput.value;

  elementsСards.appendChild(elementCard)
  popup.classList.remove('popup_opened');
}
popupForm.addEventListener('submit', handleImageSubmit);