export default class Card {
    constructor(data, templateSelector, handleCardClick, userId) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._ownerId = data.owner._id
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this._userId = userId;
    }

    generateCard() {
        this.elementCard = this.templateSelector.cloneNode(true);

        this._elementsImage = this.elementCard.querySelector('.elements__image');
        this._elementsText = this.elementCard.querySelector('.elements__text');
        this._like = this.elementCard.querySelector('.elements__like');
        this.elementCard.classList.remove('elements__delete');
        this._button = this.elementCard.querySelector('.elements__delete');
        if (this._id != this._ownerId) {
            this._button.style.display = 'none';
        }
        if (this._userId == this._ownerId) {
            this._button.style.display = 'block';
        }
        this._likesCount = this.elementCard.querySelector(".elements__amount-like");
        this._likesCount.textContent = this._likes.length;

        this._nameCard();
        this._setEventHandlers();

        return this.elementCard;
    };

    likesCount(res) {
        this._likesCount.textContent = `${res.likes.length}`
    }

    _nameCard = () => {
        this._elementsImage.src = this._link;
        this._elementsImage.alt = this._name;
        this._elementsText.textContent = this._name;
    };

    _toggleLike = () => {
        this._like.classList.toggle("elements__like_active");
    }

    _deleteCard = () => {
        this.elementCard.remove()
    }

    _setEventHandlers = () => {
        this._button.addEventListener("click", () => this._deleteCard())
        this._like.addEventListener("click", () => this._toggleLike())
        this._elementsImage.addEventListener("click", () =>
            this.handleCardClick(this._elementsImage, this._elementsText)
        )
    }

}