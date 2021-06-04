import React, {FormEvent, useState} from "react";
import {taskAPI} from "../API/api";

export default {
    title: 'API task'
}

export const GetTask = () => {
    const [id, setId] = useState<string>('')
    const [state, setState] = useState<any>(null)

    const getTask = () => {
        taskAPI.getTask(id)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>
        <input placeholder={'todoListId'} value={id} onInput={(e: FormEvent<HTMLInputElement>) => {setId(e.currentTarget.value)}}/>
        <button onClick={getTask}>get tasks of todoList</button>
        {JSON.stringify(state)}
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {
        taskAPI.addTask(id, title)
            .then(res => {
                setState(res.data.data.item)
            })
    }

    return <div>
        <input placeholder={'todoListId'} value={id} onInput={(e: FormEvent<HTMLInputElement>) => {setId(e.currentTarget.value)}}/>
        <input placeholder={'title'} value={title} onInput={(e: FormEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}}/>
        <button onClick={createTask}>Create Task</button>
        {JSON.stringify(state)}
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, setTodoListId] = useState<string>('')


    const deleteTodoList = () => {
        taskAPI.deleteTask(todoListId, taskId)
            .then(res => {
                setState(res.data.resultCode)
            })
    }

    return <div>
        <input placeholder={'taskId'} value={taskId} onInput={(e: FormEvent<HTMLInputElement>) => {setTaskId(e.currentTarget.value)}}/>
        <input placeholder={'todoListId'} value={todoListId} onInput={(e: FormEvent<HTMLInputElement>) => {setTodoListId(e.currentTarget.value)}}/>
        <button onClick={deleteTodoList}>Delete Task</button>
        {JSON.stringify(state)}
    </div>
}

// export const UpdateTask= () => {
//     const [state, setState] = useState<any>(null)
//     const [taskId, setTaskId] = useState<string>('')
//     const [todoListId, setTodoListId] = useState<string>('')
//     const [model, setModel] = useState<string>('')
//
//     const updateTask = () => {
//         taskAPI.updateTask(todoListId, taskId, model)
//             .then(res => {
//                 setState(res.data.data.item)
//             })
//     }
//
//     return <div>
//         <input placeholder={'title'} value={title} onInput={(e: FormEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}}/>
//         <input placeholder={'taskId'} value={taskId} onInput={(e: FormEvent<HTMLInputElement>) => {setTaskId(e.currentTarget.value)}}/>
//         <input placeholder={'todoListId'} value={todoListId} onInput={(e: FormEvent<HTMLInputElement>) => {setTodoListId(e.currentTarget.value)}}/>
//         <button onClick={updateTask}>update Task</button>
//         {JSON.stringify(state)}
//     </div>
// }