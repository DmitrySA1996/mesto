import './index.css';

import {
  profileUpdateAvatar,
  popupConfig,
  profileAddButton,
  profileEditButton,
  formProfile,
  formImage,
  settings,
  elementTemplate,
  elementsApi
} from "../utils/constants.js"

import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js"
import API from "../components/API.js"

/*const formEditValidator = createFormValidator(formProfile);
const formCardValidator = createFormValidator(formImage);*/
const api = new API(elementsApi);

function createCard(data) {
  const card = new Card(
    data,
    ".element-template",
    openPopupImage,

    userId,
    async () => {
      try {
        const response = await api.addLike(data._id)
        card.like()
        card.likesCount(response)
      } catch (error) {
        return console.log(`Ошибка: ${error}`)
      }
    },
    async () => {
      try {
        const response = await api.removeLike(data._id)
        card.dislike()
        card.likesCount(response)
      } catch (error) {
        return console.log(`Ошибка: ${error}`)
      }
    },
    () => {
      popupConfirmation.open(card)
    }
  )

  return card.generateCard()
}

function openPopupImage(name, link) {
  popupImage.open(name, link)
}

async function handleSubmitFormEditProfile(data) {
  try {
    const user= await api.editProfileUserInfo(data)
    user.setUserInfo(user)
  } catch (error) {
    return console.log(`Ошибка: ${error}`)
  }
}

async function handleSubmitFormUpdateAvatar(data) {
  try {
    const user = await api.updateProfileUserAvatar(data)
    user.setUserInfo(user)
  } catch (error) {
    return console.log(`Ошибка: ${error}`)
  }
}

async function handleSubmitFormAddCard(data) {
  try {
    const newCard = await api.addNewCard(data)
    cardList.addItem(createCard(newCard))
  } catch (error) {
    return console.log(`Ошибка: ${error}`)
  }
}

const popupImage = new PopupWithImage(popupConfig.popupImageSelector)

const popupAdd = new PopupWithForm(
  popupConfig.popupAddCardSelector,
  handleSubmitFormAddCard
)

const popupEdit = new PopupWithForm(
  popupConfig.popupEditSelector,
  handleSubmitFormEditProfile
)

const popupAvatar = new PopupWithForm(
  popupConfig.popupUpdateAvatarSelector,
  handleSubmitFormUpdateAvatar
)

profileEditButton.addEventListener(
  "click",
  () => {
    popupEdit.open()
    popupEdit.setInputValue(user.getUserInfo())
    validatorFormEditProfile.disableSubmitButton()
  },
  false
)

profileUpdateAvatar.addEventListener(
  "click",
  () => {
    popupAvatar.open()
    validatorFormUpdateAvatar.disableSubmitButton()
  },
  false
)

profileAddButton.addEventListener(
  "click",
  () => {
    popupAdd.open()
    validatorFormAddProfile.disableSubmitButton()
  },
  false
)

// Для каждой проверяемой формы новый экземпляр класса FormValidator
const validatorFormEditProfile = new FormValidator(
  validationConfig,
  formEditProfile
)

validatorFormEditProfile.enableValidation()

const validatorFormAddProfile = new FormValidator(
  validationConfig,
  formAddProfile
)

validatorFormAddProfile.enableValidation()

const validatorFormUpdateAvatar = new FormValidator(
  validationConfig,
  formUpdateAvatar
)

validatorFormUpdateAvatar.enableValidation()

const popupConfirmation = new PopupConfirmation(
  popupConfig.popupDeleteSelector,
  async (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        card.remove()
        popupConfirmation.close()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }
)

const cardList = new Section(
  {
    renderer: (data) => {
      const card = createCard(data)

      cardList.addItem(card)
    },
  },
  ".elements"
)

Promise.all([api.getRealUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    user.setUserInfo(user)
    userId = user._id
    cardList.renderItems(cards)
  })

  .catch((error) => console.log(`Ошибка: ${error}`))