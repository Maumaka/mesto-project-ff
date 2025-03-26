// Функция открытия попапа
function openPopup(namePopup) {
  namePopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Функция закрытия попапа
function closePopup(namePopup) {
  namePopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Закрытие по Escape
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);
  }
}

// Закрытие по клику на оверлей
function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

export {openPopup, closePopup, handleOverlayClick};