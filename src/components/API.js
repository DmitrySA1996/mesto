export default class API {
    constructor({ token, method, URL }) {
        this._token = token;
        this._method = method;
        this._url = `${URL} + cards`;
    }

    objectUser() {
        fetch(this._url,
            {
                method: this._method,
                headers: {
                    Authorization: this._token
                }
            }
        )
            .then((data) => {
                return data; 
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
            });
    }
}