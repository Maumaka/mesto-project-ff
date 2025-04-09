const config = {
  baseUrl: ' https://nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: '34213f04-3039-421f-a902-3814a209ede1',
    'Content-Type': 'application/json'
  }
}
//функция проверки на правильность
function checkError(res) {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис (если на сервере ошибка)
 return Promise.reject(`Ошибка: ${res.status}`);
}

//запрос данных массива карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => checkError(res))
}

//запрос данных профиля, имя, занятие, картинка с сервера
export const getNameProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => checkError(res))
}

//отправка данных пользователя на сервер
export const setProfile = (nameInput, jobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
    name: nameInput,
    about: jobInput
  })
})
    .then(res => checkError(res))
}

//добавление новой карточки
export const postNewCard = (nameCard, linkCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
    name: nameCard,
    link: linkCard
  })
})
    .then(res => checkError(res))
}

// Отправка лайка
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => checkError(res))
};

// Удаление лайка
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => checkError(res))
};

// Замена аватарки  
export const setAvatar = (urlAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
    avatar: urlAvatar
  })
})
    .then(res => checkError(res))
}

// Удаление карточки
export const deleteMyCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => checkError(res))
}