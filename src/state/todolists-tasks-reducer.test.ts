import {TasksStateType, TodoListType} from "../App";
import {AddTodoListTypeAC, RemoveTodoListAC, todoListsReducer} from "./todolists-reducer";
import {TasksReducer} from "./tasks-reducer";
import {v1} from "uuid";

test('it\'s should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = AddTodoListTypeAC('new todoList')
    const endTasksState = TasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)
})

test('property with todoListId should be deleted ', () => {
    const startState: TasksStateType = {
        'todoListID1': [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        'todoListID2': [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ]
    }

    const action = RemoveTodoListAC('todoListID2')
    const endState = TasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListID2']).not.toBeDefined()
})