const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const popupForm = popupContainer.querySelector('.popup__form');

const profileEditText = document.querySelector('.profile__edit-text');

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

  elementsСards.append(elementCard);
});

function editpopup(Edit, name, subname, pop, nameText, info) {
  Edit.addEventListener('click', (event) => {
    pop.classList.add('popup_opened');
    nameText.value = name;
    info.value = subname;
  });
};

function closePopup() {
  popup.classList.remove('popup_opened');
  popupImage.classList.remove('popup_opened');
};

function handleFormSubmit(event) {
  event.preventDefault();

  title.textContent = nameInput.value;
  subtitle.textContent = infoInput.value;
  popup.classList.remove('popup_opened');
};

editpopup(profileEditText, title.textContent, subtitle.textContent, popup, nameInput, infoInput);

popup.addEventListener('submit', handleFormSubmit);

popupContainer.querySelector('.popup__close').addEventListener('click', closePopup);

const popupImage = document.querySelector('.popup-image');
const popupContainerImage = popupImage.querySelector('.popup__container');
const popupFormImage = popupContainerImage.querySelector('.popup__form');
const profileAddButton = document.querySelector('.profile__add-button');
const nameImage = popupFormImage.querySelector('.popup__text_type_title');
const linkImage = popupFormImage.querySelector('.popup__text_type_subtitle');

editpopup(profileAddButton, "Название", "Ссылка на картинку", popupImage, nameImage, linkImage);

function handleImageSubmit(event) {
  event.preventDefault();

  const elementCard = elementTemplate.cloneNode(true);

  elementCard.querySelector('.elements__image').src = linkImage.value;
  elementCard.querySelector('.elements__image').alt = nameImage.value;
  elementCard.querySelector('.elements__text').textContent = nameImage.value;

  elementsСards.prepend(elementCard)
  popupImage.classList.remove('popup_opened');
};

popupImage.addEventListener('submit', handleImageSubmit);

popupContainerImage.querySelector('.popup__close').addEventListener('click', closePopup);

const likeButtons = Array.from(document.querySelectorAll(".elements__like"));
const likeCounts = Array.from(document.querySelectorAll(".elements__image"));

likeButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    button.classList.toggle("elements__like_active");
    const current = Number(likeCounts[index].innerHTML);
    const inc = button.classList.contains("elements__like_active") ? 1 : -1;
    likeCounts[index].innerHTML = current + inc;
  });
});
