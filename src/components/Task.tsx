import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../state/tasks-reducer";

type TaskPropsType = {
    changeTaskStatus: (taskID: string, todoListID: string) => void
    deleteTask: (taskID: string, todoListID: string) => void
    changeTaskTitle: (title: string, taskID: string, todoListID: string) => void
    todoListID: string
    taskID: string
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    const changeStatus = useCallback(() => props.changeTaskStatus(props.taskID, props.todoListID), [props.changeTaskStatus, props.taskID, props.todoListID])
    const deleteTask = useCallback(() => props.deleteTask(props.taskID, props.todoListID), [props.deleteTask, props.taskID, props.todoListID])
    const changeValueEditableSpan = useCallback((value: string) => props.changeTaskTitle(value, props.taskID, props.todoListID), [props.changeTaskTitle, props.taskID, props.todoListID])

    return (
        <li key={props.taskID} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox checked={props.task.isDone} onClick={changeStatus}/>

            <EditableSpan title={props.task.title} changeValueEditableSpan={changeValueEditableSpan}/>

            <IconButton aria-label="delete" onClick={deleteTask}>
                <Delete fontSize="small"/>
            </IconButton>
        </li>
    )
})
