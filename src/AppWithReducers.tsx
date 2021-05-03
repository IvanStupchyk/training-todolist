import React, {useReducer, useState} from "react";
import "./App.css";
import TodoList from "./Todolist";
import {v1} from "uuid";
import {AddTaskOrTodoList} from "./AddTaskOrTodoList";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {
    AddTodoListTypeAC,
    ChangeFilterValueTypeAC, ChangeTodoListNameTypeAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, DeleteTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterType = 'all' | 'completed' | 'active'

function AppWithReducers() {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer, [
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ])

    const [allTasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ]
    })


    const deleteTask = (idTask: string, idTodoList: string) => {
        dispatchToTasksReducer(DeleteTaskAC(idTask, idTodoList))
    }

    const filterTasks = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case 'active':
                return allTasks[todoList.id].filter(t => !t.isDone)
            case 'completed':
                return allTasks[todoList.id].filter(t => t.isDone)
            default:
                return allTasks[todoList.id]
        }
    }

    const getDataType = (data: FilterType, idTodoList: string) => {
        dispatchToTodoListsReducer(ChangeFilterValueTypeAC(idTodoList, data))
    }

    const addTask = (title: string, idTodoList: string) => {
        dispatchToTasksReducer(AddTaskAC(title, idTodoList))
    }

    const changeStatus = (idTask: string, idTodoList: string) => {
        dispatchToTasksReducer(ChangeTaskStatusAC(idTask, idTodoList))
    }

    const deleteTodoList = (IdTodoList: string) => {
        const action = RemoveTodoListAC(IdTodoList)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    const addItem = (title: string) => {
        const action = AddTodoListTypeAC(title)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    const changeValueEditableSpan = (idTask: string, idTodoList: string, value: string) => {
        dispatchToTasksReducer(ChangeTaskTitleAC(value, idTask, idTodoList))
    }

    const changeTodoListTitle = (idTodoList: string, value: string) => {
        dispatchToTodoListsReducer(ChangeTodoListNameTypeAC(idTodoList, value))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>

                    <Typography variant="h6">
                        TodoLists
                    </Typography>

                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "10px 0"}}>
                    <AddTaskOrTodoList addTask={addItem}/>
                </Grid>

                <Grid container spacing={4}>
                    {
                        todoLists.map((tl, i) =>
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList id={tl.id}
                                              key={i}
                                              title={tl.title}
                                              tasks={filterTasks(tl)}
                                              deleteTask={deleteTask}
                                              getDataType={getDataType}
                                              addTask={addTask}
                                              filter={tl.filter}
                                              changeStatus={changeStatus}
                                              deleteTodoList={deleteTodoList}
                                              changeValueEditableSpan={changeValueEditableSpan}
                                              changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
