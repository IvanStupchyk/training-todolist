import React, {useCallback} from "react";
import "./App.css";
import {AddTaskOrTodoList} from "./AddTaskOrTodoList";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {
    addTodoListAC,
    changeTodoListFilterValueAC, changeTodoListTitleAC, deleteTodoListAC,
    FilterType, todoListActionsType,
    TodoListType
} from "./state/todolists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    deleteTaskAC,
    tasksActionsType,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/redux-store";
import {Dispatch} from "redux";
import {TodoList} from "./Todolist";

function AppWithRedux() {
    type todoListReducersType = tasksActionsType | todoListActionsType

    const dispatch = useDispatch<Dispatch<todoListReducersType>>()

    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists)

    const deleteTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(deleteTaskAC(taskID, todoListID))
    }, [dispatch])

    const changeFilterValue = useCallback((todoListID: string, filter: FilterType) => {
        dispatch(changeTodoListFilterValueAC(todoListID, filter))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, todoListID))
    }, [dispatch])

    const deleteTodoList = useCallback((todoListID: string) => {
        dispatch(deleteTodoListAC(todoListID))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch])

    const changeTaskTitle = useCallback((title: string, taskID: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(title, taskID, todoListID))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListID, title))
    }, [dispatch])

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
                        todoLists.map((tl) =>
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList id={tl.id}
                                              key={tl.id}
                                              title={tl.title}
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
