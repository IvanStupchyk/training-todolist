import React, {useCallback, useEffect} from "react";
import "../App.css"
import {AddTaskOrTodoList} from "./AddTaskOrTodoList";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskTC, setTasksTC, TasksStateType} from "../state/tasks-reducer";
import {
    changeTodoListFilterValueAC,
    changeTodoListTitleTC,
    deleteTodoListTC,
    FilterType
} from "../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/redux-store";
import {Task} from "./Task";
import {TaskStatuses} from "../API/api";

type TodoListPropsType = {
    title: string
    todoListId: string
    filter: FilterType
}

export const TodoList = React.memo(({title, todoListId, filter, ...restProps}: TodoListPropsType) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTasksTC(todoListId))
    }, [dispatch, todoListId])

    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    let actualArrayTasks = tasks[todoListId]

    if (filter === 'active') {
        actualArrayTasks = actualArrayTasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        actualArrayTasks = actualArrayTasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const deleteTodoList = useCallback(() => dispatch(deleteTodoListTC(todoListId)), [dispatch, todoListId])

    const addTask = useCallback((title: string) => dispatch(addTaskTC(todoListId, title)), [dispatch, todoListId])

    const changeTodoListTitle = useCallback((value: string) => dispatch(changeTodoListTitleTC(todoListId, value)), [dispatch, todoListId])

    const setAllFilterValue = useCallback(() => dispatch(changeTodoListFilterValueAC(todoListId, 'all')),[dispatch, todoListId])
    const setActiveFilterValue = useCallback(() => dispatch(changeTodoListFilterValueAC(todoListId, 'active')),[dispatch, todoListId])
    const setCompletedFilterValue = useCallback(() => dispatch(changeTodoListFilterValueAC(todoListId, 'completed')),[dispatch, todoListId])

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeValueEditableSpan={changeTodoListTitle}/>

                <Button onClick={deleteTodoList}
                        variant="contained"
                        color="secondary"
                        startIcon={<Delete/>}
                        size="small"
                        style={{margin: "0 10px"}}>
                    Delete
                </Button>
            </h3>

            <AddTaskOrTodoList addTodoList={addTask}/>

            <ul style={{listStyle: "none"}}>
                {actualArrayTasks.map(t => <Task
                    key={t.id}
                    todoListID={todoListId}
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




