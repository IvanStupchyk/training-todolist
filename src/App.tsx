import React, {useState} from "react";
import "./App.css";
import TodoList from "./Todolist";
import {v1} from "uuid";
import {AddTaskOrTodoList} from "./AddTaskOrTodoList";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

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

function App() {
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'all'}
    ])

    const [allTasks, setAllTasks] = useState<TasksStateType>({
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
        allTasks[idTodoList] = allTasks[idTodoList].filter(t => t.id !== idTask)
        setAllTasks({...allTasks})
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

    const getDataType = (data: FilterType, idTodoList: string) => setTodoLists(todoLists.map(tl => tl.id === idTodoList ? {
        ...tl,
        filter: data
    } : tl))

    const addTask = (title: string, idTodoList: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: true}

        setAllTasks({
            ...allTasks,
            [idTodoList]: [newTask, ...allTasks[idTodoList]]
        })
    }

    const changeStatus = (idTask: string, idTodoList: string) => {
        allTasks[idTodoList] = allTasks[idTodoList].map(t => t.id === idTask ? {...t, isDone: !t.isDone} : t)
        setAllTasks({...allTasks})
    }

    const deleteTodoList = (IdTodoList: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== IdTodoList))

        delete allTasks[IdTodoList]
    }

    const addItem = (title: string) => {
        const newTodoList: TodoListType = {
            id: v1(),
            title: title,
            filter: 'all'
        }

        setTodoLists([newTodoList, ...todoLists])
        setAllTasks({
            ...allTasks,
            [newTodoList.id]: []
        })
    }

    const changeValueEditableSpan = (idTask: string, idTodoList: string, value: string) => {
        allTasks[idTodoList] = allTasks[idTodoList].map(ts => ts.id === idTask ? {...ts, title: value} : ts)
        setAllTasks({...allTasks})
    }

    const changeTodoListTitle = (idTodoList: string, value: string) => setTodoLists(todoLists.map(td => td.id === idTodoList ? {
        ...td,
        title: value
    } : td))

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
                        todoLists.map(tl =>
                            <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodoList id={tl.id}
                                              key={tl.id}
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

export default App;
