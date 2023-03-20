export default class API {
    constructor({ token, URL }) {
        this._token = token;
        this._url = URL;
    }

    objectUser() {
        fetch(`${this._url}/users/me`,
            {
                headers: {
                    authorization: this._token
                }
            }
        )
            .then(res => res.json())
            .then((result) => {
                return result;
            });
    }
}