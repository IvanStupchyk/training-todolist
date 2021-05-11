import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeValueEditableSpan: (value: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState('')

    const changeInput = () => {
        setEdit(true)
        setValue(props.title)
    }

    const changeSpan = () => {
        setEdit(false)
        props.changeValueEditableSpan(value)
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
            <span onDoubleClick={changeInput}>{props.title}</span>
    )
})