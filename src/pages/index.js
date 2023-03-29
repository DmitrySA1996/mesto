import './index.css';

import {
  profileUpdateAvatar,
  popupConfig,
  profileAddButton,
  profileEditButton,
  formProfile,
  formImage,
  formUpdateAvatar,
  settings,
  editInputName,
  editJobInput,
  editAvatar,
  elementTemplate,
  elementsApi
} from "../utils/constants.js"

import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import PopupConfirmation from "../components/PopupConfirmation.js"
import UserInfo from "../components/UserInfo.js"
import API from "../components/API.js"

const user = new UserInfo({
  name: editInputName,
  about: editJobInput,
  avatar: editAvatar
})

let userId;

const api = new API(elementsApi);

const validatorFormUpdateAvatar = new FormValidator(
  settings,
  formUpdateAvatar
)

const validatorFormEditProfile = new FormValidator(
  settings,
  formProfile
)

const validatorFormAddProfile = new FormValidator(
  settings,
  formImage
)

const cardList = new Section(
  {
    renderer: (data) => {
      const card = createCard(data)

      cardList.addItem(card)
    },
  },
  ".elements__cards"
)

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

function createCard(data) {
  const card = new Card(
    data,
    elementTemplate,
    openPopupImage,
    userId,
    async () => {
      try {
        const response = await api.addLike(data._id)
        card.likesCount(response)
      } catch (error) {
        return console.log(`Ошибка: ${error}`)
      }
    },
    async () => {
      try {
        const response = await api.removeLike(data._id)
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
  popupEdit.changeTextSubmitUsSave(popupEdit);
  try {
    try {
      const userProfile = await api.editProfileUserInfo(data)
      user.setUserInfo(userProfile)
      popupEdit.close()
    } catch (error) {
      return console.log(`Ошибка: ${error}`)
    }
  }
  finally {
    popupEdit.resetSubmitTextToDefault(popupEdit)
  }
}

async function handleSubmitFormUpdateAvatar(data) {
  popupAvatar.changeTextSubmitUsSave(popupAvatar);
  try {
    try {
      const userProfile = await api.updateProfileUserAvatar(data)
      user.setUserInfo(userProfile)
      popupAvatar.close()
    }
    catch (error) {
      return console.log(`Ошибка: ${error}`)
    }
  } finally {
    popupAvatar.resetSubmitTextToDefault(popupAvatar)
  }
}

async function handleSubmitFormAddCard(data) {
  popupAdd.changeTextSubmitUsSave(popupAdd);
  try {
    try {
      const newCard = await api.addNewCard(data)
      cardList.addItem(createCard(newCard))
      popupAdd.close()
    } catch (error) {
      return console.log(`Ошибка: ${error}`)
    }
  } finally {
    popupAdd.resetSubmitTextToDefault(popupAdd)
  }
}

profileEditButton.addEventListener(
  "click",
  () => {
    popupEdit.open()
    popupEdit.setInputValues(user.getUserInfo())
    validatorFormEditProfile.hideError()
  },
  false
)

profileUpdateAvatar.addEventListener(
  "click",
  () => {
    popupAvatar.open()
    validatorFormUpdateAvatar.hideError()
  },
  false
)

profileAddButton.addEventListener(
  "click",
  () => {
    popupAdd.open()
    validatorFormAddProfile.hideError()
  },
  false
)

validatorFormAddProfile.enableValidation()
validatorFormEditProfile.enableValidation()
validatorFormUpdateAvatar.enableValidation()

const popupConfirmation = new PopupConfirmation(
  popupConfig.popupDeleteSelector,
  async (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        card.deleteCard()
        popupConfirmation.close(card)
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }
)

popupAdd.setEventListeners();
popupEdit.setEventListeners();
popupAvatar.setEventListeners();
popupImage.setEventListeners();
popupConfirmation.setEventListeners();

Promise.all([api.getRealUserInfo(), api.getInitialCards()])
  .then(([userProfile, cards]) => {
    user.setUserInfo(userProfile)
    userId = userProfile._id
    cardList.renderItems(cards)
  })

  .catch((error) => console.log(`Ошибка: ${error}`))