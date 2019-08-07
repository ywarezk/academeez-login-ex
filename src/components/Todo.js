import React, {useEffect, useState} from 'react';
import taskService from '../services/task';

export default ({token}) => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        if (!token) return;
        taskService.fetchTasks(token)
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Unauthorized')
                }
                return res.json();
            })
            .then(tasks => setTasks(tasks))
    }, [token])

    return (
        <>
            <h1 className="mt-3">Todo List</h1>
            {
                !token ? <h1>Unauthorized</h1> : (
                    <ul className="list-group">
                        {
                            tasks.map(task => (
                                <li className="list-group-item" key={task.id}>
                                    <h5>{task.title}</h5>
                                    <p>
                                        {task.description}
                                    </p>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </>
    )
}