let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');
let openPopupButtons = document.querySelectorAll('.open-popup');
let closePopupButton = document.querySelector('.close-popup');

openPopupButtons.forEach((button) => { // Перебираем все кнопки
    button.addEventListener('click', (event) => { // Для каждой вешаем обработчик событий на клик
        event.preventDefault(); // Предотвращаем дефолтное поведение браузера
        popup.classList.add('active'); // Добавляем класс 'active' для фона
        popupContainer.classList.add('active'); // И для самого окна
    })
});

closePopupButton.addEventListener('click', () => {
    popup.classList.remove('active');
    popupContainer.classList.remove('active');
});

document.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.classList.remove('active');
        popupContainer.classList.remove('active');
    }
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(event) {
    event.preventDefault();

    // Находим поля формы в DOM
    let popup = document.querySelector('.popup');
    let popupContainer = document.querySelector('.popup__container');
    let nameInput = popupContainer.querySelector('.popup__text_name');
    let infoInput = popupContainer.querySelector('.popup__text_info');

    let profile = document.querySelector('.profile');
    let profileAvatar = profile.querySelector('.profile__avatar');
    let profileText = profileAvatar.querySelector('.profile__text');

    let title = profileText.querySelector('.title');
    let subtitle = profileText.querySelector('.subtitle');

    title.textContent = nameInput.value;
    subtitle.textContent = infoInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupContainer.addEventListener('submit', handleFormSubmit);

document.addEventListener('submit', (event) => {
    popup.classList.remove('active');
    popupContainer.classList.remove('active');
});

let elementsLike = document.querySelectorAll('.elements__like');

elementsLike.forEach(button =>
    button.addEventListener('click', event =>
        button.classList.toggle('focus')
    )
);