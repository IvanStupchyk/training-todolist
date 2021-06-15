import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";
import {statusType} from "../../state/app-reducer";
import {taskStatusType} from "../../state/tasks-reducer";
import s from './EditableSpan.module.scss'

type EditableSpanPropsType = {
    title: string
    changeValueEditableSpan: (value: string) => void
    taskStatus: taskStatusType | statusType
}

export const EditableSpan = React.memo(({title, changeValueEditableSpan, taskStatus, ...restProps}: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState('')

    const changeInput = () => {
        setEdit(true)
        setValue(title)
    }
    const changeSpan = () => {
        setEdit(false)
        changeValueEditableSpan(value)
    }
    const changeValue = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

    return (
        edit
            ?
            <TextField
                autoFocus
                onBlur={changeSpan}
                value={value}
                onChange={changeValue}
                disabled={taskStatus === 'deletion'}
                className={s.textFieldContainer}
            />
            :
            <span onDoubleClick={changeInput} className={s.outputSpanContainer}>{title}</span>
    )
})