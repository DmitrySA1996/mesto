export default class Card {
    constructor(element, elementTemplate, popupCard, cardImg, cardSign) {
        this._name = element.name;
        this._link = element.link;
        this.elementTemplate = elementTemplate;
        this.popupCard = popupCard;
        this.cardImg = cardImg;
        this.cardSign = cardSign;
    }
    

    createCard() {
        this.elementCard = this.elementTemplate.cloneNode(true);

        this._elementsImage = this.elementCard.querySelector('.elements__image');
        this._elementsText = this.elementCard.querySelector('.elements__text');
        this._like = this.elementCard.querySelector('.elements__like');
        this._button = this.elementCard.querySelector('.elements__delete')

        this._nameCard();
        this._setEventHandlers();

        return this.elementCard;

    };

    _nameCard = () => {
        this._elementsImage.src = this._link;
        this._elementsImage.alt = this._name;
        this._elementsText.textContent = this._name;
    };

    _like = () => {
        toggleLike(this._like);
    }

    _button = () => {
        this._cardElement.remove()
    }


    _setEventHandlers = () => {
        this._button.addEventListener("click", () => this._button())
        this._like.addEventListener("click", () => this._like())
        this._elementsImage.addEventListener("click", () =>
            this._handleCardClick(this._name, this._link)
        )
    }

    _handleCardClick(_name, _link) {
        openPopup(this.popupCard);
        this.cardImg.src = this._elementsImage.src;
        this.cardImg.alt = this._elementsImage.alt;
        this.cardSign.textContent = this._elementsText.textContent;
    }

}