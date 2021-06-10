import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";
import {statusType} from "../../state/app-reducer";
import {todoListStatusType} from "../../state/todolists-reducer";

type AddTaskOrTodoListPropsType = {
    addTodoList: (title: string) => void
    disabled?: boolean
    todoListOrAppStatus: todoListStatusType | statusType
    kindForm: 'task' | 'todoList'
}

export const AddTaskOrTodoList = React.memo(({addTodoList, disabled = false, todoListOrAppStatus, kindForm, ...restProps}: AddTaskOrTodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError("")
    }
    const addTask = () => {
        if (title.trim()) {
            addTodoList(title)
            setTitle('')
            setError('')
        } else {
            setError('Incorrect value')
        }
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()

    const disabledForm = todoListOrAppStatus === 'addition' &&  kindForm ==='task'
        || todoListOrAppStatus === 'addition' && kindForm === 'todoList'

    return (
        <div>
            <TextField variant="outlined"
                       label="Title"
                       value={title}
                       onChange={onChangeTask}
                       onKeyPress={onKeyPressAddTask}
                       error={!!error}
                       helperText={error}
                       disabled={disabledForm}
            />

            <IconButton color="primary" onClick={addTask} disabled={disabledForm}>
                <AddBox/>
            </IconButton>
        </div>
    )
})