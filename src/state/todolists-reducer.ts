import {todoListAPI} from "../API/api";
import {setAppStatus} from "./app-reducer";
import {handleNetworkError, handleServerAppError} from "../utils/error-utils";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export let initialState: Array<todoListDomainType> = []

const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        getTodoListsAC(state, action: PayloadAction<{ todolists: Array<TodoListType> }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "new"}))
        },
        addTodoListAC(state, action: PayloadAction<{ todoList: TodoListType }>) {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: "new"})
        },
        changeTodoListFilterValueAC(state, action: PayloadAction<{ todoListID: string, filter: FilterType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            if (index > -1) state[index].filter = action.payload.filter
        },
        changeTodoListTitleAC(state, action: PayloadAction<{ todoListId: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) state[index].title = action.payload.title
        },
        deleteTodoListAC(state, action: PayloadAction<{ todoListId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) state.splice(index, 1)
        },
        changeTodoListEntityStatusAC(state, action: PayloadAction<{ todoListId: string, entityStatus: todoListStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) state[index].entityStatus = action.payload.entityStatus
        },
    }
})

export const todoListsReducer = slice.reducer
export const {
    getTodoListsAC, addTodoListAC, changeTodoListFilterValueAC,
    changeTodoListTitleAC, deleteTodoListAC, changeTodoListEntityStatusAC
} = slice.actions

//thunks
export const getTodoListsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(getTodoListsAC({todolists: res.data}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
        .catch(error => {
            handleNetworkError(error, dispatch)
        })
}

export const deleteTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTodoListEntityStatusAC({todoListId, entityStatus: 'deletion'},))
    todoListAPI.deleteTodoList(todoListId)
        .then(res => {
            dispatch(deleteTodoListAC({todoListId}))
            dispatch(setAppStatus({status: 'succeeded'}))
        })
}

export const changeTodoListTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todoListAPI.updateTodoList(todoListId, title)
        .then(res => dispatch(changeTodoListTitleAC({todoListId, title})))
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'addition'}))
    todoListAPI.createTodoList(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC({todoList: res.data.data.item}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleNetworkError(error, dispatch)
        })

}

//types
export type FilterType = 'all' | 'completed' | 'active'
export type TodoListType = {
    id: string
    addedDate: string
    title: string
    order: number
}
export type todoListStatusType = 'new' | 'addition' | 'deletion' | 'succeeded'
export type todoListDomainType = TodoListType & {
    filter: FilterType
    entityStatus: todoListStatusType
}


// type ChangeTodoListNameType = {
//     type: 'CHANGE-TODOLIST-NAME'
//     title: string
//     idTodoList: string
// }
//
// export type AddTodoListType = {
//     type: 'ADD-NEW-TODOLIST'
//     title: string
//     todoListId: string
// }
//
// export type DeleteTodoListType = {
//     type: 'DELETE-TODOLIST'
//     todoListID: string
// }
//
// type ChangeFilterValueType = {
//     type: 'CHANGE-FILTER-VALUE'
//     idTodoList: string
//     value: FilterType
// }
//
// type ActionsType = ChangeTodoListNameType | AddTodoListType | DeleteTodoListType | ChangeFilterValueType
//
// export const todoListsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
//     switch (action.type) {
//         case "CHANGE-TODOLIST-NAME":
//             return state.map(tl => tl.id === action.idTodoList ? {...tl, title: action.title} : tl)
//         case "ADD-NEW-TODOLIST":
//             return [
//                 ...state,
//                 {
//                     id: action.todoListId,
//                     title: action.title,
//                     filter: "all"
//                 }
//             ]
//         case "DELETE-TODOLIST":
//             return state.filter(tl => tl.id !== action.todoListID)
//         case "CHANGE-FILTER-VALUE":
//             return state.map(tl => tl.id === action.idTodoList ? {...tl, filter: action.value} : tl)
//
//         default:
//             throw new Error('What\'s mean here?')
//     }
// }
//
// export const RemoveTodoListAC = (todoListID: string): DeleteTodoListType => {
//     return {
//         type: 'DELETE-TODOLIST',
//         todoListID
//     }
// }
//
// export const AddTodoListTypeAC = (title: string): AddTodoListType => {
//     return {
//         type: 'ADD-NEW-TODOLIST',
//         title,
//         todoListId: v1()
//     }
// }
//
// export const ChangeFilterValueTypeAC = (idTodoList: string, value: FilterType): ChangeFilterValueType => {
//     return {
//         type: 'CHANGE-FILTER-VALUE',
//         idTodoList,
//         value
//     }
// }
//
// export const ChangeTodoListNameTypeAC = (idTodoList: string, title: string): ChangeTodoListNameType => {
//     return {
//         type: 'CHANGE-TODOLIST-NAME',
//         title,
//         idTodoList
//     }
// }


