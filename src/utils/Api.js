class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _parseResponse(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(endPoint, options) {
        return fetch(`${this._baseUrl}${endPoint}`, options)
            .then(this._parseResponse)
            .catch(e => console.log(e));
    }

    getCards() {
        return this._request('/cards', {
            headers: this._headers
        })
    }

    addCard(data) {
        return this._request(`/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
    }

    removeCard(id) {
        return this._request(`/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
    }

    /**
     *
     * @param {number} id - card id
     * @param {boolean} status - card liked status
     * @returns {Promise<Response | void>} - promise
     */
    changeLikeCardStatus(id, status) {
        return this._request(`/cards/${id}/likes`, {
            method: status ? 'DELETE' : 'PUT',
            headers: this._headers
        })
    }

    getUserInfo() {
        return this._request(`/users/me`, {
            headers: this._headers
        })
    }

    setUserInfo(data) {
        return this._request(`/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
    }

    editAvatar(data) {
        return this._request(`/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-70',
    headers: {
        authorization: '99bdb945-3b1c-4bb2-a40c-a00024f1a035',
        'Content-Type': 'application/json'
    }
});

export default api;