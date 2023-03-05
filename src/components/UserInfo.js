export default class UserInfo {
    constructor({ elementInfo, elementName }) {
        this._data = {
            name: elementName.textContent,
            info: elementInfo.textContent,
        }
        this._name = elementName
        this._info = elementInfo
    }

    getUserInfo() {
        return {
            name: this._data.name,
            info: this._data.info,
        }
    }

    setUserInfo(data) {
        this._data.name = data.name
        this._data.info = data.info
        if (data.name) {
            this._name.textContent = this._data.name
        }

        if (data.info) {
            this._info.textContent = this._data.info
        }

    }
}