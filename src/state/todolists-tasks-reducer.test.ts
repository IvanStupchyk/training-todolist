import {addTodoListAC, deleteTodoListAC, todoListsReducer, TodoListType} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {v1} from "uuid";

test('it\'s should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = addTodoListAC('new todoList')
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoListID)
    expect(idFromTodoLists).toBe(action.todoListID)
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

    const action = deleteTodoListAC('todoListID2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoListID2']).not.toBeDefined()
})