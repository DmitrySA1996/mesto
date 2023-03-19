import './index.css';

import {
  popupConfig,
  profileAddButton,
  profileEditButton,
  formProfile,
  formImage,
  initialCards,
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

const formEditValidator = createFormValidator(formProfile);
const formCardValidator = createFormValidator(formImage);
const api = new API(elementsApi);

function createFormValidator(formElement) {

  const validationForm = new FormValidator(settings, formElement);

  validationForm.enableValidation();

  return validationForm;

}

function getObjectApi(){
  return api.objectApi();
}

function createCard(item) {
  return new Card(item, elementTemplate, () =>
    popupOpenImage.open(item)
  ).generateCard()
}

function setFormValues(value) {
  userInfo.setUserInfo(value.name, value.info)
  classEditPopup.close()
}

const userInfo = new UserInfo(getObjectApi())

function openEditProfile() {
  const data = userInfo.getUserInfo();
  classEditPopup.setInputValues(data);
  formEditValidator.hideError();
  classEditPopup.open(data);
}

function popupAddCardProfile() {
  formCardValidator.hideError()
  classCardPopup.open()
}

const classEditPopup = new PopupWithForm(
  popupConfig.popupEditSelector,
  setFormValues
)
classEditPopup.setEventListeners()

const cardSection = new Section(
  {
    renderer: (item) => cardSection.addItem(createCard(item)),
  },
  ".elements__cards"
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

profileAddButton.addEventListener("click", () => popupAddCardProfile())
profileEditButton.addEventListener("click", () => openEditProfile())

cardSection.renderItems(initialCards.reverse())