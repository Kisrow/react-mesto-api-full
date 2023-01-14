  class Api {
  constructor(config) {
    this._userToken = config.userToken;
    this._url = config.url;
  }

  _chekResponse(res) {
    if (res.ok) {
      return res.json();
    } else
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: {
        // authorization: this._userToken
        'Content-Type': 'application/json'
      }
    })
    .then(this._chekResponse)  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: {
        // authorization: this._userToken
        'Content-Type': 'application/json'
      }
    })
    .then(this._chekResponse)
  }

  patchEditProfileInformation(inputValues) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        // authorization: this._userToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about
      })
    })
    .then(this._chekResponse)
  }

  //Если запрос прошёл успешно, сервер вернёт ответ с объектом новой карточки
  postNewCard(inputValues) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        authorization: this._userToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputValues.name,
        link: inputValues.link
      })
    })
    .then(this._chekResponse)
  }

  changeLikeCardStatus(idCard, isLiked) {
    return fetch(`${this._url}/cards/${idCard}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      credentials: 'include',
      headers: {
        authorization: this._userToken,
        'Content-Type': 'application/json'
      }
    })
    .then(this._chekResponse)
  }

  deleteCard(idCard) {
    return fetch(`${this._url}/cards/${idCard}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        authorization: this._userToken,
        'Content-Type': 'application/json'
      }
    })
    .then(this._chekResponse)
  }

  //смена аватара
  patchAvatarProfile(inputValues) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        authorization: this._userToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: inputValues.avatar
      })
    })
    .then(this._chekResponse)
  }
}

export const api = new Api({
  // userToken: 'fe432b22-c689-4f0c-8db5-8b9370263f9d',
  // url: 'https://nomoreparties.co/v1/cohort-50'
  userToken: 'fe432b22-c689-4f0c-8db5-8b9370263f9d',
  url: 'http://kisrow.backend.nomoredomains.rocks'
});