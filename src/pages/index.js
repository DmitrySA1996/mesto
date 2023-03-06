import {
  popupConfig,
  profileAddButton,
  profileEditButton,
  formEditProfile,
  editInputName,
  editJobInput,
  formAddProfile,
  initialCards,
  settings,
  elementTemplate
} from "../utils/constants.js"

import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js"
import Section from "../components/Section.js"
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js"

function createCard(item) {
  return new Card(item, elementTemplate, () =>
    popupOpenImage.open(item)
  ).generateCard()
}

function formValues(value) {
  userInfo.setUserInfo(value.nameInput, value.jobInput)
  classEditPopup.close()
}

const userInfo = new UserInfo({
  titleSelector: ".profile__title",
  subtitleSelector: ".profile__subtitle",
})

function openEditProfile() {
  const { title, subtitle } = userInfo.getUserInfo()
  editInputName.value = title
  editJobInput.value = subtitle
  formEditValidator.disableSubmitButton()
  classEditPopup.open()
}

function popupAddCardProfile() {
  formCardValidator.disableSubmitButton()
  classCardPopup.open()
}

const classEditPopup = new PopupWithForm(
  popupConfig.popupEditSelector,
  formValues
)
classEditPopup.setEventListeners()

const cardSection = new Section(
  {
    renderer: (item) => cardSection.addItem(createCard(item)),
  },
  ".elements"
)

const classCardPopup = new PopupWithForm(
  popupConfig.popupAddCardSelector,
  (item) => {
    cardSection.addItem(createCard(item))
    classCardPopup.close()
  }
)
classCardPopup.setEventListeners()

const popupOpenImage = new PopupWithImage(popupConfig.popupImageSelector)
popupOpenImage.setEventListeners()

const formEditValidator = new FormValidator(settings, formEditProfile)
formEditValidator.enableValidation()

const formCardValidator = new FormValidator(settings, formAddProfile)
formCardValidator.enableValidation()

profileAddButton.addEventListener("click", () => popupAddCardProfile())
profileEditButton.addEventListener("click", () => openEditProfile())

cardSection.renderItems(initialCards.reverse())