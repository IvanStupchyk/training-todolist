import {todoListAPI} from "../API/api";
import {setAppStatus} from "./app-reducer";
import {handleNetworkError, handleServerAppError} from "../utils/error-utils";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum ACTIONS_TODOLIST_TYPE {
    ADD_NEW_TODOLIST = 'todoList/todolists-actions/add-new-todolist',
    CHANGE_TODOLIST_FILTER_VALUE = 'todoList/todolists-actions/change-todolist-filter-value',
    CHANGE_TODOLIST_ENTITY_STATUS_VALUE = 'todoList/todolists-actions/change-todolist-entity-status-value',
    CHANGE_TODOLIST_TITLE = 'todoList/todolists-actions/change-todolist-title',
    DELETE_TODOLIST = 'todoList/todolists-actions/delete-todolist',
    GET_TODOLISTS = 'todoList/todolists-actions/get-todolist'
}


export let initialState: Array<todoListDomainType> = []

const slice = createSlice({
    name: 'todoLists',
    initialState: initialState,
    reducers: {
        getTodoListsAC(state, action: PayloadAction<{todolists: Array<TodoListType>}>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "new"}))
        },
        addTodoListAC(state, action: PayloadAction<{todoList: TodoListType}>) {
            state.unshift({...action.payload.todoList, filter: 'all', entityStatus: "new"})
        },
        changeTodoListFilterValueAC(state, action: PayloadAction<{todoListID: string, filter: FilterType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            if (index > -1) state[index].filter = action.payload.filter
        },
        changeTodoListTitleAC(state, action: PayloadAction<{todoListId: string, title: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) state[index].title = action.payload.title
        },
        deleteTodoListAC(state, action: PayloadAction<{todoListId: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) state.splice(index, 1)
        },
        changeTodoListEntityStatusAC(state, action: PayloadAction<{todoListId: string, entityStatus: todoListStatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) state[index].entityStatus = action.payload.entityStatus
        },
    }
})

export const todoListsReducer = slice.reducer
// export const todoListsReducer = (state: Array<todoListDomainType> = initialState, action: todoListActionsType): Array<todoListDomainType> => {
//     switch (action.type) {
//         case ACTIONS_TODOLIST_TYPE.ADD_NEW_TODOLIST:
//             let newTodoList: todoListDomainType = {...action.payload.todoList, filter: "all", entityStatus: "new"}
//             return [newTodoList, ...state]
//         case ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_FILTER_VALUE:
//             return state.map(td => td.id === action.todoListID ? {...td, ...action.payload} : td)
//         case ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_TITLE:
//             return state.map(td => td.id === action.todoListId ? {...td, ...action.payload} : td)
//         case ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_ENTITY_STATUS_VALUE:
//             return state.map(td => td.id === action.todoListId ? {...td, ...action.payload} : td)
//         case ACTIONS_TODOLIST_TYPE.DELETE_TODOLIST:
//             return state.filter(td => td.id !== action.todoListId)
//         case ACTIONS_TODOLIST_TYPE.GET_TODOLISTS:
//             return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "new"}))
//         default:
//             return state
//     }
// }

export const {getTodoListsAC, addTodoListAC, changeTodoListFilterValueAC,
    changeTodoListTitleAC, deleteTodoListAC, changeTodoListEntityStatusAC} = slice.actions
//actions
// export const getTodoListsAC = (todolists: Array<TodoListType>) => {
//     return {
//         type: ACTIONS_TODOLIST_TYPE.GET_TODOLISTS,
//         todolists
//     } as const
// }
// export const addTodoListAC = (todoList: TodoListType) => {
//     return {
//         type: ACTIONS_TODOLIST_TYPE.ADD_NEW_TODOLIST,
//         payload: {todoList}
//     } as const
// }
// export const changeTodoListFilterValueAC = (todoListID: string, filter: FilterType) => {
//     return {
//         type: ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_FILTER_VALUE,
//         todoListID,
//         payload: {filter}
//     } as const
// }
// export const changeTodoListTitleAC = (todoListId: string, title: string) => {
//     return {
//         type: ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_TITLE,
//         todoListId,
//         payload: {title}
//     } as const
// }
// export const deleteTodoListAC = (todoListId: string) => {
//     return {
//         type: ACTIONS_TODOLIST_TYPE.DELETE_TODOLIST,
//         todoListId
//     } as const
// }
// export const changeTodoListEntityStatusAC = (todoListId: string, entityStatus: todoListStatusType) => {
//     return {
//         type: ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_ENTITY_STATUS_VALUE,
//         todoListId,
//         payload: {entityStatus}
//     } as const
// }

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
    dispatch(changeTodoListEntityStatusAC({todoListId, entityStatus: 'deletion'}, ))
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


