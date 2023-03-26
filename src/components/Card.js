export default class Card {
    constructor({ name, link }, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
    }

    generateCard() {
        this.elementCard = this.templateSelector.cloneNode(true);

        this._elementsImage = this.elementCard.querySelector('.elements__image');
        this._elementsText = this.elementCard.querySelector('.elements__text');
        this._like = this.elementCard.querySelector('.elements__like');
        this._button = this.elementCard.querySelector('.elements__delete');

        this._likesCount = this.elementCard.querySelector(".elements__amount-like");
        this._likesCount.textContent = this._like.length;

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
        if (this._ownerId !== this._userId) {
            this.elementCard.remove()
        }
    }

    _setEventHandlers = () => {
        this._button.addEventListener("click", () => this._deleteCard())
        this._like.addEventListener("click", () => this._toggleLike())
        this._elementsImage.addEventListener("click", () =>
            this.handleCardClick(this._elementsImage, this._elementsText)
        )
    }

}