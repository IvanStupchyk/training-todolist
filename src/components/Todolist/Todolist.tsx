import React, {useCallback, useEffect} from "react";
import "../../App.module.scss"
import {AddTaskOrTodoList} from "../AddTaskOrTodoList/AddTaskOrTodoList";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, ButtonGroup} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskTC, setTasksTC, TasksStateType} from "../../state/tasks-reducer";
import {
    changeTodoListFilterValueAC,
    changeTodoListTitleTC,
    deleteTodoListTC,
    FilterType, todoListDomainType
} from "../../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/redux-store";
import {Task} from "./Task/Task";
import {TaskStatuses} from "../../API/api";

type TodoListPropsType = {
    todoList: todoListDomainType
    demo?: boolean
}

export const TodoList = React.memo(({todoList, demo = false,...restProps}: TodoListPropsType) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(setTasksTC(todoList.id))
    }, [dispatch, todoList.id])

    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    let actualArrayTasks = tasks[todoList.id]
    if (todoList.filter === 'active') {
        actualArrayTasks = actualArrayTasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todoList.filter === 'completed') {
        actualArrayTasks = actualArrayTasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const deleteTodoList = useCallback(() => dispatch(deleteTodoListTC(todoList.id)), [dispatch, todoList.id])
    const addTask = useCallback((title: string) => dispatch(addTaskTC(todoList.id, title)), [dispatch, todoList.id])
    const changeTodoListTitle = useCallback((value: string) => dispatch(changeTodoListTitleTC(todoList.id, value)), [dispatch, todoList.id])
    const setAllFilterValue = useCallback(() => dispatch(changeTodoListFilterValueAC(todoList.id, 'all')), [dispatch, todoList.id])
    const setActiveFilterValue = useCallback(() => dispatch(changeTodoListFilterValueAC(todoList.id, 'active')), [dispatch, todoList.id])
    const setCompletedFilterValue = useCallback(() => dispatch(changeTodoListFilterValueAC(todoList.id, 'completed')), [dispatch, todoList.id])

    return (
        <div>
            <h3>
                <EditableSpan title={todoList.title} changeValueEditableSpan={changeTodoListTitle} taskStatus={todoList.entityStatus}/>

                <Button onClick={deleteTodoList}
                        variant="contained"
                        color="secondary"
                        startIcon={<Delete/>}
                        size="small"
                        style={{margin: "0 10px"}}
                        disabled={todoList.entityStatus === 'deletion'}
                >
                    Delete
                </Button>
            </h3>

            <AddTaskOrTodoList addTodoList={addTask} todoListOrAppStatus={todoList.entityStatus} kindForm={'task'}/>

            <ul style={{listStyle: "none"}}>
                {actualArrayTasks.map(t => <Task
                    key={t.id}
                    todoListID={todoList.id}
                    taskID={t.id}
                    task={t}
                />)}
            </ul>

            <div>
                <ButtonGroup variant="contained" color="primary">
                    <Button onClick={setAllFilterValue}>All</Button>
                    <Button onClick={setActiveFilterValue}>Active</Button>
                    <Button onClick={setCompletedFilterValue}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
})




