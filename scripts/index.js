const popupProfile = document.querySelector('.popup');
const ContainerProfile = popupProfile.querySelector('.popup__container');
const FormProfile = ContainerProfile.querySelector('.popup__form');
const profileAddButton = document.querySelector('.profile__add-button');

const profileEditText = document.querySelector('.profile__edit-text');

const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('.popup__text_type_title');
const infoInput = document.querySelector('.popup__text_type_subtitle');

const elementsСards = document.querySelector('.elements__cards');
const elementTemplate = document.querySelector('.element-template').content;

const popupImage = document.querySelector('.popup_type_image');
const ContainerImage = popupImage.querySelector('.popup__container');
const FormImage = ContainerImage.querySelector('.popup__form');
const nameImage = FormImage.querySelector('.popup__text_type_title');
const linkImage = FormImage.querySelector('.popup__text_type_subtitle');

const elementsCardList = document.querySelectorAll('.elements__card');
const popupCard = document.querySelector('.popup_type_card');
const CardContainer = popupCard.querySelector('.popup__container');
const CardImg = CardContainer.querySelector('.popup__image');
const CardSign = CardContainer.querySelector('.popup__sign');

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function copyTemplate(template) {
  return template.cloneNode(true);
};

function addLike(like) {
  like.addEventListener("click", () => {
    like.classList.toggle("elements__like_active");
    return like;
  });
};

function openImage(element) {
  const elementsImage = element.querySelector('.elements__image');
  const elementsText = element.querySelector('.elements__text');

  elementsImage.addEventListener('click', () => {

    openPopup(popupCard);

    CardImg.src = elementsImage.src;
    CardImg.alt = elementsImage.alt;
    CardSign.textContent = elementsText.textContent;

  });

};

function createCard(name, link) {
  elementCard = copyTemplate(elementTemplate);

  elementCard.querySelector('.elements__image').src = link;
  elementCard.querySelector('.elements__image').alt = name;
  elementCard.querySelector('.elements__text').textContent = name;

  return elementCard;
};

function renderCard(name, link) {
  elementCard = createCard(name, link);

  like = elementCard.querySelector('.elements__like');
  addLike(like);

  const button = elementCard.querySelector('.elements__delete')
  button.addEventListener('click', (evt) => {
    evt.target.closest('.elements__card').remove()
  });

  openImage(elementCard);

  return elementCard;

};

initialCards.forEach(function (element) {
  elementCard = renderCard(element.name, element.link);
  elementsСards.append(elementCard);
});

profileEditText.addEventListener('click', (event) => {
  openPopup(popupProfile);
  nameInput.value = title.textContent;
  infoInput.value = subtitle.textContent;
});

function handleFormSubmit(event) {
  event.preventDefault();

  title.textContent = nameInput.value;
  subtitle.textContent = infoInput.value;
  popupProfile.classList.remove('popup_opened');
};

popupProfile.addEventListener('submit', handleFormSubmit);

profileAddButton.addEventListener('click', (event) => {
  openPopup(popupImage);
});

function handleImageSubmit(event) {
  event.preventDefault();
  elementCard = renderCard(nameImage.value, linkImage.value);
  elementsСards.prepend(elementCard);
  popupImage.classList.remove('popup_opened');
};

popupImage.addEventListener('submit', handleImageSubmit);

function closePopup() {
  popupCard.classList.remove('popup_opened');
  popupImage.classList.remove('popup_opened');
  popupProfile.classList.remove('popup_opened');
};

popupCard.querySelector('.popup__close').addEventListener('click', () => {

  closePopup(popupCard);

});

popupImage.querySelector('.popup__close').addEventListener('click', () => {

  closePopup(popupImage);

});

popupProfile.querySelector('.popup__close').addEventListener('click', () => {

  closePopup(popupProfile);

});