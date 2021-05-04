import React from "react";
import "./App.css"
import {AddTaskOrTodoList} from "./AddTaskOrTodoList";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./state/tasks-reducer";
import {FilterType} from "./state/todolists-reducer";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
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

function TodoList(props: TodoListPropsType) {
    const tasks = props.tasks.map(t => {
        const changeStatus = () => props.changeTaskStatus(t.id, props.id)
        const deleteTask = () => props.deleteTask(t.id, props.id)
        const changeValueEditableSpan = (value: string) => props.changeTaskTitle(value, t.id, props.id)

        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <Checkbox checked={t.isDone} onClick={changeStatus}/>

                <EditableSpan title={t.title} changeValueEditableSpan={changeValueEditableSpan}/>

                <IconButton aria-label="delete" onClick={deleteTask}>
                    <Delete fontSize="small"/>
                </IconButton>
            </li>
        )
    })

    const deleteTodoList = () => props.deleteTodoList(props.id)

    const addTask = (title: string) => props.addTask(title, props.id)

    const changeTodoListTitle = (value: string) => props.changeTodoListTitle(props.id, value)

    const setAllFilterValue = () => props.changeFilterValue(props.id,'all')
    const setActiveFilterValue = () => props.changeFilterValue(props.id,'active')
    const setCompletedFilterValue = () => props.changeFilterValue(props.id, 'completed')

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
                {tasks}
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
}

export default TodoList;


