import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeValueEditableSpan: (value: string) => void
}

export const EditableSpan = React.memo(({title, changeValueEditableSpan, ...restProps}: EditableSpanPropsType) => {
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
            />
            :
            <span onDoubleClick={changeInput}>{title}</span>
    )
})