import React from "react";
import "./App.css";
import TodoList from "./Todolist";
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
    TasksStateType
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/redux-store";
import {Dispatch} from "redux";

function AppWithRedux() {
    type todoListReducersType = tasksActionsType | todoListActionsType

    const dispatch = useDispatch<Dispatch<todoListReducersType>>()

    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists)

    const deleteTask = (taskID: string, todoListID: string) => {
        dispatch(deleteTaskAC(taskID, todoListID))
    }

    const changeFilterValue = (todoListID: string, filter: FilterType) => {
        dispatch(changeTodoListFilterValueAC(todoListID, filter))
    }

    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }

    const changeTaskStatus = (taskID: string, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, todoListID))
    }

    const deleteTodoList = (todoListID: string) => {
        dispatch(deleteTodoListAC(todoListID))
    }

    const addTodoList = (title: string) => {
        dispatch(addTodoListAC(title))
    }

    const changeTaskTitle = (title: string, taskID: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(title, taskID, todoListID))
    }

    const changeTodoListTitle = (todoListID: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListID, title))
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
