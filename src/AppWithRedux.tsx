import React from "react";
import "./App.css";
import TodoList from "./Todolist";
import {AddTaskOrTodoList} from "./AddTaskOrTodoList";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {
    FilterType,
    TodoListType
} from "./state/todolists-reducer";
import {TasksStateType} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/redux-store";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, DeleteTaskAC} from "./state/tasks-actions";
import {AddTodoListAC, ChangeFilterValueAC, ChangeTodoListTitleAC, DeleteTodoListAC} from "./state/todolists-actions";

function AppWithRedux() {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const deleteTask = (taskID: string, todoListID: string) => {
        dispatch(DeleteTaskAC(taskID, todoListID))
    }

    const filterTasks = (todoList: TodoListType) => {
        switch (todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(t => !t.isDone)
            case 'completed':
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const changeFilterValue = (todoListID: string, filter: FilterType) => {
        dispatch(ChangeFilterValueAC(todoListID, filter))
    }

    const addTask = (title: string, todoListID: string) => {
        dispatch(AddTaskAC(title, todoListID))
    }

    const changeTaskStatus = (taskID: string, todoListID: string) => {
        dispatch(ChangeTaskStatusAC(taskID, todoListID))
    }

    const deleteTodoList = (todoListID: string) => {
        dispatch(DeleteTodoListAC(todoListID))
    }

    const addTodoList = (title: string) => {
        dispatch(AddTodoListAC(title))
    }

    const changeTaskTitle = (title: string, taskID: string, todoListID: string) => {
        dispatch(ChangeTaskTitleAC(title, taskID, todoListID))
    }

    const changeTodoListTitle = (todoListID: string, title: string) => {
        dispatch(ChangeTodoListTitleAC(todoListID, title))
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
                    <AddTaskOrTodoList addTodoList={addTodoList}/>
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
                                              changeFilterValue={changeFilterValue}
                                              addTask={addTask}
                                              filter={tl.filter}
                                              changeTaskStatus={changeTaskStatus}
                                              deleteTodoList={deleteTodoList}
                                              changeTaskTitle={changeTaskTitle}
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

export default AppWithRedux;
