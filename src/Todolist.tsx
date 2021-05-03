import React from "react";
import {FilterType, TaskType} from "./App";
import "./App.css"
import {AddTaskOrTodoList} from "./AddTaskOrTodoList";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (idTask: string, idTodoList: string) => void
    getDataType: (data: FilterType, idTodoList: string) => void
    addTask: (title: string, idTodoList: string) => void
    id: string
    filter: FilterType
    changeStatus: (idTask: string, idTodoList: string) => void
    deleteTodoList: (IdTodoList: string) => void
    changeValueEditableSpan: (value: string, idTask: string, idTodoList: string) => void
    changeTodoListTitle: (idTodoList: string, value: string) => void
}

function TodoList(props: TodoListPropsType) {
    // debugger
    const tasks = props.tasks.map(t => {
        const changeStatus = () => props.changeStatus(t.id, props.id)
        const deleteTask = () => props.deleteTask(t.id, props.id)
        const changeValueEditableSpan = (value: string) => props.changeValueEditableSpan(t.id, props.id, value)

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

    const setAllFilterValue = () => props.getDataType('all', props.id)
    const setActiveFilterValue = () => props.getDataType('active', props.id)
    const setCompletedFilterValue = () => props.getDataType('completed', props.id)

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

            <AddTaskOrTodoList addTask={addTask}/>

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


