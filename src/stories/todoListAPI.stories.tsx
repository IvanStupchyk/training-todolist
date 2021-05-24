import React, {FormEvent, useEffect, useState} from "react";
import {todoListAPI} from "../API/api";

export default {
    title: 'API todoList'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todoListAPI.getTodoLists()
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    const createTodoList = () => {
        todoListAPI.createTodoList(title)
            .then(res => {
                setState(res.data.data.item)
            })
    }

    return <div>
        <input placeholder={'title'} value={title} onInput={(e: FormEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}}/>
        <button onClick={createTodoList}>Create TodoList</button>
        {JSON.stringify(state)}
    </div>
}

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    const [id, setId] = useState<string>('')

    const deleteTodoList = () => {
        todoListAPI.deleteTodoList(id)
            .then(res => {
                setState(res.data.resultCode)
            })
    }

    return <div>
        <input placeholder={'todoListId'} value={id} onInput={(e: FormEvent<HTMLInputElement>) => {setId(e.currentTarget.value)}}/>
        <button onClick={deleteTodoList}>Delete TodoList</button>
        {JSON.stringify(state)}
    </div>
}

export const UpdateTodoList = () => {
    const [id, setId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [state, setState] = useState<any>(null)

    const updateTodoList = () => {
        todoListAPI.updateTodoList(id, title)
            .then(res => {
                setState(res.data.resultCode)
            })
    }

    return <div>
        <input placeholder={'todoListId'} value={id} onInput={(e: FormEvent<HTMLInputElement>) => {setId(e.currentTarget.value)}}/>
        <input placeholder={'title'} value={title} onInput={(e: FormEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}}/>
        <button onClick={updateTodoList}>Update</button>
        {JSON.stringify(state)}
    </div>
}