import {FilterType, TodoListType} from "../App";
import {v1} from "uuid";

export type AddTodoListType = {
    type: 'ADD-NEW-TODOLIST'
    title: string
    todoListId: string
}

type ChangeFilterValueType = {
    type: 'CHANGE-FILTER-VALUE'
    todoListId: string
    filter: FilterType
}

type ChangeTodoListNameType = {
    type: 'CHANGE-NAME-TODOLIST'
    todoListId: string
    title: string
}

export type DeleteTodoListType = {
    type: 'DELETE-TODOLIST'
    todoListID: string
}

type ActionsType = AddTodoListType | ChangeFilterValueType | ChangeTodoListNameType | DeleteTodoListType

export const todoListsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case "ADD-NEW-TODOLIST":
            let newTodoList: TodoListType = {id: action.todoListId, title: action.title, filter: "all"}
            return [...state, newTodoList]
        case "CHANGE-FILTER-VALUE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "CHANGE-NAME-TODOLIST":
            return state.map((tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl))
        case "DELETE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        default:
            return state
    }
}

export const AddTodoListTypeAC = (title: string): AddTodoListType => {
    return {
        type: 'ADD-NEW-TODOLIST',
        title,
        todoListId: v1()
    }
}

export const ChangeFilterValueTypeAC = (todoListId: string, filter: FilterType): ChangeFilterValueType => {
    return {
        type: 'CHANGE-FILTER-VALUE',
        todoListId,
        filter
    }
}

export const ChangeTodoListNameTypeAC = (todoListId: string, title: string): ChangeTodoListNameType => {
    return {
        type: 'CHANGE-NAME-TODOLIST',
        todoListId,
        title
    }
}

export const RemoveTodoListAC = (todoListID: string): DeleteTodoListType => {
    return {
        type: 'DELETE-TODOLIST',
        todoListID
    }
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


