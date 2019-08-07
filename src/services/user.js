

class UserService {
    constructor() {
        this.url = 'https://academeez-login-ex.herokuapp.com/api/users/';
    }

    login = (data) => {
        return fetch(`${this.url}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    register = (data) => {
        return fetch(`${this.url}register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

export default new UserService();