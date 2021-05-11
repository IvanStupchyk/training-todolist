import React, {useReducer} from "react";
import "./App.css";
import TodoList from "./Todolist";
import {v1} from "uuid";
import {AddTaskOrTodoList} from "./AddTaskOrTodoList";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {
    addTodoListAC,
    changeTodoListFilterValueAC, changeTodoListTitleAC, deleteTodoListAC, FilterType,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer} from "./state/tasks-reducer";

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

    const deleteTask = (taskID: string, todoListID: string) => {
        dispatchToTasksReducer(deleteTaskAC(taskID, todoListID))
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

    const changeFilterValue = (todoListID: string, filter: FilterType) => {
        dispatchToTodoListsReducer(changeTodoListFilterValueAC(todoListID, filter))
    }

    const addTask = (title: string, todoListID: string) => {
        dispatchToTasksReducer(addTaskAC(title, todoListID))
    }

    const changeTaskStatus = (taskID: string, todoListID: string) => {
        dispatchToTasksReducer(changeTaskStatusAC(taskID, todoListID))
    }

    const deleteTodoList = (IdTodoList: string) => {
        const action = deleteTodoListAC(IdTodoList)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    const changeTaskTitle = (title: string, taskID: string, todoListID: string) => {
        dispatchToTasksReducer(changeTaskTitleAC(title, taskID, todoListID))
    }

    const changeTodoListTitle = (todoListID: string, title: string) => {
        dispatchToTodoListsReducer(changeTodoListTitleAC(todoListID, title))
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

export default AppWithReducers;
