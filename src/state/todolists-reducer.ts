import {v1} from "uuid";
import {ACTIONS_TODOLIST_TYPE, ActionsTodoListsType} from "./todolists-actions";

export type FilterType = 'all' | 'completed' | 'active'

export type TodoListType = {
    id: string
    title: string
    filter: FilterType
}

export const todoListID1 = v1()
export const todoListID2 = v1()

export let initialState: Array<TodoListType> = [
    {id: todoListID1, title: 'What to learn', filter: 'all'},
    {id: todoListID2, title: 'What to buy', filter: 'all'}
]

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionsTodoListsType): Array<TodoListType> => {
    switch (action.type) {
        case ACTIONS_TODOLIST_TYPE.ADD_NEW_TODOLIST:
            let newTodoList: TodoListType = {id: action.todoListID, title: action.title, filter: "all"}
            return [newTodoList, ...state]
        case ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_FILTER_VALUE:
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        case ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_TITLE:
            return state.map((tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl))
        case ACTIONS_TODOLIST_TYPE.DELETE_TODOLIST:
            return state.filter(tl => tl.id !== action.todoListID)
        default:
            return state
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


