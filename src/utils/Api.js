class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  addServerUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this._checkResponse);
  }

  addServerUserAvatar(url) {
    console.log(url);
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._checkResponse);
  }

  addNewCard({ nameFoto, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: nameFoto,
        link,
      }),
    }).then(this._checkResponse);
  }

  deleteImg(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then(this._checkResponse);
  }

  changeLikeCard(isLike, id) {
    isLike ? (this._method = 'PUT') : (this._method = 'DELETE');
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: this._method,
      headers: this.headers,
      body: JSON.stringify({
        likes: {},
      }),
    }).then(this._checkResponse);
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '83664f83-845b-444d-96ac-5e42c57d9b46',
    'Content-Type': 'application/json',
  },
});

export { api };
