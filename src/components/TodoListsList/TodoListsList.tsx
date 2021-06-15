import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/redux-store";
import {addTodoListTC, getTodoListsTC, todoListDomainType} from "../../state/todolists-reducer";
import {Grid, Paper} from "@material-ui/core";
import {TodoList} from "../Todolist/Todolist";
import {AddTaskOrTodoList} from "../AddTaskOrTodoList/AddTaskOrTodoList";
import {statusType} from "../../state/app-reducer";
import {Redirect} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodoListsList: React.FC<PropsType> = React.memo(({demo = false, ...restProps}) => {
    const todoLists = useSelector<AppRootState, Array<todoListDomainType>>(state => state.todoLists)
    const appStatus = useSelector<AppRootState, statusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(getTodoListsTC())
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div>
            <Grid container style={{padding: "10px 0"}}>
                <AddTaskOrTodoList addTodoList={addTodoList} todoListOrAppStatus={appStatus} kindForm={'todoList'}/>
            </Grid>

            <Grid container spacing={4}>
                {
                    todoLists.map((tl) =>
                        <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <TodoList todoList={tl}
                                          demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                }
            </Grid>
        </div>
    )
})