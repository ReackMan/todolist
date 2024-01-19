import React, {ChangeEvent, useEffect, useState} from "react";
import {todolistsAPI} from "./todolists-api";

export default {
    title: 'API',

}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "3277cb5c-af39-4da3-bbc5-a0a1211fb89e",
        // 'Access-Control-Allow-Origin' : '*',
        // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTodolist = () => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
        setTitle('')
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input type="text" placeholder='Todolist Title' value={title} onChange={onTitleChanged}/>
            <button onClick={addTodolist}>Add Todolist</button>
        </div>
    </div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [tlId, setTlId] = useState<string>('')

    const onTlIdChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setTlId(e.currentTarget.value)
    }
    const deleteTodolist = () => {
        todolistsAPI.deleteTodolist(tlId)
            .then((res) => {
                setState(res.data)
            })
        setTlId('')
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input type="text" placeholder='Todolist ID' value={tlId} onChange={onTlIdChanged}/>
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </div>
    </div>
}

export const UpdateTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [tlId, setTlId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const onTlIdChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setTlId(e.currentTarget.value)
    }
    const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const updateTodolist = () => {
        todolistsAPI.updateTodolist(title ,tlId)
            .then((res) => {
                setState(res.data)
            })
        setTlId('')
        setTitle('')
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input type="text" placeholder='Todolist Title' value={title} onChange={onTitleChanged}/>
            <input type="text" placeholder='Todolist ID' value={tlId} onChange={onTlIdChanged}/>
            <button onClick={updateTodolist}>Update Todolist</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [tlId, setTlId] = useState<string>('')

    const onTlIdChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setTlId(e.currentTarget.value)
    }
    const getTasks = () => {
        todolistsAPI.getTasks(tlId)
            .then((res) => {
                setState(res.data)
            })
        setTlId('')
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input type="text" placeholder='Todolist ID' value={tlId} onChange={onTlIdChanged}/>
            <button onClick={getTasks}>Get Tasks</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [tlId, setTlId] = useState<string>('')

    const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onTlIdChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setTlId(e.currentTarget.value)
    }
    const addTask = () => {
        todolistsAPI.createTask(title, tlId)
            .then((res) => {
                setState(res.data)
            })
        setTitle('')
        setTlId('')
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input type="text" placeholder='Task Title' value={title} onChange={onTitleChanged}/>
            <input type="text" placeholder='Todolist ID' value={tlId} onChange={onTlIdChanged}/>
            <button onClick={addTask}>Add Task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [tlId, setTlId] = useState<string>('')

    const onTaskIdChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const onTlIdChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setTlId(e.currentTarget.value)
    }
    const deleteTask = () => {
        todolistsAPI.deleteTask(tlId, taskId)
            .then((res) => {
                setState(res.data)
            })
        setTaskId('')
        setTlId('')
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input type="text" placeholder='Task ID' value={taskId} onChange={onTaskIdChanged}/>
            <input type="text" placeholder='Todolist ID' value={tlId} onChange={onTlIdChanged}/>
            <button onClick={deleteTask}>Delete Todolist</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [tlId, setTlId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    // const [completed, setCompleted] = useState<boolean>(false)
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const onTlIdChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setTlId(e.currentTarget.value)
    }
    const onTaskIdChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }
    const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onDescriptionChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.currentTarget.value)
    }
    const onStatusChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(+e.currentTarget.value)
    }
    const onPriorityChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setPriority(+e.currentTarget.value)
    }
    const onStartDateChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.currentTarget.value)
    }
    const onDeadlineChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setDeadline(e.currentTarget.value)
    }
    const updateTask = () => {
        let model = {
            description: description,
            title: title,
            // completed: c,
            status: status,
            priority: priority,
            startDate: startDate,
            deadline: deadline,
        }

        todolistsAPI.updateTask(model ,tlId, taskId)
            .then((res) => {
                setState(res.data)
            })
        setTlId('')
        setTaskId('')
        setTitle('')
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input type="text" placeholder='Todolist ID' value={tlId} onChange={onTlIdChanged}/>
            <input type="text" placeholder='Task ID' value={taskId} onChange={onTaskIdChanged}/>
            <input type="text" placeholder='Task Title' value={title} onChange={onTitleChanged}/>
            <input type="text" placeholder='Task Description' value={description} onChange={onDescriptionChanged}/>
            <input type="number" placeholder='Task Status' value={status} onChange={onStatusChanged}/>
            <input type="number" placeholder='Task Priority' value={priority} onChange={onPriorityChanged}/>
            <input type="text" placeholder='Task StartDate' value={startDate} onChange={onStartDateChanged}/>
            <input type="text" placeholder='Task Deadline' value={deadline} onChange={onDeadlineChanged}/>
            {/*<input type="text" placeholder='Task Title' value={title} onChange={onTitleChanged}/>*/}
            <button onClick={updateTask}>Update Task</button>
        </div>
    </div>
}
