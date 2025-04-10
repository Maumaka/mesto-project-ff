import '../pages/index.css';
import {createCard, deleteCard, likeCard} from './card.js';
import {openPopup, closePopup, handleOverlayClick} from './modal.js';
import {setFormEventListeners, clearValidation, enableValidation} from './validation.js';
import {getInitialCards, getNameProfile, setProfile, postNewCard, setAvatar, deleteMyCard} from './api.js';


const placesContainer = document.querySelector('.places__list');
const buttonEditingProfile = document.querySelector('.profile__edit-button');
const popupEditingProfile = document.querySelector('.popup_type_edit'); 
const popupButtonCloseEditingProfile = popupEditingProfile.querySelector('.popup__close');
const buttonAdd = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupButtonCloseNewCard = popupNewCard.querySelector('.popup__close');
const imagePopup = document.querySelector('.popup_type_image');
const popupButtonCloseImage = imagePopup.querySelector('.popup__close');
const formElementProfile = document.forms['edit-profile'];
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const avatarProfile = document.querySelector('.profile__image');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = popupNewCard.querySelector('.popup__input_type_url');
const formElementNewCard = document.forms['new-place'];
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const pupupEditAvatar = document.querySelector('.popup_type_edit_avatar');
const profileImage = document.querySelector('.profile__image');
const urlInputAvatar = pupupEditAvatar.querySelector('.popup__input_type_url');
const popupButtonCloseEditAvatar = pupupEditAvatar.querySelector('.popup__close');
const formElementAvatar = document.forms['new-avatar'];

// Добавляем анимацию попапам
popupEditingProfile.classList.add('popup_is-animated');
popupNewCard.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');


function renderLoading(isLoading, form) {
  const buttonTextPopup = form.querySelector('.popup__button');
  if (isLoading) {
    buttonTextPopup.textContent = 'Сохранить';
  } else {
    buttonTextPopup.textContent = 'Сохранение...';
  }
} 

//----------------- Попап изменения картинки профиля ----------------

profileImage.addEventListener('click', () => {
  openPopup(pupupEditAvatar);
  formElementAvatar.reset();
  clearValidation(formElementAvatar, validationConfig); // очистка ошибок
});

popupButtonCloseEditAvatar.addEventListener('click', () => closePopup(pupupEditAvatar));
pupupEditAvatar.addEventListener('mousedown', handleOverlayClick);

function handleFormSubmitEditAvatar(evt) {
  evt.preventDefault();
  renderLoading(false, pupupEditAvatar)
  setAvatar(urlInputAvatar.value)
    .then((result) => {
      avatarProfile.style.backgroundImage = `url(${result.avatar})`;
      closePopup(pupupEditAvatar);
    })
    .finally(() => renderLoading(true, pupupEditAvatar))
}

formElementAvatar.addEventListener('submit', handleFormSubmitEditAvatar);


// ---------------- Попап редактирования профиля ----------------

buttonEditingProfile.addEventListener('click', () => {
  openPopup(popupEditingProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formElementProfile, validationConfig); // очистка ошибок
});

popupButtonCloseEditingProfile.addEventListener('click', () => closePopup(popupEditingProfile));
popupEditingProfile.addEventListener('mousedown', handleOverlayClick);

function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();
  renderLoading(false, popupEditingProfile)
  setProfile(nameInput.value, jobInput.value)
  .then((result) => {
    profileTitle.textContent = result.name;
    profileDescription.textContent = result.about;
    closePopup(popupEditingProfile);
  })
  .finally(() => renderLoading(true, popupEditingProfile))
}

formElementProfile.addEventListener('submit', handleFormSubmitEditProfile);

// ---------------- Попап добавления нового места ----------------

buttonAdd.addEventListener('click', () => {
  openPopup(popupNewCard);
  formElementNewCard.reset();
  clearValidation(formElementNewCard, validationConfig); // очистка ошибок
});

popupButtonCloseNewCard.addEventListener('click', () => closePopup(popupNewCard));
popupNewCard.addEventListener('mousedown', handleOverlayClick);

function handleFormSubmitEditProfileNewCard(evt) {
  evt.preventDefault();
  renderLoading(false, popupNewCard)
  postNewCard(cardNameInput.value, urlInput.value)
  .then((result) => {
    placesContainer.prepend(createCard(result, deleteCard, likeCard, openImage, result.owner, deleteMyCard)); 
  closePopup(popupNewCard);
  })
  .finally(() => renderLoading(true, popupNewCard))
 };

formElementNewCard.addEventListener('submit', handleFormSubmitEditProfileNewCard);

// ---------------- Попап с изображением ----------------

function openImage (cardImageLink, cardCaptionName) {
  popupImage.src = cardImageLink;
  popupImage.alt = 'фото местности ' + cardImageLink;
  popupCaption.textContent = cardCaptionName;
  openPopup(imagePopup);
}

popupButtonCloseImage.addEventListener('click', () => closePopup(imagePopup));
imagePopup.addEventListener('mousedown', handleOverlayClick);


//-------------------- Валидация -----------------------

//массив классов
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationConfig);

//---------------------- API ----------------------------------

 //получаем данные карточек и профиля одновременно 
Promise.all([getInitialCards(), getNameProfile()])
  .then(([cards, profile]) => {
    cards.forEach((card) => {
      const newCard = createCard(card, deleteCard, likeCard, openImage, profile, deleteMyCard);
      placesContainer.append(newCard);
    });
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    avatarProfile.style.backgroundImage = `url(${profile.avatar})`;
  })
  .catch((err) => console.log('Ошибка при получении профиля:', err));

