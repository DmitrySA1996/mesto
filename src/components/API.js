export default class API {
  constructor({ token, URL }) {
    this._token = token;
    this._url = URL;
  }

 _handleSendingRequest(res) {
    if (res.ok) {
      return Promise.resolve(res.json())
    }

   return Promise.reject(`Ошибка: ${res.status}`)
  }

  async getRealUserInfo() {
    const response = await fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token
      },
    })
    return this._handleSendingRequest(response)
  }

 async getInitialCards() {
    const response = await fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token
      },
    })
    return this._handleSendingRequest(response)
  }

 async editProfileUserInfo(data) {
    const response = await fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token
      },
      body: JSON.stringify({
        name: data.name,
        about: data.info,
      }),
    })
    return this._handleSendingRequest(response)
  }

  async addNewCard(data) {
    const response = await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token
      },
      body: JSON.stringify(data),
    })
    return this._handleSendingRequest(response)
  }

  async addLike(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token
      },
    })
    return this._handleSendingRequest(response)
  }

  async removeCard(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      },
    })
    return this._handleSendingRequest(response)
  }

  async removeLike(cardId) {
    const response = await fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token
      },
    })
    return this._handleSendingRequest(response)
  }

  async updateProfileUserAvatar(data) {
    const response = await fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    return this._handleSendingRequest(response)
  }
}