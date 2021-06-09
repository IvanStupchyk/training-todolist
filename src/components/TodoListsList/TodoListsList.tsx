import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/redux-store";
import {addTodoListTC, getTodoListsTC, todoListDomainType} from "../../state/todolists-reducer";
import {Grid, Paper} from "@material-ui/core";
import {TodoList} from "../Todolist/Todolist";
import {AddTaskOrTodoList} from "../AddTaskOrTodoList/AddTaskOrTodoList";

type PropsType = {
    demo?: boolean
}

export const TodoListsList: React.FC<PropsType> = React.memo(({demo = false, ...restProps}) => {
    const todoLists = useSelector<AppRootState, Array<todoListDomainType>>(state => state.todoLists)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(getTodoListsTC())
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    return (
        <div>
            <Grid container style={{padding: "10px 0"}}>
                <AddTaskOrTodoList addTodoList={addTodoList}/>
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