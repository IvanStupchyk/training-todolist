import React, {useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, TaskType} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {todoListReducersType} from "../AppWithRedux";

type TaskPropsType = {
    todoListID: string
    taskID: string
    task: TaskType
}

export const Task = React.memo(({todoListID, taskID, task, ...restProps}: TaskPropsType) => {
    const dispatch = useDispatch<Dispatch<todoListReducersType>>()

    const changeStatus = useCallback(() => dispatch(changeTaskStatusAC(taskID, todoListID)), [dispatch, taskID, todoListID])
    const deleteTask = useCallback(() => dispatch(deleteTaskAC(taskID, todoListID)), [dispatch, taskID, todoListID])
    const changeValueEditableSpan = useCallback((value: string) => dispatch(changeTaskTitleAC(value, taskID, todoListID)), [dispatch, taskID, todoListID])

    return (
        <li key={taskID} className={task.isDone ? 'is-done' : ''}>
            <Checkbox checked={task.isDone} onClick={changeStatus}/>

            <EditableSpan title={task.title} changeValueEditableSpan={changeValueEditableSpan}/>

            <IconButton aria-label="delete" onClick={deleteTask}>
                <Delete fontSize="small"/>
            </IconButton>
        </li>
    )
})
