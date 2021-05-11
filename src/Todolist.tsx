import React, {useCallback} from "react";
import "./App.css"
import {AddTaskOrTodoList} from "./AddTaskOrTodoList";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TasksStateType} from "./state/tasks-reducer";
import {FilterType} from "./state/todolists-reducer";
import {useSelector} from "react-redux";
import {AppRootState} from "./state/redux-store";
import {Task} from "./components/Task";

type TodoListPropsType = {
    title: string
    deleteTask: (taskID: string, todoListID: string) => void
    changeFilterValue: (todoListID: string, filter: FilterType) => void
    addTask: (title: string, todoListID: string) => void
    id: string
    filter: FilterType
    changeTaskStatus: (taskID: string, todoListID: string) => void
    deleteTodoList: (todoListID: string) => void
    changeTaskTitle: (title: string, taskID: string, todoListID: string) => void
    changeTodoListTitle: (idTodoList: string, title: string) => void
}

export const TodoList = React.memo((props: TodoListPropsType) => {
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    let actualArrayTasks = tasks[props.id]

    if (props.filter === 'active') {
        actualArrayTasks = actualArrayTasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        actualArrayTasks = actualArrayTasks.filter(t => t.isDone)
    }

    const deleteTodoList = useCallback(() => props.deleteTodoList(props.id), [props.deleteTodoList, props.id])

    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])

    const changeTodoListTitle = useCallback((value: string) => props.changeTodoListTitle(props.id, value), [props.changeTodoListTitle, props.id])

    const setAllFilterValue = useCallback(() => props.changeFilterValue(props.id, 'all'),[props.changeFilterValue, props.id])
    const setActiveFilterValue = useCallback(() => props.changeFilterValue(props.id, 'active'),[props.changeFilterValue, props.id])
    const setCompletedFilterValue = useCallback(() => props.changeFilterValue(props.id, 'completed'),[props.changeFilterValue, props.id])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeValueEditableSpan={changeTodoListTitle}/>

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
                    changeTaskStatus = {props.changeTaskStatus}
                    deleteTask={props.deleteTask}
                    changeTaskTitle={props.changeTaskTitle}
                    todoListID = {props.id}
                    taskID = {t.id}
                    task = {t}
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




