import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddTaskOrTodoListPropsType = {
    addTask: (title: string) => void
}

export const AddTaskOrTodoList = (props: AddTaskOrTodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')

    const onChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError("")
    }

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title)
            setTitle('')
            setError('')
        } else {
            setError('Incorrect value')
        }
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()

    return (
        <div>
            <TextField variant="outlined"
                       label="Title"
                       value={title}
                       onChange={onChangeTask}
                       onKeyPress={onKeyPressAddTask}
                       error={!!error}
                       helperText={error}
            />

            <IconButton color="primary" onClick={addTask}>
                <AddBox/>
            </IconButton>
        </div>
    )
}