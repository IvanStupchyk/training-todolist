import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {deleteTaskTC, TaskWideVersionType, updateTaskTC} from "../../../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskStatuses} from "../../../API/api";

type TaskPropsType = {
    todoListID: string
    taskID: string
    task: TaskWideVersionType
}

export const Task = React.memo(({todoListID, taskID, task, ...restProps}: TaskPropsType) => {
    const dispatch = useDispatch()

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newValue = e.currentTarget.checked

        dispatch(updateTaskTC(todoListID, taskID, {status: newValue ? TaskStatuses.Completed : TaskStatuses.New}))
    }, [dispatch, taskID, todoListID])
    const deleteTask = useCallback(() => dispatch(deleteTaskTC(todoListID, taskID)), [dispatch, taskID, todoListID])
    const changeValueEditableSpan = useCallback((title: string) => {
        dispatch(updateTaskTC(todoListID, taskID, {title}))
    }, [dispatch, taskID, todoListID])

    return (
        <li key={taskID} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox checked={task.status === TaskStatuses.Completed} onChange={changeStatus} disabled={task.taskStatus === 'deletion' || task.taskStatus === 'edition'}/>

            <EditableSpan title={task.title} changeValueEditableSpan={changeValueEditableSpan} taskStatus={task.taskStatus}/>

            <IconButton aria-label="delete" onClick={deleteTask} disabled={task.taskStatus === 'deletion'}>
                <Delete fontSize="small"/>
            </IconButton>
        </li>
    )
})
