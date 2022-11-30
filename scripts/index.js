const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const openPopupButtons = document.querySelector('.popup_opened');
const closePopupButton = document.querySelector('.popup__close');
const profileEditText = document.querySelector('.profile__edit-text');

const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');

const nameInput = document.querySelector('.popup__text_type_title');
const infoInput = document.querySelector('.popup__text_type_subtitle');

const elementsLike = document.querySelectorAll('elements__like');

function OpenPopup() {
    popup.classList.add('popup_opened'); // Добавляем класс 'active' для фона
};

function ClosePopup() {
    popup.classList.remove('popup_opened'); // Добавляем класс 'active' для фона
};

profileEditText.onclick = OpenPopup;
closePopupButton.onclick = ClosePopup;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(event) {
    event.preventDefault();

    title.textContent = nameInput.value;
    subtitle.textContent = infoInput.value;
    document.addEventListener('submit', ClosePopup);
};

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupContainer.addEventListener('submit', handleFormSubmit);