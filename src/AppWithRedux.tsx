import React from "react";
import "./App.css";
import TodoList from "./Todolist";
import {AddTaskOrTodoList} from "./AddTaskOrTodoList";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {
    AddTodoListTypeAC,
    ChangeFilterValueTypeAC, ChangeTodoListNameTypeAC, FilterType,
    RemoveTodoListAC,
    TodoListType
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, DeleteTaskAC, TasksStateType} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/redux-store";

function AppWithRedux() {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists)
    const allTasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const deleteTask = (idTask: string, idTodoList: string) => {
        dispatch(DeleteTaskAC(idTask, idTodoList))
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
        dispatch(ChangeFilterValueTypeAC(idTodoList, data))
    }

    const addTask = (title: string, idTodoList: string) => {
        dispatch(AddTaskAC(title, idTodoList))
    }

    const changeStatus = (idTask: string, idTodoList: string) => {
        dispatch(ChangeTaskStatusAC(idTask, idTodoList))
    }

    const deleteTodoList = (IdTodoList: string) => {
        dispatch(RemoveTodoListAC(IdTodoList))
    }

    const addItem = (title: string) => {
        dispatch(AddTodoListTypeAC(title))
    }

    const changeValueEditableSpan = (idTask: string, idTodoList: string, value: string) => {
        dispatch(ChangeTaskTitleAC(value, idTask, idTodoList))
    }

    const changeTodoListTitle = (idTodoList: string, value: string) => {
        dispatch(ChangeTodoListNameTypeAC(idTodoList, value))
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

export default AppWithRedux;
