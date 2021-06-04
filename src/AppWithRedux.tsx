import React, {useCallback, useEffect} from "react";
import "./App.css";
import {AddTaskOrTodoList} from "./components/AddTaskOrTodoList";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {
    addTodoListAC,
    addTodoListTC,
    getTodoListsTC,
    todoListActionsType,
    todoListDomainType
} from "./state/todolists-reducer";
import {tasksActionsType,} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/redux-store";
import {TodoList} from "./components/Todolist";

export type todoListReducersType = tasksActionsType | todoListActionsType

function AppWithRedux() {
    const dispatch = useDispatch()

    const todoLists = useSelector<AppRootState, Array<todoListDomainType>>(state => state.todoLists)

    useEffect(() => {
        dispatch(getTodoListsTC())
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
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
