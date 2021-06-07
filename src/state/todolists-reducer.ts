import {todoListAPI} from "../API/api";
import {AppThunkType} from "./redux-store";

export enum ACTIONS_TODOLIST_TYPE {
    ADD_NEW_TODOLIST = 'todoList/todolists-actions/add-new-todolist',
    CHANGE_TODOLIST_FILTER_VALUE = 'todoList/todolists-actions/change-todolist-filter-value',
    CHANGE_TODOLIST_TITLE = 'todoList/todolists-actions/change-todolist-title',
    DELETE_TODOLIST = 'todoList/todolists-actions/delete-todolist',
    GET_TODOLISTS = 'todoList/todolists-actions/get-todolist'
}

export type FilterType = 'all' | 'completed' | 'active'

export type TodoListType = {
    id: string
    addedDate: string
    title: string
    order: number
}

export let initialState: Array<todoListDomainType> = []

export type todoListDomainType = TodoListType & {
    filter: FilterType
}

export type todoListActionsType = addTodoListType
    | changeTodoListFilterValueType
    | changeTodoListTitleType
    | deleteTodoListType
    | getTodoListsType

export const todoListsReducer = (state: Array<todoListDomainType> = initialState, action: todoListActionsType): Array<todoListDomainType> => {
    switch (action.type) {
        case ACTIONS_TODOLIST_TYPE.ADD_NEW_TODOLIST:
            let newTodoList: todoListDomainType = {...action.payload.todoList, filter: "all"}
            return [newTodoList, ...state]

        case ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_FILTER_VALUE:
            return state.map(td => td.id === action.todoListID ? {...td, ...action.payload} : td)

        case ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_TITLE:
            return state.map(td => td.id === action.todoListId ? {...td, ...action.payload} : td)

        case ACTIONS_TODOLIST_TYPE.DELETE_TODOLIST:
            return state.filter(td => td.id !== action.todoListId)

        case ACTIONS_TODOLIST_TYPE.GET_TODOLISTS:
            return action.todolists.map(tl => ({...tl, filter: 'all'}))

        default:
            return state
    }
}

export type getTodoListsType = ReturnType<typeof getTodoListsAC>
export const getTodoListsAC = (todolists: Array<TodoListType>) => {
    return {
        type: ACTIONS_TODOLIST_TYPE.GET_TODOLISTS,
        todolists
    } as const
}

export type addTodoListType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (todoList: TodoListType) => {
    return {
        type: ACTIONS_TODOLIST_TYPE.ADD_NEW_TODOLIST,
        payload: {todoList}
    } as const
}

export type changeTodoListFilterValueType = ReturnType<typeof changeTodoListFilterValueAC>
export const changeTodoListFilterValueAC = (todoListID: string, filter: FilterType) => {
    return {
        type: ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_FILTER_VALUE,
        todoListID,
        payload: {filter}
    } as const
}

export type changeTodoListTitleType = ReturnType<typeof changeTodoListTitleAC>
export const changeTodoListTitleAC = (todoListId: string, title: string) => {
    return {
        type: ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_TITLE,
        todoListId,
        payload: {title}
    } as const
}

export type deleteTodoListType = ReturnType<typeof deleteTodoListAC>
export const deleteTodoListAC = (todoListId: string) => {
    return {
        type: ACTIONS_TODOLIST_TYPE.DELETE_TODOLIST,
        todoListId
    } as const
}

export const getTodoListsTC = (): AppThunkType => (dispatch) => {
    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(getTodoListsAC(res.data))
        })
}

export const deleteTodoListTC = (todoListId: string): AppThunkType => (dispatch) => {
    todoListAPI.deleteTodoList(todoListId)
        .then(res => {
            dispatch(deleteTodoListAC(todoListId))
        })
}

export const changeTodoListTitleTC = (todoListId: string, title: string): AppThunkType => (dispatch) => {
    todoListAPI.updateTodoList(todoListId, title)
        .then(res => {
            dispatch(changeTodoListTitleAC(todoListId, title))
        })
}

export const addTodoListTC = (title: string): AppThunkType => (dispatch) => {
    todoListAPI.createTodoList(title)
        .then(res => {
            dispatch(addTodoListAC(res.data.data.item))
        })
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


