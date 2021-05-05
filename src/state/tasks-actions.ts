import {AddTodoListType, DeleteTodoListType} from "./todolists-actions";

export enum ACTIONS_TASK_TYPE {
    DELETE_TASK = 'todoList/tasks-reducer/delete-task',
    ADD_TASK = 'todoList/tasks-reducer/add-task',
    CHANGE_TASK_STATUS = 'todoList/tasks-reducer/change-task-status',
    CHANGE_TASK_TITLE = 'todoList/tasks-reducer/change-task-title',
}

type DeleteTaskType = {
    type: ACTIONS_TASK_TYPE.DELETE_TASK
    taskID: string
    todoListID: string
}

export const DeleteTaskAC = (taskID: string, todoListID: string): DeleteTaskType => {
    return {
        type: ACTIONS_TASK_TYPE.DELETE_TASK,
        taskID,
        todoListID
    }
}

type AddTaskType = {
    type: ACTIONS_TASK_TYPE.ADD_TASK
    todoListID: string
    payload: {title: string}
}

export const AddTaskAC = (title: string, todoListID: string): AddTaskType => {
    return {
        type: ACTIONS_TASK_TYPE.ADD_TASK,
        todoListID,
        payload: {title}
    }
}

type ChangeTaskStatusType = {
    type: ACTIONS_TASK_TYPE.CHANGE_TASK_STATUS
    taskID: string
    todoListID: string
}

export const ChangeTaskStatusAC = (taskID: string, todoListID: string): ChangeTaskStatusType => {
    return {
        type: ACTIONS_TASK_TYPE.CHANGE_TASK_STATUS,
        taskID,
        todoListID
    }
}

type ChangeTaskTitleType = {
    type: ACTIONS_TASK_TYPE.CHANGE_TASK_TITLE
    taskID: string
    todoListID: string
    payload: {title: string}
}

export const ChangeTaskTitleAC = (title: string, taskID: string, todoListID: string): ChangeTaskTitleType => {
    return {
        type: ACTIONS_TASK_TYPE.CHANGE_TASK_TITLE,
        taskID,
        todoListID,
        payload: {title}
    }
}

export type ActionsTaskType = DeleteTaskType | AddTaskType | ChangeTaskStatusType | ChangeTaskTitleType | AddTodoListType | DeleteTodoListType
