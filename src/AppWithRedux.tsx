import React, {useCallback} from "react";
import "./App.css";
import {AddTaskOrTodoList} from "./components/AddTaskOrTodoList";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {
    addTodoListAC, todoListActionsType,
    TodoListType
} from "./state/todolists-reducer";
import {
    tasksActionsType,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/redux-store";
import {Dispatch} from "redux";
import {TodoList} from "./components/Todolist";

export type todoListReducersType = tasksActionsType | todoListActionsType

function AppWithRedux() {
    const dispatch = useDispatch<Dispatch<todoListReducersType>>()

    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists)

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
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
                            <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList todoListId={tl.id}
                                              title={tl.title}
                                              filter={tl.filter}
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
