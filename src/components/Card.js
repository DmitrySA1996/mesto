export default class Card {
    constructor(
        data,
        templateSelector,
        handleCardClick,
        userId,
        like,
        dislike,
        deleteCard
    ) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._ownerId = data.owner._id
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this._userId = userId;
        this._like = like;
        this._dislike = dislike;
        this._deleteCard = deleteCard;
    }

    generateCard() {
        this.elementCard = this.templateSelector.cloneNode(true);

        this._elementsImage = this.elementCard.querySelector('.elements__image');
        this._elementsText = this.elementCard.querySelector('.elements__text');
        this._likeButton = this.elementCard.querySelector('.elements__like');
        this.elementCard.classList.remove('elements__delete');
        this._button = this.elementCard.querySelector('.elements__delete');
        this._likesCount = this.elementCard.querySelector(".elements__amount-like");
        if (this._userId !== this._ownerId) {
            this._button.remove();
        }

        this._likeOrDislike()

        this._nameCard();
        this._setEventHandlers();

        return this.elementCard;
    };

    likesCount(res) {
        this._likes = res.likes
        this._likeOrDislike()
    }

    _nameCard = () => {
        this._elementsImage.src = this._link;
        this._elementsImage.alt = this._name;
        this._elementsText.textContent = this._name;
    };

    _likeOrDislike() {
        const likesUser = this._likes.some(like => like._id === this._userId)
        if (likesUser) {
            this._addLike()
        }
        else {
            this._removeLike()
        }
        this._likesCount.textContent = this._likes.length
    }

    deleteCard = () => {
        this.elementCard.remove()
    }

    _addLike() {
        this._likeButton.classList.toggle("elements__like_active");
    }

    _removeLike() {
        this._likeButton.classList.remove("elements__like_active")
    }

    _setEventHandlers = () => {
        this._likeButton.addEventListener("click", () => {
            if (this._likeButton.classList.contains("elements__like_active")) {
                this._dislike()
            } else {
                this._like()
            }
        })
        this._elementsImage.addEventListener("click", () =>
            this.handleCardClick(this._elementsImage, this._elementsText)
        )
        this._button.addEventListener("click", () => {
            this._deleteCard(this._id)
        })
    }

}