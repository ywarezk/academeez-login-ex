

class TaskService {
    constructor() {
        this.url = 'https://academeez-login-ex.herokuapp.com/api/tasks'
    }

    fetchTasks = (token) => {
        return fetch(this.url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}

export default new TaskService();