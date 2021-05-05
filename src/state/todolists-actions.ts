import {FilterType} from "./todolists-reducer";
import {v1} from "uuid";

export enum ACTIONS_TODOLIST_TYPE {
    ADD_NEW_TODOLIST = 'todoList/todolists-actions/add-new-todolist',
    CHANGE_TODOLIST_FILTER_VALUE = 'todoList/todolists-actions/change-todolist-filter-value',
    CHANGE_TODOLIST_TITLE = 'todoList/todolists-actions/change-todolist-title',
    DELETE_TODOLIST = 'todoList/todolists-actions/delete-todolist',
}

export type AddTodoListType = {
    type: ACTIONS_TODOLIST_TYPE.ADD_NEW_TODOLIST
    todoListID: string
    payload: {title: string}
}

export const AddTodoListAC = (title: string): AddTodoListType => {
    return {
        type: ACTIONS_TODOLIST_TYPE.ADD_NEW_TODOLIST,
        todoListID: v1(),
        payload: {title}
    }
}

type ChangeFilterValueType = {
    type: ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_FILTER_VALUE
    todoListID: string
    payload: {filter: FilterType}
}

export const ChangeFilterValueAC = (todoListID: string, filter: FilterType): ChangeFilterValueType => {
    return {
        type: ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_FILTER_VALUE,
        todoListID,
        payload: {filter}
    }
}

type ChangeTodoListTitleType = {
    type: ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_TITLE
    todoListID: string
    payload: {title: string}
}

export const ChangeTodoListTitleAC = (todoListID: string, title: string): ChangeTodoListTitleType => {
    return {
        type: ACTIONS_TODOLIST_TYPE.CHANGE_TODOLIST_TITLE,
        todoListID,
        payload: {title}
    }
}

export type DeleteTodoListType = {
    type: ACTIONS_TODOLIST_TYPE.DELETE_TODOLIST
    todoListID: string
}

export const DeleteTodoListAC = (todoListID: string): DeleteTodoListType => {
    return {
        type: ACTIONS_TODOLIST_TYPE.DELETE_TODOLIST,
        todoListID
    }
}

export type ActionsTodoListsType = AddTodoListType | ChangeFilterValueType | ChangeTodoListTitleType | DeleteTodoListType